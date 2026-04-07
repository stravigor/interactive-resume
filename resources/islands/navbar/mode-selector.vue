<template>
  <span @click.prevent="toggleMode"><i class="far fa-adjust"></i></span>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const saved = localStorage.getItem('theme') || 'dark'
  const b = document.body.classList
  b.remove('dark')
  b.remove('light')
  b.add(saved)
})

function toggleMode() {
  const body = document.body
  if (!body.classList.replace('dark', 'light')) {
    body.classList.replace('light', 'dark')
  }
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light')
}
</script>