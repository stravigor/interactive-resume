import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant'
  content: string
  metadata?: Record<string, any>
  is_typing?: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  visitor_id: string
  session_id: string
  context?: string
  metadata?: Record<string, any>
  status: 'active' | 'closed' | 'archived'
  created_at: string
  updated_at: string
}

export const useMessageStore = defineStore('messages', () => {
  const messages = ref<Message[]>([])
  const conversation = ref<Conversation | null>(null)
  const currentSessionId = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isPending = ref(false)

  const currentMessages = computed(() => {
    // Return all messages since we're working with a single session
    // The conversation_id might not be set initially for new messages
    return messages.value
  })

  const messageCount = computed(() => currentMessages.value.length)

  const hasMessages = computed(() => messageCount.value > 0)

  const lastMessage = computed(() => {
    const msgs = currentMessages.value
    return msgs.length > 0 ? msgs[msgs.length - 1] : null
  })

  async function fetchHistory(sessionId: string) {
    try {
      isLoading.value = true
      error.value = null
      currentSessionId.value = sessionId

      const response = await fetch(`/api/chat/history/${sessionId}`)
      if (!response.ok) {
        throw new Error(`Failed to fetch chat history: ${response.statusText}`)
      }

      const data = await response.json()

      // The API returns an array of messages directly
      if (Array.isArray(data)) {
        messages.value = data.map((msg: any, index: number) => ({
          id: `history_${index}`,
          conversation_id: '', // Will be set when conversation is created
          role: msg.role,
          content: msg.content,
          created_at: msg.createdAt || msg.created_at || new Date().toISOString(),
          updated_at: msg.createdAt || msg.created_at || new Date().toISOString()
        }))
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch messages'
      console.error('Error fetching chat history:', err)
    } finally {
      isLoading.value = false
    }
  }

  function addMessage(message: Message) {
    const existingIndex = messages.value.findIndex(m => m.id === message.id)

    if (existingIndex >= 0) {
      messages.value[existingIndex] = message
    } else {
      messages.value.push(message)
    }
  }

  function addUserMessage(content: string) {
    const tempId = `temp_${Date.now()}`
    const userMessage: Message = {
      id: tempId,
      conversation_id: conversation.value?.id || '',
      role: 'user',
      content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    addMessage(userMessage)
    return tempId
  }

  function addAssistantMessage(content: string, isTyping = false) {
    const tempId = `assistant_${Date.now()}`
    const assistantMessage: Message = {
      id: tempId,
      conversation_id: conversation.value?.id || '',
      role: 'assistant',
      content,
      is_typing: isTyping,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    addMessage(assistantMessage)

    // Clear pending state when we receive a response
    if (!isTyping) {
      setPending(false)
    }

    return tempId
  }

  function updateMessage(messageId: string, updates: Partial<Message>) {
    const index = messages.value.findIndex(m => m.id === messageId)
    if (index >= 0) {
      messages.value[index] = { ...messages.value[index], ...updates }
    }
  }



  function sendMessage(content: string) {
    if (!content.trim() || !currentSessionId.value) {
      return
    }

    // Just add the user message to the store
    // The actual sending will be handled by the component with the broadcast connection
    addUserMessage(content)

    // Set pending state while waiting for response
    setPending(true)
  }

  function setPending(state: boolean) {
    isPending.value = state
  }

  function initializeStore(sessionId: string) {
    currentSessionId.value = sessionId
    fetchHistory(sessionId)
  }


  return {
    messages,
    conversation,
    currentSessionId,
    isLoading,
    error,
    isPending,
    currentMessages,
    messageCount,
    hasMessages,
    lastMessage,
    fetchHistory,
    addMessage,
    addUserMessage,
    addAssistantMessage,
    updateMessage,
    sendMessage,
    setPending,
    initializeStore
  }
})