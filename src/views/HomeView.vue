<script setup lang="ts">
import WelcomeItem from '../components/WelcomeItem.vue'
import { Play, Ship, Info } from 'lucide-vue-next'
</script>

<template>
  <main>
    <WelcomeItem>
      <template #icon>
        <Play />
      </template>
      <template #heading>Actions</template>
      <div style="min-height: 100px; background-color: var(--color-background-soft); border: 1px dashed var(--color-border); padding: 1rem; border-radius: 4px;">
        Action buttons will go here
      </div>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <Ship />
      </template>
      <template #heading>Ships</template>
      <div style="min-height: 100px; background-color: var(--color-background-soft); border: 1px dashed var(--color-border); padding: 1rem; border-radius: 4px;">
        Ship information will go here
      </div>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <Info />
      </template>
      <template #heading>Info</template>
      <div style="min-height: 100px; background-color: var(--color-background-soft); border: 1px dashed var(--color-border); padding: 1rem; border-radius: 4px;">
        Game information will go here
      </div>
    </WelcomeItem>
  </main>
</template>
