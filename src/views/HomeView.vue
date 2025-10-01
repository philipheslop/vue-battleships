<script setup lang="ts">
import PanelItem from '../components/PanelItem.vue'
import { Play, Ship, Info } from 'lucide-vue-next'
</script>

<template>
  <main>
    <PanelItem>
      <template #icon>
        <Play />
      </template>
      <template #heading>Actions</template>
      <div class="min-h-[100px] bg-gray-50 border border-dashed border-gray-300 p-4 rounded">
        Action buttons will go here
      </div>
    </PanelItem>

    <PanelItem>
      <template #icon>
        <Ship />
      </template>
      <template #heading>Ships</template>
      <div class="min-h-[100px] bg-gray-50 border border-dashed border-gray-300 p-4 rounded">
        Ship information will go here
      </div>
    </PanelItem>

    <PanelItem>
      <template #icon>
        <Info />
      </template>
      <template #heading>Info</template>
      <div class="min-h-[100px] bg-gray-50 border border-dashed border-gray-300 p-4 rounded">
        Game information will go here
      </div>
    </PanelItem>
  </main>
</template>
