export interface GameMessage {
  text: string
  displayedText: string
  color: string
  id: number
  timestamp: Date
  isTyping: boolean
}

export type MessageColor = 'blue' | 'green' | 'red' | 'yellow' | 'gray'