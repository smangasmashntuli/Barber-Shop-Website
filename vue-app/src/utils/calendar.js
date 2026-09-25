/**
 * Calendar integration for a confirmed booking.
 *
 * Both outputs — the downloadable .ics file and the Google Calendar link — are
 * built from the same real booking object that the confirmation card renders,
 * so the event can never show a different service, barber, time or location
 * from what the client actually submitted.
 */

import { addressLines, shop, streetAddress } from '../data/site.js'
import { endTimeFrom, formatLongDate, formatTimeLabel, shopLocalToUtcInstant } from './datetime.js'

const CRLF = '\r\n'
const textEncoder = new TextEncoder()

function pad(value) {
  return String(value).padStart(2, '0')
}

/** "YYYYMMDDTHHMMSSZ" — the basic UTC format both RFC 5545 and Google expect. */
export function toUtcStamp(date) {
  return (
    `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}` +
    `T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`
  )
}

/** Customer-facing label for the selected barber, including the "any" option. */
export function barberLabelFor(booking) {
  return booking.barberSlug === 'any' ? 'Any available barber' : booking.barberName
}

/**
 * The single source of truth for the calendar event, derived from the real
 * booking: correct start instant, sensible end instant (start + service
 * duration), shop name, shop address and a useful description.
 */
export function buildEventDetails(booking, now = new Date()) {
  const start = shopLocalToUtcInstant(booking.date, booking.time, shop.timeZone)
  const end = new Date(start.getTime() + booking.durationMinutes * 60000)
  const barberLabel = barberLabelFor(booking)

  const title = `${booking.serviceName} at ${shop.name}`

  const descriptionLines = [
    `Appointment: ${booking.serviceName} (${booking.durationMinutes} minutes)`,
    `Barber: ${barberLabel}`,
    `Client: ${booking.fullName}`,
    `Contact number: ${booking.phone}`,
    `Price: ${shop.currencySymbol}${booking.servicePrice}`,
    `Booking reference: ${booking.reference}`,
    '',
    `Please arrive five minutes before ${formatTimeLabel(booking.time)} so your chair is ready.`,
    `Need to move it? Call ${shop.phone.label} at least four hours before your slot.`,
    `Address: ${streetAddress}`,
  ]

  return {
    title,
    description: descriptionLines.join('\n'),
    location: streetAddress,
    locationLines: addressLines,
    organizerName: shop.name,
    organizerEmail: shop.email.label,
    start,
    end,
    startLocalLabel: formatTimeLabel(booking.time),
    endLocalLabel: formatTimeLabel(endTimeFrom(booking.time, booking.durationMinutes)),
    dateLabel: formatLongDate(booking.date),
    barberLabel,
    stamp: toUtcStamp(now),
  }
}

function escapeIcsText(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/** RFC 5545 requires content lines to be folded at 75 octets. */
function foldIcsLine(line) {
  if (textEncoder.encode(line).length <= 75) return line

  const chunks = []
  let current = ''
  let currentOctets = 0

  for (const character of line) {
    const characterOctets = textEncoder.encode(character).length
    const limit = chunks.length === 0 ? 75 : 74
    if (currentOctets + characterOctets > limit) {
      chunks.push(current)
      current = character
      currentOctets = characterOctets
    } else {
      current += character
      currentOctets += characterOctets
    }
  }

  if (current) chunks.push(current)
  return chunks.map((chunk, index) => (index === 0 ? chunk : ` ${chunk}`)).join(CRLF)
}

/**
 * Build the full .ics document for a booking.
 * Returned as text so it can be unit-tested without touching the DOM.
 */
export function buildIcsContent(booking, now = new Date()) {
  const event = buildEventDetails(booking, now)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${shop.name}//Appointment booking//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(booking.reference)}@smashbarbershop.co.za`,
    `DTSTAMP:${event.stamp}`,
    `DTSTART:${toUtcStamp(event.start)}`,
    `DTEND:${toUtcStamp(event.end)}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `ORGANIZER;CN=${escapeIcsText(event.organizerName)}:mailto:${event.organizerEmail}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${escapeIcsText(`${booking.serviceName} at ${shop.name}`)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  return `${lines.map(foldIcsLine).join(CRLF)}${CRLF}`
}

/** Google Calendar "add event" URL, using the same real booking data. */
export function buildGoogleCalendarUrl(booking, now = new Date()) {
  const event = buildEventDetails(booking, now)
  const parameters = [
    ['action', 'TEMPLATE'],
    ['text', event.title],
    ['dates', `${toUtcStamp(event.start)}/${toUtcStamp(event.end)}`],
    ['details', event.description],
    ['location', event.location],
    ['trp', 'false'],
  ]
  const query = parameters
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&')
  return `https://calendar.google.com/calendar/render?${query}`
}

/** Suggested download filename, e.g. "smash-skin-fade-2026-09-30.ics". */
export function icsFileName(booking) {
  const slug = String(booking.serviceName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  return `smash-${slug}-${booking.date}.ics`
}

/**
 * Trigger the .ics download in the browser (Blob + object URL, no backend).
 * Returns the file contents so callers/tests can inspect exactly what was
 * downloaded.
 */
export function downloadAppointmentIcs(booking, now = new Date()) {
  const ics = buildIcsContent(booking, now)

  if (typeof document === 'undefined') return ics

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = objectUrl
  link.download = icsFileName(booking)
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2000)

  return ics
}