<template>
  <div
    ref="editableDiv"
    class="prompt-field"
    contenteditable="true"
    @input="handleInput"
    @keydown.enter.prevent="handleSubmit"
    @focus="handleFocus"
    @blur="handleBlur"
    :data-placeholder="placeholder"
  ></div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { Broadcast } from '@strav/signal/broadcast/client'
import { useMessageStore } from './stores/messageStore'
import { useSessionId } from './composables/useSessionId'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Ask me anything...'
  },
})

const messageStore = useMessageStore()
const { getOrCreateSessionId } = useSessionId()

const sessionId = getOrCreateSessionId()
const bc = new Broadcast()
const chat = bc.subscribe(`chat/${sessionId}`)

// Listen for messages from the server and update the store
chat.on('message', (data) => {
  // Add assistant message to the store
  if (data.role === 'assistant') {
    messageStore.addAssistantMessage(data.content)
  }
})

const editableDiv = ref(null)
const isFocused = ref(false)

onMounted(() => {
  if (editableDiv.value) {
    editableDiv.value.focus()
  }

  if (!messageStore.currentSessionId) {
    messageStore.initializeStore(sessionId)
  }
})

function handleInput(event) {
  // Let the browser handle the input naturally
  // No need to update content or manipulate innerHTML
}

function handleFocus() {
  isFocused.value = true
}

function handleBlur() {
  isFocused.value = false
}

async function handleSubmit() {
  if (!editableDiv.value) return

  const content = editableDiv.value.innerText.trim()

  if (!content) return

  // Add the message to the store (this will set pending state)
  messageStore.sendMessage(content)

  // Send the message through WebSocket
  chat.send('send', { content })

  // Clear the content
  editableDiv.value.innerText = ''
  await nextTick()
  editableDiv.value.focus()
}

</script>

<style scoped>
</style>