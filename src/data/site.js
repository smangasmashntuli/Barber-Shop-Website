/**
 * SMASH Barbershop — single source of truth for business information.
 *
 * Every component (header, footer, booking form, calendar event, terms page)
 * reads its contact details, trading hours and social links from this file so
 * the shop's details can never drift out of sync between pages.
 */

const addressQuery = '6 Browning Road, Salt River, Cape Town, 7925, South Africa'

export const shop = {
  name: 'SMASH Barbershop',
  wordmark: 'SMASH',
  tagline: 'Sharp cuts. Clean lines. No shortcuts.',
  established: 2026,
  /** Shop's area, written the same way everywhere it appears in copy. */
  area: 'Salt River, Cape Town',
  currencyCode: 'ZAR',
  currencySymbol: 'R',
  /** All booking times are treated as shop-local wall-clock time. */
  timeZone: 'Africa/Johannesburg',

  phone: { label: '0665176770', href: 'tel:+27665176770' },
  whatsapp: { label: 'WhatsApp the shop', href: 'https://wa.me/27665176770' },
  email: {
    label: 'mazwenismash@gmail.com',
    href: 'mailto:mazwenismash@gmail.com?subject=Booking%20enquiry',
  },

  address: {
    line1: '6 Browning Road',
    suburb: 'Salt River',
    city: 'Cape Town',
    postalCode: '7925',
    country: 'South Africa',
  },

  maps: {
    /**
     * Real Google Maps embed, pinned on the address above.
     * This uses Google's keyless `output=embed` form, so no API key or billing
     * account is needed. To move to Google's official Embed API later, paste
     * the `src` from Google Maps → Share → Embed a map (a `maps/embed?pb=...`
     * URL) or a `maps/embed/v1/place?key=...` URL in place of this value —
     * nothing else in the site needs to change.
     */
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressQuery)}&z=17&output=embed&hl=en`,
    /** Opens the address above in Google Maps in a new tab. */
    directionsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressQuery)}`,
  },

  socials: [
    { name: 'Facebook', handle: '@smashbarbershop', href: 'https://www.facebook.com/smashbarbershop' },
    { name: 'Instagram', handle: '@smashbarbershop', href: 'https://www.instagram.com/smashbarbershop' },
    { name: 'TikTok', handle: '@smashbarbershop', href: 'https://www.tiktok.com/@smashbarbershop' },
  ],
}

/** Full street address as a single readable block. */
export const addressLines = [
  shop.address.line1,
  shop.address.suburb,
  `${shop.address.city}, ${shop.address.postalCode}`,
  shop.address.country,
]

export const streetAddress = `${shop.address.line1}, ${shop.address.suburb}, ${shop.address.city}, ${shop.address.postalCode}, ${shop.address.country}`

/**
 * Trading hours, Monday first (the order the shop publishes them in).
 * `bookingIntervalMinutes` is the grid the time-slot picker snaps to and
 * `lastBookingBufferMinutes` keeps the final slot clear of closing time
 * once a service's own duration is added.
 */
export const openingHours = [
  { day: 'Monday', short: 'Mon', open: '08:30', close: '18:00' },
  { day: 'Tuesday', short: 'Tue', open: '08:30', close: '18:00' },
  { day: 'Wednesday', short: 'Wed', open: '08:30', close: '19:30' },
  { day: 'Thursday', short: 'Thu', open: '08:30', close: '18:00' },
  { day: 'Friday', short: 'Fri', open: '08:30', close: '19:00' },
  { day: 'Saturday', short: 'Sat', open: '08:00', close: '17:00' },
  { day: 'Sunday', short: 'Sun', open: '09:00', close: '13:00' },
]

export const bookingConfig = {
  intervalMinutes: 15,
  /** Slots closer to closing time than the booked service's duration are hidden. */
  lastBookingBufferMinutes: 0,
  maxDaysAhead: 90,
}

export const trustPoints = [
  {
    title: 'Open seven days',
    detail: 'Mon–Sat from 08:30, Sundays from 09:00. Late nights on Wednesday and Friday.',
    icon: 'clock',
  },
  {
    title: 'Walk in or book ahead',
    detail: 'Reserved chairs keep your slot; walk-ins are welcome whenever a barber is free.',
    icon: 'chair',
  },
  {
    title: 'Fresh blade, every client',
    detail: 'Single-use blades and sterilised clippers at every station, every time.',
    icon: 'shield',
  },
  {
    title: 'Prices on the board',
    detail: 'Every service, duration and price is published. No surprise add-ons at the till.',
    icon: 'tag',
  },
]