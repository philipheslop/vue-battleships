export const GRID_SIZE = 10 as const

export interface GridCell {
  clicked: boolean
  shipId: number
}

export type GridState = GridCell[][]