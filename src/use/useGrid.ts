import { ref } from 'vue'
import type { GridState, GridCell } from '../types/grid'

export function useGrid() {
  // Create a single cell with proper typing
  const createCell = (): GridCell => ({
    clicked: false
  })

  // Grid state - 10x10 matrix where each cell has properties
  const gridState = ref<GridState>(
    Array(10).fill(null).map(() =>
      Array(10).fill(null).map(() => createCell())
    )
  )

  // Handle cell click
  const chooseCell = (row: number, col: number) => {
    gridState.value[row][col].clicked = !gridState.value[row][col].clicked
  }

  // Get full cell state
  const getCell = (row: number, col: number): GridCell => {
    return gridState.value[row][col]
  }

  // Reset grid
  const resetGrid = () => {
    gridState.value = Array(10).fill(null).map(() =>
      Array(10).fill(null).map(() => createCell())
    )
  }

  return {
    gridState,
    chooseCell,
    getCell,
    resetGrid
  }
}