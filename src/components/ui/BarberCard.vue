<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import AppIcon from "./AppIcon.vue";

const props = defineProps({
  barber: { type: Object, required: true },
});

const firstName = computed(() => props.barber.name.split(" ")[0]);
</script>

<template>
  <article class="barber-card">
    <div class="barber-card__media">
      <img
        :src="barber.image"
        :alt="`${barber.name}, ${barber.role} at SMASH Barbershop`"
        loading="lazy"
        width="320"
        height="460"
      />
      <span class="barber-card__since">Since {{ barber.withShopSince }}</span>
    </div>

    <div class="barber-card__body">
      <h3>
        {{ barber.name }}
        <span v-if="barber.nickname" class="barber-card__nick"
          >“{{ barber.nickname }}”</span
        >
      </h3>
      <p class="barber-card__role">{{ barber.role }}</p>
      <p class="muted">{{ barber.bio }}</p>

      <ul class="barber-card__specialties">
        <li v-for="item in barber.specialties" :key="item">{{ item }}</li>
      </ul>

      <blockquote class="barber-card__quote">“{{ barber.quote }}”</blockquote>

      <RouterLink
        class="btn btn--ghost btn--block"
        :to="{ name: 'contact', query: { barber: barber.slug }, hash: '#book' }"
      >
        Book with {{ firstName }}
        <AppIcon name="arrow" :size="16" />
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.barber-card {
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
}

.barber-card__media {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--ink-700);
}

.barber-card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.barber-card__since {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(11, 13, 16, 0.78);
  border: 1px solid var(--line-strong);
  color: var(--gold-bright);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.barber-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: clamp(1.1rem, 2vw, 1.5rem);
  flex: 1 1 auto;
}

.barber-card__body h3 {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
}

.barber-card__nick {
  font-family: var(--font-body);
  font-size: var(--step-small);
  letter-spacing: 0.08em;
  text-transform: none;
  color: var(--gold);
}

.barber-card__role {
  margin: 0;
  font-size: var(--step-small);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
}

.barber-card__specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.barber-card__specialties li {
  padding: 0.25rem 0.65rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: var(--cream-muted);
}

.barber-card__quote {
  margin: 0;
  padding-left: 0.9rem;
  border-left: 2px solid var(--gold-deep);
  font-style: italic;
  color: var(--cream-muted);
  font-size: 0.95rem;
}

.barber-card__body .btn {
  margin-top: auto;
}
</style>
