<template>
  <div @click="handleClick" :class="getCellClasses" class="size-8 text-center align-middle hover:bg-green-400 hover:text-lg cursor-pointer relative">
    {{ msg }}
    <div
      v-if="isFiring"
      class="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
    >
      <div class="w-7 h-7 bg-orange-600 bg-opacity-90 rounded-full animate-ping"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  msg: String,
  row: Number,
  col: Number,
  clicked: Boolean,
  showShips: Boolean,
  hasShip: Boolean,
  isFiring: Boolean,
})

const emit = defineEmits(['cell-click'])

const getCellClasses = computed(() => {
  if (props.clicked) {
    if (props.hasShip) {
      return 'bg-red-500' // Hit - clicked cell with ship
    } else {
      return 'bg-blue-600' // Miss - clicked cell without ship
    }
  }

  if (props.showShips && props.hasShip) {
    return 'bg-yellow-100' // Ship visible when spacebar held
  }

  return 'bg-blue-300' // Default empty cell
})

const handleClick = () => {
  emit('cell-click', props.row, props.col)
}
</script>

