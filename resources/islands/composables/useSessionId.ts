import { ref, readonly } from 'vue'

// Global reactive session ID - shared across all components
const sessionId = ref<string | null>(null)

// Local storage key (using localStorage to persist across tab/window sessions)
const LOCAL_STORAGE_KEY = 'chatSessionId'

/**
 * Composable for managing session ID across the application
 * Provides a single source of truth for session management
 */
export function useSessionId() {

  /**
   * Get or create session ID from localStorage or hidden input element
   * Uses localStorage to persist conversation across browser sessions
   */
  function getOrCreateSessionId(): string {
    // Return cached value if already set
    if (sessionId.value) {
      return sessionId.value
    }

    // Try to get from localStorage first (persists across sessions)
    let storedSessionId = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!storedSessionId) {
      // Fallback to hidden input element (set by server)
      const sessionInput = document.getElementById('available-session-id') as HTMLInputElement

      if (sessionInput && sessionInput.value) {
        storedSessionId = sessionInput.value
        // Save to localStorage for future use
        localStorage.setItem(LOCAL_STORAGE_KEY, storedSessionId)
      }
    }

    if (!storedSessionId) {
      throw new Error('No session ID available. Make sure the available-session-id input element is set by the server.')
    }

    // Cache the session ID
    sessionId.value = storedSessionId
    return storedSessionId
  }

  /**
   * Initialize session ID if not already set
   */
  function initializeSessionId(): string {
    return getOrCreateSessionId()
  }

  /**
   * Force refresh the session ID (creates a new session)
   */
  function refreshSessionId(): string {
    // Clear cached value
    sessionId.value = null
    // Clear from localStorage
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    // Get fresh session ID
    return getOrCreateSessionId()
  }

  /**
   * Get current session ID (readonly)
   */
  function getCurrentSessionId(): string | null {
    return sessionId.value
  }

  // Initialize on first use
  if (!sessionId.value) {
    try {
      initializeSessionId()
    } catch (error) {
      console.warn('Session ID not available yet:', error)
    }
  }

  return {
    sessionId: readonly(sessionId),
    getOrCreateSessionId,
    initializeSessionId,
    refreshSessionId,
    getCurrentSessionId
  }
}