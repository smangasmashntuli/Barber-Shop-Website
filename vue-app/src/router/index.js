import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Hash links (for example "Book Now" pointing at /contact#book) need to
    // clear the sticky header instead of hiding the heading behind it.
    if (to.hash) return { el: to.hash, top: 130, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  const title = to.meta?.title
  if (title) document.title = title
})

export default router