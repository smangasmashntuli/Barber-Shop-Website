<script setup>
/**
 * Purposeful new-client offer: the modal appears once per browser session for
 * visitors who have not used the persistent first-haircut discount. Eligibility
 * is handled by useWelcomeOffer; closing the modal does not consume the offer.
 */
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { shop } from "../../data/site.js";
import { useBodyScrollLock } from "../../composables/useBodyScrollLock.js";
import {
  initializeWelcomeOffer,
  useWelcomeOffer,
} from "../../composables/useWelcomeOffer.js";
import AppIcon from "../ui/AppIcon.vue";

const SESSION_SEEN_KEY = "smash-welcome-offer-seen";
const APPEAR_DELAY_MS = 9000;

const isOpen = ref(false);
const closeButton = ref(null);
const welcomeOffer = useWelcomeOffer();

useBodyScrollLock(isOpen);

let appearTimer;

onMounted(() => {
  initializeWelcomeOffer();
  if (
    !welcomeOffer.isEligible.value ||
    sessionStorage.getItem(SESSION_SEEN_KEY)
  )
    return;
  appearTimer = window.setTimeout(() => {
    isOpen.value = true;
    sessionStorage.setItem(SESSION_SEEN_KEY, "true");
  }, APPEAR_DELAY_MS);
});

onBeforeUnmount(() => {
  window.clearTimeout(appearTimer);
  document.removeEventListener("keydown", onDocumentKeydown);
});

function close() {
  isOpen.value = false;
}

function onDocumentKeydown(event) {
  if (event.key === "Escape" && isOpen.value) close();
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener("keydown", onDocumentKeydown);
    nextTick(() => closeButton.value?.focus());
  } else {
    document.removeEventListener("keydown", onDocumentKeydown);
  }
});
</script>

<template>
  <div v-if="isOpen" class="promo-backdrop" @click.self="close">
    <div
      class="promo"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-title"
      aria-describedby="promo-copy"
    >
      <button
        ref="closeButton"
        type="button"
        class="promo__close"
        @click="close"
      >
        <AppIcon name="close" :size="20" />
        <span class="sr-only">Close the first-visit offer</span>
      </button>

      <p class="eyebrow">New client offer</p>
      <h2 id="promo-title">30% off your first haircut</h2>
      <p id="promo-copy" class="muted">
        Your discount is applied automatically when you book an eligible
        haircut. It is available once per browser visitor and is shown on your
        booking confirmation and calendar event.
      </p>

      <p class="promo__code">
        <span>Applied automatically</span>
        <strong>30% OFF</strong>
      </p>

      <div class="promo__actions">
        <RouterLink
          class="btn btn--primary"
          :to="{ name: 'contact', hash: '#book' }"
          @click="close"
        >
          Book now and use it
        </RouterLink>
        <button type="button" class="btn btn--quiet" @click="close">
          No thanks, keep browsing
        </button>
      </div>

      <p class="small muted">
        Questions? Call the shop on
        <a :href="shop.phone.href">{{ shop.phone.label }}</a
        >. Full booking terms are on our
        <RouterLink :to="{ name: 'terms' }" @click="close"
          >Terms &amp; Conditions</RouterLink
        >
        page.
      </p>
    </div>
  </div>
</template>

<style scoped>
.promo-backdrop {
  position: fixed;
  inset: 0;
  z-index: 90;
  display: grid;
  place-items: center;
  padding: clamp(1rem, 4vw, 2.5rem);
  background: rgba(6, 7, 9, 0.78);
  backdrop-filter: blur(4px);
  animation: promo-fade 220ms ease both;
}

.promo {
  position: relative;
  width: min(520px, 100%);
  max-height: 88vh;
  overflow-y: auto;
  padding: clamp(1.5rem, 4vw, 2.5rem);
  background:
    radial-gradient(
      circle at 15% 0%,
      rgba(200, 162, 74, 0.18),
      transparent 55%
    ),
    linear-gradient(180deg, var(--ink-700), var(--ink-900));
  border: 1px solid rgba(200, 162, 74, 0.45);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  animation: smash-rise 280ms ease both;
}

.promo h2 {
  margin-bottom: 0.4rem;
}

.promo__close {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--line-strong);
  background: rgba(11, 13, 16, 0.7);
  color: var(--cream);
  cursor: pointer;
}

.promo__close:hover {
  border-color: var(--gold);
  color: var(--gold-bright);
}

.promo__code {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 1.35rem 0;
  padding: 0.85rem 1.1rem;
  border: 1px dashed rgba(200, 162, 74, 0.65);
  border-radius: var(--radius);
  background: rgba(200, 162, 74, 0.08);
}

.promo__code span {
  font-size: var(--step-small);
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cream-muted);
}

.promo__code strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  letter-spacing: 0.18em;
  color: var(--gold-bright);
}

.promo__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.15rem;
}

@keyframes promo-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
