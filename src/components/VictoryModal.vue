<template>
  <div v-if="show" class="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center shadow-lg">
      <h2 class="text-2xl font-bold text-green-600 mb-4">🎉 Victory! 🎉</h2>
      <p class="text-lg mb-2">All ships destroyed!</p>
      <p class="text-xl font-semibold text-blue-600 mb-6">Score: {{ score }}</p>
      <button
        @click="$emit('play-again')"
        class="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-semibold"
      >
        Play Again
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  score: number
}>()

defineEmits<{
  'play-again': []
}>()
</script>