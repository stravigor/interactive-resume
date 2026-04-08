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
  const saved = localStorage.getItem('theme') || 'light'
  const newTheme = (saved === 'light') ? 'dark' : 'light'
  const html = document.documentElement
  html.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}
</script>