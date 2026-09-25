<script setup>
import { RouterLink } from "vue-router";
import { addressLines, shop } from "../data/site.js";

const lastUpdated = "24 September 2026";

const sections = [
  {
    id: "what-we-collect",
    title: "1. What we collect",
    paragraphs: [
      "When you book an appointment we collect only what we need to manage it:",
    ],
    bullets: [
      "Your first and last name.",
      "Your email address, so the shop has a contact channel for appointment-related questions or changes. This website does not currently send automated confirmation emails or reminders.",
      "Your phone number, so we can reach you about your slot.",
      "The service and barber you chose, the date and start time, and the appointment length.",
      "Anything you type into the optional notes field, for example style preferences or a deadline such as a wedding or matric dance.",
      "The booking reference we generate for the appointment.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "2. How we use it",
    paragraphs: [
      "Your booking details are used to reserve the right chair, keep the right barber free at the right time, and contact you if something changes — for example a barber falling ill, loadshedding or an equipment failure.",
      "We do not use your details for advertising, we do not build profiles about you, and we do not sell or rent your information to anyone.",
    ],
  },
  {
    id: "where-it-is-stored",
    title: "3. Where your booking is stored",
    paragraphs: [
      "This website runs entirely in your browser. The booking you submit is processed on your device and is shown back to you on the confirmation screen; the site itself does not transmit your booking details to a server.",
      "When you arrive at the shop, the appointment is recorded on the shop\u2019s own booking book so the barber on duty has your service, notes and time in front of them.",
    ],
  },
  {
    id: "cookies",
    title: "4. Cookies and local storage",
    paragraphs: [
      "We do not run any advertising or tracking cookies of our own. The site stores a randomly generated visitor token and a one-time discount-used flag in your browser's local storage so the automatic 30% first-haircut offer can remain available across visits and stop after it is used. It also stores a temporary session flag so the offer modal does not repeatedly appear during one visit. None of these flags contains your name, contact details or booking information. The booking form itself is held in memory while you use the page and is not saved to browser storage by this application.",
      "The only third-party content on the site is the map on the contact page. It is an embedded Google Maps frame, so when it loads Google receives the request for it, including your IP address, and may set its own cookies. That part of the page is covered by Google\u2019s privacy policy rather than ours. The map is optional: the street address, phone number and opening hours are listed next to it, and the directions button opens Google Maps only when you choose to click it.",
    ],
  },
  {
    id: "sharing",
    title: "5. Who we share it with",
    paragraphs: [
      "Nobody, other than the barber team who need your appointment on their day sheet. We do not share your details with marketing partners, and we will only disclose information to a third party where the law requires it — for example a valid court order or lawful request from an authority.",
    ],
  },
  {
    id: "retention",
    title: "6. How long we keep it",
    paragraphs: [
      "The shop keeps appointment information only for as long as it is reasonably needed to manage the appointment, handle a question or complaint, and meet any legal obligations. There is no fixed twelve-month retention period. Information that is no longer needed is deleted or securely disposed of, and you can ask us to delete your details at any time.",
    ],
  },
  {
    id: "your-rights",
    title: "7. Your rights",
    paragraphs: [
      "Under the Protection of Personal Information Act (POPIA) you may ask us what information we hold about you, ask us to correct it, ask us to delete it, or object to how it is used. Email us at " +
        shop.email.label +
        ' with the subject line "personal information request" and we will respond within a reasonable period, normally seven working days.',
    ],
  },
  {
    id: "security",
    title: "8. Keeping it safe",
    paragraphs: [
      "Appointment details are kept on shop systems that are locked when the shop is closed and are accessible only to the SMASH team. If a breach ever affected your information, we would tell you and the Information Regulator as required by POPIA.",
    ],
  },
  {
    id: "children",
    title: "9. Children",
    paragraphs: [
      "A parent or guardian should complete an appointment for a minor and provide the contact details needed for the booking. The online form does not ask for a child\u2019s date of birth or identity document. We only photograph or publish an image of a minor for our social pages after receiving the guardian\u2019s consent.",
    ],
  },
  {
    id: "changes",
    title: "10. Changes to this policy",
    paragraphs: [
      "If we change how we handle booking information, we will update this page and the date at the top of it.",
    ],
  },
];
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="shell shell--narrow">
        <p class="eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p class="lead">
          What {{ shop.name }} does with the details you submit when you book an
          appointment.
        </p>
        <p class="small muted">Last updated: {{ lastUpdated }}</p>
      </div>
    </section>

    <section class="section">
      <div class="shell shell--narrow policy">
        <p class="lead">
          Booking a haircut should not cost you your privacy. We collect the
          minimum we need to hold your chair and reach you if plans change, and
          nothing more.
        </p>

        <article
          v-for="section in sections"
          :id="section.id"
          :key="section.id"
          class="policy__section"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
          <ul v-if="section.bullets">
            <li v-for="bullet in section.bullets" :key="bullet">
              {{ bullet }}
            </li>
          </ul>
        </article>

        <article id="contact" class="policy__section">
          <h2>11. Contact us</h2>
          <p>Questions about this policy or your information can go to:</p>
          <ul>
            <li>Email: {{ shop.email.label }}</li>
            <li>Phone: {{ shop.phone.label }}</li>
            <li>Address: {{ addressLines.join(", ") }}</li>
          </ul>
          <p>
            If you are not satisfied with our response, you may contact the
            Information Regulator of South Africa.
          </p>
        </article>

        <div class="policy__actions">
          <RouterLink
            class="btn btn--primary"
            :to="{ name: 'contact', hash: '#book' }"
            >Book a chair</RouterLink
          >
          <RouterLink class="btn btn--ghost" :to="{ name: 'terms' }"
            >Read the terms &amp; conditions</RouterLink
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.policy h2 {
  font-size: 1.15rem;
  letter-spacing: 0.08em;
}

.policy__section {
  padding-bottom: clamp(1.25rem, 3vw, 2rem);
  margin-bottom: clamp(1.25rem, 3vw, 2rem);
  border-bottom: 1px solid var(--line);
  scroll-margin-top: 130px;
}

.policy__section p,
.policy__section li {
  color: var(--cream-muted);
}

.policy__section ul {
  display: grid;
  gap: 0.5rem;
  padding-left: 1.1rem;
  list-style: disc;
}

.policy__section ul li::marker {
  color: var(--gold);
}

.policy__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
}
</style>
