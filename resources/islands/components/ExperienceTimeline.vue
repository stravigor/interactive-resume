<template>
  <div class="experience-timeline">
    <div class="timeline-header" v-if="data.title">
      <h3>{{ data.title }}</h3>
    </div>

    <div class="timeline-items">
      <div
        v-for="(item, index) in data.items"
        :key="index"
        class="timeline-item"
        :class="{ current: item.current }"
      >
        <div class="timeline-marker">
          <div class="marker-dot"></div>
        </div>

        <div class="timeline-content">
          <div class="period">{{ item.period }}</div>
          <div class="title">{{ item.title }}</div>
          <div class="company">{{ item.company }}</div>
          <div class="description">{{ item.description }}</div>
          <div class="highlights" v-if="item.highlights">
            <span v-for="(highlight, hIndex) in item.highlights" :key="hIndex">
              {{ highlight }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExperienceData } from '../../../app/types/responses'

defineProps<{
  data: ExperienceData
}>()
</script>