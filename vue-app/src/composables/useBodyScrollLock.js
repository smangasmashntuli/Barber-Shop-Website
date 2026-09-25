/**
 * Locks page scrolling behind an open modal or the mobile nav, and always
 * restores the previous overflow value when the overlay closes or the
 * component unmounts — so a dismissed modal can never freeze the page.
 */

import { onBeforeUnmount, watch } from 'vue'

export function useBodyScrollLock(isLocked) {
  let previousOverflow = ''

  function lock() {
    if (typeof document === 'undefined') return
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  function unlock() {
    if (typeof document === 'undefined') return
    document.body.style.overflow = previousOverflow
  }

  watch(
    isLocked,
    (locked) => {
      if (locked) lock()
      else unlock()
    },
    { immediate: true },
  )

  onBeforeUnmount(unlock)
}