/**
 * Shared booking store (module-scoped singleton).
 *
 * The form, the confirmation card and the calendar buttons all read from this
 * one object, so the confirmation and the calendar event always describe the
 * exact appointment that was submitted — never an example booking.
 */

import { computed, reactive, readonly } from 'vue'
import { getServiceBySlug } from '../data/services.js'
import { ANY_BARBER, getBarberBySlug } from '../data/barbers.js'
import { getAvailableTimeSlots, getTimeSlots, shopToday } from '../utils/openingHours.js'
import { endTimeFrom, formatLongDate, formatTimeLabel } from '../utils/datetime.js'
import {
  discountedPrice,
  isDiscountEligibleForService,
  FIRST_HAIRCUT_DISCOUNT_PERCENT,
  useWelcomeOffer,
} from './useWelcomeOffer.js'
import {
  validateBarber,
  validateBookingDate,
  validateBookingTime,
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhone,
  validateService,
} from '../utils/validation.js'

const MAX_HISTORY = 25

function emptyForm() {
  return {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceSlug: '',
    barberSlug: ANY_BARBER,
    date: '',
    time: '',
    notes: '',
  }
}

const state = reactive({
  form: emptyForm(),
  errors: {},
  touched: {},
  submitted: false,
  confirmation: null,
  history: [],
})

function buildReference(date = new Date()) {
  const stamp = date.getTime().toString(36).toUpperCase().slice(-5)
  const salt = Math.random().toString(36).toUpperCase().slice(2, 4)
  return `SM-${stamp}${salt}`
}

/**
 * Reset helpers mutate the existing objects instead of replacing them, so any
 * component or test holding a reference to `form` or `errors` keeps working
 * after a reset (replacing the objects would silently orphan those references).
 */
function clearFormFields() {
  Object.assign(state.form, emptyForm())
}

function clearErrors() {
  Object.keys(state.errors).forEach((key) => delete state.errors[key])
}

function clearTouched() {
  Object.keys(state.touched).forEach((key) => delete state.touched[key])
}

function recordBooking(booking) {
  state.history.unshift(booking)
  if (state.history.length > MAX_HISTORY) state.history.length = MAX_HISTORY
}

function buildBooking(form, service, barber) {
  const welcomeOffer = useWelcomeOffer()
  const discountApplies = welcomeOffer.isEligible.value && isDiscountEligibleForService(service)
  const discountAmount = discountApplies ? service.price - discountedPrice(service.price) : 0

  return {
    reference: buildReference(),
    createdAt: new Date().toISOString(),
    firstName: form.firstName.trim(),
    lastName: form.lastName.trim(),
    fullName: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    notes: form.notes.trim(),
    serviceSlug: service.slug,
    serviceName: service.name,
    servicePrice: service.price,
    discountPercent: discountApplies ? FIRST_HAIRCUT_DISCOUNT_PERCENT : 0,
    discountAmount,
    finalPrice: service.price - discountAmount,
    durationMinutes: service.duration,
    barberSlug: barber.slug,
    barberName: barber.slug === ANY_BARBER ? 'Any available barber' : barber.name,
    date: form.date,
    time: form.time,
    dateLabel: formatLongDate(form.date),
    startLabel: formatTimeLabel(form.time),
    endLabel: formatTimeLabel(endTimeFrom(form.time, service.duration)),
  }
}

const selectedService = computed(() => getServiceBySlug(state.form.serviceSlug) ?? null)
const selectedBarber = computed(() => getBarberBySlug(state.form.barberSlug) ?? null)

/** Every open slot for the chosen date + service, with past slots removed. */
const availableSlots = computed(() => {
  if (!state.form.date || !selectedService.value) return []
  return getAvailableTimeSlots(state.form.date, selectedService.value.duration)
})

/** All slots the shop trades, including ones already past — used for messaging. */
const tradingSlots = computed(() => {
  if (!state.form.date || !selectedService.value) return []
  return getTimeSlots(state.form.date, selectedService.value.duration)
})

const previewEndLabel = computed(() =>
  state.form.time && selectedService.value
    ? formatTimeLabel(endTimeFrom(state.form.time, selectedService.value.duration))
    : '',
)

function setField(name, value) {
  state.form[name] = value
  if (state.touched[name] || state.submitted) {
    revalidateField(name)
  }
}

function setService(slug) {
  state.form.serviceSlug = slug
  // A different service changes the duration, so an existing time may no
  // longer fit before closing. Clear it rather than silently book it.
  if (state.form.time && selectedService.value) {
    const stillValid = getAvailableTimeSlots(state.form.date, selectedService.value.duration).some(
      (slot) => slot.value === state.form.time,
    )
    if (!stillValid) {
      state.form.time = ''
      state.touched.time = false
    }
  }
  revalidateField('serviceSlug')
}

function setBarber(slug) {
  state.form.barberSlug = slug || ANY_BARBER
  revalidateField('barberSlug')
}

function setDate(value) {
  state.form.date = value
  // Times belong to a date, so a new date always resets the time choice.
  state.form.time = ''
  state.touched.time = false
  if (state.touched.date || state.submitted) revalidateField('date')
}

function setTime(value) {
  state.form.time = value
  revalidateField('time')
}

const validators = {
  firstName: () => validateFirstName(state.form.firstName),
  lastName: () => validateLastName(state.form.lastName),
  email: () => validateEmail(state.form.email),
  phone: () => validatePhone(state.form.phone),
  serviceSlug: () => validateService(state.form.serviceSlug),
  barberSlug: () => validateBarber(state.form.barberSlug),
  date: () => validateBookingDate(state.form.date),
  time: () =>
    validateBookingTime(state.form.time, {
      date: state.form.date,
      durationMinutes: selectedService.value?.duration ?? 30,
    }),
}

function revalidateField(name) {
  if (!validators[name]) return ''
  const message = validators[name]()
  if (message) state.errors[name] = message
  else delete state.errors[name]
  return message
}

/** Validate one field (used on blur) and return its error message. */
function validateField(name) {
  state.touched[name] = true
  return revalidateField(name)
}

/** Validate every field (used on submit). Returns true when the form is clean. */
function validateForm() {
  Object.keys(validators).forEach((name) => {
    state.touched[name] = true
    revalidateField(name)
  })
  return Object.keys(state.errors).length === 0
}

/**
 * Submit the booking. Returns { ok, booking } — `ok: false` means validation
 * blocked it and the inline errors explain why.
 */
function submitBooking() {
  state.submitted = true
  if (!validateForm()) return { ok: false, booking: null }

  const service = selectedService.value
  const barber = selectedBarber.value
  const booking = buildBooking(state.form, service, barber)

  recordBooking(booking)
  state.confirmation = booking

  if (booking.discountPercent > 0) {
    useWelcomeOffer().markDiscountUsed()
  }

  return { ok: true, booking }
}

/** Clear the confirmation card and start a fresh booking. */
function startNewBooking() {
  clearFormFields()
  clearErrors()
  clearTouched()
  state.submitted = false
  state.confirmation = null
}

/** Pre-select a service and/or barber (used by ?service= / ?barber= links). */
function applyPresets({ service, barber } = {}) {
  if (service && getServiceBySlug(service)) setService(service)
  if (barber && getBarberBySlug(barber)) setBarber(barber)
}

export function useBooking() {
  return {
    form: state.form,
    errors: state.errors,
    history: readonly(state.history),
    confirmation: computed(() => state.confirmation),
    selectedService,
    selectedBarber,
    availableSlots,
    tradingSlots,
    previewEndLabel,
    earliestDate: shopToday(),
    setField,
    setService,
    setBarber,
    setDate,
    setTime,
    validateField,
    validateForm,
    submitBooking,
    startNewBooking,
    applyPresets,
  }
}