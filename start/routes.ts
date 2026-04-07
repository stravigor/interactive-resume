import { router } from '@strav/http/http'
import { broadcast } from '@strav/signal'
import { session } from '@strav/http'
import ChatController from '../app/controllers/chat_controller'
import WebSocketHandler from '../app/handlers/websocket_handler'

// Initialize broadcasting with session middleware
broadcast.boot(router, {
  middleware: [session()]
})

// Main chat interface
router.get('/', [ChatController, 'index'])

// API Routes
router.get('/api/health', () => {
  return Response.json({ status: 'ok' })
})

// Chat API
router.get('/api/chat/history/:sessionId', [ChatController, 'history'])

// Initialize WebSocket handler
const handler = new WebSocketHandler()

// WebSocket channels
broadcast.channel('chat/:sessionId', {
  authorize: async (ctx, { sessionId }) => {
    // Allow all connections for now
    // In production, you might want to add authentication
    return true
  },
  
  messages: {
    async send(ctx, { sessionId }, data: any) {
      await handler.handleMessage(ctx, sessionId, data)
    }
  }
})
