/**
 * Live "open now / closed" status for the header strip and contact page.
 *
 * The status is recalculated every minute so a page left open across opening or
 * closing time updates itself instead of showing a stale answer.
 */
import { computed, getCurrentInstance, onBeforeUnmount, ref } from 'vue'
import { getOpenStatus } from '../utils/openingHours.js'

export function useShopStatus(intervalMs = 60000) {
  const now = ref(new Date())

  // Guarded so the same composable is safe when the app is rendered outside a
  // browser (the route smoke test renders every page through Vite's SSR build).
  const timer =
    typeof window === 'undefined'
      ? null
      : window.setInterval(() => {
          now.value = new Date()
        }, intervalMs)

  if (timer && getCurrentInstance()) {
    onBeforeUnmount(() => window.clearInterval(timer))
  }

  return computed(() => getOpenStatus(now.value))
}