<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { formatDuration, formatPrice } from "../../data/services.js";
import AppIcon from "./AppIcon.vue";

const props = defineProps({
  service: { type: Object, required: true },
});

/**
 * Services photographed for the site use their photo; the rest use a branded
 * tool tile so every card in the grid is finished, never an empty grey box.
 */
const tileIcons = {
  "hot-towel-shave": "razor",
  "line-up-edge-up": "sparkle",
  "smash-combo": "crown",
};

const tileIcon = computed(() => tileIcons[props.service.slug] ?? "scissors");
</script>

<template>
  <article class="service-card">
    <div class="service-card__media">
      <img
        v-if="service.image"
        :src="service.image"
        :alt="`${service.name} finished at SMASH Barbershop`"
        loading="lazy"
        width="930"
        height="1170"
      />
      <span v-else class="service-card__tile" aria-hidden="true">
        <AppIcon :name="tileIcon" :size="52" />
        <span class="service-card__tile-label">{{ service.name }}</span>
      </span>
      <span class="service-card__price">{{ formatPrice(service.price) }}</span>
    </div>

    <div class="service-card__body">
      <h3>{{ service.name }}</h3>
      <p class="service-card__meta">
        <AppIcon name="clock" :size="15" />
        <span>{{ formatDuration(service.duration) }} in the chair</span>
      </p>
      <p class="muted">{{ service.description }}</p>
      <ul class="service-card__includes">
        <li v-for="item in service.includes" :key="item">
          <AppIcon name="check" :size="14" />
          <span>{{ item }}</span>
        </li>
      </ul>
      <RouterLink
        class="btn btn--ghost btn--block"
        :to="{
          name: 'contact',
          query: { service: service.slug },
          hash: '#book',
        }"
      >
        Book {{ service.name }}
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.015)
  );
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition:
    transform var(--transition),
    border-color var(--transition);
}

.service-card:hover {
  transform: translateY(-4px);
  border-color: rgba(200, 162, 74, 0.5);
}

.service-card__media {
  position: relative;
  /*
    4 / 5, not the landscape 4 / 3 it used to be. The service photos are shot
    portrait (912x1153, ratio 0.79) and a landscape plate with object-fit: cover
    scaled them to the card width and cut ~40% of the height away, so the fade
    and the pattern work were cropped out of frame. 4 / 5 is the ratio the
    photos are actually shot at and the same plate the barber portraits use in
    BarberCard.vue, so the cut is visible top to bottom.
  */
  aspect-ratio: 4 / 5;
  background: var(--ink-700);
  overflow: hidden;
}

.service-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-card__tile {
  display: grid;
  place-items: center;
  gap: 0.6rem;
  height: 100%;
  padding: 1rem;
  text-align: center;
  color: var(--gold);
  background:
    radial-gradient(
      circle at 30% 20%,
      rgba(200, 162, 74, 0.22),
      transparent 55%
    ),
    linear-gradient(150deg, var(--ink-600), var(--ink-900));
}

.service-card__tile-label {
  font-family: var(--font-display);
  font-size: 0.95rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cream);
}

.service-card__price {
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: linear-gradient(180deg, var(--gold-bright), var(--gold));
  color: #17120a;
  font-weight: 700;
  font-size: 0.9rem;
}

.service-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: clamp(1.1rem, 2vw, 1.5rem);
  flex: 1 1 auto;
}

.service-card__body h3 {
  margin: 0;
}

.service-card__meta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0;
  font-size: var(--step-small);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold);
}

.service-card__body p.muted {
  font-size: 0.95rem;
}

.service-card__includes {
  display: grid;
  gap: 0.4rem;
  font-size: var(--step-small);
  color: var(--cream-muted);
  margin-top: auto;
}

.service-card__includes li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.service-card__includes :deep(.app-icon) {
  color: var(--gold);
  margin-top: 0.28rem;
}
</style>
