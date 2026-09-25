<script setup>
import { RouterLink } from 'vue-router'
import heroImage from '../assets/images/hero-barber.jpg'
import clientsImage from '../assets/images/shop-interior-clients.jpg'
import logoWallImage from '../assets/images/brand-logo-wall.jpg'
import fadeImage from '../assets/images/service-fade.jpg'
import beardImage from '../assets/images/service-beard-trim.jpg'
import braidsImage from '../assets/images/service-braids.jpg'
import { barbers } from '../data/barbers.js'
import { shop } from '../data/site.js'
import BarberCard from '../components/ui/BarberCard.vue'
import AppIcon from '../components/ui/AppIcon.vue'

const milestones = [
  {
    when: 'Day 1',
    title: 'The doors open on Browning Road',
    detail:
      'SMASH opens in Salt River with seven fitted stations, a published price list and the booking system live from the first morning.',
  },
  {
    when: 'Week 1',
    title: 'The opening team settles in',
    detail:
      'Four barbers, hired for opening day, each with their own speciality and all cutting to one finish checklist.',
  },
  {
    when: 'Month 1',
    title: 'Our first regulars',
    detail:
      'The first clients to come back a second time, then a third. A returning client is the only review that counts, so the last five minutes of every cut get the same attention as the first.',
  },
  {
    when: 'Now',
    title: 'Booking without the phone tag',
    detail:
      'Every service, price and open slot published online, so clients can hold a chair at 6 AM without waking anyone up.',
  },
]

const values = [
  {
    icon: 'check',
    title: 'Consistency over showmanship',
    detail:
      'Every barber cuts to the same standard and the same finish checklist. Your cut should look the same on a Tuesday as it does on a Saturday.',
  },
  {
    icon: 'shield',
    title: 'Hygiene you can watch',
    detail:
      'Single-use blades, sterilised clipper blades and a fresh cape per client. Nothing is hidden behind a counter.',
  },
  {
    icon: 'chair',
    title: 'Your shape, not a trend chart',
    detail:
      'We map your hairline, growth pattern and jaw before we cut. If a style will not sit on your hair, we say so and offer one that will.',
  },
  {
    icon: 'clock',
    title: 'Time kept properly',
    detail:
      'Bookings run to the slot you chose, and the last service of the day still gets the full finish — no rushing to lock up.',
  },
]

const galleryImages = [
  { src: fadeImage, alt: 'A skin fade blended down to the skin at the SMASH shop' },
  { src: beardImage, alt: 'Beard shaped and lined up with clipper and razor' },
  { src: braidsImage, alt: 'Braided top styled over a fresh fade' },
  { src: clientsImage, alt: 'The SMASH shop floor with clients in the chairs' },
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="shell">
        <p class="eyebrow">About the shop</p>
        <h1>One shopfront, one street, one standard from day one</h1>
        <p class="lead">
          SMASH is not a franchise and it is not a chain. It is seven chairs on Browning Road in Salt River,
          run by four barbers who opened this shop together in {{ shop.established }} and have everything
          to prove.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="shell split">
        <div class="about__media">
          <img
            :src="heroImage"
            alt="The four SMASH barbers in front of the shop's emblem wall"
            width="1264"
            height="847"
          />
          <p class="small muted about__caption">
            The opening team in front of the emblem wall on Browning Road: Thabo, Sipho, Tebogo and Kagiso.
          </p>
        </div>

        <div>
          <h2>How SMASH started</h2>
          <p>
            SMASH opened on Browning Road in {{ shop.established }} as a new shop with a new team. There is
            no inherited history behind the counter — just four barbers hired for opening day, seven freshly
            fitted stations, and a shopfront on a Salt River side street that has to earn its first regulars
            one cut at a time.
          </p>
          <p>
            The plan was written on the back of a price list: publish the whole menu, price it honestly, keep
            the blade clean, and never let a client leave with a neckline that only looks right under the shop
            lights.
          </p>
          <p>
            Everyone here is new to SMASH, and most of us are new to Salt River too. What that buys you is a
            team with nothing to coast on: every barber on the floor cuts to the same finish checklist, and
            the last five minutes of the cut — the line-up, the razor work on the neck, the finish that makes
            a fade look deliberate instead of rushed — are never the minutes we save when the queue is long.
          </p>
          <p class="about__signoff">
            <strong>“If it is not sharp enough to photograph, it is not finished.”</strong>
            <span class="small muted">Thabo Mokoena, founder</span>
          </p>
        </div>
      </div>
    </section>

    <section class="section section--tint">
      <div class="shell">
        <div class="section-head">
          <p class="eyebrow">The story so far</p>
          <h2>Our first year on the corner</h2>
        </div>
        <ol class="timeline">
          <li v-for="milestone in milestones" :key="milestone.title">
            <span class="timeline__year">{{ milestone.when }}</span>
            <div>
              <h3>{{ milestone.title }}</h3>
              <p class="muted">{{ milestone.detail }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="section">
      <div class="shell">
        <div class="section-head section-head--center">
          <p class="eyebrow">Our barbers</p>
          <h2>Book the barber, not just the chair</h2>
          <p class="lead">
            Each barber has their own speciality. Pick the one that matches your hair below, or let the
            shop hand you the next free chair.
          </p>
        </div>

        <div class="grid grid--2">
          <BarberCard v-for="barber in barbers" :key="barber.slug" :barber="barber" />
        </div>
      </div>
    </section>

    <section class="section section--tint">
      <div class="shell split">
        <div>
          <p class="eyebrow">What we stand for</p>
          <h2>Four rules we do not bend</h2>
          <ul class="values">
            <li v-for="value in values" :key="value.title">
              <span class="values__icon"><AppIcon :name="value.icon" :size="20" /></span>
              <span>
                <strong>{{ value.title }}</strong>
                <span class="muted">{{ value.detail }}</span>
              </span>
            </li>
          </ul>
        </div>

        <div class="about__media">
          <img
            :src="logoWallImage"
            alt="The gold SMASH emblem mounted on the shop's white wall"
            loading="lazy"
            width="1264"
            height="847"
          />
        </div>
      </div>
    </section>

    <section class="section section--tight">
      <div class="shell">
        <div class="section-head">
          <p class="eyebrow">Work from the chairs</p>
          <h2>Details we are known for</h2>
        </div>
        <ul class="gallery">
          <li v-for="image in galleryImages" :key="image.alt">
            <img :src="image.src" :alt="image.alt" loading="lazy" />
          </li>
        </ul>
      </div>
    </section>

    <section class="section cta-band">
      <div class="shell cta-band__inner">
        <div>
          <h2>Come and meet the team</h2>
          <p class="lead">
            Walk-ins are welcome any day we are open, or reserve a specific barber and time online.
          </p>
        </div>
        <div class="btn-row">
          <RouterLink class="btn btn--primary" :to="{ name: 'contact', hash: '#book' }">Book a chair</RouterLink>
          <RouterLink class="btn btn--ghost" :to="{ name: 'services' }">See services &amp; prices</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about__media img {
  width: 100%;
  border-radius: var(--radius-lg);
  border: 1px solid var(--line);
  object-fit: cover;
}

.about__caption {
  margin-top: 0.7rem;
}

.about__signoff {
  display: grid;
  gap: 0.2rem;
  margin-top: 1.5rem;
  padding-left: 1rem;
  border-left: 2px solid var(--gold);
  font-style: italic;
}

.timeline {
  display: grid;
  gap: 1.25rem;
  border-left: 1px solid var(--line);
  padding-left: clamp(1rem, 3vw, 2rem);
}

.timeline li {
  display: grid;
  grid-template-columns: 104px 1fr;
  gap: 1rem;
  align-items: start;
}

.timeline__year {
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--gold);
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.timeline h3 {
  margin-bottom: 0.25rem;
}

.values {
  display: grid;
  gap: 1.1rem;
}

.values li {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
}

.values li span {
  display: grid;
  gap: 0.2rem;
}

.values strong {
  font-family: var(--font-display);
  font-size: 1.02rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.values__icon {
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

@media (max-width: 560px) {
  .timeline li {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.25rem;
  }
}
</style>