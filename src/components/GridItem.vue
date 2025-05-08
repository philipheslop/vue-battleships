<template>
  <div @click="clicked = !clicked" :class="{ sea: !clicked, red: clicked }" class="item">
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
.sea {
  background-color: lightblue;
}

.red {
  background-color: red;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.item {
  height: 25px;
  width: 25px;
  text-align: center;
  vertical-align: middle;
}

.item:hover {
  background-color: yellow;
  font-size: 18px;
}
</style>
