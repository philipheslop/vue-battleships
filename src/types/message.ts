export interface GameMessage {
  text: string
  color: string
  id: number
  timestamp: Date
}

export type MessageColor = 'blue' | 'green' | 'red' | 'yellow' | 'gray'