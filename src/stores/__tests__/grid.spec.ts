import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGridStore } from '../grid'

// Mock useMessages
vi.mock('../../use/useMessages', () => ({
  useMessages: () => ({
    addMessage: vi.fn()
  })
}))

describe('Grid Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with empty grid', () => {
    const store = useGridStore()

    expect(store.gridState).toHaveLength(10)
    expect(store.gridState[0]).toHaveLength(10)
    expect(store.getCell(0, 0).clicked).toBe(false)
  })

  it('should handle cell clicks after delay', async () => {
    const store = useGridStore()

    store.chooseCell(5, 5)
    // Cell should not be clicked immediately due to firing delay
    expect(store.getCell(5, 5).clicked).toBe(false)

    // Wait for firing delay
    await new Promise(resolve => setTimeout(resolve, 1100))
    expect(store.getCell(5, 5).clicked).toBe(true)
  })

  it('should initialize game with ships', () => {
    const store = useGridStore()

    store.initializeGame()
    expect(store.fleet.length).toBeGreaterThan(0)
  })

  it('should reset grid', () => {
    const store = useGridStore()

    store.chooseCell(0, 0)
    store.resetGrid()
    expect(store.getCell(0, 0).clicked).toBe(false)
    expect(store.fleet.length).toBe(0)
  })
})