<template>
  <v-card class="mb-4 rounded-xl border bg-surface pa-3" elevation="0">
    <div class="d-flex flex-wrap align-center justify-space-between ga-3">
      <div class="d-flex align-center ga-3 flex-nowrap">
        <v-avatar size="36" color="primary" variant="tonal" class="rounded-lg flex-shrink-0">
          <v-icon :icon="icon" size="20" color="primary" />
        </v-avatar>
        <div>
          <div class="d-flex align-center ga-2 flex-wrap">
            <span class="text-subtitle-2 font-weight-bold text-high-emphasis">
              {{ title }}
            </span>
            <v-chip
              size="x-small"
              :color="sandboxMode === 'guide' ? 'primary' : 'success'"
              variant="flat"
              class="font-weight-bold"
            >
              {{ sandboxMode === 'guide' ? 'Explain Controls' : 'Try Live' }}
            </v-chip>
          </div>
          <p class="text-caption text-medium-emphasis mb-0">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <div class="d-flex align-center flex-wrap ga-2 ms-auto">
        <!-- Guide vs Play Mode Toggle -->
        <v-btn-toggle
          :model-value="sandboxMode"
          mandatory
          density="compact"
          class="tactile-segmented-toggle"
          @update:model-value="$emit('update:sandboxMode', $event as SandboxMode)"
        >
          <v-btn value="play" size="small" class="text-none font-weight-medium px-3">
            <v-icon start icon="mdi-gamepad-variant-outline" size="15" />
            Try Live
          </v-btn>
          <v-btn value="guide" size="small" class="text-none font-weight-medium px-3">
            <v-icon start icon="mdi-lightbulb-on-outline" size="15" />
            Explain Controls
            <v-badge v-if="sandboxMode !== 'guide'" color="warning" dot floating />
          </v-btn>
        </v-btn-toggle>

        <v-btn
          size="small"
          variant="text"
          color="medium-emphasis"
          class="text-none font-weight-medium"
          prepend-icon="mdi-restore"
          :title="resetTitle || 'Reset records to default'"
          @click="$emit('reset')"
        >
          Reset
        </v-btn>
      </div>
    </div>

    <!-- Active Guide Banner (When Guide Mode is ON) -->
    <v-expand-transition>
      <div
        v-if="sandboxMode === 'guide'"
        class="guide-banner px-4 py-2 bg-primary-lighten-5 border-t mt-3 rounded-lg"
      >
        <div class="d-flex align-center justify-space-between flex-wrap ga-2">
          <div class="d-flex align-center ga-2">
            <v-avatar size="24" color="primary" variant="flat">
              <v-icon icon="mdi-cursor-default-hover" size="14" color="white" />
            </v-avatar>
            <div>
              <span class="text-caption font-weight-bold text-primary mr-1">
                Hover Mode Active:
              </span>
              <span class="text-caption text-medium-emphasis">
                Move your mouse over any numbered badge to see an instant pop-up explanation of that feature,
                its required permissions, and best practices.
              </span>
            </div>
          </div>
          <v-chip
            v-if="selectedExplanation"
            size="x-small"
            color="primary"
            variant="flat"
            closable
            @click:close="$emit('update:selectedExplanation', null)"
          >
            Focused: {{ selectedExplanation.name }}
          </v-chip>
        </div>
      </div>
    </v-expand-transition>

    <!-- Guide Explanation Drawer / Active Pinned Card -->
    <v-expand-transition>
      <div
        v-if="sandboxMode === 'guide' && selectedExplanation"
        class="explanation-details-box pa-4 bg-surface border-t mt-3 rounded-lg"
      >
        <v-card variant="tonal" color="primary" class="rounded-lg pa-3 pa-sm-4">
          <div class="d-flex flex-wrap align-start justify-space-between ga-3 mb-2">
            <div class="d-flex align-center ga-3">
              <v-avatar size="34" color="primary" variant="flat">
                <v-icon :icon="selectedExplanation.icon || 'mdi-information'" size="18" color="white" />
              </v-avatar>
              <div>
                <div class="d-flex align-center ga-2 flex-wrap">
                  <h4 class="text-subtitle-1 font-weight-bold text-high-emphasis mb-0">
                    {{ selectedExplanation.name }}
                  </h4>
                  <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                    Control #{{ selectedExplanation.badgeNumber }}
                  </v-chip>
                  <v-chip size="x-small" color="secondary" variant="tonal">
                    {{ selectedExplanation.location }}
                  </v-chip>
                </div>
                <div class="text-caption text-medium-emphasis">
                  {{ selectedExplanation.purpose }}
                </div>
              </div>
            </div>

            <v-btn
              icon="mdi-close"
              size="x-small"
              variant="text"
              color="medium-emphasis"
              @click="$emit('update:selectedExplanation', null)"
            />
          </div>

          <v-divider class="my-2 opacity-20" />

          <v-row dense class="text-caption mt-1">
            <v-col cols="12" md="6">
              <div class="font-weight-bold text-high-emphasis mb-1">
                <v-icon icon="mdi-play-circle-outline" size="14" class="mr-1 text-primary" />
                Operational Action:
              </div>
              <div class="text-medium-emphasis">
                {{ selectedExplanation.action }}
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="font-weight-bold text-high-emphasis mb-1">
                <v-icon icon="mdi-shield-lock-outline" size="14" class="mr-1 text-primary" />
                Required Permission:
              </div>
              <v-chip size="x-small" color="primary" variant="outlined" class="font-weight-bold">
                {{ selectedExplanation.permission || 'read' }}
              </v-chip>
            </v-col>
            <v-col cols="12" md="3">
              <div class="font-weight-bold text-high-emphasis mb-1">
                <v-icon icon="mdi-lightbulb-outline" size="14" class="mr-1 text-warning" />
                Administrator Tip:
              </div>
              <div class="text-medium-emphasis">
                {{ selectedExplanation.tip }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup lang="ts">
import type { ExplanationInfo, SandboxMode } from '@/types/sandbox'

defineProps<{
  title: string
  subtitle: string
  icon: string
  sandboxMode: SandboxMode
  selectedExplanation: ExplanationInfo | null
  resetTitle?: string
}>()

defineEmits<{
  (e: 'update:sandboxMode', mode: SandboxMode): void
  (e: 'update:selectedExplanation', explanation: ExplanationInfo | null): void
  (e: 'reset'): void
}>()
</script>
