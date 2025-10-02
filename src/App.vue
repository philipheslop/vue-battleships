<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainTitle from './components/MainTitle.vue'
import MainGrid from './components/MainGrid.vue'
import NavLink from './components/NavLink.vue'
</script>

<template>
  <header class="text-center border-b border-gray-200 pb-4 pt-4">
    <MainTitle title="BATTLESHIPS!" />
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-3 pt-8 gap-8">
    <div class="panel-container panel-container-sidebar">
      <MainGrid />
    </div>
    <div class="panel-container panel-container-main">
      <RouterView />
    </div>
  </div>

  <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 pb-10 text-xs text-center">
    <nav class="mb-1">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/vue-info">Vue Info</NavLink>
    </nav>
    <p class="m-0 text-gray-600 text-xs">
      Icons by <a href="https://lucide.dev" target="_blank" rel="noopener">Lucide</a>
    </p>
  </footer>
</template>

