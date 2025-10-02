<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="inline-block px-2 border-l border-gray-200 no-underline text-gray-600 hover:text-gray-900 first:border-l-0 router-link-exact-active:text-gray-900"
  >
    <slot />
  </RouterLink>
</template>