<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainTitle from './components/MainTitle.vue'
import MainGrid from './components/MainGrid.vue'
import { Ship } from 'lucide-vue-next'
</script>

<template>
  <header>
    <Ship
      class="logo"
      :size="125"
      :stroke-width="1.5"
    />
    <div class="wrapper">
      <MainTitle title="BATTLESHIPS!" />
    </div>
  </header>

  <div class="main-content">
    <MainGrid />
    <RouterView />
  </div>

  <footer class="bottom-nav">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/vue-info">Vue Info</RouterLink>
    </nav>
    <p class="attribution">
      Icons by <a href="https://lucide.dev" target="_blank" rel="noopener">Lucide</a>
    </p>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.main-content {
  display: flex;
  padding-top: 2rem;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-border);
  padding: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
}

.bottom-nav nav {
  margin-bottom: 0.25rem;
}

.bottom-nav nav a {
  display: inline-block;
  padding: 0 0.5rem;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
  color: var(--color-text-muted);
}

.bottom-nav nav a:first-of-type {
  border: 0;
}

.bottom-nav nav a.router-link-exact-active {
  color: var(--color-text);
}

.bottom-nav nav a:hover {
  color: var(--color-text);
}

.attribution {
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.7rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
