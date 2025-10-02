import type { GridState } from '../types/grid'
import type { Battleship, ShipPosition, ShipOrientation } from '../types/ship'
import { SHIP_TYPES } from '../types/ship'

// Store adjacent cells as 1D indices (row * 10 + col)
export let adjacentCells: Set<number> = new Set()

// Convert 2D coordinates to 1D index
const to1D = (row: number, col: number): number => row * 10 + col

// Convert 1D index to 2D coordinates
const to2D = (index: number): [number, number] => [Math.floor(index / 10), index % 10]

export function canPlaceShip(
  grid: GridState,
  startRow: number,
  startCol: number,
  length: number,
  orientation: ShipOrientation
): boolean {
  const gridSize = 10

  // Check if ship fits within grid boundaries
  if (orientation === 'horizontal') {
    if (startCol + length > gridSize) return false
  } else {
    if (startRow + length > gridSize) return false
  }

  // Create expanded area to check (ship cells + adjacent cells)
  const minRow = Math.max(0, startRow - 1)
  const maxRow = orientation === 'horizontal'
    ? Math.min(gridSize - 1, startRow + 1)
    : Math.min(gridSize - 1, startRow + length)
  const minCol = orientation === 'horizontal'
    ? Math.max(0, startCol - 1)
    : Math.max(0, startCol - 1)
  const maxCol = orientation === 'horizontal'
    ? Math.min(gridSize - 1, startCol + length)
    : Math.min(gridSize - 1, startCol + 1)

  // Check entire expanded area using accumulated adjacent cells
  for (let row = minRow; row <= maxRow; row++) {
    for (let col = minCol; col <= maxCol; col++) {
      if (adjacentCells.has(to1D(row, col))) {
        return false
      }
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
  const gridSize = 10

  // Place ship cells on grid
  for (let i = 0; i < ship.length; i++) {
    const placeRow = orientation === 'horizontal' ? startRow : startRow + i
    const placeCol = orientation === 'horizontal' ? startCol + i : startCol

    grid[placeRow][placeCol].shipId = ship.id
  }

  // Add adjacent buffer zone cells to occupied set
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
        adjacentCells.add(to1D(row, col))
      }
    }
  }

  // Update ship position
  ship.position = { row: startRow, col: startCol, orientation }
}

export function getRandomOrientation(): ShipOrientation {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical'
}

export function getRandomPosition(gridSize: number = 10): { row: number; col: number } {
  return {
    row: Math.floor(Math.random() * gridSize),
    col: Math.floor(Math.random() * gridSize)
  }
}

function createShip(id: number, length: number): Battleship {
  return {
    id,
    length,
    hits: new Array(length).fill(false),
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
  const ships: Battleship[] = []
  let shipId = 1

  // Clear adjacent cells for new placement session
  adjacentCells.clear()

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