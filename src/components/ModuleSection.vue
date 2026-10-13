<template>
  <article :id="module.id" class="module-wrapper mb-8">
    <!-- Top Minimal Breadcrumb -->
    <BaseBreadcrumb
      :title="module.title"
      :breadcrumbs="breadcrumbs"
    />

    <!-- Main Module Documentation Card (Borderless) -->
    <v-card class="module-card pa-4 pa-sm-6 pa-md-8 rounded-lg bg-surface" elevation="0">
      <!-- Header Area: Chapter, Title, Route & Permissions -->
      <header class="d-flex flex-wrap align-start justify-space-between ga-3 mb-6 pb-2">
        <div class="d-flex align-start ga-3">
          <div class="chapter-number-badge">
            {{ module.num }}
          </div>
          <div>
            <div class="d-flex align-center ga-2 flex-wrap mb-1">
              <h1 class="text-h5 font-weight-bold tracking-tight mb-0">
                {{ module.title }}
              </h1>
              <!-- Menu Navigation Path (User-friendly) -->
              <v-chip
                v-if="module.menuPath"
                size="x-small"
                color="primary"
                variant="tonal"
                class="font-weight-medium"
              >
                <v-icon start icon="mdi-navigation-variant-outline" size="13" />
                Menu: {{ module.menuPath }}
              </v-chip>
              <v-chip v-else size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                Chapter {{ module.num }}
              </v-chip>

              <v-chip size="x-small" color="secondary" variant="tonal" class="font-weight-medium">
                {{ module.category }}
              </v-chip>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ module.description }}
            </p>
          </div>
        </div>

        <!-- Authorized Roles / Permissions & Page Tag -->
        <div class="d-flex flex-column align-sm-end align-start ga-2">
          <span class="text-caption font-weight-semibold text-primary">
            Chapter {{ module.num }} of 10
          </span>
          <div v-if="module.authorizedRoles && module.authorizedRoles.length > 0" class="d-flex flex-wrap align-center ga-1">
            <span class="text-caption font-weight-medium text-medium-emphasis mr-1">Authorized Roles:</span>
            <v-chip
              v-for="role in module.authorizedRoles"
              :key="role"
              size="x-small"
              variant="tonal"
              color="primary"
              class="font-weight-medium"
            >
              <v-icon start icon="mdi-account-lock-outline" size="13" />
              {{ role }}
            </v-chip>
          </div>
          <div v-else class="d-flex flex-wrap ga-1">
            <v-chip
              v-for="perm in module.permissions"
              :key="perm"
              size="x-small"
              variant="tonal"
              color="secondary"
              class="font-weight-medium"
            >
              <v-icon start icon="mdi-shield-check-outline" size="13" />
              {{ perm }}
            </v-chip>
          </div>
        </div>
      </header>

      <v-divider class="my-5 opacity-40" />

      <!-- Module Overview & Purpose -->
      <section class="mb-8">
        <h2 class="section-title mb-2">
          Overview & System Purpose
        </h2>
        <p class="text-body-1 text-high-emphasis leading-relaxed mb-0">
          {{ module.overview }}
        </p>
      </section>

      <!-- Screen Components & Buttons Directory -->
      <section v-if="module.uiFeatures && module.uiFeatures.length > 0" class="mb-8">
        <div class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2">
          <div>
            <h2 class="section-title mb-1">
              Screen Components & Buttons Directory
            </h2>
            <p class="text-caption text-medium-emphasis mb-0">
              Detailed operational breakdown of every filter, button, view toggle, and control on this screen:
            </p>
          </div>
          <v-chip size="small" color="primary" variant="tonal" class="font-weight-medium">
            <v-icon start icon="mdi-tune-vertical" size="15" />
            {{ module.uiFeatures.length }} Interactive Controls
          </v-chip>
        </div>

        <v-card class="rounded-lg overflow-hidden border inner-card" elevation="0">
          <v-table density="comfortable" class="doc-controls-table bg-transparent">
            <thead>
              <tr>
                <th class="font-weight-bold text-caption text-uppercase" style="width: 220px;">Component / Button</th>
                <th class="font-weight-bold text-caption text-uppercase" style="width: 170px;">Screen Location</th>
                <th class="font-weight-bold text-caption text-uppercase">Operational Purpose & Functionality</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ctrl in module.uiFeatures" :key="ctrl.name" class="control-row">
                <td class="py-3">
                  <div class="d-flex align-center ga-2">
                    <v-avatar size="28" color="primary" variant="tonal" class="rounded">
                      <v-icon :icon="ctrl.icon || 'mdi-cursor-default-click-outline'" size="16" color="primary" />
                    </v-avatar>
                    <span class="font-weight-bold text-body-2 text-high-emphasis">{{ ctrl.name }}</span>
                  </div>
                </td>
                <td class="py-3">
                  <v-chip size="x-small" variant="tonal" color="secondary" class="font-weight-medium">
                    {{ ctrl.location }}
                  </v-chip>
                </td>
                <td class="py-3">
                  <div class="text-body-2 font-weight-medium text-high-emphasis mb-1">
                    {{ ctrl.purpose }}
                  </div>
                  <div class="text-caption text-medium-emphasis leading-relaxed">
                    {{ ctrl.action }}
                  </div>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </section>

      <!-- Interface Screenshot Visual Reference (Only for modules without visual step handbook) -->
      <section v-if="!hasVisualSteps" class="mb-8">
        <ModuleScreenshot :module="module" />
      </section>

      <!-- Step-by-Step Operating Procedure -->
      <section v-if="module.steps && module.steps.length > 0" class="mb-8">
        <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
          <div>
            <h2 class="section-title mb-1">
              {{ hasVisualSteps ? 'Step-by-Step Handbook Walkthrough' : 'Step-by-Step Procedure' }}
            </h2>
            <p v-if="hasVisualSteps" class="text-caption text-medium-emphasis mb-0">
              Follow each visual step below to complete standard operations in this module. Click any screenshot to view full resolution.
            </p>
          </div>
          <v-chip v-if="hasVisualSteps" size="small" color="primary" variant="tonal" class="font-weight-bold">
            <v-icon start icon="mdi-book-open-page-variant-outline" size="16" />
            {{ module.steps.length }} Visual Steps
          </v-chip>
        </div>

        <!-- Sequential Visual Walkthrough (Handbook Style for User, Entity, Branch) -->
        <div v-if="hasVisualSteps" class="d-flex flex-column ga-6">
          <v-card
            v-for="step in module.steps"
            :key="step.number"
            class="visual-step-card rounded-lg pa-4 pa-sm-5 pa-md-6 inner-card"
            elevation="0"
          >
            <!-- Step Header Bar -->
            <div class="d-flex flex-wrap align-center justify-space-between ga-3 mb-3">
              <div class="d-flex align-center ga-3">
                <span class="step-badge">STEP 0{{ step.number }}</span>
                <h3 class="text-subtitle-1 font-weight-bold mb-0 text-high-emphasis">
                  {{ step.title }}
                </h3>
              </div>
              <div class="d-flex align-center ga-2">
                <v-btn
                  size="x-small"
                  variant="text"
                  color="medium-emphasis"
                  :prepend-icon="copiedStep === step.number ? 'mdi-check' : 'mdi-link-variant'"
                  class="text-none font-weight-medium"
                  :title="copiedStep === step.number ? 'Link copied!' : 'Copy direct link to this step'"
                  aria-label="Copy step link"
                  @click="copyStepLink(step.number)"
                >
                  {{ copiedStep === step.number ? 'Copied!' : 'Copy link' }}
                </v-btn>
                <v-chip
                  v-if="step.image"
                  size="x-small"
                  variant="tonal"
                  color="primary"
                  class="font-weight-medium cursor-pointer"
                  @click="openLightbox(step)"
                >
                  <v-icon start icon="mdi-magnify-plus-outline" size="13" />
                  Expand image
                </v-chip>
              </div>
            </div>

            <!-- Step Operational Guidance Text -->
            <p class="text-body-2 text-high-emphasis leading-relaxed mb-4">
              {{ step.description }}
            </p>

            <!-- Embedded Step Screenshot Frame -->
            <div
              v-if="step.image"
              class="step-image-frame rounded-lg overflow-hidden border cursor-pointer bg-background position-relative"
              @click="openLightbox(step)"
            >
              <!-- Window top bar -->
              <div class="window-bar px-3 px-sm-4 py-2 bg-surface-variant d-flex align-center justify-space-between border-b">
                <div class="d-flex align-center ga-2 text-truncate">
                  <span class="window-dot d-none d-sm-inline-block" style="background-color: rgba(var(--v-theme-on-surface), 0.25);" />
                  <span class="window-dot d-none d-sm-inline-block" style="background-color: rgba(var(--v-theme-on-surface), 0.25);" />
                  <span class="window-dot d-none d-sm-inline-block" style="background-color: rgba(var(--v-theme-on-surface), 0.25);" />
                  <span class="text-caption font-weight-medium ml-1 ml-sm-2 text-medium-emphasis text-truncate">
                    Step {{ step.number }}: {{ step.title }}
                  </span>
                </div>
                <v-chip size="x-small" variant="tonal" color="primary" class="d-none d-sm-inline-flex flex-shrink-0">
                  Screenshot Reference
                </v-chip>
              </div>

              <!-- Real Image View -->
              <div class="position-relative">
                <v-img
                  :src="step.image"
                  :alt="step.alt || step.title"
                  max-height="460"
                  cover
                  class="step-screenshot-img"
                >
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height bg-surface-variant pa-8">
                      <v-progress-circular indeterminate color="primary" size="32" />
                    </div>
                  </template>
                </v-img>

                <!-- Hover Overlay -->
                <div class="step-image-overlay d-flex align-center justify-center">
                  <v-chip color="white" variant="flat" class="text-primary font-weight-bold">
                    <v-icon start icon="mdi-arrow-expand" />
                    Click to View Full-Size Screenshot
                  </v-chip>
                </div>
              </div>

              <!-- Caption & Highlights Footer -->
              <div class="pa-4 bg-surface border-t">
                <p v-if="step.caption" class="text-body-2 font-weight-medium text-high-emphasis mb-2 leading-relaxed">
                  {{ step.caption }}
                </p>

                <div v-if="step.highlights && step.highlights.length > 0" class="d-flex flex-wrap align-center ga-1 pt-1">
                  <span class="text-caption font-weight-bold text-medium-emphasis mr-1">Visible Features & Controls:</span>
                  <v-chip
                    v-for="hl in step.highlights"
                    :key="hl"
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="font-weight-medium"
                  >
                    <v-icon start icon="mdi-check-circle-outline" size="12" />
                    {{ hl }}
                  </v-chip>
                </div>
              </div>
            </div>

            <!-- Highlights & Notes Footer when no image is specified -->
            <div
              v-else-if="step.caption || (step.highlights && step.highlights.length > 0)"
              class="pa-4 bg-surface rounded-lg border mt-2"
            >
              <p v-if="step.caption" class="text-body-2 font-weight-medium text-high-emphasis mb-2 leading-relaxed">
                {{ step.caption }}
              </p>

              <div v-if="step.highlights && step.highlights.length > 0" class="d-flex flex-wrap align-center ga-1 pt-1">
                <span class="text-caption font-weight-bold text-medium-emphasis mr-1">Visible Features & Controls:</span>
                <v-chip
                  v-for="hl in step.highlights"
                  :key="hl"
                  size="x-small"
                  variant="tonal"
                  color="primary"
                  class="font-weight-medium"
                >
                  <v-icon start icon="mdi-check-circle-outline" size="12" />
                  {{ hl }}
                </v-chip>
              </div>
            </div>
          </v-card>
        </div>

        <!-- Standard Compact Grid for Modules 4-9 (No step images) -->
        <v-row v-else dense>
          <v-col
            v-for="step in module.steps"
            :key="step.number"
            cols="12"
            sm="6"
            md="6"
            lg="3"
          >
            <div class="step-card pa-4 rounded-lg h-100 inner-card">
              <div class="d-flex align-center ga-2 mb-2">
                <span class="step-circle">{{ step.number }}</span>
                <h3 class="text-subtitle-2 font-weight-bold mb-0">
                  {{ step.title }}
                </h3>
              </div>
              <p class="text-caption text-medium-emphasis mb-0 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- Form Fields Reference Table -->
      <section v-if="module.fields && module.fields.length > 0" class="mb-8">
        <h2 class="section-title mb-3">
          Form Fields Reference
        </h2>
        <div class="rounded-lg overflow-hidden inner-card">
          <v-table density="comfortable" hover class="doc-table">
            <thead>
              <tr>
                <th style="width: 220px;">Field Name</th>
                <th style="width: 130px;">Requirement</th>
                <th style="width: 120px;">Data Type</th>
                <th>Validation / Rules & Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in module.fields" :key="field.name">
                <td class="font-weight-medium">
                  <code class="field-name-code">{{ field.name }}</code>
                </td>
                <td>
                  <v-chip
                    size="x-small"
                    :color="field.requirement === 'Required' ? 'primary' : 'secondary'"
                    variant="flat"
                    class="font-weight-bold"
                  >
                    {{ field.requirement }}
                  </v-chip>
                </td>
                <td>
                  <span class="text-caption text-medium-emphasis font-mono">
                    {{ field.dataType || 'String' }}
                  </span>
                </td>
                <td class="text-body-2 text-medium-emphasis py-2">
                  {{ field.description }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </section>

      <!-- Additional Matrix Table (Role Permissions Matrix, etc.) -->
      <section v-if="module.additionalTable" class="mb-8">
        <h2 class="section-title mb-3">
          {{ module.additionalTable.title }}
        </h2>
        <div class="rounded-lg overflow-hidden inner-card">
          <v-table density="comfortable" hover class="doc-table">
            <thead>
              <tr>
                <th
                  v-for="h in module.additionalTable.headers"
                  :key="h"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in module.additionalTable.rows" :key="idx">
                <td class="font-weight-medium text-body-2 text-primary">
                  {{ row.col1 }}
                </td>
                <td>
                  <code class="field-name-code">{{ row.col2 }}</code>
                </td>
                <td class="text-body-2 text-medium-emphasis">
                  {{ row.col3 }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </section>

      <!-- Administrative Best Practices / Callout Alert with Distinct Visual Treatments -->
      <v-alert
        v-if="module.callout"
        :color="calloutColor"
        variant="tonal"
        class="rounded-lg mt-5 border-s-4"
        density="comfortable"
      >
        <template #prepend>
          <v-icon :icon="calloutIcon" size="22" class="me-2" />
        </template>
        <template #title>
          <span class="font-weight-bold text-subtitle-2">{{ module.callout.title }}</span>
        </template>
        <div class="text-body-2 mt-1 leading-relaxed">
          {{ module.callout.text }}
        </div>
      </v-alert>
    </v-card>

    <!-- Lightbox Dialog for Step Screenshots with Zoom, Fullscreen on mobile, and Esc support -->
    <v-dialog v-model="lightboxOpen" max-width="1200" scrollable :fullscreen="smAndDown" @keydown.esc="lightboxOpen = false">
      <v-card class="rounded-lg overflow-hidden">
        <v-toolbar color="primary" density="comfortable" class="text-white">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">
            {{ module.num }}. {{ module.title }} &mdash; {{ lightboxTitle }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            :icon="isLightboxZoomed ? 'mdi-magnify-minus-outline' : 'mdi-magnify-plus-outline'"
            variant="text"
            :title="isLightboxZoomed ? 'Reset zoom' : 'Enlarge image'"
            @click="isLightboxZoomed = !isLightboxZoomed"
          />
          <v-btn icon="mdi-close" variant="text" title="Close (Esc)" @click="lightboxOpen = false" />
        </v-toolbar>

        <v-card-text class="pa-4 bg-background">
          <!-- Lightbox View Info Banner -->
          <div class="mb-3 pa-3 rounded-lg bg-surface border">
            <p class="text-body-2 text-high-emphasis mb-1 font-weight-medium">
              {{ lightboxCaption }}
            </p>

            <div v-if="lightboxHighlights.length > 0" class="d-flex flex-wrap align-center ga-1 pt-1">
              <span class="text-caption font-weight-bold text-medium-emphasis mr-1">Visible Actions & Features:</span>
              <v-chip
                v-for="feat in lightboxHighlights"
                :key="feat"
                size="x-small"
                variant="tonal"
                color="primary"
              >
                <v-icon start icon="mdi-check-circle-outline" size="12" />
                {{ feat }}
              </v-chip>
            </div>
          </div>

          <div class="rounded-lg border overflow-hidden bg-surface text-center">
            <v-img
              :src="lightboxImage"
              :alt="lightboxTitle"
              class="w-100 transition-all"
              :style="{ transform: isLightboxZoomed ? 'scale(1.25)' : 'none', transformOrigin: 'top center' }"
              max-height="750"
              contain
            />
          </div>
        </v-card-text>

        <v-card-actions class="px-4 py-3 bg-surface border-t">
          <span class="text-caption text-medium-emphasis">
            <span v-if="module.menuPath">Menu: {{ module.menuPath }} &bull; </span>GGC HRIS Admin Handbook &bull; Chapter {{ module.num }}
          </span>
          <v-spacer />
          <v-btn color="primary" variant="flat" class="text-none" @click="lightboxOpen = false">
            Close Preview
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </article>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import type { ModuleDoc, StepItem } from '@/data/manualData'
import ModuleScreenshot from '@/components/ModuleScreenshot.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'

const { smAndDown } = useDisplay()

const props = defineProps<{
  module: ModuleDoc
}>()

const breadcrumbs = computed(() => [
  { text: 'Manual', disabled: false },
  { text: props.module.category, disabled: false },
  { text: props.module.title, disabled: true },
])

const hasVisualSteps = computed(() => {
  return props.module.steps?.some(step => !!step.image) || false
})

const lightboxOpen = ref(false)
const lightboxImage = ref('')
const lightboxTitle = ref('')
const lightboxCaption = ref('')
const lightboxHighlights = ref<string[]>([])
const isLightboxZoomed = ref(false)
const copiedStep = ref<number | null>(null)

const openLightbox = (step: StepItem) => {
  if (!step.image) return
  isLightboxZoomed.value = false
  lightboxImage.value = step.image
  lightboxTitle.value = `Step ${step.number}: ${step.title}`
  lightboxCaption.value = step.caption || step.description
  lightboxHighlights.value = step.highlights || []
  lightboxOpen.value = true
}

const copyStepLink = (stepNum: number) => {
  const url = `${window.location.origin}${window.location.pathname}#step-${stepNum}`
  navigator.clipboard.writeText(url)
  copiedStep.value = stepNum
  setTimeout(() => {
    if (copiedStep.value === stepNum) {
      copiedStep.value = null
    }
  }, 2000)
}

const calloutIcon = computed(() => {
  switch (props.module.callout?.type) {
    case 'warning': return 'mdi-alert-outline'
    case 'tip': return 'mdi-lightbulb-on-outline'
    case 'success': return 'mdi-check-circle-outline'
    default: return 'mdi-information-outline'
  }
})

const calloutColor = computed(() => {
  switch (props.module.callout?.type) {
    case 'warning': return 'warning'
    case 'tip': return 'success'
    case 'success': return 'success'
    default: return 'primary'
  }
})
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.68;
}

.tracking-tight {
  letter-spacing: -0.015em;
}

.section-title {
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgb(var(--v-theme-primary));
}

.chapter-number-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.route-tag {
  background: rgba(var(--v-theme-primary), 0.09);
  color: rgb(var(--v-theme-primary));
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-family: monospace;
}

.step-card {
  transition: transform 0.15s ease-in-out;
}

.step-card:hover {
  transform: translateY(-2px);
}

.step-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary));
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.doc-table {
  background: transparent !important;
}

.doc-table th,
.doc-controls-table th {
  font-size: 0.75rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em;
  background-color: rgba(var(--v-theme-surface), 0.75);
  color: rgb(var(--v-theme-on-surface));
  border-bottom: 1px solid rgba(var(--v-border-color), 0.15) !important;
}

.control-row {
  transition: background-color 0.15s ease;
}

.control-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

.control-row td {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.08) !important;
}

.field-name-code {
  background: rgba(var(--v-theme-surface), 0.8);
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 0.8125rem;
  font-family: monospace;
}

.font-mono {
  font-family: monospace;
}

.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.visual-step-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step-image-frame {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step-image-frame:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.step-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.step-image-frame:hover .step-image-overlay {
  opacity: 1;
}

.window-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

@media (max-width: 600px) {
  .step-screenshot-img {
    max-height: 280px !important;
  }
  .chapter-number-badge {
    width: 32px !important;
    height: 32px !important;
    font-size: 0.95rem !important;
    border-radius: 8px !important;
  }
}
</style>
