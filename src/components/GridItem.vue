<template>
  <div @click="clicked = !clicked" :class="{ 'bg-blue-300': !clicked, 'bg-red-500': clicked }" class="size-8 text-center align-middle hover:bg-yellow-300 hover:text-lg cursor-pointer">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps({
  msg: String,
})
const clicked = ref(false)
</script>

