<template>
  <div class="methodology-grid">
    <div class="grid-header" v-if="data.title">
      <h3>{{ data.title }}</h3>
      <p v-if="data.subtitle">{{ data.subtitle }}</p>
    </div>

    <div class="methodology-container">
      <div
        v-for="(item, index) in data.items"
        :key="index"
        class="methodology-item"
      >
        <div class="item-content">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-subtitle" v-if="item.subtitle">{{ item.subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MethodologyData } from '../../../app/types/responses'

defineProps<{
  data: MethodologyData
}>()
</script>