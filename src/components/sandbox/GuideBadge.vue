<template>
  <v-menu
    v-model="isOpen"
    open-on-hover
    :open-delay="50"
    :close-delay="150"
    :location="location || 'top center'"
    :close-on-content-click="false"
    max-width="380"
  >
    <template #activator="{ props: menuProps }">
      <button
        type="button"
        v-bind="menuProps"
        class="guide-badge-btn"
        :class="[small ? 'guide-badge-small' : 'guide-badge', { 'is-active': isOpen }]"
        :aria-label="`Explanation for ${explanation.name}`"
        @mouseenter="$emit('hover', explanation)"
      >
        <span>{{ explanation.badgeNumber || badgeNumber }}</span>
      </button>
    </template>

    <!-- Hover Explanation Floating Popup Card -->
    <v-card class="guide-popup-card rounded-xl pa-4 elevation-10 border bg-surface" max-width="380">
      <!-- Header -->
      <div class="d-flex align-start ga-3 mb-2">
        <v-avatar size="32" color="primary" variant="flat" class="elevation-1 flex-shrink-0">
          <v-icon :icon="explanation.icon || 'mdi-information'" size="18" color="white" />
        </v-avatar>
        <div class="flex-grow-1">
          <div class="d-flex align-center justify-space-between ga-2">
            <h4 class="text-subtitle-2 font-weight-bold text-high-emphasis mb-0 leading-tight">
              {{ explanation.name }}
            </h4>
            <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold flex-shrink-0">
              #{{ explanation.badgeNumber }}
            </v-chip>
          </div>
          <div class="text-caption text-medium-emphasis" style="font-size: 0.72rem;">
            {{ explanation.location }}
          </div>
        </div>
      </div>

      <!-- Operational Purpose -->
      <p class="text-caption text-high-emphasis mb-2 leading-relaxed">
        {{ explanation.purpose }}
      </p>

      <v-divider class="my-2 opacity-30" />

      <!-- Action & Permission -->
      <div class="mb-2">
        <div class="text-caption font-weight-bold text-primary mb-1 d-flex align-center ga-1" style="font-size: 0.72rem;">
          <v-icon icon="mdi-play-circle-outline" size="13" />
          <span>OPERATIONAL ACTION:</span>
        </div>
        <div class="text-caption text-medium-emphasis" style="font-size: 0.73rem; line-height: 1.35;">
          {{ explanation.action }}
        </div>
      </div>

      <!-- Permission & Rule Badges -->
      <div class="d-flex align-center justify-space-between ga-2 mb-2 flex-wrap">
        <span class="text-caption font-weight-bold text-disabled" style="font-size: 0.68rem;">PERMISSION:</span>
        <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-bold">
          <v-icon start icon="mdi-shield-lock-outline" size="12" />
          {{ explanation.permission || 'user.read' }}
        </v-chip>
      </div>

      <!-- Pro Tip Callout -->
      <div class="tip-callout pa-2 rounded-lg bg-surface-variant border d-flex align-start ga-2">
        <v-icon icon="mdi-lightbulb-on" size="15" color="warning" class="mt-0.5 flex-shrink-0" />
        <div class="text-caption text-medium-emphasis" style="font-size: 0.7rem; line-height: 1.3;">
          <strong class="text-high-emphasis">Tip:</strong> {{ explanation.tip }}
        </div>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ExplanationInfo } from './UserManagementSandbox.vue'

defineProps<{
  badgeNumber?: number
  explanation: ExplanationInfo
  small?: boolean
  location?: 'top center' | 'bottom center' | 'left center' | 'right center' | 'bottom' | 'top'
}>()

defineEmits<{
  (e: 'hover', explanation: ExplanationInfo): void
}>()

const isOpen = ref(false)
</script>

<style scoped>
.guide-badge-btn {
  border: none;
  outline: none;
  user-select: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.guide-badge {
  position: absolute;
  top: -10px;
  left: -8px;
  z-index: 20;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 2px 8px rgba(var(--v-theme-primary), 0.5);
  animation: pulse-badge 2s infinite;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.guide-badge:hover,
.guide-badge.is-active {
  transform: scale(1.15);
  box-shadow: 0 0 12px rgba(var(--v-theme-primary), 0.8);
  animation: none;
}

.guide-badge-small {
  position: absolute;
  top: -8px;
  right: -6px;
  z-index: 20;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(var(--v-theme-warning));
  color: #000;
  font-size: 10px;
  font-weight: 800;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s ease;
}

.guide-badge-small:hover,
.guide-badge-small.is-active {
  transform: scale(1.2);
}

@keyframes pulse-badge {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.7);
  }
  70% {
    box-shadow: 0 0 0 9px rgba(var(--v-theme-primary), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0);
  }
}

.guide-popup-card {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
  pointer-events: auto;
}

.tip-callout {
  background-color: rgba(var(--v-theme-on-surface), 0.03);
}
</style>
