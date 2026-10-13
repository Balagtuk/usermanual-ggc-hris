<template>
  <section id="intro" class="introduction-section mb-8">
    <!-- Top Minimal Breadcrumb -->
    <BaseBreadcrumb
      :title="INTRO_CONTENT.title"
      :breadcrumbs="breadcrumbs"
    />

    <!-- Minimalist Modern Hero Card (No Outlines) -->
    <v-card
      class="hero-card pa-6 pa-md-8 mb-6 rounded-lg"
      elevation="0"
    >
      <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-3">
        <div class="d-flex align-center ga-2 flex-wrap">
          <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
            Chapter 1
          </v-chip>
          <v-chip size="x-small" color="secondary" variant="tonal" class="font-weight-medium">
            Standard Operating Procedure
          </v-chip>
          <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-bold">
            {{ INTRO_CONTENT.version }}
          </v-chip>
        </div>
        <span class="text-caption text-medium-emphasis">
          Goodlife Group of Companies &bull; HRIS Governance
        </span>
      </div>

      <h1 class="text-h4 text-md-h3 font-weight-bold mb-3 tracking-tight">
        {{ INTRO_CONTENT.title }}
      </h1>

      <p class="text-body-1 text-medium-emphasis max-width-text leading-relaxed mb-6">
        {{ INTRO_CONTENT.subtitle }}
      </p>

      <div class="d-flex flex-wrap ga-3">
        <v-btn
          color="primary"
          variant="flat"
          class="font-weight-bold text-none"
          prepend-icon="mdi-arrow-right-circle-outline"
          @click="$emit('start-tour')"
        >
          Begin Reading (Chapter 1: User)
        </v-btn>
        <v-btn
          variant="tonal"
          color="primary"
          class="text-none font-weight-medium"
          prepend-icon="mdi-format-list-checks"
          @click="scrollTo('sec-checklist')"
        >
          Pre-Flight Checklist
        </v-btn>
      </div>
    </v-card>

    <!-- Target Audience & Governance Roles -->
    <v-card class="pa-6 rounded-lg mb-6 bg-surface" elevation="0">
      <div class="d-flex align-center mb-4">
        <div class="section-icon-badge me-3">
          <v-icon icon="mdi-account-group-outline" size="20" color="primary" />
        </div>
        <div>
          <h2 class="text-subtitle-1 font-weight-bold">Audience & Governance Roles</h2>
          <p class="text-caption text-medium-emphasis mb-0">
            Intended administrators and their operational scope:
          </p>
        </div>
      </div>

      <v-row dense>
        <v-col
          v-for="aud in INTRO_CONTENT.targetAudience"
          :key="aud.role"
          cols="12"
          md="4"
        >
          <div class="pa-4 h-100 rounded-lg inner-card">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon :icon="aud.icon" color="primary" size="20" />
              <h3 class="text-subtitle-2 font-weight-bold mb-0">{{ aud.role }}</h3>
            </div>
            <p class="text-caption text-medium-emphasis mb-0 leading-relaxed">
              {{ aud.description }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Organizational Sequence / Hierarchy Flow -->
    <v-card class="pa-6 rounded-lg mb-6 bg-surface" elevation="0">
      <div class="d-flex align-center mb-4">
        <div class="section-icon-badge me-3">
          <v-icon icon="mdi-sitemap-outline" size="20" color="primary" />
        </div>
        <div>
          <h2 class="text-subtitle-1 font-weight-bold">Parent-to-Child Configuration Hierarchy</h2>
          <p class="text-caption text-medium-emphasis mb-0">
            Strict relational dependency order for initial system setup:
          </p>
        </div>
      </div>

      <!-- Flow visualizer chips -->
      <div class="pa-3 rounded-lg inner-card d-flex flex-wrap align-center ga-2 justify-center mb-4">
        <template v-for="(step, sIdx) in INTRO_CONTENT.hierarchyFlow" :key="step.step">
          <v-chip
            :color="sIdx === 0 ? 'primary' : 'secondary'"
            :variant="sIdx === 0 ? 'flat' : 'tonal'"
            size="small"
            class="font-weight-medium"
            :prepend-icon="step.icon"
          >
            {{ step.step }}. {{ step.name }}
          </v-chip>
          <v-icon
            v-if="sIdx < INTRO_CONTENT.hierarchyFlow.length - 1"
            icon="mdi-chevron-right"
            size="16"
            class="text-medium-emphasis"
          />
        </template>
      </div>

      <!-- Deep Dive Hierarchy Grid -->
      <v-row dense>
        <v-col
          v-for="step in INTRO_CONTENT.hierarchyFlow"
          :key="step.step"
          cols="12"
          sm="6"
          md="3"
        >
          <div class="pa-3 rounded-lg inner-card h-100">
            <div class="d-flex align-center ga-2 mb-1">
              <span class="step-num">{{ step.step }}</span>
              <div class="text-subtitle-2 font-weight-bold">{{ step.name }}</div>
            </div>
            <p class="text-caption text-medium-emphasis mb-0 leading-relaxed">
              {{ step.desc }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Core Security & Architectural Principles -->
    <v-card class="pa-6 rounded-lg mb-6 bg-surface" elevation="0">
      <div class="d-flex align-center mb-4">
        <div class="section-icon-badge me-3">
          <v-icon icon="mdi-shield-check-outline" size="20" color="primary" />
        </div>
        <div>
          <h2 class="text-subtitle-1 font-weight-bold">System Administration Golden Rules</h2>
          <p class="text-caption text-medium-emphasis mb-0">
            Key architectural principles governing data management and user access:
          </p>
        </div>
      </div>

      <v-row dense>
        <v-col
          v-for="rule in INTRO_CONTENT.corePrinciples"
          :key="rule.title"
          cols="12"
          md="6"
        >
          <div class="pa-4 h-100 rounded-lg inner-card">
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon :icon="rule.icon" color="primary" size="20" />
              <h3 class="text-subtitle-2 font-weight-bold mb-0">{{ rule.title }}</h3>
            </div>
            <p class="text-caption text-medium-emphasis mb-0 leading-relaxed">
              {{ rule.text }}
            </p>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <!-- Pre-Flight Checklist -->
    <v-card id="sec-checklist" class="pa-6 rounded-lg mb-6 bg-surface" elevation="0">
      <div class="d-flex align-center mb-4">
        <div class="section-icon-badge me-3">
          <v-icon icon="mdi-checkbox-marked-circle-outline" size="20" color="primary" />
        </div>
        <div>
          <h2 class="text-subtitle-1 font-weight-bold">System Setup Pre-Flight Checklist</h2>
          <p class="text-caption text-medium-emphasis mb-0">
            Chronological checklist for onboarding a new organization branch:
          </p>
        </div>
      </div>

      <div class="rounded-lg overflow-hidden inner-card">
        <v-list density="compact" class="pa-0 bg-transparent">
          <v-list-item
            v-for="item in INTRO_CONTENT.preflightChecklist"
            :key="item.number"
            class="py-3"
          >
            <template #prepend>
              <span class="step-num me-3">{{ item.number }}</span>
            </template>

            <v-list-item-title class="font-weight-bold text-subtitle-2">
              {{ item.title }}
            </v-list-item-title>
            <v-list-item-subtitle class="text-caption text-medium-emphasis mt-1">
              {{ item.detail }}
            </v-list-item-subtitle>

            <template #append>
              <v-icon icon="mdi-check-circle-outline" color="primary" size="18" />
            </template>
          </v-list-item>
        </v-list>
      </div>
    </v-card>

    <!-- Quick Module Navigation Catalog -->
    <v-card class="pa-6 rounded-lg bg-surface" elevation="0">
      <div class="mb-4">
        <h2 class="text-subtitle-1 font-weight-bold">Modules Index</h2>
        <p class="text-caption text-medium-emphasis mb-0">
          Direct navigation to each administration section:
        </p>
      </div>

      <v-row dense>
        <v-col
          v-for="mod in modules"
          :key="mod.id"
          cols="12"
          sm="6"
          md="4"
        >
          <div
            class="module-index-card pa-4 h-100 rounded-lg inner-card cursor-pointer"
            @click="$emit('select-module', mod.id)"
          >
            <div class="d-flex align-start justify-space-between mb-2">
              <span class="step-num">{{ mod.num }}</span>
              <code class="text-caption text-primary font-weight-medium">{{ mod.route }}</code>
            </div>
            <h3 class="text-subtitle-2 font-weight-bold mb-1">{{ mod.title }}</h3>
            <p class="text-caption text-medium-emphasis mb-3 line-clamp-2">
              {{ mod.description }}
            </p>
            <div class="d-flex align-center text-primary text-caption font-weight-semibold">
              <span>Read Chapter</span>
              <v-icon icon="mdi-arrow-right" size="14" class="ml-1" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </section>
</template>

<script setup lang="ts">
import { INTRO_CONTENT, type ModuleDoc } from '@/data/manualData'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'

defineProps<{
  modules: ModuleDoc[]
}>()

defineEmits<{
  (e: 'start-tour'): void
  (e: 'select-module', id: string): void
}>()

const breadcrumbs = [
  { text: 'Manual', disabled: false },
  { text: 'Getting Started', disabled: false },
  { text: 'Introduction & Setup', disabled: true },
]

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.max-width-text {
  max-width: 780px;
}

.tracking-tight {
  letter-spacing: -0.02em;
}

.leading-relaxed {
  line-height: 1.65;
}

.hero-card {
  border-radius: 8px !important;
  background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.08) 0%, rgba(var(--v-theme-surface), 1) 100%);
}

.section-icon-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background-color: rgba(var(--v-theme-primary), 0.08);
}

.step-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.module-index-card {
  transition: all 0.18s ease-in-out;
}

.module-index-card:hover {
  background-color: rgba(var(--v-theme-primary), 0.08) !important;
  transform: translateY(-2px);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
