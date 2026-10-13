<template>
  <div v-if="module.screenshot" class="module-screenshot-section mb-6">
    <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-2">
      <div class="d-flex align-center ga-2">
        <h3 class="text-subtitle-1 font-weight-bold text-uppercase text-caption text-primary">
          Interface Visual Reference
        </h3>
        <v-chip
          v-if="hasGallery"
          size="x-small"
          color="primary"
          variant="flat"
          class="font-weight-bold"
        >
          {{ galleryItems.length }} Views Available
        </v-chip>
      </div>

      <v-chip
        size="x-small"
        variant="tonal"
        color="primary"
        class="font-weight-medium cursor-pointer"
        @click="openLightbox(activeGalleryIndex)"
      >
        <v-icon start icon="mdi-magnify-plus-outline" size="14" />
        Click image to expand
      </v-chip>
    </div>

    <!-- Gallery View Switcher Buttons (if multiple views available) -->
    <div v-if="hasGallery" class="d-flex flex-wrap align-center ga-1 mb-3">
      <v-btn
        v-for="(item, idx) in galleryItems"
        :key="item.src"
        size="small"
        :variant="activeGalleryIndex === idx ? 'flat' : 'outlined'"
        :color="activeGalleryIndex === idx ? 'primary' : 'secondary'"
        class="text-none font-weight-medium rounded-pill text-caption"
        @click="activeGalleryIndex = idx"
      >
        <v-icon start :icon="activeGalleryIndex === idx ? 'mdi-check' : 'mdi-image-outline'" size="14" />
        {{ item.label }}
      </v-btn>
    </div>

    <!-- Screenshot Container Card (Borderless, clean surface) -->
    <v-card
      class="screenshot-frame rounded-lg overflow-hidden cursor-pointer position-relative inner-card"
      elevation="0"
      @click="openLightbox(activeGalleryIndex)"
    >
      <!-- Simulated Window Bar -->
      <div class="window-bar px-4 py-2 bg-surface-variant d-flex align-center justify-space-between">
        <div class="d-flex align-center ga-2">
          <span class="window-dot" style="background-color: rgba(var(--v-theme-on-surface), 0.2);" />
          <span class="window-dot" style="background-color: rgba(var(--v-theme-on-surface), 0.2);" />
          <span class="window-dot" style="background-color: rgba(var(--v-theme-on-surface), 0.2);" />
          <span class="text-caption font-weight-medium ml-2 text-medium-emphasis">
            {{ module.route }} &bull; {{ currentViewTitle }}
          </span>
        </div>
        <div class="d-flex align-center ga-2">
          <v-chip v-if="hasGallery" size="x-small" variant="tonal" color="primary">
            View {{ activeGalleryIndex + 1 }} of {{ galleryItems.length }}
          </v-chip>
          <v-chip size="x-small" variant="text" color="medium-emphasis">
            Preview
          </v-chip>
        </div>
      </div>

      <!-- Real Image with Fallback to UI Mockup -->
      <div class="screenshot-content bg-background position-relative">
        <v-img
          v-if="!imageError"
          :src="currentImageSrc"
          :alt="module.screenshot.alt"
          cover
          max-height="460"
          class="screenshot-image"
          @error="handleImageError"
        >
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height bg-surface-variant pa-8">
              <v-progress-circular indeterminate color="primary" size="32" />
            </div>
          </template>
        </v-img>

        <!-- Fallback High-Fidelity UI Mockup when image is not yet uploaded -->
        <div v-else class="mockup-container pa-4 pa-md-6">
          <div class="mockup-header d-flex flex-wrap align-center justify-space-between ga-3 mb-4">
            <div class="d-flex align-center ga-3">
              <v-icon :icon="module.icon" color="primary" size="28" />
              <div>
                <div class="text-subtitle-1 font-weight-bold">{{ module.title }}</div>
                <div class="text-caption text-medium-emphasis">Dashboard &bull; Admin Settings &bull; {{ module.route }}</div>
              </div>
            </div>

            <div class="d-flex align-center ga-2 flex-wrap">
              <v-text-field
                density="compact"
                variant="outlined"
                placeholder="Filter records..."
                prepend-inner-icon="mdi-magnify"
                hide-details
                readonly
                style="width: 180px;"
              />
              <v-btn size="small" color="primary" variant="flat" prepend-icon="mdi-plus" class="text-none">
                Add New
              </v-btn>
            </div>
          </div>

          <!-- Mockup Table Layout -->
          <v-table density="compact" class="mockup-table rounded-lg border bg-surface">
            <thead>
              <tr class="bg-surface-variant">
                <th v-for="field in previewHeaders" :key="field" class="text-caption font-weight-bold">
                  {{ field }}
                </th>
                <th class="text-caption font-weight-bold text-center" style="width: 100px;">Status</th>
                <th class="text-caption font-weight-bold text-end" style="width: 90px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in previewRows" :key="idx">
                <td v-for="(val, vIdx) in row.values" :key="vIdx" class="text-caption">
                  {{ val }}
                </td>
                <td class="text-center">
                  <v-chip size="x-small" color="success" variant="flat">Active</v-chip>
                </td>
                <td class="text-end">
                  <v-icon icon="mdi-pencil-outline" size="16" class="mr-2 text-primary" />
                  <v-icon icon="mdi-dots-vertical" size="16" class="text-medium-emphasis" />
                </td>
              </tr>
            </tbody>
          </v-table>

          <div class="d-flex align-center justify-space-between mt-3 text-caption text-medium-emphasis">
            <span>Showing 1 to {{ previewRows.length }} of 24 entries</span>
            <div class="d-flex align-center ga-1">
              <v-chip size="x-small" variant="tonal">Page 1</v-chip>
              <v-chip size="x-small" variant="text">Next &rsaquo;</v-chip>
            </div>
          </div>
        </div>

        <!-- Overlay Hover Icon -->
        <div class="screenshot-hover-overlay d-flex align-center justify-center">
          <v-chip color="white" variant="flat" class="text-primary font-weight-bold">
            <v-icon start icon="mdi-arrow-expand" />
            Click to View Full-Size Screenshot
          </v-chip>
        </div>
      </div>

      <!-- Caption Footer -->
      <div class="px-4 py-3 bg-surface border-t d-flex align-start justify-space-between ga-2">
        <div class="d-flex align-center ga-2 text-caption text-medium-emphasis">
          <v-icon icon="mdi-image-outline" size="16" color="primary" />
          <span>{{ currentCaption }}</span>
        </div>
        <v-chip v-if="imageError" size="x-small" variant="outlined" color="info">
          Mockup (Drop {{ expectedFileName }} into /public/screenshots/)
        </v-chip>
      </div>
    </v-card>

    <!-- Fullscreen / Lightbox Dialog -->
    <v-dialog v-model="lightboxOpen" max-width="1200" scrollable>
      <v-card class="rounded-lg overflow-hidden">
        <v-toolbar color="primary" density="comfortable" class="text-white">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">
            {{ module.num }}. {{ module.title }} &mdash; {{ currentViewTitle }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" @click="lightboxOpen = false" />
        </v-toolbar>

        <v-card-text class="pa-4 bg-background">
          <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-3">
            <div class="text-body-2 text-medium-emphasis">
              {{ currentCaption }}
            </div>
            <div v-if="hasGallery" class="d-flex align-center ga-1">
              <v-btn
                icon="mdi-chevron-left"
                size="small"
                variant="outlined"
                :disabled="lightboxIndex <= 0"
                @click="lightboxIndex--"
              />
              <span class="text-caption font-weight-bold px-2">
                {{ lightboxIndex + 1 }} / {{ galleryItems.length }}
              </span>
              <v-btn
                icon="mdi-chevron-right"
                size="small"
                variant="outlined"
                :disabled="lightboxIndex >= galleryItems.length - 1"
                @click="lightboxIndex++"
              />
            </div>
          </div>

          <div class="rounded-lg border overflow-hidden bg-surface text-center">
            <v-img
              v-if="!imageError"
              :src="lightboxImageSrc"
              :alt="module.screenshot.alt"
              class="w-100"
              max-height="750"
              contain
            />
            <div v-else class="pa-6">
              <v-alert color="info" variant="tonal" density="compact" class="mb-4 text-start">
                This is a UI wireframe preview. You can place real screenshots in <code>public/screenshots/</code>.
              </v-alert>
            </div>
          </div>

          <!-- Lightbox Thumbnail Strip (if gallery exists) -->
          <div v-if="hasGallery" class="d-flex flex-wrap align-center ga-2 mt-4 justify-center">
            <v-card
              v-for="(item, idx) in galleryItems"
              :key="item.src"
              class="rounded-lg border overflow-hidden cursor-pointer"
              :class="{ 'border-primary': lightboxIndex === idx }"
              :elevation="lightboxIndex === idx ? 3 : 0"
              width="110"
              @click="lightboxIndex = idx"
            >
              <v-img :src="item.src" height="65" cover />
              <div class="text-caption text-center py-1 text-truncate px-1 bg-surface">
                {{ item.label }}
              </div>
            </v-card>
          </div>
        </v-card-text>

        <v-card-actions class="px-4 py-3 bg-surface border-t">
          <span class="text-caption text-medium-emphasis">
            Route: <code>{{ module.route }}</code> &bull; Permissions: <code>{{ module.permissions.join(', ') }}</code>
          </span>
          <v-spacer />
          <v-btn color="primary" variant="flat" class="text-none" @click="lightboxOpen = false">
            Close Preview
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ModuleDoc } from '@/data/manualData'

const props = defineProps<{
  module: ModuleDoc
}>()

const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const activeGalleryIndex = ref(0)
const imageError = ref(false)

const hasGallery = computed(() => {
  return !!(props.module.screenshot?.gallery && props.module.screenshot.gallery.length > 0)
})

const galleryItems = computed(() => {
  return props.module.screenshot?.gallery || []
})

const currentImageSrc = computed(() => {
  if (hasGallery.value && galleryItems.value[activeGalleryIndex.value]) {
    return galleryItems.value[activeGalleryIndex.value].src
  }
  return props.module.screenshot?.src || `/screenshots/${props.module.id}.png`
})

const lightboxImageSrc = computed(() => {
  if (hasGallery.value && galleryItems.value[lightboxIndex.value]) {
    return galleryItems.value[lightboxIndex.value].src
  }
  return currentImageSrc.value
})

const currentViewTitle = computed(() => {
  if (hasGallery.value && galleryItems.value[activeGalleryIndex.value]) {
    return galleryItems.value[activeGalleryIndex.value].label
  }
  return props.module.screenshot?.viewTitle || props.module.title
})

const currentCaption = computed(() => {
  return props.module.screenshot?.caption || ''
})

const expectedFileName = computed(() => `${props.module.id}.png`)

const handleImageError = () => {
  imageError.value = true
}

const openLightbox = (index = 0) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

// Generate realistic mockup preview headers and sample data
const previewHeaders = computed(() => {
  if (props.module.fields && props.module.fields.length > 0) {
    return props.module.fields.slice(0, 3).map((f) => f.name)
  }
  return ['Name', 'Code / Identifier', 'Category']
})

const previewRows = computed(() => {
  const modId = props.module.id
  if (modId === 'mod-user') {
    return [
      { values: ['jdelacruz', 'Juan', 'dela Cruz'] },
      { values: ['msantos', 'Maria', 'Santos'] },
      { values: ['rreyes', 'Robert', 'Reyes'] },
    ]
  }
  if (modId === 'mod-entity') {
    return [
      { values: ['GGC Corporate Holdings Corp.', 'GGC-CORP'] },
      { values: ['GGC Retail Solutions Inc.', 'GGC-RETL'] },
      { values: ['GGC Logistics & Transport', 'GGC-LOG'] },
    ]
  }
  if (modId === 'mod-branch') {
    return [
      { values: ['Main Head Office', 'BR-001', 'GGC-CORP'] },
      { values: ['Cebu Regional Hub', 'BR-002', 'GGC-CORP'] },
      { values: ['Davao Operations Center', 'BR-003', 'GGC-RETL'] },
    ]
  }
  if (modId === 'mod-departments') {
    return [
      { values: ['Human Resources Department', 'HRD'] },
      { values: ['Information Technology', 'ITD'] },
      { values: ['Finance & Accounting', 'FIN'] },
    ]
  }
  if (modId === 'mod-division') {
    return [
      { values: ['Talent Acquisition & Staffing', 'Human Resources Department'] },
      { values: ['Compensation & Benefits', 'Human Resources Department'] },
      { values: ['Core Infrastructure & DevOps', 'Information Technology'] },
    ]
  }
  if (modId === 'mod-position') {
    return [
      { values: ['Executive Director', '1'] },
      { values: ['Department Manager', '3'] },
      { values: ['Senior Technical Lead', '5'] },
    ]
  }
  if (modId === 'mod-job-title') {
    return [
      { values: ['Lead Software Engineer', 'Senior Technical Lead', 'Core platform development'] },
      { values: ['Senior HR Specialist', 'Senior Technical Lead', 'Labor relations & audits'] },
      { values: ['Payroll Accountant', 'Associate Specialist', 'Payroll verification'] },
    ]
  }
  if (modId === 'mod-user-access') {
    return [
      { values: ['Juan dela Cruz (Admin)', 'Direct Grants: 12 capabilities', 'HR Operations'] },
      { values: ['Maria Santos (HR Specialist)', 'Direct Grants: 5 capabilities', 'Employee Management'] },
      { values: ['Robert Reyes (Auditor)', 'Direct Grants: 3 capabilities', 'Audit Logs Read'] },
    ]
  }
  return [
    { values: ['Super Admin', 'Full Access Matrix', '9 Groups Enabled'] },
    { values: ['HR Administrator', 'Standard HR Matrix', '7 Groups Enabled'] },
    { values: ['Department Approver', 'Approval Pipeline Matrix', '3 Groups Enabled'] },
  ]
})
</script>

<style scoped>
.screenshot-frame {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.screenshot-frame:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.border-primary {
  border-color: rgb(var(--v-theme-primary)) !important;
  border-width: 2px !important;
}

.window-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.screenshot-content {
  position: relative;
  min-height: 200px;
}

.screenshot-hover-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.screenshot-frame:hover .screenshot-hover-overlay {
  opacity: 1;
}

.mockup-container {
  background: linear-gradient(180deg, rgba(var(--v-theme-surface), 1) 0%, rgba(var(--v-theme-background), 0.7) 100%);
}

.mockup-table th,
.mockup-table td {
  padding: 8px 12px !important;
}
</style>
