<template>
  <div class="predefined-questions">
  <span @click="sendPredefinedMessage('What is your tech stack?')">What's your tech stack?</span>
  <span @click="sendPredefinedMessage('How can I reach you?')">How can I reach you?</span>
  <span @click="sendPredefinedMessage('Can you send me your resume?')">Can you send me your resume?</span>
  <span @click="sendPredefinedMessage('Tell me about your experience')">Tell me about your experience</span>
  <span @click="sendPredefinedMessage('Walk me through your projects')">Walk me through your projects</span>
  <span @click="sendPredefinedMessage('How do you lead technical teams?')">How do you lead technical teams?</span>
  <span @click="sendPredefinedMessage('How do you approach AI collaboration?')">How do you approach AI collaboration?</span>
  </div>
</template>


<script setup lang="ts">
import { Broadcast } from '@strav/signal/broadcast/client'
import { useMessageStore } from './stores/messageStore'
import { useSessionId } from './composables/useSessionId'

const messageStore = useMessageStore()
const { getOrCreateSessionId } = useSessionId()

const sessionId = getOrCreateSessionId()
const bc = new Broadcast()
const chat = bc.subscribe(`chat/${sessionId}`)

function sendPredefinedMessage(content: string) {
  if (!messageStore.currentSessionId) {
    messageStore.initializeStore(sessionId)
  }
  messageStore.sendMessage(content)
  chat.send('send', { content })
}
</script>