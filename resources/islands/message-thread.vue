<template>
  <div>
    <div>
      <MessageHeader/>
      <PredefinedQuestions/>
      <div
        v-for="message in currentMessages"
        :key="message.id"
        class="message-container"
        :class="{
          'user-message': message.role === 'user',
          'assistant-message': message.role === 'assistant'
        }"
      >
        <!-- User messages always use standard bubble -->
        <div v-if="message.role === 'user'" class="message user-message" v-html="renderMarkdown(message.content)">
        </div>

        <!-- Assistant messages can be rich or standard -->
        <template v-else-if="message.role === 'assistant'">
          <!-- Tech Stack Response -->
          <TechStackBubble
            v-if="message.metadata?.responseType === 'tech_stack' && message.metadata?.structuredData"
            :data="message.metadata.structuredData"
          />

          <!-- Experience Timeline Response -->
          <ExperienceTimeline
            v-else-if="message.metadata?.responseType === 'experience' && message.metadata?.structuredData"
            :data="message.metadata.structuredData"
          />

          <!-- Projects Cards Response -->
          <ProjectCards
            v-else-if="message.metadata?.responseType === 'projects' && message.metadata?.structuredData"
            :data="message.metadata.structuredData"
          />

          <!-- Contact Card Response -->
          <ContactCard
            v-else-if="message.metadata?.responseType === 'contact' && message.metadata?.structuredData"
            :data="message.metadata.structuredData"
          />

          <!-- Methodology Grid Response -->
          <MethodologyGrid
            v-else-if="message.metadata?.responseType === 'methodology' && message.metadata?.structuredData"
            :data="message.metadata.structuredData"
          />

          <!-- Fallback to standard message bubble -->
          <div v-else class="message assistant-message" v-html="renderMarkdown(message.content)">
          </div>
        </template>
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
import PredefinedQuestions from './predefined-questions.vue'
import TechStackBubble from './components/TechStackBubble.vue'
import ExperienceTimeline from './components/ExperienceTimeline.vue'
import ProjectCards from './components/ProjectCards.vue'
import ContactCard from './components/ContactCard.vue'
import MethodologyGrid from './components/MethodologyGrid.vue'

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