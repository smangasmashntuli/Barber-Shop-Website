/**
 * Timezone-safe date and time helpers.
 *
 * The shop trades on wall-clock time in Africa/Johannesburg, but a client
 * booking from any timezone must get the correct UTC instant in their calendar
 * file. Everything about converting between "the date and time shown on the
 * booking form" and "the exact moment a calendar app needs" lives here so the
 * booking form, the confirmation card, the .ics file and the Google Calendar
 * link can never disagree.
 */

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const TIME_PATTERN = /^\d{2}:\d{2}$/

export function parseTimeToMinutes(value) {
  const [hours, minutes] = String(value).split(':').map(Number)
  return hours * 60 + minutes
}

export function minutesToTime(totalMinutes) {
  const wrapped = ((totalMinutes % 1440) + 1440) % 1440
  const hours = Math.floor(wrapped / 60)
  const minutes = wrapped % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/** "15:00" -> "3:00 PM" */
export function formatTimeLabel(value) {
  if (!TIME_PATTERN.test(String(value))) return ''
  const total = parseTimeToMinutes(value)
  const hours = Math.floor(total / 60)
  const minutes = total % 60
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 === 0 ? 12 : hours % 12
  return `${displayHour}:${String(minutes).padStart(2, '0')} ${suffix}`
}

/** "15:00" + 90 -> "15:00 – 16:30" style label for the summary card. */
export function formatTimeRangeLabel(startTime, durationMinutes) {
  const end = minutesToTime(parseTimeToMinutes(startTime) + durationMinutes)
  return `${formatTimeLabel(startTime)} – ${formatTimeLabel(end)}`
}

export function endTimeFrom(startTime, durationMinutes) {
  return minutesToTime(parseTimeToMinutes(startTime) + durationMinutes)
}

function partsInTimeZone(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hourCycle: 'h23',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return formatter.formatToParts(date).reduce((parts, part) => {
    if (part.type !== 'literal') parts[part.type] = part.value
    return parts
  }, {})
}

/** Today's date in the shop's timezone, as "YYYY-MM-DD". */
export function todayIsoInTimeZone(timeZone, now = new Date()) {
  const parts = partsInTimeZone(now, timeZone)
  return `${parts.year}-${parts.month}-${parts.day}`
}

/** Minutes since midnight right now, in the shop's timezone. */
export function currentMinutesInTimeZone(timeZone, now = new Date()) {
  const parts = partsInTimeZone(now, timeZone)
  return Number(parts.hour) * 60 + Number(parts.minute)
}

export function isValidIsoDate(value) {
  if (!ISO_DATE_PATTERN.test(String(value))) return false
  const [year, month, day] = String(value).split('-').map(Number)
  const probe = new Date(Date.UTC(year, month - 1, day))
  return (
    probe.getUTCFullYear() === year && probe.getUTCMonth() === month - 1 && probe.getUTCDate() === day
  )
}

/** Day of week (0 = Sunday) for a "YYYY-MM-DD" string, independent of the device timezone. */
export function dayIndexFromIsoDate(isoDate) {
  return new Date(`${isoDate}T12:00:00Z`).getUTCDay()
}

export function addDaysToIsoDate(isoDate, days) {
  const [year, month, day] = String(isoDate).split('-').map(Number)
  const probe = new Date(Date.UTC(year, month - 1, day))
  probe.setUTCDate(probe.getUTCDate() + days)
  return `${probe.getUTCFullYear()}-${String(probe.getUTCMonth() + 1).padStart(2, '0')}-${String(
    probe.getUTCDate(),
  ).padStart(2, '0')}`
}

export function formatLongDate(isoDate) {
  if (!isValidIsoDate(isoDate)) return ''
  return new Intl.DateTimeFormat('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T12:00:00Z`))
}

export function formatShortDate(isoDate) {
  if (!isValidIsoDate(isoDate)) return ''
  return new Intl.DateTimeFormat('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  }).format(new Date(`${isoDate}T12:00:00Z`))
}

export function weekdayNameForIsoDate(isoDate) {
  if (!isValidIsoDate(isoDate)) return ''
  return new Intl.DateTimeFormat('en-ZA', { weekday: 'long', timeZone: 'UTC' }).format(
    new Date(`${isoDate}T12:00:00Z`),
  )
}

/**
 * Offset (in minutes) that `timeZone` is ahead of UTC at the given instant,
 * e.g. +120 for Africa/Johannesburg.
 */
export function timeZoneOffsetMinutes(timeZone, date) {
  const label = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(date)
    .find((part) => part.type === 'timeZoneName')?.value
  const match = /GMT([+-])(\d{2}):?(\d{2})?/.exec(label || '')
  if (!match) return 0
  const sign = match[1] === '-' ? -1 : 1
  const hours = Number(match[2] || 0)
  const minutes = Number(match[3] || 0)
  return sign * (hours * 60 + minutes)
}

/**
 * Turn a shop-local date + time into the real UTC instant.
 * Two passes so the result stays correct across a DST change.
 */
export function shopLocalToUtcInstant(isoDate, time, timeZone) {
  const [year, month, day] = String(isoDate).split('-').map(Number)
  const [hours, minutes] = String(time).split(':').map(Number)
  const wallClockGuess = Date.UTC(year, month - 1, day, hours, minutes, 0, 0)
  const firstOffset = timeZoneOffsetMinutes(timeZone, new Date(wallClockGuess))
  let instant = wallClockGuess - firstOffset * 60000
  const secondOffset = timeZoneOffsetMinutes(timeZone, new Date(instant))
  if (secondOffset !== firstOffset) instant = wallClockGuess - secondOffset * 60000
  return new Date(instant)
}

export function isDateBefore(isoDate, otherIsoDate) {
  return String(isoDate) < String(otherIsoDate)
}

export function isDateAfter(isoDate, otherIsoDate) {
  return String(isoDate) > String(otherIsoDate)
}