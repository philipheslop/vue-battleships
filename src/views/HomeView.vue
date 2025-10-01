<script setup lang="ts">
import { onMounted } from 'vue'
import PanelItem from '../components/PanelItem.vue'
import { Play, Ship, Info } from 'lucide-vue-next'
import { useMessages } from '../use/useMessages'

const { messages, addMessage } = useMessages()

const getTerminalColorClasses = (color: string) => {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-300',
    green: 'text-green-300',
    red: 'text-red-300',
    yellow: 'text-yellow-300',
    gray: 'text-gray-300'
  }
  return colorMap[color] || 'text-gray-300'
}

onMounted(() => {
  addMessage('Game started', 'blue')
  addMessage('Welcome to Battleships!', 'green')
})
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
      <div class="min-h-[100px] bg-gray-800 border border-gray-600 p-3 rounded font-mono text-sm overflow-hidden">
        <div v-if="messages.length === 0" class="text-green-300">
          > Waiting for commands...
        </div>
        <div v-else class="space-y-1">
          <div
            v-for="message in messages"
            :key="message.id"
            :class="getTerminalColorClasses(message.color)"
            class="leading-tight"
          >
            > {{ message.text }}
          </div>
        </div>
      </div>
    </PanelItem>
  </main>
</template>
