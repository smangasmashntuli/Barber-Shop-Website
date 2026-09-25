<script setup>
import { RouterLink } from 'vue-router'
import { addressLines, shop } from '../data/site.js'

const lastUpdated = '24 September 2026'

const clauses = [
  {
    id: 'about',
    title: '1. About these terms',
    paragraphs: [
      `These terms govern every appointment booked through this website or over the phone with ${shop.name} ("the shop", "we", "us"). By booking an appointment you agree to them, so please read them before you confirm a slot.`,
      'They apply to all services on our price list, including haircuts, fades, beard work, hot towel shaves, grooming extras and packages.',
    ],
  },
  {
    id: 'who-we-are',
    title: '2. Who you are dealing with',
    paragraphs: [
      `${shop.name} is an independent barbershop trading from ${addressLines.join(', ')}. You can reach us on ${shop.phone.label} or ${shop.email.label} during trading hours.`,
      'Our full weekly trading hours are published on the contact page, in the site footer and on the shop door. Public holidays may differ and will be posted at the shop and on our social pages.',
    ],
  },
  {
    id: 'booking',
    title: '3. Booking an appointment',
    bullets: [
      'An online booking is a request for a specific service, barber, date and time. It becomes an appointment once the confirmation screen shows your booking reference.',
      'Selections are limited to the services, barbers and times our booking system can honour, so a time that falls outside trading hours or that leaves too little time for your service cannot be submitted.',
      'Keep your booking reference. It is the quickest way for us to find and change your appointment.',
      'You must be able to receive a confirmation email at the address you give us. We also use your phone number to contact you if your barber is delayed or unwell.',
      'If you booked "any available barber", the shop assigns the next free chair and the barber on duty will take your appointment.',
      'We reserve the right to decline or move a booking where the request cannot be met — for example an equipment failure, a water outage or loadshedding — and will contact you first to rebook.',
    ],
  },
  {
    id: 'pricing',
    title: '4. Prices, payment and promotions',
    bullets: [
      `All prices are quoted in South African Rand (${shop.currencyCode}) and include VAT.`,
      'The price on the price list or on this website is the price you pay for the service you booked. If your barber recommends additional work, the extra service and its price are confirmed with you before the work starts.',
      'Payment is made in the shop by card or cash when the service is complete. No card details are taken on this website and no deposit is charged for standard bookings.',
      'Long sessions such as braiding, the SMASH Combo or group bookings may require a deposit. Where a deposit is required, we will tell you the amount when you book.',
      'Promotional codes (for example the first-visit code SMASH50) must be mentioned before payment, apply once per client unless stated otherwise, cannot be exchanged for cash and may not be combined with other offers.',
      'Prices are reviewed from time to time. The price published at the moment you book is the price that applies to that appointment.',
    ],
  },
  {
    id: 'cancellation',
    title: '5. Cancellations and moving a booking',
    bullets: [
      `You may move or cancel an appointment at no charge up to four hours before your start time by calling or messaging ${shop.phone.label}.`,
      'If you cancel with less than four hours\u2019 notice, or do not arrive for a booked appointment, the shop may charge up to 50% of the booked service price to cover the chair that was held for you.',
      'Repeated late cancellations or no-shows may require a deposit before further online bookings are accepted.',
      'If we have to cancel or move your appointment, you will be offered your original service at the same price at the next available time, or a full refund of any deposit paid.',
    ],
  },
  {
    id: 'late-arrival',
    title: '6. Late arrivals',
    bullets: [
      'Please arrive five minutes before your start time. Your slot begins at the time you booked.',
      'We allow a ten-minute grace period. After that, we may shorten the service to protect the next client\u2019s slot, or pass the chair to a walk-in client.',
      'If a service is shortened because of late arrival, the full price of the booked service still applies. If you cannot be taken in at all, the cancellation terms in clause 5 apply.',
    ],
  },
  {
    id: 'refusal',
    title: '7. Right to refuse or stop a service',
    paragraphs: [
      'Our barbers and clients work in close contact, and we may decline or stop a service where continuing is unsafe or unreasonable. This includes:',
    ],
    bullets: [
      'Signs of a scalp or skin condition that could spread through shared equipment, such as open sores, fungal infections or head lice.',
      'Requests that we know will cause harm — for example cutting extremely close over a scar, mole or recent wound.',
      'Abusive, threatening, intoxicated or unsafe behaviour towards our team or other clients.',
      'Requests that break the law or involve cutting a minor against a guardian\u2019s instruction.',
      'Requests for a style that cannot be safely achieved with the client\u2019s hair condition or length. In these cases we will offer a realistic alternative instead.',
    ],
  },
  {
    id: 'services',
    title: '8. Services, consultation and results',
    bullets: [
      'Every service starts with a short consultation. Please tell your barber about your hair history — relaxers, colour, treatments, previous cuts — before we begin.',
      'Photographs are used as a guide, not a guarantee. The same cut looks different on different hair density, growth patterns and head shapes, and the result depends on your starting length.',
      'Results for colour work such as grey blending depend on your natural hair colour and porosity. A patch test is required at least 48 hours before any colour service and is done free of charge in the shop.',
      'You are responsible for telling us about allergies, sensitive skin or scalp conditions before a service starts.',
      'The duration shown for each service is the chair time we book for it, not a minimum or maximum guarantee.',
    ],
  },
  {
    id: 'hygiene',
    title: '9. Hygiene and safety',
    bullets: [
      'We use single-use blades, sterilise clipper blades and combs between clients, and use a clean cape and towel for every client.',
      'Hot towel shaves and razors are only performed by barbers trained in their use, and never over broken or irritated skin.',
      'Our barbers may wear gloves where a client\u2019s skin condition or a service requires it.',
      'If you feel unwell before your appointment, please move it. We will not charge a cancellation fee for illness reported before your slot begins.',
    ],
  },
  {
    id: 'children',
    title: '10. Children and minors',
    bullets: [
      `Our kids\u2019 cut is priced for children under twelve. Older children are charged the standard service price.`,
      'A parent or guardian must remain in the shop during a minor\u2019s appointment, and must be present when the cut is described so there is no misunderstanding afterwards.',
      'Braiding and pattern work on children can take 75 to 90 minutes. Please book those on a quieter day and bring something to keep your child comfortable.',
    ],
  },
  {
    id: 'belongings',
    title: '11. Personal belongings',
    paragraphs: [
      'Please keep your phone, wallet, jewellery and other valuables with you or leave them at home. Jackets and bags can hang at your station, but the shop cannot accept responsibility for personal property that is lost, damaged or left behind. Anything we find is kept behind the till for 30 days.',
    ],
  },
  {
    id: 'photography',
    title: '12. Photography and social media',
    paragraphs: [
      'We sometimes photograph finished cuts for our social pages. We will always ask first, never photograph a minor without a guardian\u2019s consent, and you may decline without it affecting your service. If you would like a photo of your cut, ask your barber — we are happy to take one.',
    ],
  },
  {
    id: 'privacy',
    title: '13. Your information and privacy',
    paragraphs: [
      'The details you submit with a booking (your name, email address, phone number and notes) are used to manage your appointment and to contact you about it. How we collect, use, store and delete that information is set out in our privacy policy, which forms part of these terms.',
    ],
  },
  {
    id: 'complaints',
    title: '14. Complaints and remedies',
    bullets: [
      'If you are unhappy with a service, tell us within 48 hours (or as soon as reasonable). Call the shop or email us with your booking reference and a photograph where possible.',
      'Where the issue is with the cut or finish, we will correct it at no charge. Please do not try to fix it yourself first — that limits what we can do.',
      'Where a correction is not possible, we may at our discretion offer a partial refund or a credit towards your next appointment.',
      'Refunds are not given for services that were correctly performed, for a change of mind after the cut, or for colour results that were explained to you before the service began.',
    ],
  },
  {
    id: 'liability',
    title: '15. Liability',
    paragraphs: [
      'We take reasonable care in everything we do, but we are not liable for indirect or consequential loss arising from an appointment — for example missed transport, missed events or lost earnings. Where we are found liable for loss or damage, our liability is limited to the price of the service booked.',
      'We are also not liable for delays caused by events outside our control, including loadshedding, water interruptions, equipment failure or a barber falling ill. In those cases we will contact you to move your appointment or refund any deposit paid.',
    ],
  },
  {
    id: 'changes',
    title: '16. Changes to these terms',
    paragraphs: [
      'We may update these terms when our services, prices or legal obligations change. The version published on this page at the time of your booking is the version that applies to that booking, and the date at the top of the page always shows when it was last updated.',
    ],
  },
  {
    id: 'law',
    title: '17. Governing law',
    paragraphs: [
      'These terms are governed by the laws of the Republic of South Africa, including the Consumer Protection Act 68 of 2008. Any dispute will be handled in the courts of South Africa.',
    ],
  },
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="shell shell--narrow">
        <p class="eyebrow">Legal</p>
        <h1>Terms &amp; Conditions</h1>
        <p class="lead">
          Booking, cancellation, pricing, hygiene and refund rules for appointments at {{ shop.name }}.
        </p>
        <p class="small muted">Last updated: {{ lastUpdated }}</p>
      </div>
    </section>

    <section class="section">
      <div class="shell shell--narrow terms">
        <nav class="terms__toc" aria-label="On this page">
          <h2>On this page</h2>
          <ol>
            <li v-for="clause in clauses" :key="clause.id">
              <a :href="`#${clause.id}`">{{ clause.title }}</a>
            </li>
            <li><a href="#contact">18. How to contact us</a></li>
          </ol>
        </nav>

        <article v-for="clause in clauses" :id="clause.id" :key="clause.id" class="terms__clause">
          <h2>{{ clause.title }}</h2>
          <p v-for="paragraph in clause.paragraphs || []" :key="paragraph">{{ paragraph }}</p>
          <ul v-if="clause.bullets">
            <li v-for="bullet in clause.bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </article>

        <article id="contact" class="terms__clause">
          <h2>18. How to contact us</h2>
          <p>
            For anything about a booking, a cancellation, a complaint or your personal information, contact
            the shop directly:
          </p>
          <ul>
            <li>Phone: {{ shop.phone.label }}</li>
            <li>Email: {{ shop.email.label }}</li>
            <li>Address: {{ addressLines.join(', ') }}</li>
          </ul>
          <p>
            Please quote your booking reference where you have one — it lets us find your appointment
            immediately.
          </p>
        </article>

        <div class="terms__actions">
          <RouterLink class="btn btn--primary" :to="{ name: 'contact', hash: '#book' }">
            Back to booking
          </RouterLink>
          <RouterLink class="btn btn--ghost" :to="{ name: 'privacy' }">Read the privacy policy</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.terms h2 {
  font-size: 1.15rem;
  letter-spacing: 0.08em;
  margin-bottom: 0.6rem;
}

.terms__toc {
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  background: rgba(255, 255, 255, 0.02);
  margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
}

.terms__toc ol {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 0.35rem 1.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: none;
}

.terms__toc a {
  color: var(--cream-muted);
  text-decoration: none;
  font-size: var(--step-small);
}

.terms__toc a:hover {
  color: var(--gold-bright);
}

.terms__clause {
  padding-bottom: clamp(1.25rem, 3vw, 2rem);
  margin-bottom: clamp(1.25rem, 3vw, 2rem);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 130px;
}

.terms__clause p,
.terms__clause li {
  color: var(--cream-muted);
}

.terms__clause ul {
  display: grid;
  gap: 0.5rem;
  padding-left: 1.1rem;
  list-style: disc;
}

.terms__clause ul li::marker {
  color: var(--gold);
}

.terms__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}
</style>