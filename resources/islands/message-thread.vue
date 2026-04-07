<template>
  <div>
    <div>
      <MessageHeader/>
      <div
        v-for="message in currentMessages"
        :key="message.id"
        class="message-container"
        :class="{
          'user-message': message.role === 'user',
          'assistant-message': message.role === 'assistant'
        }"
      >
        <div class="message" v-html="renderMarkdown(message.content)">
        </div>
      </div>
      <!-- Activity indicator when processing -->
      <div v-if="isPending" class="activity-indicator">
        Processing...
      </div>
    </div>

    <div v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMessageStore } from './stores/messageStore'
import { useSessionId } from './composables/useSessionId'
import { useMarkdown } from './composables/useMarkdown'
import MessageHeader from './message-header.vue'

const messageStore = useMessageStore()
const { getOrCreateSessionId } = useSessionId()
const { renderMarkdown } = useMarkdown()
const { currentMessages, hasMessages, isLoading, error, isPending } = storeToRefs(messageStore)

const scrollToBottom = async () => {
  await nextTick()
  // Scroll the window to the bottom
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

watch(currentMessages, () => {
  scrollToBottom()
}, { deep: true })

watch(isPending, () => {
  scrollToBottom()
})

onMounted(() => {
  const sessionId = getOrCreateSessionId()
  messageStore.initializeStore(sessionId)
})
</script>