import type { GridState } from '../types/grid'
import { GRID_SIZE } from '../types/grid'
import type { Battleship, ShipOrientation } from '../types/ship'
import { SHIP_TYPES } from '../types/ship'
import { useGridStore } from '../stores/grid'


// Convert 2D coordinates to 1D index
const to1D = (row: number, col: number): number => row * GRID_SIZE + col


export function canPlaceShip(
  grid: GridState,
  startRow: number,
  startCol: number,
  length: number,
  orientation: ShipOrientation
): boolean {
  const gridStore = useGridStore()
  const gridSize = GRID_SIZE

  // Check if ship fits within grid boundaries
  if (orientation === 'horizontal') {
    if (startCol + length > gridSize) return false
  } else {
    if (startRow + length > gridSize) return false
  }

  // Only check the actual ship cells for adjacency/occupation
  for (let i = 0; i < length; i++) {
    const row = orientation === 'horizontal' ? startRow : startRow + i
    const col = orientation === 'horizontal' ? startCol + i : startCol
    if (gridStore.adjacentCells.has(to1D(row, col)) || grid[row][col].shipId !== 0) {
      return false
    }
  }

  return true
}

export function placeShip(
  grid: GridState,
  ship: Battleship,
  startRow: number,
  startCol: number,
  orientation: ShipOrientation
): void {
  const gridSize = GRID_SIZE

  // Place ship cells on grid
  for (let i = 0; i < ship.length; i++) {
    const placeRow = orientation === 'horizontal' ? startRow : startRow + i
    const placeCol = orientation === 'horizontal' ? startCol + i : startCol

    grid[placeRow][placeCol].shipId = ship.id
  }

  // Add adjacent buffer zone cells to occupied set
  const gridStore = useGridStore()
  const minRow = Math.max(0, startRow - 1)
  const maxRow = orientation === 'horizontal'
    ? Math.min(gridSize - 1, startRow + 1)
    : Math.min(gridSize - 1, startRow + ship.length)
  const minCol = orientation === 'horizontal'
    ? Math.max(0, startCol - 1)
    : Math.max(0, startCol - 1)
  const maxCol = orientation === 'horizontal'
    ? Math.min(gridSize - 1, startCol + ship.length)
    : Math.min(gridSize - 1, startCol + 1)

  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      // Only add adjacent cells, not the ship cells themselves
      if (grid[row][col].shipId === 0) {
        gridStore.adjacentCells.add(to1D(row, col))
      }
    }
  }

  // Update ship position
  ship.position = { row: startRow, col: startCol, orientation }
}

export function getRandomOrientation(): ShipOrientation {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical'
}

export function getRandomPosition(gridSize: number = GRID_SIZE): { row: number; col: number } {
  return {
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize)
  }
}

function createShip(id: number, length: number): Battleship {
  return {
    id,
    length,
    hits: Array.from({ length }, () => false),
    hitCount: 0
  }
}

function placeShipType(
  grid: GridState,
  ships: Battleship[],
  shipType: keyof typeof SHIP_TYPES,
  shipId: number
): number {
  const { length, count } = SHIP_TYPES[shipType]
  let currentId = shipId

  for (let i = 0; i < count; i++) {
    const ship = createShip(currentId++, length)

    if (placeShipRandomly(grid, ship)) {
      ships.push(ship)
    }
  }

  return currentId
}

export function placeShipsRandomly(grid: GridState): Battleship[] {
  const gridStore = useGridStore()
  const ships: Battleship[] = []
  let shipId = 1

  // Clear adjacent cells for new placement session
  gridStore.adjacentCells.clear()

  // Place all ship types
  shipId = placeShipType(grid, ships, 'BATTLESHIP', shipId)
  shipId = placeShipType(grid, ships, 'DESTROYER', shipId)

  return ships
}

function placeShipRandomly(grid: GridState, ship: Battleship): boolean {
  const maxAttempts = 100

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const orientation = getRandomOrientation()
    const { row, col } = getRandomPosition()

    if (canPlaceShip(grid, row, col, ship.length, orientation)) {
      placeShip(grid, ship, row, col, orientation)
      return true
    }
  }

  return false
}
