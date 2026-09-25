<script setup>
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import {
  getServicesByCategory,
  serviceCategories,
  services,
} from "../data/services.js";
import { shop } from "../data/site.js";
import ServiceCard from "../components/ui/ServiceCard.vue";
import AppIcon from "../components/ui/AppIcon.vue";

const activeCategory = ref("all");

const filters = computed(() => [
  { id: "all", name: `All services (${services.length})` },
  ...serviceCategories.map((category) => ({
    id: category.id,
    name: `${category.name} (${getServicesByCategory(category.id).length})`,
  })),
]);

const groups = computed(() =>
  serviceCategories
    .map((category) => ({
      ...category,
      services: getServicesByCategory(category.id),
    }))
    .filter((group) => group.services.length > 0)
    .filter(
      (group) =>
        activeCategory.value === "all" || group.id === activeCategory.value,
    ),
);

const priceFrom = computed(() =>
  Math.min(...services.map((service) => service.price)),
);
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="shell">
        <p class="eyebrow">Services &amp; prices</p>
        <h1>Every price on the board, before you sit down</h1>
        <p class="lead">
          Thirteen services across haircuts, beard work, grooming extras and
          packages. Prices include VAT, services start at
          {{ shop.currencySymbol }}{{ priceFrom }}, and every booking shows the
          chair time you are reserving — so you know exactly what you are paying
          for.
        </p>
        <div class="btn-row">
          <RouterLink
            class="btn btn--primary"
            :to="{ name: 'contact', hash: '#book' }"
          >
            <AppIcon name="calendar" :size="17" />
            Book an appointment
          </RouterLink>
          <!--
            WhatsApp, not tel:. A desktop browser has no dialer, so a tel:-only button raises the
            operating system's "pick an app" dialog and looks broken; wa.me works on both desktop
            and phone. The label names the destination so the button never promises a phone call.
          -->
          <a
            class="btn btn--ghost"
            :href="shop.whatsapp.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask about a style on WhatsApp
          </a>
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="shell">
        <div
          class="filters"
          role="group"
          aria-label="Filter services by category"
        >
          <button
            v-for="filter in filters"
            :key="filter.id"
            type="button"
            class="filter"
            :class="{ 'filter--active': activeCategory === filter.id }"
            :aria-pressed="activeCategory === filter.id ? 'true' : 'false'"
            @click="activeCategory = filter.id"
          >
            {{ filter.name }}
          </button>
        </div>
      </div>
    </section>

    <section
      v-for="group in groups"
      :id="group.id"
      :key="group.id"
      class="section section--tight"
    >
      <div class="shell">
        <div class="section-head">
          <p class="eyebrow">{{ group.services.length }} services</p>
          <h2>{{ group.name }}</h2>
          <p class="lead">{{ group.blurb }}</p>
        </div>

        <div class="grid grid--3">
          <ServiceCard
            v-for="service in group.services"
            :id="service.slug"
            :key="service.slug"
            :service="service"
            class="anchor"
          />
        </div>
      </div>
    </section>

    <section class="section section--tint">
      <div class="shell split">
        <div>
          <p class="eyebrow">Good to know</p>
          <h2>How a SMASH booking works</h2>
          <ul class="notes">
            <li>
              <AppIcon name="chair" :size="18" />
              <span>
                <strong>Walk-ins welcome</strong>
                No booking? Come through — if a chair is free, we will take you.
                Booking simply keeps a slot yours.
              </span>
            </li>
            <li>
              <AppIcon name="clock" :size="18" />
              <span>
                <strong>Last booking 45 minutes before closing</strong>
                A service is never started so late that we would have to rush
                the finish.
              </span>
            </li>
            <li>
              <AppIcon name="razor" :size="18" />
              <span>
                <strong>Long braiding sessions</strong>
                Braids, twists and the SMASH Combo need 75 to 90 minutes — book
                those in the morning or on a Wednesday late night.
              </span>
            </li>
            <li>
              <AppIcon name="tag" :size="18" />
              <span>
                <strong>Combos save you money</strong>
                The SMASH Combo works out R60 cheaper than booking the cut,
                beard and wash separately.
              </span>
            </li>
          </ul>
        </div>

        <div class="card card--plain notes-card">
          <h3>Not sure what to book?</h3>
          <p class="muted">
            Choose the service closest to what you want and add a note in the
            booking form. Your barber will confirm the shape and the time with
            you before the clippers come out, and any price difference is agreed
            in the chair — never added afterwards.
          </p>
          <RouterLink
            class="btn btn--primary btn--block"
            :to="{ name: 'contact', hash: '#book' }"
          >
            Start a booking
          </RouterLink>
          <RouterLink class="btn btn--quiet" :to="{ name: 'about' }"
            >Meet the barbers first</RouterLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.filter {
  padding: 0.55rem 1.1rem;
  border: 1px solid var(--line-strong);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: var(--cream-muted);
  font-size: var(--step-small);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    border-color var(--transition),
    color var(--transition),
    background-color var(--transition);
}

.filter:hover {
  border-color: var(--gold);
  color: var(--gold-bright);
}

.filter--active {
  background: linear-gradient(180deg, var(--gold-bright), var(--gold));
  border-color: var(--gold);
  color: #17120a;
  font-weight: 700;
}

.anchor {
  scroll-margin-top: 140px;
}

/*
  A wider track than the global .grid--3 (255px) so the portrait service photos
  are not squeezed into narrow cards on tablet widths. At the 1180px shell this
  still fits three columns, so the desktop grid is unchanged.
*/
.grid--3 {
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.notes {
  display: grid;
  gap: 1rem;
}

.notes li {
  display: flex;
  gap: 0.8rem;
  align-items: flex-start;
  color: var(--cream-muted);
}

.notes li span {
  display: grid;
  gap: 0.15rem;
}

.notes strong {
  color: var(--cream);
}

.notes :deep(.app-icon) {
  color: var(--gold);
  margin-top: 0.2rem;
  flex: 0 0 auto;
}

.notes-card {
  display: grid;
  gap: 0.85rem;
  justify-items: start;
}

@media (max-width: 700px) {
  .grid--3 {
    grid-template-columns: minmax(0, 1fr);
  }

  .filters {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 0.5rem;
  }

  .filter {
    width: 100%;
  }
}
</style>
