import { defineTool, brain } from '@strav/brain'
import { mail } from '@strav/signal'
import { query } from '@strav/database'
import { Conversation, Message } from '../models/public'
import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { z } from 'zod'

/**
 * Tool for sending resume via email during conversation
 */
export const sendResumeTool = defineTool({
  name: 'send_resume',
  description: 'Send my PDF resume to a specified email address along with a summary of our conversation. Call this when user asks to send resume to an email address.',
  parameters: z.object({
    email: z.string().describe('The email address to send the resume to (must be a valid email format)')
  }),
  execute: async ({ email }, context) => {
    try {
      const sessionId = context?.sessionId
      let conversationSummary = 'No conversation history available.'
      let messageCount = 0

      if (sessionId) {
        // Get conversation data
        const conversation = await query(Conversation)
          .where('sessionId', sessionId)
          .first()

        if (conversation) {
          // Get messages for summary
          const messages = await query(Message)
            .where('conversationId', conversation.id)
            .orderBy('createdAt', 'asc')
            .all()

          messageCount = messages.length
          conversationSummary = await generateConversationSummary(messages)
        }
      }

      // Read PDF file
      const pdfPath = resolve('data/cv-ramarolahy.pdf')
      const pdfBuffer = await readFile(pdfPath)

      // Get app configuration
      const appUrl = process.env.APP_URL || 'http://localhost:3000'
      const currentDate = new Date()

      // Send email with attachment
      const result = await mail.to(email)
        .subject('Resume - Liva Ramarolahy | Interactive Resume Platform')
        .template('resume', {
          recipientEmail: email,
          conversationSummary: conversationSummary,
          appUrl: appUrl,
          year: currentDate.getFullYear()
        })
        .attach({
          filename: 'cv-ramarolahy.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        })
        .send()
      return {
        success: true,
        message: `I've successfully sent my resume to ${email}. The email includes my CV as a PDF attachment along with a summary of our conversation. You should receive it shortly!`
      }
    } catch (error) {
      console.error('Error sending resume:', error)

      // Provide user-friendly error messages
      if (error instanceof Error) {
        if (error.message.includes('ENOENT')) {
          return {
            success: false,
            message: 'I apologize, but I cannot find the resume file. Please contact the administrator.'
          }
        }
        if (error.message.includes('email')) {
          return {
            success: false,
            message: `There was an issue sending the email to ${email}. Please verify the email address is correct.`
          }
        }
      }

      return {
        success: false,
        message: `I encountered an error while sending the resume to ${email}. Please try again later or contact me through alternative means.`
      }
    }
  }
})

/**
 * Generate a summary of the conversation using AI
 */
async function generateConversationSummary(messages: any[]): Promise<string> {
  if (messages.length === 0) {
    return 'No conversation history available.'
  }

  try {
    // Format conversation for AI analysis
    const conversationText = messages
      .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n\n')

    // Ask AI to generate a concise summary
    const summary = await brain.chat(`Please provide a brief, professional summary of this conversation in 1-2 sentences. This summary is for an email being sent to the person who participated in the conversation.

Important guidelines:
- Refer to the assistant as "Liva" (not "the assistant")
- Address the conversation participant directly as "you" (not "the user")
- Focus on the main topics discussed and their interests
- Keep it conversational and professional, suitable for a business email
- Don't use HTML formatting

Conversation:
${conversationText}`, {
      temperature: 0.7,
      maxTokens: 150
    })

    return summary || generateFallbackSummary(messages)
  } catch (error) {
    console.error('Failed to generate AI summary:', error)
    return generateFallbackSummary(messages)
  }
}

/**
 * Generate a fallback summary without AI
 */
function generateFallbackSummary(messages: any[]): string {
  const userMessages = messages.filter(msg => msg.role === 'user')
  const topicCount = userMessages.length

  if (topicCount === 0) {
    return 'No conversation history available.'
  }

  if (topicCount === 1) {
    return `Liva discussed your interest in ${truncateText(userMessages[0].content, 50).toLowerCase()}.`
  }

  return `You and Liva had a conversation covering ${topicCount} topics including your interests in development opportunities and technical discussions.`
}

/**
 * Truncate text to specified length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}