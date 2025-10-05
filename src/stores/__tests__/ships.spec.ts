import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShipsStore } from '../ships'
import { useGridStore } from '../grid'
import { GRID_SIZE } from '@/types/grid'

// Mock useMessages
vi.mock('../../use/useMessages', () => ({
  useMessages: () => ({
    addMessage: vi.fn()
  })
}))

describe('Ships Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should detect all ships destroyed', () => {
    const gridStore = useGridStore()
    const shipsStore = useShipsStore()

    // Setup a simple scenario
    gridStore.fleet = [
      { id: 1, length: 2, hits: [false, false], hitCount: 2 }
    ]

    expect(shipsStore.allShipsDestroyed).toBe(true)
  })

  it('should calculate score', () => {
    const gridStore = useGridStore()
    const shipsStore = useShipsStore()

    // Setup test data
    gridStore.fleet = [{ id: 1, length: 4, hits: [], hitCount: 0 }]
    gridStore.gridState = Array(GRID_SIZE).fill(null).map((_,i) =>
      Array(GRID_SIZE).fill(null).map((_,j) => ({ clicked: false, shipId: 0, label: `${String.fromCharCode(65 + i)}${j}` })))


    // Score should be 100 + ship length - shots fired
    expect(shipsStore.finalScore).toBe(104) // 100 + 4 - 0
  })
})
