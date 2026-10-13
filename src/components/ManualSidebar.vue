<template>
  <v-navigation-drawer
    :model-value="modelValue"
    width="360"
    app
    elevation="0"
    class="doc-sidebar bg-surface"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <!-- Filter Search Field (Flat, no outline, 6px radius) -->
    <div class="pa-3">
      <v-text-field
        v-model="filterKeyword"
        placeholder="Filter chapters..."
        variant="solo-filled"
        flat
        density="compact"
        hide-details
        clearable
        prepend-inner-icon="mdi-magnify"
        class="sidebar-filter"
      />
    </div>

    <!-- Navigation Tree -->
    <div class="sidebar-scroll pa-2 overflow-y-auto">
      <v-list density="compact" nav class="pa-1">
        <!-- Chapter 1: Introduction -->
        <div class="category-header">
          Getting Started
        </div>

        <v-list-item
          prepend-icon="mdi-book-open-page-variant-outline"
          :active="activeSection === 'intro'"
          rounded="md"
          class="nav-item mb-1"
          @click="scrollTo('intro', 1)"
        >
          <template #title>
            <span class="nav-title-text">Introduction & Setup</span>
          </template>
        </v-list-item>

        <v-divider class="my-2 opacity-20" />

        <!-- Category: Account & Access -->
        <div class="category-header">
          Account & Access
        </div>

        <template v-for="mod in filteredAccountModules" :key="mod.id">
          <v-list-item
            :prepend-icon="mod.icon"
            :active="activeSection === mod.id"
            :disabled="isFilteredOut(mod)"
            rounded="md"
            class="nav-item mb-1"
            @click="scrollTo(mod.id)"
          >
            <template #title>
              <span class="nav-title-text">{{ mod.title }}</span>
            </template>
          </v-list-item>
        </template>

        <v-divider class="my-2 opacity-20" />

        <!-- Category: Organizational Setup -->
        <div class="category-header">
          Organizational Setup
        </div>

        <template v-for="mod in filteredOrgModules" :key="mod.id">
          <v-list-item
            :prepend-icon="mod.icon"
            :active="activeSection === mod.id"
            :disabled="isFilteredOut(mod)"
            rounded="md"
            class="nav-item mb-1"
            @click="scrollTo(mod.id)"
          >
            <template #title>
              <span class="nav-title-text">{{ mod.title }}</span>
            </template>
          </v-list-item>
        </template>
      </v-list>
    </div>

    <!-- Sidebar Sticky Footer (No outlines) -->
    <template #append>
      <div class="pa-3 bg-surface text-caption text-medium-emphasis d-flex align-center justify-space-between">
        <span>GGC HRIS Manual</span>
        <span class="font-weight-medium text-primary">v1.0.0</span>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ModuleDoc } from '@/data/manualData'

const props = defineProps<{
  modelValue: boolean
  modules: ModuleDoc[]
  activeSection: string
  visibleModuleIds: Set<string>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'navigate', sectionId: string, pageNumber?: number): void
}>()

const filterKeyword = ref('')

const accountModules = computed(() =>
  props.modules.filter((m) => m.category === 'Account & Access')
)

const orgModules = computed(() =>
  props.modules.filter((m) => m.category === 'Organizational Setup')
)

const filteredAccountModules = computed(() => {
  const kw = filterKeyword.value.trim().toLowerCase()
  if (!kw) return accountModules.value
  return accountModules.value.filter((m) =>
    m.title.toLowerCase().includes(kw) || m.route.toLowerCase().includes(kw)
  )
})

const filteredOrgModules = computed(() => {
  const kw = filterKeyword.value.trim().toLowerCase()
  if (!kw) return orgModules.value
  return orgModules.value.filter((m) =>
    m.title.toLowerCase().includes(kw) || m.route.toLowerCase().includes(kw)
  )
})

const isFilteredOut = (mod: ModuleDoc) => {
  return !props.visibleModuleIds.has(mod.id)
}

const scrollTo = (id: string, pageNumber?: number) => {
  emit('navigate', id, pageNumber)
}
</script>

<style scoped>
.doc-sidebar {
  border: none !important;
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.02) !important;
}

.sidebar-scroll {
  height: calc(100vh - 120px);
}

.category-header {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--v-theme-secondary));
  opacity: 0.8;
  padding: 8px 10px 4px 10px;
}

.sidebar-filter :deep(.v-field) {
  border-radius: 6px !important;
  font-size: 0.8125rem;
}

.nav-item {
  font-size: 0.825rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  transition: all 0.15s ease-in-out;
  border-radius: 6px !important;
  min-height: 40px;
  padding-inline: 12px 10px !important;
}

.nav-title-text {
  display: block;
  white-space: normal !important;
  word-break: normal !important;
  overflow-wrap: break-word !important;
  line-height: 1.35 !important;
  font-size: 0.8125rem !important;
}

:deep(.nav-item .v-list-item__content) {
  overflow: visible !important;
}

:deep(.nav-item .v-list-item-title) {
  white-space: normal !important;
  text-overflow: clip !important;
  overflow: visible !important;
}

:deep(.nav-item .v-list-item__prepend) {
  margin-inline-end: 10px !important;
}

:deep(.nav-item .v-list-item__append) {
  margin-inline-start: 8px !important;
  flex-shrink: 0;
}

.nav-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
}

.nav-item.v-list-item--active {
  background-color: rgba(var(--v-theme-primary), 0.12) !important;
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 600;
}

.page-badge {
  font-size: 0.7rem;
  color: rgb(var(--v-theme-secondary));
  background: rgba(var(--v-theme-primary), 0.08);
  padding: 2px 5px;
  border-radius: 4px;
  white-space: nowrap;
}

.nav-item.v-list-item--active .page-badge {
  background: rgba(var(--v-theme-primary), 0.18);
  color: rgb(var(--v-theme-primary));
}

@media print {
  .doc-sidebar,
  :deep(.v-navigation-drawer) {
    display: none !important;
  }
}
</style>
