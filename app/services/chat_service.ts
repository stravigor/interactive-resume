import { inject } from '@strav/kernel'
import { query } from "@strav/database"
import { Conversation, Message } from "../models/public"
import AIService from "./ai_service"

@inject
export default  class ChatService {
  constructor(private aiService: AIService) {}

  /**
   * Get chat history for a session
   * @param sessionId Session ID
   * @returns Chat history
   */
  async getChatHistory(sessionId: string) {
    // Find or create conversation
    let conversation = await query(Conversation)
    .where('sessionId', sessionId)
    .first()

    if (!conversation) {
        conversation = await Conversation.create({
            session_id: sessionId,
            status: 'active'
        })
    }

    // Get messages
    const messages = await query(Message)
        .where('conversationId', conversation.id)
        .orderBy('createdAt', 'asc')
        .select('role', 'content', 'createdAt')
        .all()

    return messages
  }

  async generateResponse(sessionId: string, content: string) {
    // Find or create conversation
    let conversation = await query(Conversation)
    .where('sessionId', sessionId)
    .first()

    if (!conversation) {
        conversation = await Conversation.create({
            session_id: sessionId,
            status: 'active'
        })
    }

    await Message.create({
      conversation_id: conversation.id,
      role: 'user',
      content: content
    })

    const aiResponse = await this.aiService.generateResponse(content, conversation.id, sessionId)

    // Save assistant message
    await Message.create({
      conversation_id: conversation.id,
      role: 'assistant',
      content: aiResponse
    })

    return {
      role: 'assistant',
      content: aiResponse
    }
  }
}