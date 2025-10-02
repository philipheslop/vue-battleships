export const GRID_SIZE = 10 as const

export interface GridCell {
  clicked: boolean
  shipId: number
  label: string
}

export type GridState = GridCell[][]
