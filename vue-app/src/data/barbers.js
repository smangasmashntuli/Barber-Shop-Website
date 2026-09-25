/**
 * The barber team.
 *
 * The About page renders these profiles and the booking form's barber <select>
 * is built from the same list, so a barber can never be bookable without a
 * profile (or vice versa). "Any available barber" is added by the booking
 * layer as a booking-only option — it is not a person.
 */

import barberThabo from '../assets/images/ThaboMokoena.jpg'
import barberSipho from '../assets/images/SiphoDlamini.jpg'
import barberTebogo from '../assets/images/TebohoMahlangu.jpg'
import barberKagiso from '../assets/images/KagisoMolefe.jpg'

export const ANY_BARBER = 'any'

export const barbers = [
  {
    slug: 'thabo-mokoena',
    name: 'Thabo Mokoena',
    nickname: 'Smash',
    role: 'Founder & Master Barber',
    withShopSince: 2026,
    image: barberThabo,
    specialties: ['Skin fades', 'Scissor work', 'Beard sculpting'],
    bio: 'Thabo opened SMASH on Browning Road and takes the first chair every morning. He is new to the shop like everyone here \u2014 he fitted out the empty shell on Browning Road himself in 2026 and hired the team that opened it. He insists that a neckline tells you everything about a barber, so bring him a photo and a rough idea and he will shape both into something that actually grows out well.',
    quote: 'A good fade buys you three weeks of looking sharp. A bad one buys you a hat.',
  },
  {
    slug: 'sipho-dlamini',
    name: 'Sipho Dlamini',
    nickname: 'Sipho',
    role: 'Fade & Curly Hair Specialist',
    withShopSince: 2026,
    image: barberSipho,
    specialties: ['Burst fades', 'Curly tops', 'Line-ups'],
    bio: 'Sipho came in for opening day and holds the team record for the cleanest burst fade on curly hair. He works mostly with dry clippers and freehand blending, so the shape he cuts on day one still looks deliberate on day twenty-one. He will also tell you honestly when a style will fight your growth pattern instead of quietly cutting it anyway.',
    quote: 'Light hands, sharp blades, no visible lines. That is the whole job.',
  },
  {
    slug: 'tebogo-mahlangu',
    name: 'Tebogo Mahlangu',
    nickname: 'Tebza',
    role: 'Beard & Grooming Specialist',
    withShopSince: 2026,
    image: barberTebogo,
    specialties: ['Hot towel shaves', 'Beard mapping', 'Grey blending'],
    bio: 'Tebogo runs the shop\u2019s hot towel shave station and was part of the team that opened the doors. He maps a beard to the jawline before a clipper touches it, mixes his own shave oil, and is the barber clients ask for when they want grey softened rather than covered. He also keeps the shop\u2019s hygiene routine: fresh blade every client, sterilised clippers between every cut, no exceptions.',
    quote: 'A beard has a grain, a jaw has a shape. Follow both and it looks effortless.',
  },
  {
    slug: 'kagiso-molefe',
    name: 'Kagiso Molefe',
    nickname: 'Kagi',
    role: 'Kids\u2019 Cuts & Braids Specialist',
    withShopSince: 2026,
    image: barberKagiso,
    specialties: ['Kids\u2019 cuts', 'Braids & twists', 'Pattern lines'],
    bio: 'Kagiso handles most of the shop\u2019s weekend under-twelve bookings \u2014 patiently, quickly, and with a cartoon running on the mirror for the wriggly ones. He joined with the opening group and is equally at home on braids, twists and freehand pattern lines, and he keeps a practice head behind the till for testing new shapes before they go near a client.',
    quote: 'Kids sit still when they trust you. Trust is the first cut.',
  },
]

/** Booking-only option: the client does not mind which barber takes the chair. */
export const anyBarberOption = {
  slug: ANY_BARBER,
  name: 'Any available barber',
  role: 'Next free chair',
}

export const bookingBarberOptions = [anyBarberOption, ...barbers]

export function getBarberBySlug(slug) {
  if (slug === ANY_BARBER) return anyBarberOption
  return barbers.find((barber) => barber.slug === slug)
}