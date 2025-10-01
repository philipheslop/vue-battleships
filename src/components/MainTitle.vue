<script setup lang="ts">
import { Ship } from 'lucide-vue-next'

defineProps<{
  title: string
}>()
</script>

<template>
  <div class="greetings flex items-center justify-center">
    <Ship
      class="mr-4"
      :size="60"
      :stroke-width="1.5"
    />
    <h1 class="green font-medium text-5xl relative -top-2.5 text-center lg:text-left">{{ title }}</h1>
  </div>
</template>

