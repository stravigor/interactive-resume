import { inject, ulid } from '@strav/kernel'
import { Context } from '@strav/http'
import { broadcast } from '@strav/signal'
import { query } from '@strav/database'
import { Message, Conversation } from '../models/public'
import AIService from '../services/ai_service'
import ChatService from '../services/chat_service'

@inject()
export default class ChatController {
  /**
   * ChatController instance
   */
  constructor(private chatService: ChatService) {}

  /**
   * Render the chat page
   * @param ctx Context object
   * @returns 
   */
  async index(ctx: Context) {
    const sessionId = ulid()
    return ctx.view('chat', { sessionId })
  }


  /**
   * Get chat history for a session
   */
  async history(ctx: Context) {
    const { sessionId } = ctx.params

    try {
      const chatHistory = await this.chatService.getChatHistory(sessionId)
      return Response.json(chatHistory)
    } catch (error) {
      console.error('Error fetching chat history:', error)
      return Response.json({ error: 'Failed to fetch chat history' }, { status: 500 })
    }
  }
}