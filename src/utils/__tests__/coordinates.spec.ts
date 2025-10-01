import { describe, it, expect } from 'vitest'
import { parseCoordinate } from '../coordinates'

describe('parseCoordinate', () => {
  it('should parse valid coordinates', () => {
    expect(parseCoordinate('A6')).toEqual({ row: 0, col: 6 })
  })

  it('should return null for invalid coordinates', () => {
    expect(parseCoordinate('XY')).toBeNull()
  })
})