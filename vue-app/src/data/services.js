/**
 * The shop's real service menu.
 *
 * This is the only list of services in the project: the Services page renders
 * it, the booking form's service <select> is populated from it, and the
 * calendar event reads its name and duration — so prices, durations and
 * booking options can never disagree with each other.
 */

import serviceFade from '../assets/images/service-fade.jpg'
import serviceLineUp from '../assets/images/service-line-up.jpg'
import serviceBeardTrim from '../assets/images/beard-trim.jpg'
import serviceKidsCut from '../assets/images/service-kids-cut.jpg'
import serviceBraids from '../assets/images/service-braids.jpg'
import servicePatternCut from '../assets/images/service-pattern-cut.jpg'
import interiorClient from '../assets/images/shop-interior-clients.jpg'
import brushCut from '../assets/images/brush-cut.png'
import fade from '../assets/images/fade.webp'
import towelShave from '../assets/images/towel-shave.png'
import femaleHairCut from '../assets/images/Females Hair Cut.jpg'
import bold from '../assets/images/bold.jpg'
import undercut from '../assets/images/Haircut.png'

export const serviceCategories = [
  { id: 'haircuts', name: 'Haircuts & Fades', blurb: 'Clipper work, scissor work and line-ups finished to the millimetre.' },
  { id: 'beards', name: 'Beards & Shaves', blurb: 'Trims, hot towel shaves and razor detailing on the neck and cheeks.' },
  { id: 'extras', name: 'Grooming Extras', blurb: 'Wash, colour camouflage and quick touch-ups between cuts.' },
  { id: 'packages', name: 'Packages & Combos', blurb: 'Bundled services at a better price — the most popular way to book.' },
]

/**
 * `image` is optional: services without photography render a branded tool tile
 * instead of a photo, so the layout stays finished either way.
 */
export const services = [
  {
    slug: 'skin-fade',
    name: 'Skin Fade',
    category: 'haircuts',
    price: 70,
    duration: 45,
    image: serviceFade,
    featured: true,
    description:
      'Clipper work taken all the way down to the skin, blended into the top with no visible lines. Finished with a razor line-up on the hairline and neck.',
    includes: ['Skin-level blend', 'Razor line-up', 'Blow-dry finish'],
  },
  {
    slug: 'brush-cut',
    name: 'Brush Cut',
    category: 'haircuts',
    price: 50,
    duration: 45,
    image: brushCut,
    description:
      'A full scissor cut for longer styles: shape, weight removal and layering done by hand, then styled the way you wear it out of the shop.',
    includes: ['Consultation', 'Scissor shaping', 'Style & product finish'],
  },
  {
    slug: 'taper-fade-line-up',
    name: 'Taper Fade & Line-Up',
    category: 'haircuts',
    price: 80,
    duration: 40,
    image: serviceLineUp,
    featured: true,
    description:
      'A tight taper through the sides and back with a sharp front line-up — the quick refresh for a cut that is two or three weeks old.',
    includes: ['Taper blend', 'Front line-up', 'Neck clean-up'],
  },
  {
    slug: 'burst-fade',
    name: 'Burst Fade',
    category: 'haircuts',
    price: 80,
    duration: 50,
    image: fade,
    description:
      'The curved burst fade around the ears, blended low at the back. Our most requested shape for longer tops, curls and locs.',
    includes: ['Curved burst blend', 'Top shape-up', 'Edge detailing'],
  },
  {
    slug: 'pattern-design-lines',
    name: 'Pattern & Design Lines',
    category: 'haircuts',
    price: 75,
    duration: 50,
    image: servicePatternCut,
    description:
      'Freehand design work cut into the fade — single arcs, double lines, initials or a custom pattern sketched with you before we start.',
    includes: ['Design consultation', 'Freehand detailing', 'Sharpening pass'],
  },
  {
    slug: 'kids-cut',
    name: "Skhaftini",
    category: 'haircuts',
    price: 80,
    duration: 30,
    image: serviceKidsCut,
    featured: true,
    description:
      'Patient, unhurried cuts, curly tops, fades and school cuts. Booster seat, cartoons on the mirror and a lollipop at the end.',
    includes: ['Booster seat', 'School-ready shape', 'Lollipop finish'],
  },
  {
    slug: 'beard-trim-shape',
    name: 'Beard Trim & Shape',
    category: 'beards',
    price: 60,
    duration: 30,
    image: serviceBeardTrim,
    featured: true,
    description:
      'Your beard mapped and shaped to your jawline: cheek line, neckline and length set with clipper and razor, then oiled and balmed.',
    includes: ['Line mapping', 'Razor edging', 'Beard oil & balm'],
  },
  {
    slug: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    category: 'beards',
    price: 70,
    duration: 40,
    image: towelShave,
    description:
      'The full traditional shave: hot towels, pre-shave oil, a straight razor pass with the grain and an aftershave balm to close the pores.',
    includes: ['Hot towel prep', 'Straight razor shave', 'Cooling balm'],
  },
  {
    slug: 'line-up-edge-up',
    name: 'Female Hair Cut',
    category: 'extras',
    price: 80,
    duration: 35,
    image: femaleHairCut,
    description:
      'A quick edge-up for ladies: hairline, temples and neck cleaned with the razor between full cuts. No appointment needed if a chair is free.',
    includes: ['Hairline & temples', 'Neck clean-up', 'Quick style brush'],
  },
  {
    slug: 'bold',
    name: 'Bold (Chiskop)',
    category: 'extras',
    price: 40,
    duration: 20,
    image: bold,
    description:
      'Refreshes the scalp and hair with a conditioning rinse, scalp massage and blow-dry. A quick pick-me-up between cuts or before a night out.',
    includes: ['Scalp massage', 'Conditioning rinse', 'Blow-dry'],
  },
  {
    slug: 'undercut',
    name: 'Undercut',
    category: 'extras',
    price: 70,
    duration: 30,
    image: undercut,
    description:
      'A sharp undercut with a clean line-up and a smooth blend into the top.',
    includes: ['Shade match', 'Blend application', 'Colour-safe wash'],
  },
  {
    slug: 'braids-twists',
    name: 'Braids & Twists',
    category: 'extras',
    price: 280,
    duration: 90,
    image: serviceBraids,
    description:
      'Cornrows, two-strand twists or a braided top on a fresh fade. Booked with a fade, this is the full restyle most clients come in for.',
    includes: ['Parting & design', 'Braiding or twisting', 'Edge tidy'],
  },
  {
    slug: 'smash-combo',
    name: 'SMASH Combo — Cut + Beard + Wash',
    category: 'packages',
    price: 130,
    duration: 75,
    image: interiorClient,
    description:
      'Our signature booking: any haircut, a full beard trim and shape, plus a basin wash. Saves R60 against booking the three separately.',
    includes: ['Any haircut', 'Beard trim & shape', 'Wash & blow-dry'],
  },
]

export const featuredServices = services.filter((service) => service.featured)

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug)
}

export function getServicesByCategory(categoryId) {
  return services.filter((service) => service.category === categoryId)
}

export function formatPrice(amount, symbol = 'R') {
  return `${symbol}${amount}`
}

export function formatDuration(minutes) {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours} hr` : `${hours} hr ${rest} min`
}