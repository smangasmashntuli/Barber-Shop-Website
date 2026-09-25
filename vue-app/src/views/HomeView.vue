<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import heroImage from '../assets/images/hero-barber.jpg'
import interiorImage from '../assets/images/shop-interior-stations.jpg'
import clientsImage from '../assets/images/shop-interior-clients.jpg'
import logoWallImage from '../assets/images/brand-logo-wall.jpg'
import patternCutImage from '../assets/images/service-pattern-cut.jpg'
import { shop, trustPoints } from '../data/site.js'
import { getServiceBySlug, services } from '../data/services.js'
import { barbers } from '../data/barbers.js'
import { formatHoursLabel, getOpenStatus, hoursForDayIndex } from '../utils/openingHours.js'
import ServiceCard from '../components/ui/ServiceCard.vue'
import AppIcon from '../components/ui/AppIcon.vue'
import WelcomeOfferModal from '../components/promo/WelcomeOfferModal.vue'

const status = computed(() => getOpenStatus())
const todayHours = computed(() => hoursForDayIndex(new Date().getDay()))

/** Editorially chosen teaser services — a haircut, the signature combo and a grooming add-on. */
const teaserServices = ['skin-fade', 'smash-combo', 'beard-trim-shape']
  .map((slug) => getServiceBySlug(slug))
  .filter(Boolean)

const priceChips = ['line-up-edge-up', 'kids-cut', 'skin-fade']
  .map((slug) => getServiceBySlug(slug))
  .filter(Boolean)

const galleryImages = [
  { src: interiorImage, alt: 'The SMASH cutting stations and mirrors before opening' },
  { src: patternCutImage, alt: 'Freehand pattern lines cut into a skin fade' },
  { src: clientsImage, alt: 'Clients relaxing in their chairs while waiting for a cut' },
  { src: logoWallImage, alt: 'The SMASH emblem mounted on the shop wall' },
]
</script>

<template>
  <div class="home">
    <!-- Hero: full-bleed shop photography with the primary booking call to action -->
    <section class="hero">
      <img class="hero__bg" :src="heroImage" alt="" width="1264" height="847" />
      <div class="hero__veil" aria-hidden="true"></div>

      <div class="shell hero__inner">
        <p class="eyebrow">{{ shop.area }} &middot; Seven days a week</p>
        <h1>Sharp cuts. Clean lines. No shortcuts.</h1>
        <p class="hero__lead">
          SMASH is a seven-chair barbershop built on fades that still hold their shape three weeks later,
          beards mapped to your jawline, and a fresh blade for every client. Walk in, or book the exact
          chair you want.
        </p>

        <div class="hero__actions">
          <RouterLink class="btn btn--primary" :to="{ name: 'contact', hash: '#book' }">
            <AppIcon name="calendar" :size="17" />
            Book your chair
          </RouterLink>
          <RouterLink class="btn btn--ghost" :to="{ name: 'services' }">
            See services &amp; prices
            <AppIcon name="arrow" :size="17" />
          </RouterLink>
        </div>

        <ul class="hero__chips">
          <li v-for="service in priceChips" :key="service.slug">
            <RouterLink :to="{ name: 'services', hash: `#${service.slug}` }">
              {{ service.name }} <strong>{{ shop.currencySymbol }}{{ service.price }}</strong>
            </RouterLink>
          </li>
        </ul>

        <p class="hero__status">
          <span class="pill" :class="status.isOpen ? 'pill--open' : 'pill--closed'">
            <span class="dot" aria-hidden="true"></span>
            {{ status.headline }}
          </span>
          <span>{{ status.detail }}</span>
          <span v-if="todayHours" class="muted">Today: {{ formatHoursLabel(todayHours) }}</span>
        </p>
      </div>
    </section>

    <!-- Quick-info strip: real phone, address and hours -->
    <section class="quick-info">
      <div class="shell quick-info__inner">
        <RouterLink class="quick-info__item" :to="{ name: 'contact', hash: '#book' }">
          <AppIcon name="calendar" :size="18" />
          <span>
            <strong>Booking</strong>
            Reserve a chair online in under a minute
          </span>
        </RouterLink>
        <a class="quick-info__item" :href="shop.phone.href">
          <AppIcon name="phone" :size="18" />
          <span>
            <strong>{{ shop.phone.label }}</strong>
            Call the shop for walk-in availability
          </span>
        </a>
        <a class="quick-info__item" :href="shop.maps.directionsUrl" target="_blank" rel="noopener noreferrer">
          <AppIcon name="pin" :size="18" />
          <span>
            <strong>{{ shop.address.line1 }}</strong>
            {{ shop.address.suburb }}, {{ shop.address.city }}
          </span>
        </a>
        <div class="quick-info__item">
          <AppIcon name="clock" :size="18" />
          <span>
            <strong>Open seven days</strong>
            {{ todayHours ? `Today ${formatHoursLabel(todayHours)}` : 'See weekly hours' }}
          </span>
        </div>
      </div>
    </section>

    <!-- Services teaser -->
    <section class="section">
      <div class="shell">
        <div class="section-head section-head--center">
          <p class="eyebrow">The menu</p>
          <h2>Booked most often in our chairs</h2>
          <p class="lead">
            Thirteen services, every price and duration published up front. These three are the ones our
            clients keep rebooking.
          </p>
        </div>

        <div class="grid grid--3">
          <ServiceCard v-for="service in teaserServices" :key="service.slug" :service="service" />
        </div>

        <div class="home__more">
          <RouterLink class="btn btn--ghost" :to="{ name: 'services' }">
            View all {{ services.length }} services &amp; prices
            <AppIcon name="arrow" :size="16" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Why choose us -->
    <section class="section section--tint">
      <div class="shell split">
        <div class="why__media">
          <img
            :src="interiorImage"
            alt="The SMASH shop floor: seven stations, black leather chairs and gold detailing"
            loading="lazy"
            width="1264"
            height="847"
          />
        </div>
        <div>
          <div class="section-head">
            <p class="eyebrow">Why SMASH</p>
            <h2>A barbershop that runs on routine, not luck</h2>
            <p class="lead">
              We opened on Browning Road in {{ shop.established }} and we are building this shop the slow way:
              published prices, clean blades and the same finish on every cut.
            </p>
          </div>

          <ul class="why__list">
            <li v-for="point in trustPoints" :key="point.title">
              <span class="why__icon"><AppIcon :name="point.icon" :size="20" /></span>
              <span>
                <strong>{{ point.title }}</strong>
                <span class="muted">{{ point.detail }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Barber team teaser -->
    <section class="section">
      <div class="shell">
        <div class="section-head section-head--center">
          <p class="eyebrow">The chairs</p>
          <h2>Four barbers, four specialities</h2>
          <p class="lead">
            Pick the barber whose speciality matches your hair, or choose “any available barber” and take
            the next free chair.
          </p>
        </div>

        <ul class="team">
          <li v-for="barber in barbers" :key="barber.slug" class="team__member">
            <img
              :src="barber.image"
              :alt="`${barber.name}, ${barber.role}`"
              loading="lazy"
              width="320"
              height="460"
            />
            <div class="team__body">
              <h3>{{ barber.name }}</h3>
              <p class="team__role">{{ barber.role }}</p>
              <p class="small muted">With SMASH since {{ barber.withShopSince }}</p>
              <RouterLink
                class="btn btn--quiet"
                :to="{ name: 'contact', query: { barber: barber.slug }, hash: '#book' }"
              >
                Book {{ barber.name.split(' ')[0] }}
              </RouterLink>
            </div>
          </li>
        </ul>

        <div class="home__more">
          <RouterLink class="btn btn--ghost" :to="{ name: 'about' }">
            Read the full bios &amp; shop story
            <AppIcon name="arrow" :size="16" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Gallery -->
    <section class="section section--tight section--tint">
      <div class="shell">
        <div class="section-head">
          <p class="eyebrow">Inside the shop</p>
          <h2>Seven chairs, one standard</h2>
        </div>
        <ul class="gallery">
          <li v-for="image in galleryImages" :key="image.alt">
            <img :src="image.src" :alt="image.alt" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>

    <!-- Closing CTA -->
    <section class="section cta-band">
      <div class="shell cta-band__inner">
        <div>
          <h2>Ready for a sharper cut?</h2>
          <p class="lead">
            Choose your service, barber and time, and we will send you a confirmation with a calendar
            file for the appointment.
          </p>
        </div>
        <div class="btn-row">
          <RouterLink class="btn btn--primary" :to="{ name: 'contact', hash: '#book' }">Book now</RouterLink>
          <!-- WhatsApp rather than tel: so the button works on desktop too — the number stays
               readable in the quick-info strip above, which still dials on a phone. -->
          <a
            class="btn btn--ghost"
            :href="shop.whatsapp.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ shop.whatsapp.label }}
          </a>
        </div>
      </div>
    </section>

    <WelcomeOfferModal />
  </div>
</template>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  min-height: clamp(520px, 78vh, 760px);
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
  z-index: -2;
}

.hero__veil {
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(100deg, rgba(8, 9, 12, 0.94) 8%, rgba(8, 9, 12, 0.72) 45%, rgba(8, 9, 12, 0.35) 78%),
    linear-gradient(0deg, rgba(8, 9, 12, 0.92) 4%, transparent 55%);
}

.hero__inner {
  padding-block: clamp(2.5rem, 7vw, 4.5rem) clamp(2rem, 5vw, 3.25rem);
  max-width: 900px;
}

.hero h1 {
  font-size: var(--step-display);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.5em;
  text-wrap: balance;
}

.hero__lead {
  max-width: 60ch;
  font-size: var(--step-lead);
  color: var(--cream);
  margin-bottom: 1.75rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 1.5rem;
}

.hero__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.hero__chips a {
  display: inline-flex;
  gap: 0.4rem;
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: rgba(11, 13, 16, 0.55);
  color: var(--cream-muted);
  font-size: var(--step-small);
  text-decoration: none;
}

.hero__chips a:hover,
.hero__chips strong {
  color: var(--gold-bright);
}

.hero__status {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: var(--step-small);
  color: var(--cream-muted);
}

.quick-info {
  border-block: 1px solid var(--line);
  background: var(--ink-800);
}

.quick-info__inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(235px, 1fr));
  gap: 1px;
  padding-block: 0;
}

.quick-info__item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1.15rem clamp(0.5rem, 1.5vw, 1.25rem);
  color: var(--cream-muted);
  text-decoration: none;
  font-size: var(--step-small);
  border-left: 1px solid var(--line);
}

.quick-info__item:first-child {
  border-left: 0;
}

.quick-info__item span {
  display: grid;
  gap: 0.1rem;
}

.quick-info__item strong {
  color: var(--cream);
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.quick-info__item :deep(.app-icon) {
  color: var(--gold);
  margin-top: 0.2rem;
}

.quick-info__item:hover strong,
.quick-info__item:hover :deep(.app-icon) {
  color: var(--gold-bright);
}

.home__more {
  display: flex;
  justify-content: center;
  margin-top: clamp(1.5rem, 3vw, 2.25rem);
}

.why__media img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
}

.why__list {
  display: grid;
  gap: 1.1rem;
}

.why__list li {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
}

.why__list span {
  display: grid;
  gap: 0.2rem;
}

.why__list strong {
  font-family: var(--font-display);
  font-size: 1.02rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.why__icon {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 50%;
  border: 1px solid rgba(200, 162, 74, 0.45);
  background: rgba(200, 162, 74, 0.1);
  color: var(--gold);
}

.team {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
  gap: clamp(1rem, 2.2vw, 1.5rem);
}

.team__member {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 0;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
}

.team__member > img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  object-position: center top;
}

.team__body {
  display: grid;
  gap: 0.35rem;
  padding: 0 clamp(0.9rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.35rem);
}

.team__body h3 {
  margin: 0;
  font-size: 1.05rem;
}

.team__role {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--gold);
}

.team__body .btn {
  justify-self: start;
  margin-top: 0.35rem;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(215px, 1fr));
  gap: 0.75rem;
}

.gallery li {
  overflow: hidden;
  border-radius: var(--radius);
  border: 1px solid var(--line);
}

.gallery img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 320ms ease;
}

.gallery li:hover img {
  transform: scale(1.05);
}

.cta-band {
  background:
    radial-gradient(circle at 20% 20%, rgba(200, 162, 74, 0.18), transparent 55%),
    var(--ink-800);
  border-top: 1px solid var(--line);
}

.cta-band__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.cta-band h2 {
  margin-bottom: 0.35rem;
}

.cta-band .lead {
  max-width: 52ch;
}

@media (max-width: 900px) {
  .quick-info__item {
    border-left: 0;
    border-top: 1px solid var(--line);
  }

  .hero__veil {
    background:
      linear-gradient(180deg, rgba(8, 9, 12, 0.85) 0%, rgba(8, 9, 12, 0.88) 60%, rgba(8, 9, 12, 0.96) 100%);
  }
}
</style>