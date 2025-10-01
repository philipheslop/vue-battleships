export interface Coordinate {
  row: number
  col: number
}

export function parseCoordinate(input: string): Coordinate | null {
  if (!input || input.length < 2) return null

  const letter = input.charAt(0).toUpperCase()
  const number = input.slice(1)

  // Convert letter to row (A=0, B=1, etc.)
  const row = letter.charCodeAt(0) - 65
  const col = parseInt(number)

  // Validate bounds
  if (row < 0 || row >= 10 || col < 0 || col >= 10 || isNaN(col)) {
    return null
  }

  return { row, col }
}