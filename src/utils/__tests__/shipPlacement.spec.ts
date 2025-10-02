import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { canPlaceShip, placeShip, placeShipsRandomly } from '../shipPlacement'
import type { GridState, GridCell } from '../../types/grid'
import type { Battleship } from '../../types/ship'

describe('Ship Placement', () => {
  let grid: GridState

  beforeEach(() => {
    setActivePinia(createPinia())
    grid = Array(10).fill(null).map(() =>
      Array(10).fill(null).map((): GridCell => ({ clicked: false, shipId: 0 }))
    )
  })

  it('should allow valid placement', () => {
    expect(canPlaceShip(grid, 0, 0, 3, 'horizontal')).toBe(true)
  })

  it('should reject out of bounds', () => {
    expect(canPlaceShip(grid, 0, 8, 3, 'horizontal')).toBe(false)
  })

  it('should place ship on grid', () => {
    const ship: Battleship = { id: 1, length: 2, hits: [false, false], hitCount: 0 }

    placeShip(grid, ship, 2, 3, 'horizontal')

    expect(grid[2][3].shipId).toBe(1)
    expect(grid[2][4].shipId).toBe(1)
  })

  it('should create fleet', () => {
    const ships = placeShipsRandomly(grid)
    expect(ships.length).toBeGreaterThan(0)
  })
})