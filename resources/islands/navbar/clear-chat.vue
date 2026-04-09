<template>
  <div class="clear-chat-container">
    <span class="clear-chat-button" @click="showModal = true">
      <i class="far fa-trash"></i>
    </span>

    <!-- Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="modal-overlay" @click.self="showModal = false">
          <div class="modal-content">
            <div class="modal-header">
              <h3>Clear Chat History</h3>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to clear all messages and start a new conversation?</p>
              <p class="warning-text">This action cannot be undone.</p>
            </div>
            <div class="modal-actions">
              <button class="btn btn-cancel" @click="showModal = false">
                Cancel
              </button>
              <button class="btn btn-confirm" @click="clearChat">
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessageStore } from '../stores/messageStore'

const showModal = ref(false)
const messageStore = useMessageStore()

function clearChat() {
  // Clear messages from the store
  messageStore.clearMessages()

  // Clear session ID from localStorage
  localStorage.removeItem('chatSessionId')

  // Close the modal
  showModal.value = false

  // Reload the page to get a new session from the server
  window.location.reload()
}
</script>
