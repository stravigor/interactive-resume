import fs from 'fs'
import path from 'path'
import { brain } from '@strav/brain'
import { Agent } from '@strav/brain'
import { query } from '@strav/database'
import { Message } from '../models/public'
import { env } from '@strav/kernel/helpers/env'
import { sendResumeTool } from '../tools/send_resume_tool'
import { StructuredResponse } from '../types/responses'

/**
 * Resume Assistant Agent
 */
class ResumeAgent extends Agent {
  provider = 'openai'
  model = env('OPENAI_MODEL', 'gpt-5.4-mini-2026-03-17')
  temperature = 0.5
  maxTokens = 500
  tools = [sendResumeTool]

  instructions = fs.readFileSync(path.join(process.cwd(), 'data', 'system-prompt.md'), 'utf-8')
}

export default class AIService {
  private profileData: string
  private projectsData: string
  private methodologyData: string
  private skillsData: string
  private contactData: string
  private systemPrompt: string

  constructor() {
    // Load local markdown files
    const dataPath = path.join(process.cwd(), 'data')
    this.profileData = fs.readFileSync(path.join(dataPath, 'profile.md'), 'utf-8')
    this.projectsData = fs.readFileSync(path.join(dataPath, 'projects.md'), 'utf-8')
    this.methodologyData = fs.readFileSync(path.join(dataPath, 'methodology.md'), 'utf-8')
    this.skillsData = fs.readFileSync(path.join(dataPath, 'skills.md'), 'utf-8')
    this.contactData = fs.readFileSync(path.join(dataPath, 'contact.md'), 'utf-8')
    this.systemPrompt = fs.readFileSync(path.join(dataPath, 'system-prompt.md'), 'utf-8')
  }

  /**
   * Parse JSON response from AI
   */
  private parseAIResponse(response: string): StructuredResponse {
    try {
      // Try to parse as JSON
      const parsed = JSON.parse(response)

      // Validate the structure
      if (!parsed.type || parsed.content === undefined) {
        throw new Error('Invalid response structure')
      }

      return {
        type: parsed.type,
        data: parsed.type !== 'text' ? parsed.content : null,
        text: parsed.type === 'text' ? parsed.content : ''
      }
    } catch (error) {
      console.error('Failed to parse AI JSON response:', error, 'Response:', response)

      // Fallback to text response if JSON parsing fails
      return {
        type: 'text',
        data: null,
        text: response || 'I apologize, but I encountered an error processing your request.'
      }
    }
  }

  /**
   * Generate a response using Strav Brain
   */
  async generateResponse(userMessage: string, conversationId: string, sessionId?: string): Promise<StructuredResponse> {
    try {
      // Get conversation history
      const previousMessages = await query(Message)
        .where('conversationId', conversationId)
        .orderBy('createdAt', 'asc')
        .limit(20)
        .all()

      // Create thread for conversation continuity
      const thread = brain.thread(ResumeAgent)

      // Add conversation history to thread
      for (const msg of previousMessages) {
        if (msg.role === 'user') {
          thread.getMessages().push({
            role: 'user',
            content: msg.content
          })
        } else {
          thread.getMessages().push({
            role: 'assistant',
            content: msg.content
          })
        }
      }

      // Prepare context with actual markdown data
      const context = {
        profile: this.profileData,
        projects: this.projectsData,
        methodology: this.methodologyData,
        skills: this.skillsData,
        contact: this.contactData
      }

      // Add session context for tools
      const enhancedContext = {
        ...context,
        sessionId: sessionId
      }

      // Generate response using brain agent with tools
      const result = await brain.agent(ResumeAgent)
        .input(userMessage)
        .with(enhancedContext)
        .run()

      // Get the AI's response
      const responseContent = result.text || (typeof result.data === 'string' ? result.data : '')

      if (!responseContent || responseContent.trim() === '') {
        console.warn('Empty response from AI, using direct chat')
        console.warn(result)

        // Try using brain.chat directly with markdown context
        const systemPrompt = this.systemPrompt
          .replace('{{profile}}', this.profileData)
          .replace('{{projects}}', this.projectsData)
          .replace('{{methodology}}', this.methodologyData)
          .replace('{{skills}}', this.skillsData)
          .replace('{{contact}}', this.contactData)

        const directResponse = await brain.chat(userMessage, {
          system: systemPrompt,
          temperature: 0.5,
          maxTokens: 500
        })

        // Parse the response as JSON
        return this.parseAIResponse(directResponse || '')
      }

      // Parse the AI's JSON response
      return this.parseAIResponse(responseContent)

    } catch (error) {
      console.error('Brain API error:', error)

      // Fallback response if AI fails
      return {
        type: 'text',
        data: null,
        text: this.getFallbackResponse(userMessage)
      }
    }
  }

  /**
   * Provide a fallback response if AI fails or returns invalid JSON
   */
  private getFallbackResponse(message: string): string {
    const msg = message.toLowerCase()

    if (msg.includes('hello') || msg.includes('hi')) {
      return "Hello! I'm a full-stack developer and the creator of the Strav framework. I'd be happy to tell you about my work, including my framework development, 3D visualization projects, and e-commerce solutions. What interests you most?"
    }

    if (msg.includes('strav')) {
      return "Strav is my pride and joy - a comprehensive TypeScript full-stack framework I built from scratch. It features dependency injection, real-time WebSockets, a type-safe ORM, Vue.js islands for hybrid SSR/SPA, and extensive CLI tooling. This very chat application is powered by Strav!"
    }

    if (msg.includes('project')) {
      return "I've built diverse projects including the Strav framework, a 3D product configurator with Three.js achieving 60fps performance, an AWS infrastructure management portal with Terraform integration, and comprehensive e-commerce solutions. Which would you like to explore?"
    }

    if (msg.includes('skill')) {
      return "My core skills include TypeScript, React, Node.js, and Three.js. I'm proficient in both frontend (React, Vue, Three.js) and backend (Node.js, PHP, PostgreSQL) development, plus DevOps with Docker, AWS, and Terraform. I have 7+ years of professional experience."
    }

    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone')) {
      return "You can reach me at liva.ramarolahy@gmail.com or call me at 064-591-0514. I'm based in Bangkok, Thailand. Feel free to get in touch to discuss opportunities or collaborations!"
    }

    return "I'd be happy to discuss my experience as a full-stack developer, the Strav framework I created, or any of my projects in 3D visualization, e-commerce, or cloud infrastructure. What would you like to know?"
  }
}