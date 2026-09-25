<script setup>
import { watch } from "vue";
import { useRoute } from "vue-router";
import { addressLines, openingHours, shop } from "../data/site.js";
import { formatHoursLabel } from "../utils/openingHours.js";
import { useBooking } from "../composables/useBooking.js";
import { useShopStatus } from "../composables/useShopStatus.js";
import BookingForm from "../components/booking/BookingForm.vue";
import BookingConfirmation from "../components/booking/BookingConfirmation.vue";
import ShopMap from "../components/ui/ShopMap.vue";
import AppIcon from "../components/ui/AppIcon.vue";

const route = useRoute();
const booking = useBooking();

const status = useShopStatus();
const confirmation = booking.confirmation;

const todayName = new Intl.DateTimeFormat("en-ZA", { weekday: "long" }).format(
  new Date(),
);

// "Book this service" and "Book with Kagiso" links arrive as query parameters,
// so the form is already filled in by the time the client lands here.
watch(
  () => route.query,
  (query) => {
    if (confirmation.value) return;
    booking.applyPresets({ service: query.service, barber: query.barber });
  },
  { immediate: true },
);
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="shell">
        <p class="eyebrow">Contact &amp; booking</p>
        <h1>Reserve your chair in under a minute</h1>
        <p class="lead">
          Choose your service, barber, date and time. You will get a
          confirmation with the exact appointment and a calendar file you can
          add to your phone. Nothing is charged online — you pay in the shop.
        </p>
        <p class="contact__status">
          <span
            class="pill"
            :class="status.isOpen ? 'pill--open' : 'pill--closed'"
          >
            <span class="dot" aria-hidden="true"></span>
            {{ status.headline }}
          </span>
          <span class="muted">{{ status.detail }}</span>
        </p>
      </div>
    </section>

    <section id="book" class="section booking-section">
      <div class="shell">
        <div class="section-head">
          <p class="eyebrow">Booking</p>
          <h2>
            {{ confirmation ? "Booking confirmed" : "Book an appointment" }}
          </h2>
          <p v-if="!confirmation" class="lead">
            Every field is checked as you go. Times shown are real open slots
            for the service you pick, so nothing here can be booked outside
            trading hours.
          </p>
        </div>

        <BookingConfirmation v-if="confirmation" :booking="confirmation" />
        <BookingForm v-else />
      </div>
    </section>

    <section class="section section--tint">
      <div class="shell">
        <div class="section-head">
          <p class="eyebrow">Find us</p>
          <h2>{{ shop.address.line1 }}, {{ shop.address.suburb }}</h2>
          <p class="lead">
            The map below is pinned on our front door on Browning Road. Open
            directions and your phone will route you straight to the shop.
            Walk-ins are welcome any day the shop is open.
          </p>
        </div>

        <div class="contact-grid">
          <div class="contact-grid__map">
            <ShopMap />
            <a
              class="btn btn--ghost contact-grid__directions"
              :href="shop.maps.directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon name="pin" :size="16" />
              Open directions in Google Maps
            </a>
          </div>

          <div class="contact-grid__details">
            <div class="card">
              <h3>Talk to the shop</h3>
              <ul class="contact-list">
                <li>
                  <AppIcon name="phone" :size="17" />
                  <span>
                    <a :href="shop.phone.href">{{ shop.phone.label }}</a>
                    <span class="small muted"
                      >Call for same-day availability</span
                    >
                  </span>
                </li>
                <li>
                  <AppIcon name="mail" :size="17" />
                  <span>
                    <a :href="shop.email.href">{{ shop.email.label }}</a>
                    <span class="small muted"
                      >Replies within one working day</span
                    >
                  </span>
                </li>
                <li>
                  <AppIcon name="external" :size="17" />
                  <span>
                    <a
                      :href="shop.whatsapp.href"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ shop.whatsapp.label }}
                    </a>
                    <span class="small muted"
                      >Send a photo for a style quote</span
                    >
                  </span>
                </li>
                <li>
                  <AppIcon name="pin" :size="17" />
                  <address>
                    <span v-for="line in addressLines" :key="line">{{
                      line
                    }}</span>
                  </address>
                </li>
              </ul>
            </div>

            <div class="card">
              <h3>Opening hours</h3>
              <ul class="hours">
                <li
                  v-for="entry in openingHours"
                  :key="entry.day"
                  :class="{ 'hours--today': entry.day === todayName }"
                >
                  <span>
                    {{ entry.day }}
                    <span v-if="entry.day === todayName" class="hours__badge"
                      >Today</span
                    >
                  </span>
                  <span>{{ formatHoursLabel(entry) }}</span>
                </li>
              </ul>
              <p class="small muted">
                Friday is our late night. Sundays close at 15:00, so book
                popular slots early.
              </p>
            </div>

            <div class="card">
              <h3>Follow the shop</h3>
              <ul class="contact-list">
                <li v-for="social in shop.socials" :key="social.name">
                  <AppIcon name="external" :size="17" />
                  <span>
                    <a
                      :href="social.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      >{{ social.name }}</a
                    >
                    <span class="small muted">{{ social.handle }}</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section-head">
          <p class="eyebrow">Good to know</p>
          <h2>Before your first visit</h2>
        </div>
        <div class="grid grid--3">
          <div class="card">
            <h3>Arrive five minutes early</h3>
            <p class="muted">
              Your slot is reserved from the minute you booked it. Arriving more
              than ten minutes late may mean shortening the service so the next
              client is not pushed back.
            </p>
          </div>
          <div class="card">
            <h3>Moved or cancelled plans</h3>
            <p class="muted">
              Call or WhatsApp the shop at least four hours before your slot and
              we will move you free of charge. Later than that, we may have to
              charge for the chair.
            </p>
          </div>
          <div class="card">
            <h3>Bring your inspiration</h3>
            <p class="muted">
              Photos help. Add a note in the booking form or show your barber on
              arrival — we will tell you honestly whether the style suits your
              hair and growth pattern.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.contact__status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: var(--step-small);
}

.booking-section {
  scroll-margin-top: 130px;
}

.contact-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 1fr);
  gap: clamp(1.25rem, 3vw, 2.5rem);
  align-items: start;
}

.contact-grid__directions {
  margin-top: 1rem;
}

.contact-grid__details {
  display: grid;
  gap: 1.25rem;
}

.contact-grid__details h3 {
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  color: var(--gold);
  margin-bottom: 0.9rem;
}

.contact-list {
  display: grid;
  gap: 0.9rem;
}

.contact-list li {
  display: flex;
  gap: 0.7rem;
  align-items: flex-start;
  color: var(--cream-muted);
}

.contact-list li > span,
.contact-list address {
  display: grid;
  gap: 0.1rem;
  font-style: normal;
}

.contact-list :deep(.app-icon) {
  color: var(--gold);
  margin-top: 0.2rem;
  flex: 0 0 auto;
}

.contact-list a {
  color: var(--cream);
  text-decoration: none;
  border-bottom: 1px solid var(--line-strong);
}

.contact-list a:hover {
  color: var(--gold-bright);
  border-color: var(--gold);
}

.hours {
  display: grid;
  gap: 0.4rem;
  margin-bottom: 0.9rem;
  font-size: var(--step-small);
  color: var(--cream-muted);
}

.hours li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.35rem 0.5rem;
  border-radius: var(--radius-sm);
}

.hours--today {
  background: rgba(200, 162, 74, 0.12);
  color: var(--cream);
  border: 1px solid rgba(200, 162, 74, 0.35);
}

.hours__badge {
  margin-left: 0.4rem;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  background: rgba(200, 162, 74, 0.22);
  color: var(--gold-bright);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
