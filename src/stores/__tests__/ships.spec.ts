import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShipsStore } from '../ships'
import { useGridStore } from '../grid'

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
    gridStore.gridState = Array(10).fill(null).map(() =>
      Array(10).fill(null).map(() => ({ clicked: false, shipId: 0 }))
    )

    // Score should be 100 + ship length - shots fired
    expect(shipsStore.finalScore).toBe(104) // 100 + 4 - 0
  })
})