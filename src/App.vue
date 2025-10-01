<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainTitle from './components/MainTitle.vue'
import MainGrid from './components/MainGrid.vue'
</script>

<template>
  <header class="text-center border-b border-gray-200 pb-4">
    <MainTitle title="BATTLESHIPS!" />
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-3 pt-8 gap-8">
    <div class="border-b lg:border-b-0 lg:border-r border-gray-200 lg:pr-8 pb-8 lg:pb-0">
      <MainGrid />
    </div>
    <div class="col-span-2 px-4 lg:px-8">
      <RouterView />
    </div>
  </div>

  <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 text-xs text-center">
    <nav class="mb-1">
      <RouterLink to="/" class="inline-block px-2 border-l border-gray-200 no-underline text-gray-600 hover:text-gray-900 first:border-l-0 router-link-exact-active:text-gray-900">Home</RouterLink>
      <RouterLink to="/about" class="inline-block px-2 border-l border-gray-200 no-underline text-gray-600 hover:text-gray-900 router-link-exact-active:text-gray-900">About</RouterLink>
      <RouterLink to="/vue-info" class="inline-block px-2 border-l border-gray-200 no-underline text-gray-600 hover:text-gray-900 router-link-exact-active:text-gray-900">Vue Info</RouterLink>
    </nav>
    <p class="m-0 text-gray-600 text-xs">
      Icons by <a href="https://lucide.dev" target="_blank" rel="noopener">Lucide</a>
    </p>
  </footer>
</template>

<style scoped>
</style>
