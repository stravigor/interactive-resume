<template>
  <div class="contact-card">
    <div class="card-header" v-if="data.title">
      <h3>{{ data.title }}</h3>
    </div>

    <div class="contact-container">
      <div class="contact-item" v-if="data.email">
        <div class="contact-info">
          <span class="contact-label">EMAIL</span>
          <a :href="`mailto:${data.email}`" class="contact-value">{{ data.email }}</a>
        </div>
      </div>

      <div class="contact-item" v-if="data.phone">
        <div class="contact-info">
          <span class="contact-label">PHONE</span>
          <a :href="`tel:${data.phone}`" class="contact-value">{{ data.phone }}</a>
        </div>
      </div>

      <div class="contact-item" v-if="data.linkedin">
        <div class="contact-info">
          <span class="contact-label">LINKEDIN</span>
          <a :href="`https://${data.linkedin}`" target="_blank" class="contact-value">
            {{ data.linkedin }}
          </a>
        </div>
      </div>

      <div class="contact-item" v-if="data.github">
        <div class="contact-info">
          <span class="contact-label">GITHUB</span>
          <a :href="`https://${data.github}`" target="_blank" class="contact-value">
            {{ data.github }}
          </a>
        </div>
      </div>

      <div class="contact-item" v-if="data.location">
        <div class="contact-info">
          <span class="contact-label">LOCATION</span>
          <span class="contact-value">{{ data.location }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactData } from '../../../app/types/responses'

defineProps<{
  data: ContactData
}>()
</script>