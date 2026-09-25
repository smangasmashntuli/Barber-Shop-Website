# SMASH Barbershop — Vue 3 website

A production-quality, client-ready barbershop website built for the Talent Forge junior full-stack
practical assessment: four core pages, a working end-to-end booking flow, and calendar integration that
generates real `.ics` files and Google Calendar links from the booking the client actually made.

```
Barber-Shop-Website/
├─ barbershop-vuejs-build-prompt.md     # the brief this build follows
├─ vue-app/                             # the application (Vue 3 + Vite + Vue Router)
│  ├─ BRAND.md                          # internal brand/style reference (colours, type, logo rules)
│  ├─ netlify.toml                      # SPA-ready static host config
│  └─ src/
├─ .github/workflows/deploy-pages.yml   # optional GitHub Pages deployment
└─ README.md
```

## Quick start

```bash
cd vue-app
npm install
npm run dev        # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with hot reload |
| `npm run build` | Production build into `vue-app/dist` |
| `npm run preview` | Serves the production build locally |
| `npm run verify` | 19 headless checks: time-slot rules, validation, timezone conversion and the `.ics` / Google Calendar output for a 3:00 PM booking |
| `npm run smoke` | 11 route checks through Vue's server renderer: every page, the empty form, the live slot grid, a service switch, deep-linked pre-selection and a submitted booking |

## Pages

| Route | Contents |
| --- | --- |
| `/` | Full-bleed shop hero with the primary booking CTA, live open/closed status, real price teasers, quick-info strip, "why SMASH" differentiators, barber team teaser, gallery, closing CTA and the first-visit offer popup |
| `/services` | All 13 services with real prices (ZAR) and chair times, filterable by category, each card deep-linking into the booking form with that service pre-selected |
| `/about` | Shop story of a brand-new 2026 shop, first-year timeline, four barber profiles with photos, bios and specialities (each linking to a booking with that barber pre-selected), values and gallery |
| `/contact` | Full booking flow, business details, seven-day opening hours with today highlighted, social links, embedded Google map pinned on the shop's address, pre-visit guidance |
| `/terms` | 18 clauses of genuine booking, cancellation, late-arrival, refusal, pricing, hygiene, complaint and liability terms |
| `/privacy` | POPIA-aware privacy policy covering what is collected, how it is used, storage, session flags, the embedded Google map and client rights |
| `/booking` | Convenience redirect onto the booking form |
| anything else | Styled 404 page inside the normal header/footer shell |

## How the booking flow works

- **One source of truth.** `src/data/services.js` and `src/data/barbers.js` feed the Services page, the
  About page, the booking form's selects and the calendar event. A service cannot be priced on one page
  and priced differently on another.
- **Real slots only.** `src/utils/openingHours.js` builds the time grid from the shop's published hours
  (Mon–Fri from 08:30, Wed until 19:30, Fri until 19:00, Sat 08:00–17:00, Sun 09:00–13:00) at 15-minute
  intervals, and hides any slot that would finish after closing or has already passed. Changing the
  service recalculates the slots and clears a time that no longer fits.
- **Validation** (`src/utils/validation.js`) runs per field on blur and on every field at submit, with
  inline messages plus a summary alert; an incomplete submission is blocked and focus moves to the first
  problem.
- **Shared state.** `src/composables/useBooking.js` holds the form, the errors and the confirmed booking
  in a module-scoped store, so the confirmation card and the calendar buttons read the same submitted
  object — never an example booking.
- **Timezone-correct calendar output.** `src/utils/calendar.js` converts the shop-local date and time
  into a real UTC instant (`Africa/Johannesburg`, UTC+2), sets the end time to start + service duration,
  and produces both a downloadable `.ics` (Blob + object URL, RFC 5545 line folding included) and a
  `calendar.google.com/calendar/render?action=TEMPLATE` link that opens in a new tab.

Verified example (`npm run verify`): a 45-minute Skin Fade booked for 3:00 PM on a Wednesday produces
`DTSTART:20260930T130000Z` / `DTEND:20260930T134500Z`, with the shop as organiser, the shop address as
`LOCATION`, and the barber, price and booking reference in the description.

## Brand

The full style reference — hex values, type scale, logo usage rules, image slots and copy rules — is in
[`vue-app/BRAND.md`](vue-app/BRAND.md). In short: charcoal (`#0b0d10`) base, warm gold (`#c8a24a`) accent,
off-white (`#f6f1e7`) text, Cinzel for headings (matching the supplied logo wordmark) and Inter for body
copy.

## Replacing content

| What | Where |
| --- | --- |
| Shop name, phone, email, address, hours, social links | `vue-app/src/data/site.js` — one file feeds the header, footer, contact page and calendar events |
| Services, prices, durations | `vue-app/src/data/services.js` |
| Barbers, roles, bios | `vue-app/src/data/barbers.js` |
| Photography and logo | `vue-app/src/assets/images/` — keep the file names and no markup needs to change |

All supplied imagery has been placed in those slots with descriptive names (`hero-barber.jpg`,
`barber-*.jpg`, `service-*.jpg`, `shop-*.jpg`, `logo.png`, `logo-mark.png`).

## Deployment

The build is a static bundle (`vue-app/dist`), so any static host works, and SPA routing config is
already included.

- **Netlify:** `vue-app/netlify.toml` sets the build command, publish directory and SPA redirect. Run
  `npx netlify deploy --prod --dir=vue-app/dist` from the repository root, or connect the repo and let
  Netlify pick the config up.
- **Vercel:** create a project with root directory `vue-app`, build command `npm run build` and output
  directory `dist`.
- **GitHub Pages:** `.github/workflows/deploy-pages.yml` builds with the correct base path, runs
  `npm run verify`, adds a `404.html` SPA fallback and publishes. Enable Pages → Source: GitHub Actions.

`vue-app/public/_redirects` provides the same SPA fallback for Netlify-style hosts.

## Notes and limitations

- There is no backend: a confirmed booking lives in the browser session (as the brief allows — "store the
  booking in app state"). It is never sent to a server, and the privacy policy says so plainly.
- Contact details, address and social URLs are the fictional shop's published details. They all live in
  `src/data/site.js` so they can be swapped for real details in a single edit.
- Headings and body copy load Cinzel/Inter from Google Fonts, with serif and system-font fallbacks
  declared, so the site still renders correctly without a network connection.

## Verified before hand-over

- `npm run verify` — 19/19 checks: slot boundaries per weekday, hidden past slots, live open status,
  required-field/email/phone/past-date/out-of-hours validation, UTC conversion, `.ics` contents, line
  folding and the Google Calendar URL.
- `npm run smoke` — 11/11 route checks: every page renders inside the header/footer shell, the empty
  booking form shows all required fields, choosing a service and date renders the real slot grid with
  the correct first/last slot for that service's duration, switching to a longer service clears a time
  that no longer fits, `?service=` / `?barber=` links pre-select the form, a completed submission renders
  a confirmation naming the client, service, barber, date and time with working calendar actions, and an
  empty submit is blocked with inline errors.
- `npm run build` — production build completes with no errors or unresolved imports.