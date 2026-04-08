<template>
  <div class="project-cards">
    <div class="cards-header" v-if="data.title">
      <h3>{{ data.title }}</h3>
      <p v-if="data.subtitle">{{ data.subtitle }}</p>
    </div>

    <div class="cards-container">
      <div
        v-for="(project, index) in data.projects"
        :key="index"
        class="project-card"
        :class="{ featured: project.featured }"
      >
        <div class="card-header">
          <div class="project-icon">
            <span class="icon-fallback">{{ project.name.charAt(0).toUpperCase() }}</span>
          </div>
          <div class="project-name">{{ project.name }}</div>
        </div>

        <div class="project-description">
          {{ project.description }}
        </div>

        <div class="project-tech">
          <span
            v-for="(tech, techIndex) in project.techStack"
            :key="techIndex"
            class="tech-tag"
          >
            {{ tech }}
          </span>
        </div>

        <a v-if="project.url" :href="project.url" target="_blank" class="project-link">
          View Project →
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProjectsData } from '../../../app/types/responses'

defineProps<{
  data: ProjectsData
}>()
</script>