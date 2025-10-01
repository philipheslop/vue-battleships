import { describe, it, expect } from 'vitest'
import { useMessages } from '../useMessages'

describe('useMessages', () => {
  it('should add messages', () => {
    const { messages, addMessage } = useMessages()

    addMessage('Test message', 'blue')
    expect(messages.value[0].text).toBe('Test message')
    expect(messages.value[0].color).toBe('blue')
  })
})