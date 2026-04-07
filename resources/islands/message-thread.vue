<template>
  <div>
    <div
      ref="messagesContainer"
    >
      <div v-if="isLoading">
        <div ></div>
      </div>

      <div v-else-if="!hasMessages" >
        <p >No messages yet</p>
        <p >Start a conversation by typing a message below</p>
      </div>

      <div v-else>
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

const messageStore = useMessageStore()
const { getOrCreateSessionId } = useSessionId()
const { renderMarkdown } = useMarkdown()
const { currentMessages, hasMessages, isLoading, error, isPending } = storeToRefs(messageStore)

const messagesContainer = ref<HTMLElement>()

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