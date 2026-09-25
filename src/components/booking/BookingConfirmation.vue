<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { shop, addressLines } from "../../data/site.js";
import { useBooking } from "../../composables/useBooking.js";
import {
  buildEventDetails,
  buildGoogleCalendarUrl,
  downloadAppointmentIcs,
  icsFileName,
} from "../../utils/calendar.js";
import AppIcon from "../ui/AppIcon.vue";

const props = defineProps({
  booking: { type: Object, required: true },
});

const bookingStore = useBooking();

/** Both calendar options read from the same event object built from the real booking. */
const event = computed(() => buildEventDetails(props.booking));
const googleCalendarUrl = computed(() => buildGoogleCalendarUrl(props.booking));
const downloadMessage = ref("");

function onDownloadIcs() {
  const fileName = icsFileName(props.booking);
  downloadAppointmentIcs(props.booking);
  downloadMessage.value = `${fileName} downloaded. Open it to add the appointment to Apple Calendar, Outlook or Google Calendar.`;
}
</script>

<template>
  <div class="confirmation rise">
    <div class="confirmation__head">
      <span class="confirmation__tick" aria-hidden="true">
        <AppIcon name="check" :size="26" />
      </span>
      <div>
        <p class="eyebrow">Booking confirmed</p>
        <h2>Your chair is booked, {{ booking.firstName }}</h2>
        <p class="lead">
          We have you in at {{ event.startLocalLabel }} on
          {{ event.dateLabel }}. Take a copy of the appointment with you using
          the calendar buttons below.
        </p>
      </div>
    </div>

    <dl class="confirmation__details">
      <div>
        <dt>Booking reference</dt>
        <dd>{{ booking.reference }}</dd>
      </div>
      <div>
        <dt>Booked for</dt>
        <dd>{{ booking.fullName }}</dd>
      </div>
      <div>
        <dt>Service</dt>
        <dd>
          {{ booking.serviceName }}
          <span class="muted small"
            >· {{ booking.durationMinutes }} min · R{{
              booking.servicePrice
            }}</span
          >
          <span
            v-if="booking.discountPercent"
            class="confirmation__discount small"
          >
            {{ booking.discountPercent }}% first haircut discount: -R{{
              booking.discountAmount
            }}
            ·
            <strong>Pay R{{ booking.finalPrice }}</strong>
          </span>
        </dd>
      </div>
      <div>
        <dt>Barber</dt>
        <dd>{{ event.barberLabel }}</dd>
      </div>
      <div>
        <dt>Date</dt>
        <dd>{{ event.dateLabel }}</dd>
      </div>
      <div>
        <dt>Time</dt>
        <dd>{{ event.startLocalLabel }} – {{ event.endLocalLabel }}</dd>
      </div>
      <div>
        <dt>Contact</dt>
        <dd>
          {{ booking.phone }}
          <span class="muted small">{{ booking.email }}</span>
        </dd>
      </div>
      <div class="confirmation__details-wide">
        <dt>Where</dt>
        <dd>
          <span v-for="line in addressLines" :key="line">{{ line }}</span>
        </dd>
      </div>
      <div v-if="booking.notes" class="confirmation__details-wide">
        <dt>Note for your barber</dt>
        <dd>{{ booking.notes }}</dd>
      </div>
    </dl>

    <div class="confirmation__calendar">
      <h3>Add it to your calendar</h3>
      <p class="muted">
        Both options are generated from this booking:
        {{ booking.serviceName }} with {{ event.barberLabel }} at
        {{ event.startLocalLabel }} – {{ event.endLocalLabel }}, at
        {{ shop.name }}.
      </p>
      <div class="btn-row">
        <button type="button" class="btn btn--primary" @click="onDownloadIcs">
          <AppIcon name="download" :size="16" />
          Download .ics file
        </button>
        <a
          class="btn btn--ghost"
          :href="googleCalendarUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon name="calendar" :size="16" />
          Add to Google Calendar
        </a>
        <a
          class="btn btn--ghost"
          :href="shop.maps.directionsUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AppIcon name="pin" :size="16" />
          Directions to the shop
        </a>
      </div>
      <p v-if="downloadMessage" class="small" role="status" aria-live="polite">
        <AppIcon name="check" :size="14" /> {{ downloadMessage }}
      </p>
    </div>

    <div class="confirmation__next">
      <h3>Before you come in</h3>
      <ul>
        <li>
          <AppIcon name="clock" :size="16" />
          <span
            >Arrive five minutes early — the chair is held for you, not the
            whole shop.</span
          >
        </li>
        <li>
          <AppIcon name="phone" :size="16" />
          <span>
            Need to move it? Call
            <a :href="shop.phone.href">{{ shop.phone.label }}</a> at least four
            hours before your slot.
          </span>
        </li>
        <li>
          <AppIcon name="tag" :size="16" />
          <span
            >Pay in the shop by card or cash. Nothing is charged online.</span
          >
        </li>
      </ul>
    </div>

    <div class="btn-row confirmation__actions">
      <button
        type="button"
        class="btn btn--primary"
        @click="bookingStore.startNewBooking()"
      >
        Book another appointment
      </button>
      <RouterLink class="btn btn--ghost" :to="{ name: 'services' }"
        >Back to services &amp; prices</RouterLink
      >
      <RouterLink class="btn btn--quiet" :to="{ name: 'terms' }"
        >Read the booking terms</RouterLink
      >
    </div>
  </div>
</template>

<style scoped>
.confirmation {
  display: grid;
  gap: clamp(1.25rem, 3vw, 2rem);
  padding: clamp(1.35rem, 3vw, 2.5rem);
  border: 1px solid rgba(200, 162, 74, 0.45);
  border-radius: var(--radius-lg);
  background:
    radial-gradient(
      circle at 10% 0%,
      rgba(200, 162, 74, 0.16),
      transparent 50%
    ),
    linear-gradient(180deg, var(--ink-700), var(--ink-900));
  box-shadow: var(--shadow-card);
}

.confirmation__head {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.confirmation__tick {
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(180deg, var(--gold-bright), var(--gold));
  color: #17120a;
}

.confirmation h2 {
  margin-bottom: 0.35rem;
}

.confirmation__discount {
  display: block;
  margin-top: 0.25rem;
  color: var(--success);
}

.confirmation__discount strong {
  color: var(--cream);
}

.confirmation h3 {
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  color: var(--gold);
  margin-bottom: 0.6rem;
}

.confirmation__details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.9rem 1.5rem;
  margin: 0;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.03);
}

.confirmation__details > div {
  display: grid;
  gap: 0.15rem;
}

.confirmation__details dt {
  font-size: 0.7rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
}

.confirmation__details dd {
  margin: 0;
}

.confirmation__details dd span {
  display: block;
}

.confirmation__details-wide {
  grid-column: 1 / -1;
}

.confirmation__calendar,
.confirmation__next {
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.02);
}

.confirmation__calendar p {
  margin-bottom: 1rem;
}

.confirmation__next ul {
  display: grid;
  gap: 0.6rem;
  color: var(--cream-muted);
}

.confirmation__next li {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
}

.confirmation__next :deep(.app-icon) {
  color: var(--gold);
  margin-top: 0.25rem;
}

.confirmation__next :deep(.app-icon),
.confirmation__calendar :deep(.app-icon) {
  flex: 0 0 auto;
}

.confirmation__calendar .btn {
  gap: 0.5rem;
}

.confirmation__actions {
  align-items: center;
}

@media (max-width: 560px) {
  .confirmation__head {
    flex-direction: column;
  }
}
</style>
