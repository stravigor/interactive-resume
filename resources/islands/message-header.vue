<template>
  <div class="message-header">
    <div class="photo-container">
      <div class="profile-photo-container">
        <img src="/images/liva-removebg-preview.png" alt="Liva" class="avatar">
      </div>
    </div>
    <div class="">
      <p class="hello">Hey there, <em>I'm Liva</em></p>
      <p>I am a software engineer with a passion for building high-quality, maintainable,
        clean and scalable code in PHP, Typescript, VueJS, Laravel, AdonisJS and more.</p>
        </div>
  </div>
  <div class="actions">
    <button @click="sendPredefinedMessage('How can I contact you?')">Contact</button>
    <button @click="sendPredefinedMessage('Can you send me your resume?')">Resume</button>
    <button @click="sendPredefinedMessage('Show me the list of your portfolio')">Portfolio</button>
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