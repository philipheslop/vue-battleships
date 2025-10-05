<script setup lang="ts">
import { Ship } from 'lucide-vue-next'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex items-center justify-center">
    <Ship
      class="mr-4"
      :size="60"
      :stroke-width="1.5"
    />
    <h1 class="text-emerald-600 hover:bg-emerald-100 transition-colors duration-400 p-1 font-medium text-5xl text-center lg:text-left">{{ title }}</h1>
  </div>
</template>

