import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGrid } from '../useGrid'

describe('useGrid', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should return store instance', () => {
    const store = useGrid()
    expect(store).toBeDefined()
    expect(store.gridState).toBeDefined()
    expect(store.chooseCell).toBeDefined()
  })
})