<template>
  <div @click="handleClick" :class="{ 'bg-blue-300': !clicked, 'bg-red-500': clicked }" class="size-8 text-center align-middle hover:bg-yellow-300 hover:text-lg cursor-pointer">
    {{ msg }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  msg: String,
  row: Number,
  col: Number,
  clicked: Boolean,
})

const emit = defineEmits(['cell-click'])

const handleClick = () => {
  emit('cell-click', props.row, props.col)
}
</script>

