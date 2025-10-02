<script setup lang="ts">
import { onMounted, computed, nextTick, watch } from 'vue'
import PanelItem from '../components/PanelItem.vue'
import VictoryModal from '../components/VictoryModal.vue'
import { Play, Ship, Info, GamepadIcon } from 'lucide-vue-next'
import { useMessages } from '../use/useMessages'
import { useGridStore } from '../stores/grid'
import { useShips } from '../use/useShips'
import type { GridCell } from '../types/grid'
import type { Battleship } from '../types/ship'
import { SHIP_TYPES } from '../types/ship'

const { messages, addMessage } = useMessages()
const store = useGridStore()
const { resetGrid, gridState, fleet: storeFleet, initializeGame, placeShips } = store
const ships = useShips()

const finalScore = computed(() => {
  const totalShipLength = fleet.value.reduce((total, ship) => total + ship.length, 0)
  return 100 + totalShipLength - shotsFired.value
})

const shotsFired = computed(() => {
  return store.gridState.flat().filter((cell: GridCell) => cell.clicked).length
})

const hits = computed(() => {
  return store.gridState.flat().filter((cell: GridCell) => cell.clicked && cell.shipId > 0).length
})

const misses = computed(() => {
  return shotsFired.value - hits.value
})

const allShipsDestroyed = computed(() => {
  return fleet.value.length > 0 && fleet.value.every(ship => (ship.hitCount || 0) === ship.length)
})

// Access fleet through store reference
const fleet = computed(() => store.fleet)


const getShipName = (ship: Battleship): string => {
  return ship.length === 5 ? 'Battleship' : 'Destroyer'
}

const getShipCellHit = (ship: Battleship, cellIndex: number): boolean => {
  if (!ship.position) return false

  const { row, col, orientation } = ship.position
  const cellRow = orientation === 'horizontal' ? row : row + cellIndex
  const cellCol = orientation === 'horizontal' ? col + cellIndex : col

  return store.getCell(cellRow, cellCol).clicked
}

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

const handleNewGame = () => {
  resetGrid()
  placeShips()
  addMessage('New game started!', 'green')
  addMessage('Good luck, Admiral!', 'blue')
}

onMounted(() => {
  addMessage('Game started', 'blue')
  addMessage('Welcome to Battleships!', 'green')
  initializeGame()
})
</script>

<template>
  <main>
    <PanelItem>
      <template #icon>
        <Play />
      </template>
      <template #heading>Actions</template>
      <div class="min-h-[100px] bg-gray-50 border border-dashed border-gray-300 p-4 rounded flex flex-col gap-3">
        <button
          @click="handleNewGame"
          class="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
        >
          <GamepadIcon class="w-4 h-4" />
          New Game
        </button>

        <!-- Game Statistics Panel -->
        <div class="mt-4 p-3 bg-white border border-gray-200 rounded">
          <div class="flex justify-between items-center text-sm">
            <div class="flex items-center gap-1">
              <span class="text-gray-600">Shots Fired:</span>
              <span class="font-semibold text-blue-600">{{ shotsFired }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-gray-600">Hits:</span>
              <span class="font-semibold text-green-600">{{ hits }}</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-gray-600">Misses:</span>
              <span class="font-semibold text-red-600">{{ misses }}</span>
            </div>
          </div>
        </div>
      </div>
    </PanelItem>

    <PanelItem>
      <template #icon>
        <Ship />
      </template>
      <template #heading>Ships</template>
      <div class="min-h-[100px] bg-gray-50 border border-dashed border-gray-300 p-4 rounded flex flex-col gap-4" :key="fleet.length">
        <div v-if="fleet.length === 0" class="text-gray-500 text-sm">
          Loading ships...
        </div>
        <div v-else v-for="ship in fleet" :key="ship.id" class="flex items-center gap-3">
          <div
            :class="[
              'text-sm font-medium w-20',
              ship.hitCount === ship.length ? 'text-gray-500 line-through' : 'text-gray-700'
            ]"
          >
            {{ getShipName(ship) }}
          </div>
          <div class="flex">
            <div
              v-for="(hit, index) in ship.hits"
              :key="index"
              :class="[
                'w-6 h-6 border border-gray-400',
                getShipCellHit(ship, index) ? 'bg-red-500' : 'bg-gray-300'
              ]"
            ></div>
          </div>
          <div v-if="ship.hitCount === ship.length" class="text-sm font-medium text-red-600">
            Sunk!
          </div>
        </div>
      </div>
    </PanelItem>

    <PanelItem>
      <template #icon>
        <Info />
      </template>
      <template #heading>Info</template>
      <div class="min-h-[100px] bg-gray-800 border border-gray-600 p-3 rounded font-mono text-sm overflow-hidden">
        <div class="space-y-1">
          <div v-if="messages.length === 0" class="text-green-300">
            > Waiting for commands...
          </div>
          <div
            v-for="message in messages"
            :key="message.id"
            :class="getTerminalColorClasses(message.color)"
            class="leading-tight"
          >
            > {{ message.displayedText }}<span v-if="message.isTyping" class="animate-pulse">█</span>
          </div>
          <div class="text-green-300 leading-tight">
            > <span class="animate-pulse">█</span>
          </div>
        </div>
      </div>
      <div class="text-xs text-gray-400 mt-1 px-3">
        press space to cheat
      </div>
    </PanelItem>

    <VictoryModal
      :show="allShipsDestroyed"
      :score="finalScore"
      @play-again="handleNewGame"
    />
  </main>
</template>
