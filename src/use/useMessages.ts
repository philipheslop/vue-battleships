import { ref, computed, reactive } from 'vue'
import type { GameMessage, MessageColor } from '../types/message'

const messages = ref<GameMessage[]>([])
let messageIdCounter = 0

export function useMessages() {
  const addMessage = (text: string, color: MessageColor = 'gray') => {
    const newMessage = reactive<GameMessage>({
      text,
      displayedText: '',
      color,
      id: messageIdCounter++,
      timestamp: new Date(),
      isTyping: true
    })

    messages.value.push(newMessage)

    // Keep only the last 5 messages
    if (messages.value.length > 5) {
      messages.value = messages.value.slice(-5)
    }

    // Start typewriter effect
    startTypewriter(newMessage)
  }

  const startTypewriter = (message: GameMessage) => {
    let currentIndex = 0
    const totalDuration = 200 // milliseconds total
    const typeSpeed = Math.max(10, totalDuration / message.text.length) // speed per character

    const typeNextChar = () => {
      if (currentIndex < message.text.length) {
        message.displayedText = message.text.substring(0, currentIndex + 1)
        currentIndex++
        setTimeout(typeNextChar, typeSpeed)
      } else {
        message.isTyping = false
      }
    }

    typeNextChar()
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