<template>
  <v-app-bar
    elevation="0"
    height="64"
    class="doc-header bg-surface px-3 px-md-6"
    density="comfortable"
  >
    <!-- Toggle Drawer Button -->
    <v-btn
      icon
      variant="text"
      size="small"
      class="me-2 text-medium-emphasis hover-primary"
      aria-label="Toggle navigation"
      @click="$emit('toggle-drawer')"
    >
      <v-icon size="20">mdi-menu</v-icon>
    </v-btn>

    <!-- App Brand & Title -->
    <div class="d-flex align-center me-4 cursor-pointer" @click="$emit('go-home')">
      <img src="@/assets/logo.png" alt="GGC Logo" width="34" height="34" class="me-2" />
      <div class="d-flex align-center ga-2">
        <span class="text-subtitle-1 font-weight-bold tracking-tight">
          GGC HRIS
        </span>
        <v-chip
          size="x-small"
          variant="tonal"
          color="primary"
          class="font-weight-semibold d-none d-md-inline-flex"
        >
          Operations Manual
        </v-chip>
      </div>
    </div>

    <!-- Live Search Field with Autocomplete Dropdown -->
    <div ref="searchWrapperRef" class="search-wrapper me-4">
      <v-text-field
        :model-value="searchQuery"
        density="compact"
        variant="solo-filled"
        flat
        placeholder="Search documentation, fields, rules..."
        prepend-inner-icon="mdi-magnify"
        hide-details
        clearable
        class="doc-search"
        @update:model-value="$emit('update:searchQuery', $event || '')"
        @focus="isFocused = true"
        @keydown.down.prevent="navigateDown"
        @keydown.up.prevent="navigateUp"
        @keydown.enter.prevent="selectHighlighted"
        @keydown.esc="isFocused = false"
      />

      <!-- Floating Autocomplete Search Dropdown -->
      <v-card
        v-if="isDropdownOpen"
        class="search-dropdown-menu"
        elevation="6"
      >
        <div class="dropdown-header px-3 py-2 d-flex align-center justify-space-between border-b">
          <span class="text-caption font-weight-bold text-medium-emphasis">
            {{ searchResults.length }} {{ searchResults.length === 1 ? 'RESULT' : 'RESULTS' }} FOUND
          </span>
          <span class="text-caption text-medium-emphasis">
            Press <kbd>Enter</kbd> to view
          </span>
        </div>

        <div v-if="searchResults.length === 0" class="pa-4 text-center">
          <v-icon icon="mdi-file-search-outline" size="28" color="medium-emphasis" class="mb-1" />
          <p class="text-caption text-medium-emphasis mb-0">
            No matching chapters or fields found for "<strong>{{ searchQuery }}</strong>"
          </p>
        </div>

        <v-list v-else density="compact" class="py-1 max-h-340 overflow-y-auto">
          <v-list-item
            v-for="(item, idx) in visibleResults"
            :key="item.module.id"
            :active="idx === highlightedIndex"
            class="dropdown-item px-3 py-2"
            @click="onSelectResult(item.module.id)"
            @mouseenter="highlightedIndex = idx"
          >
            <template #prepend>
              <div class="item-chapter-badge me-2">
                {{ item.module.num }}
              </div>
            </template>

            <v-list-item-title class="font-weight-semibold text-body-2 d-flex align-center ga-2">
              <span>{{ item.module.title }}</span>
              <code class="dropdown-route-tag">{{ item.module.route }}</code>
            </v-list-item-title>

            <v-list-item-subtitle class="text-caption text-medium-emphasis text-truncate mt-1">
              {{ item.previewText }}
            </v-list-item-subtitle>

            <template #append>
              <div class="d-flex flex-column align-end ga-1">
                <v-chip size="x-small" color="secondary" variant="tonal" class="font-weight-medium">
                  {{ item.module.category }}
                </v-chip>
                <div class="d-flex ga-1">
                  <v-chip
                    v-for="reason in item.matchReasons.slice(0, 2)"
                    :key="reason"
                    size="x-small"
                    color="primary"
                    variant="flat"
                    class="font-weight-bold"
                  >
                    {{ reason }}
                  </v-chip>
                </div>
              </div>
            </template>
          </v-list-item>
        </v-list>

        <!-- Dropdown Footer -->
        <div class="dropdown-footer px-3 py-2 bg-surface border-t d-flex align-center justify-space-between text-caption text-medium-emphasis">
          <div class="d-flex align-center ga-2">
            <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
            <span><kbd>Esc</kbd> close</span>
          </div>
          <span class="text-primary font-weight-medium">
            Jump directly to chapter
          </span>
        </div>
      </v-card>
    </div>

    <v-spacer />

    <!-- Quick Page Indicator (Paged Mode) -->
    <v-chip
      v-if="viewMode === 'paged'"
      size="small"
      color="primary"
      variant="tonal"
      class="font-weight-medium d-none d-md-inline-flex me-2"
    >
      Page {{ currentPage }} / {{ totalPages }}
    </v-chip>

    <!-- Reading Mode Toggle Button -->
    <v-btn
      size="small"
      variant="text"
      color="primary"
      class="text-none d-none d-sm-inline-flex me-2 font-weight-medium"
      :prepend-icon="viewMode === 'paged' ? 'mdi-book-open-page-variant-outline' : 'mdi-format-list-bulleted'"
      @click="$emit('toggle-view-mode')"
    >
      {{ viewMode === 'paged' ? 'Book Mode' : 'Continuous Mode' }}
    </v-btn>

    <!-- Theme Mode Toggle -->
    <v-btn
      icon
      variant="text"
      size="small"
      class="me-1"
      :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
      @click="$emit('toggle-theme')"
    >
      <v-icon size="20" :color="isDark ? 'white' : 'primary'">
        {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
      </v-icon>
    </v-btn>

    <!-- Print / Export PDF Button -->
    <v-btn
      color="primary"
      variant="flat"
      size="small"
      prepend-icon="mdi-printer-outline"
      class="d-none d-sm-inline-flex text-none font-weight-medium"
      @click="$emit('trigger-print')"
    >
      Print / PDF
    </v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import type { ModuleDoc } from '@/data/manualData'
import { searchModules } from '@/utils/searchHelper'

const props = defineProps<{
  searchQuery: string
  isDark: boolean
  viewMode: 'paged' | 'all'
  currentPage: number
  totalPages: number
  modules?: ModuleDoc[]
}>()

const emit = defineEmits<{
  (e: 'toggle-drawer'): void
  (e: 'toggle-theme'): void
  (e: 'toggle-view-mode'): void
  (e: 'trigger-print'): void
  (e: 'go-home'): void
  (e: 'update:searchQuery', val: string): void
  (e: 'select-module', moduleId: string): void
}>()

const searchWrapperRef = ref<HTMLElement | null>(null)
const isFocused = ref(false)
const highlightedIndex = ref(-1)

const searchResults = computed(() => {
  if (!props.modules) return []
  return searchModules(props.modules, props.searchQuery)
})

const visibleResults = computed(() => {
  return searchResults.value.slice(0, 6)
})

const isDropdownOpen = computed(() => {
  return isFocused.value && props.searchQuery.trim().length > 0
})

watch(() => props.searchQuery, () => {
  highlightedIndex.value = -1
})

const navigateDown = () => {
  if (!visibleResults.value.length) return
  if (highlightedIndex.value < visibleResults.value.length - 1) {
    highlightedIndex.value++
  } else {
    highlightedIndex.value = 0
  }
}

const navigateUp = () => {
  if (!visibleResults.value.length) return
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--
  } else {
    highlightedIndex.value = visibleResults.value.length - 1
  }
}

const selectHighlighted = () => {
  if (visibleResults.value.length === 0) return
  const targetIndex = highlightedIndex.value >= 0 ? highlightedIndex.value : 0
  const selected = visibleResults.value[targetIndex]
  if (selected) {
    onSelectResult(selected.module.id)
  }
}

const onSelectResult = (moduleId: string) => {
  isFocused.value = false
  emit('select-module', moduleId)
}

const handleClickOutside = (event: MouseEvent) => {
  if (searchWrapperRef.value && !searchWrapperRef.value.contains(event.target as Node)) {
    isFocused.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.doc-header {
  backdrop-filter: blur(8px);
  background-color: rgba(var(--v-theme-surface), 0.92) !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
}

.tracking-tight {
  letter-spacing: -0.015em;
}

.search-wrapper {
  position: relative;
  flex: 0 1 480px;
  width: 480px;
  min-width: 220px;
}

.doc-search {
  width: 100% !important;
}

:deep(.doc-search .v-field) {
  border-radius: 6px !important;
  font-size: 0.8125rem;
}

:deep(.doc-search input::placeholder) {
  font-size: 0.8125rem;
  opacity: 0.7;
}

.search-dropdown-menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 1050;
  border-radius: 8px !important;
  border: 1px solid rgba(var(--v-border-color), 0.15);
  background-color: rgb(var(--v-theme-surface)) !important;
  overflow: hidden;
}

.dropdown-header {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}

.max-h-340 {
  max-height: 340px;
}

.dropdown-item {
  cursor: pointer;
  transition: background-color 0.12s ease;
}

.dropdown-item:hover,
.dropdown-item.v-list-item--active {
  background-color: rgba(var(--v-theme-primary), 0.08) !important;
}

.item-chapter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 5px;
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-size: 0.75rem;
  font-weight: 700;
}

.dropdown-route-tag {
  background-color: rgba(var(--v-theme-on-surface), 0.06);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 0.7rem;
  font-family: monospace;
}

kbd {
  background-color: rgba(var(--v-theme-on-surface), 0.08);
  border: 1px solid rgba(var(--v-border-color), 0.2);
  border-radius: 3px;
  padding: 1px 4px;
  font-size: 0.7rem;
  font-family: monospace;
}

@media print {
  .doc-header,
  :deep(.v-app-bar) {
    display: none !important;
  }
}
</style>
