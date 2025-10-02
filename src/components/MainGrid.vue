<template>
  <div class="w-full flex flex-col items-center">
    <div class="content">
      <table class="border border-collapse">
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex + 'row'">
          <td v-for="(element, colIndex) in row" :key="element" class="p-0 m-0 border">
            <GridItem
              :msg="element"
              :row="rowIndex"
              :col="colIndex"
              :clicked="getCell(rowIndex, colIndex).clicked"
              :show-ships="showShips"
              :has-ship="getCell(rowIndex, colIndex).shipId > 0"
              :is-firing="store.firingCell?.row === rowIndex && store.firingCell?.col === colIndex"
              @cell-click="chooseCell"
            />
          </td>
        </tr>
      </table>
    </div>

    <div class="mt-4 pt-6 flex gap-2 items-center">
      <input
        v-model="coordinateInput"
        @input="restrictInput"
        @keyup.enter="handleCoordinateSubmit"
        placeholder="Enter coordinates (e.g. A6)"
        :class="[
          'px-3 py-2 border rounded text-sm uppercase transition-colors duration-200',
          isInputError ? 'border-red-500' : 'border-gray-300'
        ]"
        maxlength="2"
      />
      <button
        @click="handleCoordinateSubmit"
        class="px-4 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        Fire!
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import GridItem from './GridItem.vue'
import { useGridStore } from '../stores/grid'
import { parseCoordinate } from '../utils/coordinates'
import { useMessages } from '../use/useMessages'

const store = useGridStore()
const { chooseCell, getCell } = store
const { addMessage } = useMessages()

const rows = 10
const cols = 10
const tableData: string[][] = []
for (let i = 0; i < rows; i++) {
  tableData[i] = []
  for (let j = 0; j < cols; j++) {
    tableData[i][j] = String.fromCharCode(65 + i) + j
  }
}

const coordinateInput = ref('')
const isInputError = ref(false)
const showShips = ref(false)

const flashError = () => {
  isInputError.value = true
  setTimeout(() => {
    isInputError.value = false
  }, 300)
}

const restrictInput = () => {
  const value = coordinateInput.value.toUpperCase()

  // Only allow letter A-J followed by digit 0-9
  const validPattern = /^[A-J]?[0-9]?$/

  if (!validPattern.test(value)) {
    // Flash red border for invalid input
    flashError()

    // Add message to terminal
    addMessage('Invalid input, use coordinates like A6', 'red')

    // Remove invalid characters
    coordinateInput.value = value.replace(/[^A-J0-9]/g, '')

    // Ensure letter comes before number
    const letters = coordinateInput.value.match(/[A-J]/g)
    const numbers = coordinateInput.value.match(/[0-9]/g)

    if (letters && numbers) {
      coordinateInput.value = letters[0] + numbers[0]
    } else if (letters && letters.length > 1) {
      coordinateInput.value = letters[0]
    } else if (numbers && numbers.length > 1) {
      coordinateInput.value = numbers[0]
    }
  }
}

const handleCoordinateSubmit = () => {
  const coordinates = parseCoordinate(coordinateInput.value)

  if (coordinates) {
    // Check if cell was already clicked
    const cell = getCell(coordinates.row, coordinates.col)
    if (cell.clicked) {
      flashError()
      addMessage('Already Fired Here', 'red')
    } else {
      chooseCell(coordinates.row, coordinates.col)
    }
    coordinateInput.value = ''
  } else {
    alert('Invalid coordinates! Please enter format like A6 (A-J, 0-9)')
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.code === 'Space' && !event.repeat) {
    event.preventDefault()
    showShips.value = true
  }
}

const handleKeyUp = (event: KeyboardEvent) => {
  if (event.code === 'Space') {
    event.preventDefault()
    showShips.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('keyup', handleKeyUp)
})
</script>

