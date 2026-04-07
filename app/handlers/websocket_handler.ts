import { Context } from '@strav/http'
import { broadcast } from '@strav/signal'
import ChatService from '../services/chat_service'
import AIService from '../services/ai_service'

export default class WebSocketHandler {
  private chatService: ChatService

  constructor() {
    const aiService = new AIService()
    this.chatService = new ChatService(aiService)
  }

  /**
   * Handle incoming WebSocket messages
   */
  async handleMessage(ctx: Context, sessionId: string, data: any): Promise<void> {
    try {
      const { content } = data

      // Generate AI response
      const response = await this.chatService.generateResponse(sessionId, content)

      // Broadcast response back to the client
      broadcast.to(`chat/${sessionId}`).send('message', {
        role: 'assistant',
        content: response.content
      })
    } catch (error) {
      // Broadcast error message to the client
      broadcast.to(`chat/${sessionId}`).send('message', {
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your message. Please try again.'
      })
    }
  }
}