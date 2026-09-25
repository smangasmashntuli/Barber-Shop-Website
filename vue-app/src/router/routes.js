/**
 * Route table.
 *
 * Kept separate from the router instance so it can be imported without
 * creating a browser-history router — the route smoke test builds a memory
 * history router from the same table.
 */

import HomeView from '../views/HomeView.vue'
import ServicesView from '../views/ServicesView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'
import TermsView from '../views/TermsView.vue'
import PrivacyView from '../views/PrivacyView.vue'
import NotFoundView from '../views/NotFoundView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      title: 'SMASH Barbershop | Haircuts, fades and beard grooming in Cape Town',
    },
  },
  {
    path: '/services',
    name: 'services',
    component: ServicesView,
    meta: {
      title: 'Services & prices | SMASH Barbershop',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      title: 'About the shop & our barbers | SMASH Barbershop',
    },
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
    meta: {
      title: 'Contact & booking | SMASH Barbershop',
    },
  },
  {
    // Convenience route so /booking links land on the booking form as well.
    path: '/booking',
    redirect: { name: 'contact', hash: '#book' },
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
    meta: {
      title: 'Terms & Conditions | SMASH Barbershop',
    },
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView,
    meta: {
      title: 'Privacy Policy | SMASH Barbershop',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView,
    meta: {
      title: 'Page not found | SMASH Barbershop',
    },
  },
]