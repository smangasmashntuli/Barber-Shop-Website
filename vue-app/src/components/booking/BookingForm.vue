<script setup>
import { computed } from 'vue'
import { getServicesByCategory, serviceCategories } from '../../data/services.js'
import { bookingBarberOptions } from '../../data/barbers.js'
import { shop } from '../../data/site.js'
import { useBooking } from '../../composables/useBooking.js'
import {
  formatLongDate,
  formatTimeLabel,
  weekdayNameForIsoDate,
} from '../../utils/datetime.js'
import { formatHoursLabel, hoursForIsoDate, latestBookableDate, shopToday } from '../../utils/openingHours.js'
import AppIcon from '../ui/AppIcon.vue'

const emit = defineEmits(['submitted'])

const booking = useBooking()
const form = booking.form
const errors = booking.errors
const selectedService = booking.selectedService
const selectedBarber = booking.selectedBarber
const availableSlots = booking.availableSlots
const tradingSlots = booking.tradingSlots
const previewEndLabel = booking.previewEndLabel

const minDate = shopToday()
const maxDate = latestBookableDate()

const serviceGroups = serviceCategories.map((category) => ({
  ...category,
  services: getServicesByCategory(category.id),
}))

const bookedHours = computed(() => (form.date ? hoursForIsoDate(form.date) : null))
const closedOnChosenDay = computed(() => Boolean(form.date) && !bookedHours.value)
const hasNoOpenSlots = computed(
  () => Boolean(form.date) && !closedOnChosenDay.value && availableSlots.value.length === 0,
)
const needsEarlierDay = computed(() => hasNoOpenSlots.value && tradingSlots.value.length > 0)

const errorCount = computed(() => Object.keys(errors).length)

function onFieldInput(field, value) {
  booking.setField(field, value)
}

function onSubmit() {
  const result = booking.submitBooking()
  if (result.ok) {
    emit('submitted', result.booking)
    return
  }
  // Send the client straight to the first problem instead of leaving them to hunt.
  const firstInvalidField = Object.keys(booking.errors)[0]
  const target = firstInvalidField ? document.getElementById(`booking-${firstInvalidField}`) : null
  if (typeof target?.focus === 'function') target.focus()
}
</script>

<template>
  <form class="booking" novalidate @submit.prevent="onSubmit">
    <div
      v-if="errorCount"
      class="booking__alert"
      role="alert"
      aria-live="polite"
    >
      <AppIcon name="close" :size="16" />
      <span>
        {{ errorCount }} {{ errorCount === 1 ? 'field needs' : 'fields need' }} your attention before we
        can confirm this booking.
      </span>
    </div>

    <div class="booking__layout">
      <div class="booking__fields">
        <fieldset class="booking__group">
          <legend>1. Your details</legend>
          <div class="booking__grid">
            <div class="field" :class="{ 'field--invalid': errors.firstName }">
              <label for="booking-firstName">First name</label>
              <input
                id="booking-firstName"
                name="firstName"
                type="text"
                autocomplete="given-name"
                placeholder="Thandi"
                :value="form.firstName"
                :aria-invalid="errors.firstName ? 'true' : 'false'"
                :aria-describedby="errors.firstName ? 'booking-firstName-error' : undefined"
                @input="onFieldInput('firstName', $event.target.value)"
                @blur="booking.validateField('firstName')"
              />
              <p v-if="errors.firstName" id="booking-firstName-error" class="field__error">
                {{ errors.firstName }}
              </p>
            </div>

            <div class="field" :class="{ 'field--invalid': errors.lastName }">
              <label for="booking-lastName">Last name</label>
              <input
                id="booking-lastName"
                name="lastName"
                type="text"
                autocomplete="family-name"
                placeholder="Mahlangu"
                :value="form.lastName"
                :aria-invalid="errors.lastName ? 'true' : 'false'"
                :aria-describedby="errors.lastName ? 'booking-lastName-error' : undefined"
                @input="onFieldInput('lastName', $event.target.value)"
                @blur="booking.validateField('lastName')"
              />
              <p v-if="errors.lastName" id="booking-lastName-error" class="field__error">
                {{ errors.lastName }}
              </p>
            </div>

            <div class="field" :class="{ 'field--invalid': errors.email }">
              <label for="booking-email">Email address</label>
              <input
                id="booking-email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="you@example.co.za"
                :value="form.email"
                :aria-invalid="errors.email ? 'true' : 'false'"
                :aria-describedby="errors.email ? 'booking-email-error' : undefined"
                @input="onFieldInput('email', $event.target.value)"
                @blur="booking.validateField('email')"
              />
              <p v-if="errors.email" id="booking-email-error" class="field__error">{{ errors.email }}</p>
              <p v-else class="field__hint">We send your confirmation and reminders here.</p>
            </div>

            <div class="field" :class="{ 'field--invalid': errors.phone }">
              <label for="booking-phone">Phone number</label>
              <input
                id="booking-phone"
                name="phone"
                type="tel"
                autocomplete="tel"
                placeholder="082 123 4567"
                :value="form.phone"
                :aria-invalid="errors.phone ? 'true' : 'false'"
                :aria-describedby="errors.phone ? 'booking-phone-error' : undefined"
                @input="onFieldInput('phone', $event.target.value)"
                @blur="booking.validateField('phone')"
              />
              <p v-if="errors.phone" id="booking-phone-error" class="field__error">{{ errors.phone }}</p>
            </div>
          </div>
        </fieldset>

        <fieldset class="booking__group">
          <legend>2. Service &amp; barber</legend>
          <div class="booking__grid">
            <div class="field" :class="{ 'field--invalid': errors.serviceSlug }">
              <label for="booking-serviceSlug">Service</label>
              <select
                id="booking-serviceSlug"
                name="serviceSlug"
                :value="form.serviceSlug"
                :aria-invalid="errors.serviceSlug ? 'true' : 'false'"
                :aria-describedby="errors.serviceSlug ? 'booking-serviceSlug-error' : undefined"
                @change="booking.setService($event.target.value)"
                @blur="booking.validateField('serviceSlug')"
              >
                <option value="" disabled>Choose a service</option>
                <optgroup v-for="group in serviceGroups" :key="group.id" :label="group.name">
                  <option v-for="service in group.services" :key="service.slug" :value="service.slug">
                    {{ service.name }} — R{{ service.price }} · {{ service.duration }} min
                  </option>
                </optgroup>
              </select>
              <p v-if="errors.serviceSlug" id="booking-serviceSlug-error" class="field__error">
                {{ errors.serviceSlug }}
              </p>
              <p v-else class="field__hint">Prices include VAT. Duration is the chair time you are booking.</p>
            </div>

            <div class="field" :class="{ 'field--invalid': errors.barberSlug }">
              <label for="booking-barberSlug">Barber</label>
              <select
                id="booking-barberSlug"
                name="barberSlug"
                :value="form.barberSlug"
                :aria-invalid="errors.barberSlug ? 'true' : 'false'"
                :aria-describedby="errors.barberSlug ? 'booking-barberSlug-error' : undefined"
                @change="booking.setBarber($event.target.value)"
                @blur="booking.validateField('barberSlug')"
              >
                <option v-for="barber in bookingBarberOptions" :key="barber.slug" :value="barber.slug">
                  {{ barber.slug === 'any' ? `${barber.name} (next free chair)` : `${barber.name} — ${barber.role}` }}
                </option>
              </select>
              <p v-if="errors.barberSlug" id="booking-barberSlug-error" class="field__error">
                {{ errors.barberSlug }}
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset class="booking__group">
          <legend>3. Date &amp; time</legend>
          <div class="booking__grid">
            <div class="field" :class="{ 'field--invalid': errors.date }">
              <label for="booking-date">Appointment date</label>
              <input
                id="booking-date"
                name="date"
                type="date"
                :min="minDate"
                :max="maxDate"
                :value="form.date"
                :aria-invalid="errors.date ? 'true' : 'false'"
                :aria-describedby="errors.date ? 'booking-date-error' : undefined"
                @change="booking.setDate($event.target.value)"
                @blur="booking.validateField('date')"
              />
              <p v-if="errors.date" id="booking-date-error" class="field__error">{{ errors.date }}</p>
              <p v-else-if="bookedHours" class="field__hint">
                {{ weekdayNameForIsoDate(form.date) }} trading hours:
                {{ formatHoursLabel(bookedHours) }}
              </p>
            </div>

            <div class="field" :class="{ 'field--invalid': errors.time }">
              <label for="booking-time">Appointment time</label>

              <p v-if="!selectedService" class="field__hint">
                Choose a service first so we can show times that fit before closing.
              </p>
              <p v-else-if="!form.date" class="field__hint">
                Pick a date and we will list every open slot that fits this service before closing.
              </p>
              <p v-else-if="closedOnChosenDay" class="field__hint">
                The shop does not trade on that day. Try another date.
              </p>
              <p v-else-if="needsEarlierDay" class="field__hint">
                Today's remaining slots have already started. Choose tomorrow or later, or call the shop on
                {{ shop.phone.label }} for a walk-in.
              </p>
              <p v-else-if="hasNoOpenSlots" class="field__hint">
                No slot on that date fits a {{ selectedService.duration }} minute service before closing.
                Try another date.
              </p>

              <div
                v-else
                id="booking-time"
                class="slots"
                role="group"
                aria-label="Available appointment times"
                tabindex="-1"
              >
                <button
                  v-for="slot in availableSlots"
                  :key="slot.value"
                  type="button"
                  class="slot"
                  :class="{ 'slot--active': form.time === slot.value }"
                  :aria-pressed="form.time === slot.value ? 'true' : 'false'"
                  @click="booking.setTime(slot.value)"
                >
                  <span class="slot__time">{{ slot.label }}</span>
                  <span class="slot__end">ends {{ slot.endLabel }}</span>
                </button>
              </div>

              <p v-if="errors.time" id="booking-time-error" class="field__error">{{ errors.time }}</p>
            </div>
          </div>

          <div class="field">
            <label for="booking-notes">Anything your barber should know? (optional)</label>
            <textarea
              id="booking-notes"
              name="notes"
              rows="3"
              placeholder="e.g. keep the top long, I have a wedding on Saturday, first time with a straight razor"
              :value="form.notes"
              @input="onFieldInput('notes', $event.target.value)"
            ></textarea>
          </div>
        </fieldset>
      </div>

      <aside class="booking__summary card card--plain">
        <h3>Your appointment</h3>
        <dl class="summary">
          <div>
            <dt>Service</dt>
            <dd>
              <template v-if="selectedService">
                {{ selectedService.name }}
                <span class="muted small">· R{{ selectedService.price }} · {{ selectedService.duration }} min</span>
              </template>
              <span v-else class="muted">Not selected yet</span>
            </dd>
          </div>
          <div>
            <dt>Barber</dt>
            <dd>
              <template v-if="selectedBarber">{{ selectedBarber.name }}</template>
              <span v-else class="muted">Not selected yet</span>
            </dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>
              <template v-if="form.date">{{ formatLongDate(form.date) }}</template>
              <span v-else class="muted">Not selected yet</span>
            </dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>
              <template v-if="form.time">
                {{ formatTimeLabel(form.time) }}
                <span v-if="previewEndLabel" class="muted small">– {{ previewEndLabel }}</span>
              </template>
              <span v-else class="muted">Not selected yet</span>
            </dd>
          </div>
        </dl>

        <button type="submit" class="btn btn--primary btn--block">Confirm booking</button>
        <p class="small muted">
          You will get a confirmation with a calendar file and a Google Calendar link. Nothing is charged
          online; you pay in the shop.
        </p>
      </aside>
    </div>
  </form>
</template>

<style scoped>
.booking {
  display: grid;
  gap: 1.25rem;
}

.booking__alert {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem;
  border: 1px solid rgba(240, 167, 154, 0.5);
  border-radius: var(--radius);
  background: rgba(240, 167, 154, 0.1);
  color: var(--danger);
  font-size: var(--step-small);
}

.booking__layout {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(280px, 1fr);
  gap: clamp(1.25rem, 3vw, 2.25rem);
  align-items: start;
}

.booking__fields {
  display: grid;
  gap: clamp(1.25rem, 2.5vw, 1.75rem);
  min-width: 0;
}

.booking__group {
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: clamp(1rem, 2vw, 1.5rem);
  margin: 0;
  background: rgba(255, 255, 255, 0.02);
}

.booking__group legend {
  padding: 0 0.6rem;
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
}

.booking__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem 1.25rem;
}

.booking__group .field + .field {
  margin-top: 1rem;
}

.slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
}

.slot {
  display: grid;
  gap: 0.1rem;
  padding: 0.6rem 0.5rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  color: var(--cream);
  cursor: pointer;
  text-align: center;
  transition: border-color var(--transition), background-color var(--transition),
    color var(--transition);
}

.slot__time {
  font-weight: 600;
  font-size: 0.95rem;
}

.slot__end {
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--cream-muted);
}

.slot:hover {
  border-color: var(--gold);
  color: var(--gold-bright);
}

.slot--active {
  background: linear-gradient(180deg, var(--gold-bright), var(--gold));
  border-color: var(--gold);
  color: #17120a;
}

.slot--active .slot__end {
  color: rgba(23, 18, 10, 0.75);
}

.booking__summary {
  position: sticky;
  top: 140px;
  display: grid;
  gap: 1rem;
}

.booking__summary h3 {
  margin: 0;
}

.summary {
  display: grid;
  gap: 0.75rem;
  margin: 0;
}

.summary > div {
  display: grid;
  gap: 0.15rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px dashed var(--line);
}

.summary dt {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
}

.summary dd {
  margin: 0;
}

@media (max-width: 900px) {
  .booking__layout {
    grid-template-columns: minmax(0, 1fr);
  }

  .booking__summary {
    position: static;
  }
}
</style>