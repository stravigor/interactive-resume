import { inject } from '@strav/kernel'
import { query } from "@strav/database"
import { Conversation, Message } from "../models/public"
import AIService from "./ai_service"
import { MessageMetadata } from '../types/responses'

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

    // Get messages with metadata
    const messages = await query(Message)
        .where('conversationId', conversation.id)
        .orderBy('createdAt', 'asc')
        .select('role', 'content', 'metadata', 'createdAt')
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

    // Create metadata object based on AI response
    const metadata: MessageMetadata = {
      responseType: aiResponse.type,
      structuredData: aiResponse.data || undefined
    }

    // For structured responses, use minimal text content since the rich component will show the data
    // For text responses, use the AI's text content directly
    const messageContent = aiResponse.type === 'text'
      ? aiResponse.text || 'I\'m processing your request...'
      : '' // Empty content for structured responses - the rich component will handle display

    // Save assistant message with metadata
    await Message.create({
      conversation_id: conversation.id,
      role: 'assistant',
      content: messageContent,
      metadata: JSON.stringify(metadata)
    })

    return {
      role: 'assistant',
      content: messageContent,
      metadata
    }
  }
}