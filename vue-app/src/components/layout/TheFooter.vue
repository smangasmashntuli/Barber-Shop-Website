<script setup>
import { RouterLink } from "vue-router";
import logo from "../../assets/images/logo.png";
import { addressLines, openingHours, shop } from "../../data/site.js";
import { formatHoursLabel } from "../../utils/openingHours.js";
import AppIcon from "../ui/AppIcon.vue";

const year = new Date().getFullYear();

const quickLinks = [
  { label: "Home", to: { name: "home" } },
  { label: "Services & Prices", to: { name: "services" } },
  { label: "About the Shop", to: { name: "about" } },
  { label: "Contact & Booking", to: { name: "contact" } },
  { label: "Terms & Conditions", to: { name: "terms" } },
  { label: "Privacy Policy", to: { name: "privacy" } },
];
</script>

<template>
  <footer class="site-footer">
    <div class="shell site-footer__grid">
      <div class="site-footer__brand">
        <div class="site-footer__logo">
          <img
            :src="logo"
            :alt="`${shop.name} logo`"
            width="610"
            height="409"
          />
        </div>
        <p class="muted">{{ shop.tagline }}</p>
        <p class="small muted">
          Precision cuts, fades and beard work on Browning Road in Salt River —
          seven chairs, seven days a week, and a fresh blade for every client.
        </p>
        <RouterLink
          class="btn btn--primary"
          :to="{ name: 'contact', hash: '#book' }"
        >
          Book your chair
        </RouterLink>
      </div>

      <div class="site-footer__column">
        <h3>Visit the shop</h3>
        <address class="site-footer__address">
          <span v-for="line in addressLines" :key="line">{{ line }}</span>
        </address>
        <ul class="site-footer__links">
          <li>
            <a :href="shop.phone.href"
              ><AppIcon name="phone" :size="16" />{{ shop.phone.label }}</a
            >
          </li>
          <li>
            <a :href="shop.email.href"
              ><AppIcon name="mail" :size="16" />{{ shop.email.label }}</a
            >
          </li>
          <li>
            <a
              :href="shop.maps.directionsUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AppIcon name="pin" :size="16" />Get directions
            </a>
          </li>
        </ul>
      </div>

      <div class="site-footer__column">
        <h3>Opening hours</h3>
        <ul class="site-footer__hours">
          <li v-for="entry in openingHours" :key="entry.day">
            <span>{{ entry.day }}</span>
            <span>{{ formatHoursLabel(entry) }}</span>
          </li>
        </ul>
        <p class="small muted">
          Nothing is booked that would run past closing time.
        </p>
      </div>

      <div class="site-footer__column">
        <h3>Explore</h3>
        <ul class="site-footer__links">
          <li v-for="link in quickLinks" :key="link.label">
            <RouterLink :to="link.to">{{ link.label }}</RouterLink>
          </li>
        </ul>

        <h3 class="site-footer__follow">Follow SMASH</h3>
        <ul class="site-footer__links">
          <li v-for="social in shop.socials" :key="social.name">
            <a :href="social.href" target="_blank" rel="noopener noreferrer">
              <AppIcon name="external" :size="15" />
              <span
                >{{ social.name }}
                <span class="muted small">{{ social.handle }}</span></span
              >
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="shell site-footer__base">
      <p class="small muted">
        &copy; {{ year }} {{ shop.name }}. All rights reserved. Prices shown in
        {{ shop.currencyCode }} and include VAT.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink-800);
  border-top: 1px solid var(--line);
  padding-top: clamp(2.5rem, 5vw, 4rem);
}

.site-footer__grid {
  display: grid;
  grid-template-columns: minmax(240px, 1.4fr) repeat(
      auto-fit,
      minmax(215px, 1fr)
    );
  gap: clamp(1.5rem, 3.5vw, 3rem);
  padding-bottom: clamp(2rem, 4vw, 3rem);
}

.site-footer__brand {
  display: grid;
  gap: 0.9rem;
  justify-items: start;
}

.site-footer__logo {
  display: inline-grid;
  place-items: center;
  padding: 0.6rem 1rem;
  background: linear-gradient(160deg, #fdfaf3, #efe7d6);
  border: 1px solid rgba(200, 162, 74, 0.5);
  border-radius: var(--radius);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
}

.site-footer__logo img {
  width: clamp(150px, 18vw, 210px);
  height: auto;
}

.site-footer__column h3 {
  font-size: 0.9rem;
  letter-spacing: 0.18em;
  color: var(--gold);
  margin-bottom: 0.9rem;
}

.site-footer__follow {
  margin-top: 1.75rem;
}

.site-footer__address {
  display: grid;
  gap: 0.15rem;
  font-style: normal;
  color: var(--cream-muted);
  margin-bottom: 1rem;
}

.site-footer__links {
  display: grid;
  gap: 0.6rem;
}

.site-footer__links a {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--cream-muted);
  text-decoration: none;
}

.site-footer__links a:hover {
  color: var(--gold-bright);
}

.site-footer__hours {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
  font-size: var(--step-small);
  color: var(--cream-muted);
}

.site-footer__hours li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px dashed var(--line);
}

.site-footer__base {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  padding-block: 1.25rem 2rem;
  border-top: 1px solid var(--line);
}

@media (max-width: 700px) {
  .site-footer__base {
    flex-direction: column;
  }
}
</style>
