import { ref } from 'vue'

export function useGrid() {
  // Grid state - 10x10 matrix where each cell can be clicked
  const gridState = ref(Array(10).fill().map(() => Array(10).fill(false)))

  // Handle cell click
  const toggleCell = (row, col) => {
    gridState.value[row][col] = !gridState.value[row][col]
  }

  // Get cell state
  const getCellState = (row, col) => {
    return gridState.value[row][col]
  }

  // Reset grid
  const resetGrid = () => {
    gridState.value = Array(10).fill().map(() => Array(10).fill(false))
  }

  return {
    gridState,
    toggleCell,
    getCellState,
    resetGrid
  }
}