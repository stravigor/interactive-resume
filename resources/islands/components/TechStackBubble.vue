<template>
  <div class="tech-stack-bubble">
    <div class="bubble-header" v-if="data.title">
      <h3>{{ data.title }}</h3>
    </div>

    <div class="tech-stack-items">
      <div
        v-for="(item, index) in data.items"
        :key="index"
        class="tech-item"
      >
        <div class="tech-info">
          <span class="tech-name">{{ item.name }}</span>
          <span class="tech-percentage">{{ item.proficiency }}%</span>
        </div>
        <div class="progress-bar">
          <div
            class="progress-fill"
            :class="`progress-${item.color || 'primary'}`"
            :style="{ width: `${item.proficiency}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div class="bubble-footer" v-if="data.footer">
      <p>{{ data.footer }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TechStackData } from '../../../app/types/responses'

defineProps<{
  data: TechStackData
}>()
</script>