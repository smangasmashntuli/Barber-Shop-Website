<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/layout/TheHeader.vue'
import TheFooter from './components/layout/TheFooter.vue'
</script>

<template>
  <a class="skip-link" href="#main-content">Skip to main content</a>
  <TheHeader />
  <main id="main-content">
    <RouterView />
  </main>
  <TheFooter />
</template>