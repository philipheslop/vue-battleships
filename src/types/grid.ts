export interface GridCell {
  clicked: boolean
  shipId: number
}

export type GridState = GridCell[][]