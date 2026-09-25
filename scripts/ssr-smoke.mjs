/**
 * Route smoke test.
 *
 * Renders every route (plus a submitted booking state) through Vue's server
 * renderer so template errors, broken composable wiring and stray "undefined"
 * values fail in CI instead of in the browser. Run with:  npm run smoke
 *
 * Vite compiles this entry (SFCs, images, CSS) before Node runs it, so the test
 * sees exactly the same components the deployed site ships.
 */

import assert from 'node:assert/strict'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import App from '../src/App.vue'
import { routes } from '../src/router/routes.js'
import { useBooking } from '../src/composables/useBooking.js'
import { addDaysToIsoDate, dayIndexFromIsoDate } from '../src/utils/datetime.js'
import { shopToday } from '../src/utils/openingHours.js'

const results = []

async function renderRoute(path) {
  const app = createSSRApp(App)
  const router = createRouter({ history: createMemoryHistory(), routes })
  app.use(router)
  await router.push(path)
  await router.isReady()
  return renderToString(app)
}

async function check(name, run) {
  try {
    await run()
    results.push({ name, ok: true })
  } catch (error) {
    results.push({ name, ok: false, message: error.message })
  }
}

/** Renders a route and returns its HTML, asserting the shell rendered too. */
async function page(path) {
  const html = await renderRoute(path)
  assert.ok(html.includes('site-header'), `${path} should render the header`)
  assert.ok(html.includes('site-footer'), `${path} should render the footer`)
  assert.ok(html.includes('Book Now'), `${path} should render the header booking CTA`)
  assert.ok(!html.includes('undefined'), `${path} should not print "undefined"`)
  assert.ok(!html.includes('[object Object]'), `${path} should not print an unwrapped object`)
  return html
}

/** The next date (at least two days out) that falls on the given weekday. */
function nextWeekday(dayIndex) {
  const today = shopToday()
  for (let offset = 2; offset <= 9; offset += 1) {
    const iso = addDaysToIsoDate(today, offset)
    if (dayIndexFromIsoDate(iso) === dayIndex) return iso
  }
  throw new Error('No matching weekday found in the next nine days')
}

await check('Home renders the hero, price teasers and barber team', async () => {
  const html = await page('/')
  assert.ok(html.includes('Sharp cuts. Clean lines. No shortcuts.'))
  assert.ok(html.includes('Book your chair'))
  assert.ok(html.includes('View all 14 services'))
  assert.ok(html.includes('Four barbers, four specialities'))
})

await check('Services renders every category, price and duration', async () => {
  const html = await page('/services')
  assert.ok(html.includes('Skin Fade'))
  assert.ok(html.includes('SMASH Combo'))
  assert.ok(html.includes('Groom&#39;s Package') || html.includes("Groom's Package"))
  assert.ok(html.includes('R330'))
  assert.ok(html.includes('All services (14)'))
})

await check('About renders the story, milestones and all four barber bios', async () => {
  const html = await page('/about')
  assert.ok(html.includes('How SMASH started'))
  assert.ok(html.includes('Thabo Mokoena'))
  assert.ok(html.includes('Sipho Dlamini'))
  assert.ok(html.includes('Tebogo Mahlangu'))
  assert.ok(html.includes('Kagiso Molefe'))
  assert.ok(html.includes('2026'))
})

await check('Contact renders the empty booking form with every required field', async () => {
  const html = await page('/contact')
  for (const field of [
    'booking-firstName',
    'booking-lastName',
    'booking-email',
    'booking-phone',
    'booking-serviceSlug',
    'booking-barberSlug',
    'booking-date',
    'booking-notes',
  ]) {
    assert.ok(html.includes(`id="${field}"`), `missing field ${field}`)
  }
  assert.ok(html.includes('Any available barber'))
  assert.ok(html.includes('Opening hours'))
  assert.ok(html.includes('Browning Road'))
})

await check('Terms and privacy pages render their full legal content', async () => {
  const terms = await page('/terms')
  assert.ok(terms.includes('Cancellations and moving a booking'))
  assert.ok(terms.includes('Right to refuse or stop a service'))
  assert.ok(terms.includes('Governing law'))

  const privacy = await page('/privacy')
  assert.ok(privacy.includes('POPIA'))
  assert.ok(privacy.includes('Cookies and local storage'))
})

await check('An unknown URL renders the 404 page inside the normal shell', async () => {
  const html = await page('/this-page-does-not-exist')
  assert.ok(html.includes('That page has been cut'))
})

// A real submission, exactly as the form performs it, then the confirmation.
await check('A submitted booking renders its confirmation with calendar actions', async () => {
  const booking = useBooking()
  const date = nextWeekday(3) // Wednesday: 08:30-19:30, so 15:00 is a valid slot.

  booking.setService('skin-fade')
  booking.setBarber('thabo-mokoena')
  booking.setDate(date)
  booking.setTime('15:00')
  booking.setField('firstName', 'Simangaliso')
  booking.setField('lastName', 'Ntuli')
  booking.setField('email', 'simangaliso@example.co.za')
  booking.setField('phone', '082 123 4567')
  booking.setField('notes', 'Keep the top long.')

  const result = booking.submitBooking()
  assert.equal(result.ok, true, 'the completed form should submit')
  assert.equal(result.booking.serviceName, 'Skin Fade')
  assert.equal(result.booking.barberName, 'Thabo Mokoena')
  assert.equal(result.booking.startLabel, '3:00 PM')

  const html = await page('/contact')
  assert.ok(html.includes('Booking confirmed'))
  assert.ok(html.includes(result.booking.reference), 'the confirmation shows the real reference')
  assert.ok(html.includes('Skin Fade'))
  assert.ok(html.includes('Thabo Mokoena'))
  assert.ok(html.includes('3:00 PM'))
  assert.ok(html.includes('Download .ics file'))
  assert.ok(html.includes('calendar.google.com/calendar/render'), 'a Google Calendar link is present')
  assert.ok(html.includes('Simangaliso Ntuli'), 'the confirmation names the client')
})

await check('Submitting an empty form is blocked and returns inline errors', async () => {
  useBooking().startNewBooking()
  const empty = useBooking().submitBooking()
  assert.equal(empty.ok, false)

  // "Any available barber" is a valid default, so the barber field is the one
  // selection that never blocks a submit.
  const errorFields = Object.keys(useBooking().errors).sort()
  assert.deepEqual(errorFields, [
    'date',
    'email',
    'firstName',
    'lastName',
    'phone',
    'serviceSlug',
    'time',
  ])

  const html = await page('/contact')
  assert.ok(html.includes('First name is required'))
  assert.ok(html.includes('Email address is required'))
  assert.ok(html.includes('Appointment time is required'))
  assert.ok(html.includes('fields need your attention'))
})

await check('Choosing a service and date renders the real slot grid and summary', async () => {
  const store = useBooking()
  store.startNewBooking()
  store.setService('smash-combo') // 75 minutes
  store.setDate(nextWeekday(3)) // Wednesday: 08:30-19:30

  const html = await page('/contact')
  assert.ok(html.includes('class="slot'), 'time-slot buttons render')
  assert.ok(html.includes('8:30 AM'), 'first Wednesday slot')
  assert.ok(html.includes('6:15 PM'), 'last slot that still finishes before 19:30')
  assert.ok(html.includes('Your appointment'), 'summary panel renders')
  assert.ok(html.includes('SMASH Combo'), 'summary names the chosen service')
  assert.ok(html.includes('R330'), 'summary shows the real price')
  assert.ok(html.includes('Not selected yet'), 'time still unselected')
})

await check('Changing to a longer service clears a time that no longer fits', async () => {
  const store = useBooking()
  store.startNewBooking()
  store.setService('smash-combo')
  store.setDate(nextWeekday(3))
  store.setTime('18:15')
  assert.equal(store.form.time, '18:15')

  store.setService('grooms-package') // 90 minutes: 18:15 would run past closing
  assert.equal(store.form.time, '', 'the too-late slot is cleared, not silently kept')
})

await check('Service and barber links from other pages pre-select the booking form', async () => {
  const store = useBooking()
  store.startNewBooking()
  store.applyPresets({ service: 'kids-cut', barber: 'kagiso-molefe' })
  assert.equal(store.form.serviceSlug, 'kids-cut')
  assert.equal(store.form.barberSlug, 'kagiso-molefe')

  const html = await page('/contact?service=kids-cut&barber=kagiso-molefe')
  assert.ok(html.includes('Kagiso Molefe'), 'the pre-selected barber is shown in the summary')
  assert.ok(html.includes('R120'), "the kids' cut price is shown")
})

const failures = results.filter((result) => !result.ok)

for (const result of results) {
  const mark = result.ok ? 'PASS' : 'FAIL'
  console.log(`${mark}  ${result.name}${result.ok ? '' : `\n      -> ${result.message}`}`)
}

console.log(`\n${results.length - failures.length}/${results.length} route checks passed.`)

if (failures.length > 0) {
  process.exitCode = 1
}