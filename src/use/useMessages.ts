import { ref, computed } from 'vue'
import type { GameMessage, MessageColor } from '../types/message'

const messages = ref<GameMessage[]>([])
let messageIdCounter = 0

export function useMessages() {
  const addMessage = (text: string, color: MessageColor = 'gray') => {
    const newMessage: GameMessage = {
      text,
      color,
      id: messageIdCounter++,
      timestamp: new Date()
    }

    messages.value.unshift(newMessage)

    // Keep only the last 5 messages
    if (messages.value.length > 5) {
      messages.value = messages.value.slice(0, 5)
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  const lastFiveMessages = computed(() => messages.value)

  return {
    messages: lastFiveMessages,
    addMessage,
    clearMessages
  }
}