<script setup>
import { RouterLink } from 'vue-router'
import { shop } from '../data/site.js'
import AppIcon from '../components/ui/AppIcon.vue'
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="shell shell--narrow">
        <p class="eyebrow">Page not found</p>
        <h1>That page has been cut</h1>
        <p class="lead">
          The address you followed does not exist on this site. Nothing is broken behind the scenes — the
          link simply points somewhere we do not have a page.
        </p>
        <div class="btn-row">
          <RouterLink class="btn btn--primary" :to="{ name: 'home' }">Back to the home page</RouterLink>
          <RouterLink class="btn btn--ghost" :to="{ name: 'contact', hash: '#book' }">
            <AppIcon name="calendar" :size="16" />
            Book an appointment
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="shell shell--narrow">
        <div class="section-head">
          <h2>Looking for something specific?</h2>
          <p class="lead">These are the pages clients usually want next.</p>
        </div>
        <ul class="links">
          <li>
            <RouterLink :to="{ name: 'services' }">
              <span>
                <strong>Services &amp; prices</strong>
                <span class="small muted">Every service, price and chair time, including combos.</span>
              </span>
              <AppIcon name="arrow" :size="18" />
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'about' }">
              <span>
                <strong>About the shop &amp; barbers</strong>
                <span class="small muted">The story, the team and how the shop runs.</span>
              </span>
              <AppIcon name="arrow" :size="18" />
            </RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'contact' }">
              <span>
                <strong>Contact &amp; booking</strong>
                <span class="small muted">The booking form, map, hours and shop contact details.</span>
              </span>
              <AppIcon name="arrow" :size="18" />
            </RouterLink>
          </li>
        </ul>
        <p class="small muted">
          Still stuck? Call the shop on <a :href="shop.phone.href">{{ shop.phone.label }}</a>.
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.links {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.02);
  color: var(--cream);
  text-decoration: none;
  transition: border-color var(--transition), transform var(--transition);
}

.links a:hover {
  border-color: rgba(200, 162, 74, 0.55);
  transform: translateY(-2px);
}

.links a span {
  display: grid;
  gap: 0.15rem;
}

.links strong {
  font-family: var(--font-display);
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 1rem;
}

.links :deep(.app-icon) {
  color: var(--gold);
}
</style>