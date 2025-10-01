import { describe, it, expect } from 'vitest'
import { useGrid } from '../useGrid'

describe('useGrid', () => {
  it('should create a 10x10 grid with unclicked cells', () => {
    const { gridState, getCell } = useGrid()

    expect(gridState.value).toHaveLength(10)
    expect(gridState.value[0]).toHaveLength(10)
    expect(getCell(0, 0).clicked).toBe(false)
  })

  it('should toggle cell state', () => {
    const { chooseCell, getCell } = useGrid()

    expect(getCell(5, 5).clicked).toBe(false)
    chooseCell(5, 5)
    expect(getCell(5, 5).clicked).toBe(true)
  })

  it('should reset grid', () => {
    const { chooseCell, getCell, resetGrid } = useGrid()

    chooseCell(0, 0)
    expect(getCell(0, 0).clicked).toBe(true)

    resetGrid()
    expect(getCell(0, 0).clicked).toBe(false)
  })
})