<script setup>
/**
 * Small inline icon set (no icon dependency, no network request).
 * Icons inherit the surrounding text colour through `currentColor`.
 */
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
})

const icons = {
  clock: '<circle cx="12" cy="12" r="8.5" /><path d="M12 7.2v5l3.2 1.9" />',
  chair:
    '<path d="M5 20v-5.5a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3V20" /><path d="M5 17.2h14" /><path d="M9 11.5V6.4A2.4 2.4 0 0 1 11.4 4h1.2A2.4 2.4 0 0 1 15 6.4v5.1" />',
  shield: '<path d="M12 3.2l7 2.9v5.4c0 4.3-2.9 7.7-7 9.3-4.1-1.6-7-5-7-9.3V6.1z" /><path d="M8.9 12.1l2.2 2.2 4-4.3" />',
  tag:
    '<path d="M20.4 13.4l-7 7a2 2 0 0 1-2.8 0L4.1 13.9V4.2h9.7l6.6 6.5a2 2 0 0 1 0 2.7z" /><circle cx="8.7" cy="8.8" r="1.4" />',
  phone:
    '<path d="M6.8 3.2h2.6l1.5 3.9-1.9 1.3a12.4 12.4 0 0 0 5.3 5.3l1.3-1.9 3.9 1.5v2.6a2 2 0 0 1-2.2 2A16.6 16.6 0 0 1 4.8 5.4a2 2 0 0 1 2-2.2z" />',
  mail: '<rect x="3.2" y="5" width="17.6" height="14" rx="2.4" /><path d="M4 7.2l8 5.6 8-5.6" />',
  pin:
    '<path d="M12 21s6.8-5.7 6.8-10.9A6.8 6.8 0 1 0 5.2 10.1C5.2 15.3 12 21 12 21z" /><circle cx="12" cy="10" r="2.6" />',
  calendar:
    '<rect x="3.5" y="5" width="17" height="15.5" rx="2.4" /><path d="M3.5 10h17" /><path d="M8 3.4v3.2M16 3.4v3.2" />',
  download: '<path d="M12 3.8v11.4" /><path d="M7.9 11.4L12 15.5l4.1-4.1" /><path d="M5 19.6h14" />',
  check: '<path d="M5.2 12.6l4.4 4.4L18.8 7" />',
  scissors:
    '<path d="M7.4 4.2l9.3 11.2" /><path d="M16.6 4.2L7.3 15.4" /><circle cx="6.6" cy="18" r="2.4" /><circle cx="17.4" cy="18" r="2.4" />',
  razor: '<rect x="7.2" y="3.6" width="9.6" height="5.4" rx="1.2" /><path d="M9.4 9v3.2h5.2V9" /><path d="M10.2 12.2v8h3.6v-8" />',
  droplet: '<path d="M12 3.6c3.3 3.4 6 6.6 6 9.9a6 6 0 0 1-12 0c0-3.3 2.7-6.5 6-9.9z" />',
  brush:
    '<path d="M7.6 4.6h8.8v4.2a4.4 4.4 0 0 1-8.8 0z" /><path d="M12 13.2V20" /><path d="M9.2 20h5.6" />',
  crown: '<path d="M4.6 17.4h14.8L18.2 8l-4.1 3.9L12 5.6 9.9 11.9 5.8 8z" /><path d="M5.6 20.4h12.8" />',
  sparkle: '<path d="M12 3.4l1.9 5.4 5.4 1.9-5.4 1.9L12 18l-1.9-5.4-5.4-1.9 5.4-1.9z" />',
  close: '<path d="M6.2 6.2l11.6 11.6M17.8 6.2L6.2 17.8" />',
  menu: '<path d="M4 7h16M4 12h16M4 17h16" />',
  external: '<path d="M14 5h5v5" /><path d="M19 5l-7.4 7.4" /><path d="M18 14.4V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.6" />',
  arrow: '<path d="M5 12h13" /><path d="M13.2 7l5 5-5 5" />',
}

const markup = computed(() => icons[props.name] ?? '')
</script>

<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
    v-html="markup"
  />
</template>

<style scoped>
.app-icon {
  flex: 0 0 auto;
}
</style>