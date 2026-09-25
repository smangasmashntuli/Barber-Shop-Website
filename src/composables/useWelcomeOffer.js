import { computed, ref } from 'vue'

const VISITOR_KEY = 'smash-visitor-token'
const USED_KEY = 'smash-first-haircut-discount-used'
export const FIRST_HAIRCUT_DISCOUNT_PERCENT = 30

const visitorToken = ref('')
const discountUsed = ref(false)

function createVisitorToken() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `smash-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

export function initializeWelcomeOffer() {
  if (typeof window === 'undefined') return

  visitorToken.value = localStorage.getItem(VISITOR_KEY) || createVisitorToken()
  localStorage.setItem(VISITOR_KEY, visitorToken.value)
  discountUsed.value = localStorage.getItem(USED_KEY) === 'true'
}

export function useWelcomeOffer() {
  const isEligible = computed(() => Boolean(visitorToken.value) && !discountUsed.value)

  function markDiscountUsed() {
    if (typeof window === 'undefined') return
    discountUsed.value = true
    localStorage.setItem(USED_KEY, 'true')
  }

  return {
    visitorToken,
    discountUsed,
    isEligible,
    markDiscountUsed,
  }
}

export function isDiscountEligibleForService(service) {
  return service?.category === 'haircuts'
}

export function discountedPrice(price) {
  return Math.round(price * (1 - FIRST_HAIRCUT_DISCOUNT_PERCENT / 100))
}
