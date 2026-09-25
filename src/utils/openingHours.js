/**
 * Trading hours, bookable time slots and live "open now" status.
 *
 * The booking form never lets a client pick a time the shop is not open, and
 * the header/footer status strip is calculated from the same source, so the
 * shop cannot advertise one set of hours and accept bookings outside them.
 */

import { bookingConfig, openingHours, shop } from '../data/site.js'
import {
  addDaysToIsoDate,
  currentMinutesInTimeZone,
  dayIndexFromIsoDate,
  formatTimeLabel,
  isValidIsoDate,
  minutesToTime,
  parseTimeToMinutes,
  shopLocalToUtcInstant,
  todayIsoInTimeZone,
} from './datetime.js'

function format24HourLabel(value) {
  return /^\d{2}:\d{2}$/.test(String(value)) ? String(value) : ''
}

/** Trading hours keyed by JS day index (0 = Sunday). */
const hoursByDayIndex = openingHours.reduce((map, entry, index) => {
  const dayIndex = (index + 1) % 7
  map[dayIndex] = { ...entry, dayIndex }
  return map
}, {})

/** Monday-first list used by the footer and contact page tables. */
export const weeklyHours = openingHours

export function hoursForDayIndex(dayIndex) {
  return hoursByDayIndex[dayIndex] ?? null
}

export function hoursForIsoDate(isoDate) {
  if (!isValidIsoDate(isoDate)) return null
  return hoursForDayIndex(dayIndexFromIsoDate(isoDate))
}

export function isClosedOnIsoDate(isoDate) {
  return hoursForIsoDate(isoDate) === null
}

export function formatHoursLabel(hours) {
  if (!hours) return 'Closed'
  return `${format24HourLabel(hours.open)} – ${format24HourLabel(hours.close)}`
}

/**
 * Every slot the shop can start the given service on that date.
 * The last slot leaves enough time to finish the service before closing.
 */
export function getTimeSlots(isoDate, serviceDurationMinutes = 30) {
  const hours = hoursForIsoDate(isoDate)
  if (!hours) return []

  const openMinutes = parseTimeToMinutes(hours.open)
  const closeMinutes = parseTimeToMinutes(hours.close)
  const step = bookingConfig.intervalMinutes
  const lastStart = closeMinutes - serviceDurationMinutes - bookingConfig.lastBookingBufferMinutes

  const slots = []
  for (let start = openMinutes; start <= lastStart; start += step) {
    const value = minutesToTime(start)
    slots.push({
      value,
      label: formatTimeLabel(value),
      endLabel: formatTimeLabel(minutesToTime(start + serviceDurationMinutes)),
    })
  }
  return slots
}

export function isSlotInTradingHours(isoDate, time, serviceDurationMinutes = 30) {
  return getTimeSlots(isoDate, serviceDurationMinutes).some((slot) => slot.value === time)
}

export function isSlotInPast(isoDate, time, now = new Date()) {
  if (!isValidIsoDate(isoDate)) return true
  const instant = shopLocalToUtcInstant(isoDate, time, shop.timeZone)
  return instant.getTime() <= now.getTime()
}

/**
 * Slots a client can actually book: inside trading hours and not already gone.
 * `now` is injectable so this can be unit-tested without a clock.
 */
export function getAvailableTimeSlots(isoDate, serviceDurationMinutes = 30, now = new Date()) {
  return getTimeSlots(isoDate, serviceDurationMinutes).filter(
    (slot) => !isSlotInPast(isoDate, slot.value, now),
  )
}

/** Today's date in shop-local time, as "YYYY-MM-DD". */
export function shopToday(now = new Date()) {
  return todayIsoInTimeZone(shop.timeZone, now)
}

/** Latest date a client may book, as "YYYY-MM-DD". */
export function latestBookableDate(now = new Date()) {
  return addDaysToIsoDate(shopToday(now), bookingConfig.maxDaysAhead)
}

/**
 * Live shop status for the header strip and contact page.
 * Returns { isOpen, headline, detail }.
 */
export function getOpenStatus(now = new Date()) {
  const today = shopToday(now)
  const minutesNow = currentMinutesInTimeZone(shop.timeZone, now)
  const hours = hoursForIsoDate(today)

  if (!hours) {
    const nextOpen = findNextOpenDay(today, 1)
    return {
      isOpen: false,
      headline: 'Closed today',
      detail: nextOpen ? `Opens ${nextOpen.dayLabel} at ${format24HourLabel(nextOpen.hours.open)}` : 'Closed',
    }
  }

  const openMinutes = parseTimeToMinutes(hours.open)
  const closeMinutes = parseTimeToMinutes(hours.close)

  if (minutesNow < openMinutes) {
    return {
      isOpen: false,
      headline: 'Closed right now',
      detail: `Opens today at ${format24HourLabel(hours.open)}`,
    }
  }

  if (minutesNow >= closeMinutes) {
    const nextOpen = findNextOpenDay(today, 1)
    return {
      isOpen: false,
      headline: 'Closed for today',
      detail: nextOpen ? `Opens ${nextOpen.dayLabel} at ${format24HourLabel(nextOpen.hours.open)}` : 'Closed',
    }
  }

  return {
    isOpen: true,
    headline: 'Open now',
    detail: `Closing at ${format24HourLabel(hours.close)}`,
  }
}

function findNextOpenDay(fromIsoDate, startOffset) {
  for (let offset = startOffset; offset <= startOffset + 6; offset += 1) {
    const isoDate = addDaysToIsoDate(fromIsoDate, offset)
    const hours = hoursForIsoDate(isoDate)
    if (hours) {
      const dayLabel =
        offset === 1
          ? 'tomorrow'
          : new Intl.DateTimeFormat('en-ZA', { weekday: 'long', timeZone: 'UTC' }).format(
              new Date(`${isoDate}T12:00:00Z`),
            )
      return { isoDate, hours, dayLabel }
    }
  }
  return null
}