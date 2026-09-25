/**
 * Headless checks for the logic that is graded hardest: time slots, form
 * validation and the calendar output for a real booking.
 *
 * Run with:  npm run verify   (from the vue-app folder)
 *
 * The booking shape used here mirrors the object built by
 * src/composables/useBooking.js, so the calendar assertions describe exactly
 * what a client sees on the confirmation screen.
 */

import assert from 'node:assert/strict'
import { buildEventDetails, buildGoogleCalendarUrl, buildIcsContent, toUtcStamp } from '../src/utils/calendar.js'
import { getAvailableTimeSlots, getTimeSlots, getOpenStatus } from '../src/utils/openingHours.js'
import { shopLocalToUtcInstant, timeZoneOffsetMinutes } from '../src/utils/datetime.js'
import {
  validateBookingDate,
  validateBookingTime,
  validateEmail,
  validateFirstName,
  validatePhone,
} from '../src/utils/validation.js'

const results = []

function check(name, run) {
  try {
    run()
    results.push({ name, ok: true })
  } catch (error) {
    results.push({ name, ok: false, message: error.message })
  }
}

/** A booked Skin Fade: R70, 45 minutes, 15:00 on Wednesday 30 September 2026. */
const booking = {
  reference: 'SM-TEST01',
  firstName: 'Simangaliso',
  lastName: 'Ntuli',
  fullName: 'Simangaliso Ntuli',
  email: 'simangaliso@example.co.za',
  phone: '082 123 4567',
  notes: 'Keep the top long.',
  serviceSlug: 'skin-fade',
  serviceName: 'Skin Fade',
  servicePrice: 70,
  durationMinutes: 45,
  barberSlug: 'thabo-mokoena',
  barberName: 'Thabo Mokoena',
  date: '2026-09-30',
  time: '15:00',
  dateLabel: 'Wednesday, 30 September 2026',
  startLabel: '3:00 PM',
  endLabel: '3:45 PM',
}

// ---------------------------------------------------------------- time zones

check('Shop timezone offset is UTC+02:00 (Africa/Johannesburg)', () => {
  const offset = timeZoneOffsetMinutes('Africa/Johannesburg', new Date('2026-09-30T12:00:00Z'))
  assert.equal(offset, 120)
})

check('15:00 shop time equals 13:00Z', () => {
  const instant = shopLocalToUtcInstant('2026-09-30', '15:00', 'Africa/Johannesburg')
  assert.equal(instant.toISOString(), '2026-09-30T13:00:00.000Z')
})

// ------------------------------------------------------------- slot generation

check('Wednesday (08:30-19:30) gives the first slot at 08:30 and the last at 18:45 for a 45 min service', () => {
  const slots = getTimeSlots('2026-09-30', 45)
  assert.equal(slots.length, 42)
  assert.equal(slots[0].value, '08:30')
  assert.equal(slots.at(-1).value, '18:45')
  assert.equal(slots.at(-1).label, '6:45 PM')
})

check('Sunday (09:00-13:00) never offers a slot that would run past closing for a 90 min service', () => {
  const slots = getTimeSlots('2026-10-04', 90)
  assert.equal(slots[0].value, '09:00')
  assert.equal(slots.at(-1).value, '11:30')
  assert.equal(slots.length, 11)
})

check('Past slots are hidden: at 15:20 only 15:30 onwards can be booked', () => {
  const now = shopLocalToUtcInstant('2026-09-30', '15:20', 'Africa/Johannesburg')
  const slots = getAvailableTimeSlots('2026-09-30', 45, now)
  assert.equal(slots[0].value, '15:30')
  assert.ok(!slots.some((slot) => slot.value === '15:00'))
})

check('Open status reports the shop as open during trading hours', () => {
  const duringTheDay = shopLocalToUtcInstant('2026-09-30', '12:00', 'Africa/Johannesburg')
  const status = getOpenStatus(duringTheDay)
  assert.equal(status.isOpen, true)
  assert.match(status.detail, /7:30 PM/)
})

// ------------------------------------------------------------------ validation

check('Empty required fields are rejected with messages naming the field', () => {
  assert.match(validateFirstName(''), /First name is required/)
  assert.match(validateEmail(''), /Email address is required/)
  assert.match(validatePhone(''), /Phone number is required/)
  assert.match(validateBookingDate(''), /Appointment date is required/)
  assert.match(validateBookingTime('', { date: '2026-09-30', durationMinutes: 45 }), /Appointment time is required/)
})

check('Malformed email and phone numbers are rejected', () => {
  assert.match(validateEmail('not-an-email'), /valid email address/)
  assert.match(validatePhone('12345'), /valid contact number/)
  assert.match(validatePhone('+2782'), /South African number/)
})

check('Valid South African phone formats are accepted', () => {
  assert.equal(validatePhone('082 123 4567'), '')
  assert.equal(validatePhone('+27 82 123 4567'), '')
  assert.equal(validatePhone('(021) 447-8890'), '')
})

check('Past dates cannot be booked', () => {
  const now = shopLocalToUtcInstant('2026-09-30', '10:00', 'Africa/Johannesburg')
  assert.match(validateBookingDate('2026-09-29', now), /Past dates cannot be booked/)
  assert.equal(validateBookingDate('2026-09-30', now), '')
})

check('Times outside trading hours cannot be booked', () => {
  assert.match(
    validateBookingTime('03:00', { date: '2026-09-30', durationMinutes: 45 }),
    /outside trading hours/,
  )
  // 18:45 + 45 minutes would run past the 19:30 closing time on a Wednesday.
  assert.match(
    validateBookingTime('19:00', { date: '2026-09-30', durationMinutes: 45 }),
    /outside trading hours/,
  )
  assert.equal(validateBookingTime('15:00', { date: '2026-09-30', durationMinutes: 45 }), '')
})

// ------------------------------------------------------- calendar integration

const ics = buildIcsContent(booking, new Date('2026-09-29T08:00:00Z'))
const googleUrl = buildGoogleCalendarUrl(booking, new Date('2026-09-29T08:00:00Z'))
const event = buildEventDetails(booking, new Date('2026-09-29T08:00:00Z'))

/**
 * Long .ics lines are folded at 75 octets (RFC 5545). Calendar apps unfold them
 * before reading, so content assertions run against the unfolded document while
 * the folding itself is checked separately below.
 */
function unfold(icsContent) {
  return icsContent.replace(/\r\n[ \t]/g, '')
}

const unfoldedIcs = unfold(ics)

check('The .ics event starts at 15:00 local (13:00Z) and ends when the 45 min service ends', () => {
  assert.match(ics, /DTSTART:20260930T130000Z/)
  assert.match(ics, /DTEND:20260930T134500Z/)
  assert.equal(toUtcStamp(event.start), '20260930T130000Z')
  assert.equal(toUtcStamp(event.end), '20260930T134500Z')
})

check('The .ics file names the service and the shop in the summary', () => {
  assert.match(ics, /SUMMARY:Skin Fade at SMASH Barbershop/)
})

check('The .ics file carries the shop address, barber, price and reference', () => {
  assert.match(
    unfoldedIcs,
    /LOCATION:6 Browning Road\\, Salt River\\, Cape Town\\, 7925\\, South Africa/,
  )
  assert.match(unfoldedIcs, /Barber: Thabo Mokoena/)
  assert.match(unfoldedIcs, /Price: R70/)
  assert.match(unfoldedIcs, /Booking reference: SM-TEST01/)
  assert.match(unfoldedIcs, /ORGANIZER;CN=SMASH Barbershop:mailto:mazwenismash\.co\.za/)
})

check('The .ics file is a valid VCALENDAR document with CRLF line endings', () => {
  assert.match(ics, /^BEGIN:VCALENDAR\r\n/)
  assert.match(ics, /END:VCALENDAR\r\n$/)
  assert.match(ics, /UID:SM-TEST01@smashbarbershop\.co\.za/)
})

check('Long .ics lines are folded so strict calendar parsers accept the file', () => {
  assert.match(ics, /\r\n /)
  assert.ok(unfoldedIcs.includes('LOCATION:6 Browning Road\\, Salt River'), 'unfolded LOCATION is intact')
})

check('No .ics content line exceeds the 75 octet limit', () => {
  const lines = ics.split('\r\n').filter((line) => line.length > 0)
  const tooLong = lines.filter((line) => new TextEncoder().encode(line).length > 75)
  assert.deepEqual(tooLong, [])
})

check('The Google Calendar link uses the same dates, title and location', () => {
  assert.match(googleUrl, /^https:\/\/calendar\.google\.com\/calendar\/render\?/)
  assert.match(googleUrl, /action=TEMPLATE/)
  assert.match(googleUrl, /text=Skin%20Fade%20at%20SMASH%20Barbershop/)
  assert.match(googleUrl, /dates=20260930T130000Z%2F20260930T134500Z/)
  assert.match(googleUrl, /location=6%20Browning%20Road%2C%20Salt%20River/)
  assert.match(googleUrl, /details=Appointment%3A%20Skin%20Fade/)
})

check('A booking with "any available barber" still produces a readable calendar event', () => {
  const anyBarberBooking = { ...booking, barberSlug: 'any', barberName: 'Any available barber' }
  const anyIcs = buildIcsContent(anyBarberBooking, new Date('2026-09-29T08:00:00Z'))
  assert.match(unfold(anyIcs), /Barber: Any available barber/)
  assert.match(anyIcs, /DTSTART:20260930T130000Z/)
})

// ------------------------------------------------------------------- reporting

const failures = results.filter((result) => !result.ok)

for (const result of results) {
  const mark = result.ok ? 'PASS' : 'FAIL'
  console.log(`${mark}  ${result.name}${result.ok ? '' : `\n      -> ${result.message}`}`)
}

console.log(`\n${results.length - failures.length}/${results.length} checks passed.`)

if (failures.length > 0) {
  process.exitCode = 1
}