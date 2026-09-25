<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import logoMark from '../../assets/images/logo-mark.png'
import { shop } from '../../data/site.js'
import { useBodyScrollLock } from '../../composables/useBodyScrollLock.js'
import { useShopStatus } from '../../composables/useShopStatus.js'
import AppIcon from '../ui/AppIcon.vue'

const route = useRoute()
const mobileNavOpen = ref(false)

const status = useShopStatus()

const navLinks = [
  { label: 'Home', to: { name: 'home' } },
  { label: 'Services', to: { name: 'services' } },
  { label: 'About', to: { name: 'about' } },
  { label: 'Contact & Booking', to: { name: 'contact' } },
]

useBodyScrollLock(mobileNavOpen)

// A route change always closes the mobile panel, so a tapped link lands on the
// new page with the menu out of the way.
watch(
  () => route.fullPath,
  () => {
    mobileNavOpen.value = false
  },
)

function onDocumentKeydown(event) {
  if (event.key === 'Escape') mobileNavOpen.value = false
}

watch(mobileNavOpen, (open) => {
  if (typeof document === 'undefined') return
  if (open) document.addEventListener('keydown', onDocumentKeydown)
  else document.removeEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  if (typeof document === 'undefined') return
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>

<template>
  <header class="site-header">
    <p class="status-strip">
      <span class="shell status-strip__inner">
        <span class="pill" :class="status.isOpen ? 'pill--open' : 'pill--closed'">
          <span class="dot" aria-hidden="true"></span>
          {{ status.headline }}
        </span>
        <span class="status-strip__detail">{{ status.detail }}</span>
        <span class="status-strip__spacer" aria-hidden="true"></span>
        <a class="status-strip__link" :href="shop.phone.href">
          <AppIcon name="phone" :size="16" />
          <span>{{ shop.phone.label }}</span>
        </a>
        <a class="status-strip__link status-strip__link--hide-sm" :href="shop.email.href">
          <AppIcon name="mail" :size="16" />
          <span>{{ shop.email.label }}</span>
        </a>
      </span>
    </p>

    <div class="header-bar">
      <div class="shell header-bar__inner">
        <RouterLink class="brand" :to="{ name: 'home' }" aria-label="SMASH Barbershop home">
          <span class="brand__mark">
            <img :src="logoMark" alt="SMASH Barbershop emblem" width="300" height="230" />
          </span>
          <span class="brand__text">
            <span class="brand__word">{{ shop.wordmark }}</span>
            <span class="brand__tag">Barbershop &middot; Est. {{ shop.established }}</span>
          </span>
        </RouterLink>

        <nav class="main-nav" aria-label="Main navigation">
          <ul>
            <li v-for="link in navLinks" :key="link.label">
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="header-actions">
          <RouterLink class="btn btn--primary header-actions__book" :to="{ name: 'contact', hash: '#book' }">
            Book Now
          </RouterLink>
          <button
            type="button"
            class="nav-toggle"
            :aria-expanded="mobileNavOpen ? 'true' : 'false'"
            aria-controls="mobile-navigation"
            @click="mobileNavOpen = !mobileNavOpen"
          >
            <AppIcon :name="mobileNavOpen ? 'close' : 'menu'" :size="22" />
            <span class="sr-only">{{ mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu' }}</span>
          </button>
        </div>
      </div>

      <div v-if="mobileNavOpen" id="mobile-navigation" class="mobile-nav">
        <nav aria-label="Mobile navigation">
          <ul class="mobile-nav__list">
            <li v-for="link in navLinks" :key="`mobile-${link.label}`">
              <RouterLink :to="link.to">{{ link.label }}</RouterLink>
            </li>
            <li>
              <RouterLink :to="{ name: 'terms' }">Terms &amp; Conditions</RouterLink>
            </li>
          </ul>
        </nav>
        <div class="mobile-nav__actions">
          <RouterLink class="btn btn--primary btn--block" :to="{ name: 'contact', hash: '#book' }">
            Book an appointment
          </RouterLink>
          <!-- WhatsApp rather than tel: so the menu works on desktop too. The status strip directly
               above keeps the number as a visible, dialable string on every viewport. -->
          <a
            class="btn btn--ghost btn--block"
            :href="shop.whatsapp.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ shop.whatsapp.label }}
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 60;
}

.status-strip {
  margin: 0;
  background: var(--ink-900);
  border-bottom: 1px solid var(--line);
  font-size: var(--step-small);
}

.status-strip__inner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 38px;
  flex-wrap: wrap;
  padding-block: 0.3rem;
}

.status-strip__detail {
  color: var(--cream-muted);
}

.status-strip__spacer {
  flex: 1 1 auto;
}

.status-strip__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--cream-muted);
  text-decoration: none;
}

.status-strip__link:hover {
  color: var(--gold-bright);
}

.header-bar {
  background: rgba(11, 13, 16, 0.92);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(10px);
}

.header-bar__inner {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 2vw, 2rem);
  min-height: 78px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  text-decoration: none;
  color: var(--cream);
  margin-right: auto;
}

.brand__mark {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  background: linear-gradient(160deg, #fdfaf3, #eee6d5);
  border-radius: 50%;
  border: 1px solid rgba(200, 162, 74, 0.55);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45);
  overflow: hidden;
}

.brand__mark img {
  width: 82%;
  height: auto;
}

.brand__text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand__word {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  background: linear-gradient(180deg, var(--gold-bright), var(--gold));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand__tag {
  font-size: 0.6875rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cream-muted);
}

.main-nav ul {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 1.5vw, 1.4rem);
}

.main-nav a {
  display: inline-block;
  padding: 0.45rem 0.2rem;
  font-size: var(--step-small);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cream-muted);
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: color var(--transition), border-color var(--transition);
}

.main-nav a:hover {
  color: var(--cream);
}

.main-nav a.router-link-active {
  color: var(--gold-bright);
  border-bottom-color: var(--gold);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.nav-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line-strong);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  color: var(--cream);
  cursor: pointer;
}

.nav-toggle:hover {
  border-color: var(--gold);
  color: var(--gold-bright);
}

.mobile-nav {
  display: grid;
  gap: 1.25rem;
  padding: 1.25rem clamp(1rem, 4vw, 2.5rem) 1.75rem;
  background: var(--ink-800);
  border-top: 1px solid var(--line);
  animation: smash-rise 220ms ease both;
}

.mobile-nav__list {
  display: grid;
  gap: 0.25rem;
}

.mobile-nav__list a {
  display: block;
  padding: 0.85rem 0.25rem;
  border-bottom: 1px solid var(--line);
  font-family: var(--font-display);
  font-size: 1.05rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cream);
  text-decoration: none;
}

.mobile-nav__list a:hover,
.mobile-nav__list a.router-link-active {
  color: var(--gold-bright);
}

.mobile-nav__actions {
  display: grid;
  gap: 0.6rem;
}

@media (max-width: 1023px) {
  .main-nav {
    display: none;
  }

  .nav-toggle {
    display: inline-flex;
  }

  .header-actions__book {
    display: none;
  }

  .brand__tag {
    display: none;
  }
}

@media (max-width: 640px) {
  .status-strip__detail,
  .status-strip__link--hide-sm {
    display: none;
  }
}
</style>