/**
 * Client-side validation for the booking form.
 *
 * Each validator returns an empty string when the value is valid, or the
 * message to show under the field. Keeping the rules here means the inline
 * errors, the submit guard and the tests all use identical logic.
 */

import { addDaysToIsoDate, isValidIsoDate } from './datetime.js'
import { getTimeSlots, isSlotInPast, latestBookableDate, shopToday } from './openingHours.js'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const NAME_PATTERN = /^[a-z][a-z'’\-\s]{1,39}$/i

export function validateRequired(value, label) {
  return String(value ?? '').trim() ? '' : `${label} is required.`
}

export function validateFirstName(value) {
  const required = validateRequired(value, 'First name')
  if (required) return required
  return NAME_PATTERN.test(String(value).trim())
    ? ''
    : 'Use letters only — at least two characters.'
}

export function validateLastName(value) {
  const required = validateRequired(value, 'Last name')
  if (required) return required
  return NAME_PATTERN.test(String(value).trim())
    ? ''
    : 'Use letters only — at least two characters.'
}

export function validateEmail(value) {
  const required = validateRequired(value, 'Email address')
  if (required) return required
  return EMAIL_PATTERN.test(String(value).trim())
    ? ''
    : 'Enter a valid email address, e.g. name@example.co.za.'
}

/**
 * Accepts South African mobile and landline formats, with or without spaces,
 * dashes or brackets, and also accepts international numbers in +cc form.
 */
export function validatePhone(value) {
  const required = validateRequired(value, 'Phone number')
  if (required) return required

  const cleaned = String(value).replace(/[\s()\-.]/g, '')
  if (!/^\+?\d+$/.test(cleaned)) return 'Phone numbers can only contain digits, spaces and +.'
  if (cleaned.startsWith('+27')) {
    return /^\+27\d{9}$/.test(cleaned) ? '' : 'A South African number should look like +27 82 123 4567.'
  }
  if (cleaned.startsWith('0')) {
    return /^0\d{9}$/.test(cleaned) ? '' : 'Enter all ten digits, e.g. 082 123 4567.'
  }
  return /^\d{9,15}$/.test(cleaned) ? '' : 'Enter a valid contact number.'
}

export function validateService(value) {
  return validateRequired(value, 'Service') || ''
}

export function validateBarber(value) {
  return validateRequired(value, 'Barber') || ''
}

/**
 * Date must be present, a real calendar date, not in the past and inside the
 * shop's booking window.
 */
export function validateBookingDate(value, now = new Date()) {
  const required = validateRequired(value, 'Appointment date')
  if (required) return required
  if (!isValidIsoDate(value)) return 'Choose a valid date.'

  const today = shopToday(now)
  if (String(value) < today) return 'Past dates cannot be booked — choose today or later.'
  if (String(value) > latestBookableDate(now)) {
    return `Bookings open up to ${addDaysToIsoDate(today, 90).split('-').reverse().join('/')} — pick an earlier date.`
  }
  return ''
}

/**
 * Time must match a real slot for that date and service duration, and must
 * still be in the future.
 */
export function validateBookingTime(value, { date, durationMinutes, now = new Date() } = {}) {
  const required = validateRequired(value, 'Appointment time')
  if (required) return required
  if (!isValidIsoDate(date)) return 'Choose a date first so we can show open times.'

  const slots = getTimeSlots(date, durationMinutes)
  if (!slots.length) return 'The shop is closed that day — choose another date.'
  if (!slots.some((slot) => slot.value === value)) {
    return 'That time is outside trading hours for this service — pick one of the open times.'
  }
  if (isSlotInPast(date, value, now)) return 'That time has already passed — pick a later slot.'
  return ''
}