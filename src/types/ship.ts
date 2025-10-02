export type ShipOrientation = 'horizontal' | 'vertical'

export interface ShipPosition {
  row: number
  col: number
  orientation: ShipOrientation
}

export interface Battleship {
  id: number
  length: number
  position?: ShipPosition
  hits: boolean[]
  hitCount: number
}

export interface Fleet {
  ships: Battleship[]
}

export const SHIP_TYPES = {
  BATTLESHIP: { length: 5, count: 1 },
  DESTROYER: { length: 4, count: 2 }
} as const

export type ShipType = keyof typeof SHIP_TYPES