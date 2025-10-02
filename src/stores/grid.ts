import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GridState, GridCell } from '../types/grid'
import type { Battleship } from '../types/ship'
import { placeShipsRandomly } from '../utils/shipPlacement'
import { useMessages } from '../use/useMessages'

// Import the adjacent cells checking function
const to1D = (row: number, col: number): number => row * 10 + col

export const useGridStore = defineStore('grid', () => {
  const { addMessage } = useMessages()

  // Create a single cell with proper typing
  const createCell = (): GridCell => ({
    clicked: false,
    shipId: 0
  })

  // Grid state - 10x10 matrix where each cell has properties
  const gridState = ref<GridState>(
    Array(10).fill(null).map(() =>
      Array(10).fill(null).map(() => createCell())
    )
  )

  // Fleet state
  const fleet = ref<Battleship[]>([])

  // Track firing state
  const firingCell = ref<{ row: number; col: number } | null>(null)

  // Adjacent cells for ship placement (prevents ships from touching)
  const adjacentCells = ref<Set<number>>(new Set())

  // Handle cell click
  const chooseCell = (row: number, col: number) => {
    const wasClicked = gridState.value[row][col].clicked

    // Only fire if cell wasn't already clicked
    if (!wasClicked) {
      addMessage('Firing...', 'gray')
      firingCell.value = { row, col }

      setTimeout(() => {
        gridState.value[row][col].clicked = true
        const cell = gridState.value[row][col]
        firingCell.value = null

        // If cell has a ship, increment hit count
        if (cell.shipId > 0) {
          const ship = fleet.value.find(s => s.id === cell.shipId)
          if (ship) {
            ship.hitCount++
            const shipName = ship.length === 5 ? 'BATTLESHIP' : 'DESTROYER'
            addMessage(`${shipName} HIT!`, 'red')

            // Check if ship is sunk
            if (ship.hitCount === ship.length) {
              addMessage(`${shipName} SUNK!`, 'red')
            }
          }
        } else {
          // Check if clicked cell is adjacent to a ship
          if (adjacentCells.value.has(to1D(row, col))) {
            addMessage('Close!', 'yellow')
          } else {
            addMessage('Miss.', 'blue')
          }
        }
      }, 1000)
    } else {
      addMessage('Already Fired Here', 'red')
    }
  }

  // Get full cell state
  const getCell = (row: number, col: number): GridCell => {
    return gridState.value[row][col]
  }

  // Reset grid only (clear all data)
  const resetGrid = () => {
    gridState.value = Array(10).fill(null).map(() =>
      Array(10).fill(null).map(() => createCell())
    )
    fleet.value = []
  }

  // Place ships on current grid
  const placeShips = () => {
    const newShips = placeShipsRandomly(gridState.value)
    fleet.value = [...newShips] // Force new array reference
  }

  // Initialize game with ships
  const initializeGame = () => {
    resetGrid()
    placeShips()
  }

  return {
    gridState,
    fleet,
    firingCell,
    adjacentCells,
    chooseCell,
    getCell,
    resetGrid,
    placeShips,
    initializeGame
  }
})