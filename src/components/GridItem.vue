<template>
  <div
    @click="clicked = !clicked"
    :class="{ grey: !clicked, red: clicked }"
    style="width: 100%; height: 25px; width: 25px"
  >
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

<style scoped>
.grey {
  background-color: grey;
}

.red {
  background-color: red;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
