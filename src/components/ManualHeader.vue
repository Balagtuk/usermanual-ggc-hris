<template>
  <v-app-bar elevation="0" height="60" class="doc-header bg-surface px-2 px-sm-3 px-md-6 border-b" density="comfortable">
    <!-- MOBILE ACTIVE SEARCH OVERLAY (Phone view when searching) -->
    <template v-if="mobileSearchOpen && smAndDown">
      <div class="mobile-search-bar d-flex align-center w-100 position-relative py-1">
        <v-btn
          icon
          variant="text"
          size="small"
          class="me-1 text-medium-emphasis"
          aria-label="Back / Close search"
          @click="closeMobileSearch"
        >
          <v-icon size="20">mdi-arrow-left</v-icon>
        </v-btn>

        <div ref="mobileSearchWrapperRef" class="flex-grow-1 position-relative">
          <v-text-field
            ref="mobileSearchInputRef"
            :model-value="searchQuery"
            density="compact"
            variant="solo-filled"
            flat
            autofocus
            placeholder="Search documentation, topics, roles..."
            prepend-inner-icon="mdi-magnify"
            hide-details
            clearable
            class="doc-search"
            @update:model-value="$emit('update:searchQuery', $event || '')"
            @focus="isFocused = true"
            @keydown.down.prevent="navigateDown"
            @keydown.up.prevent="navigateUp"
            @keydown.enter.prevent="selectHighlighted"
            @keydown.esc="closeMobileSearch"
          />

          <!-- Mobile Autocomplete Results Dropdown -->
          <v-card v-if="isDropdownOpen" class="search-dropdown-menu mobile-dropdown" elevation="8">
            <div class="dropdown-header px-3 py-2 d-flex align-center justify-space-between border-b">
              <span class="text-caption font-weight-bold text-medium-emphasis">
                {{ searchResults.length }} {{ searchResults.length === 1 ? 'RESULT' : 'RESULTS' }} FOUND
              </span>
              <v-btn size="x-small" variant="text" color="primary" @click="closeMobileSearch">
                Close
              </v-btn>
            </div>

            <div v-if="searchResults.length === 0" class="pa-4 text-center">
              <v-icon icon="mdi-file-search-outline" size="28" color="medium-emphasis" class="mb-1" />
              <p class="text-caption text-medium-emphasis mb-0">
                No matching topics found for "<strong>{{ searchQuery }}</strong>"
              </p>
            </div>

            <v-list v-else density="compact" class="py-1 max-h-340 overflow-y-auto">
              <v-list-item
                v-for="(item, idx) in visibleResults"
                :key="item.module.id"
                :active="idx === highlightedIndex"
                class="dropdown-item px-3 py-2"
                @click="onSelectResultMobile(item.module.id)"
              >
                <template #prepend>
                  <div class="item-chapter-badge me-2">
                    {{ item.module.num }}
                  </div>
                </template>

                <v-list-item-title class="font-weight-semibold text-body-2 d-flex align-center ga-2">
                  <span>{{ item.module.title }}</span>
                  <v-chip v-if="item.module.menuPath" size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                    {{ item.module.menuPath }}
                  </v-chip>
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption text-medium-emphasis text-truncate mt-1">
                  {{ item.previewText }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </div>
      </div>
    </template>

    <!-- STANDARD HEADER (DESKTOP & MOBILE DEFAULT) -->
    <template v-else>
      <!-- Toggle Drawer Button -->
      <v-btn
        icon
        variant="text"
        size="small"
        class="me-1 me-sm-2 text-medium-emphasis hover-primary"
        aria-label="Toggle navigation drawer"
        title="Toggle sidebar (Ctrl+B)"
        @click="$emit('toggle-drawer')"
      >
        <v-icon size="20">mdi-menu</v-icon>
      </v-btn>

      <!-- App Brand & Title -->
      <div class="d-flex align-center me-2 me-sm-4 cursor-pointer" @click="$emit('go-home')">
        <img src="@/assets/logo.png" alt="GGC Logo" width="28" height="28" class="me-2 rounded-sm" />
        <div class="d-flex align-center ga-2">
          <span class="text-subtitle-1 font-weight-bold tracking-tight text-no-wrap">
            GGC HRIS
          </span>
          <v-chip size="x-small" variant="tonal" color="primary" class="font-weight-semibold d-none d-md-inline-flex">
            Operations Manual
          </v-chip>
        </div>
      </div>

      <!-- Desktop Live Search Field with Autocomplete Dropdown -->
      <div ref="searchWrapperRef" class="search-wrapper me-4 d-none d-sm-block">
        <v-text-field
          ref="searchInputRef"
          :model-value="searchQuery"
          density="compact"
          variant="solo-filled"
          flat
          placeholder="Search documentation, topics, roles..."
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
        <v-card v-if="isDropdownOpen" class="search-dropdown-menu" elevation="6">
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
              No matching chapters or topics found for "<strong>{{ searchQuery }}</strong>"
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
                <v-chip v-if="item.module.menuPath" size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                  {{ item.module.menuPath }}
                </v-chip>
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
          <div
            class="dropdown-footer px-3 py-2 bg-surface border-t d-flex align-center justify-space-between text-caption text-medium-emphasis"
          >
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

      <!-- Mobile Search Icon Button (Phones only) -->
      <v-btn
        icon
        variant="text"
        size="small"
        class="d-sm-none me-1"
        aria-label="Search manual"
        title="Search documentation"
        @click="openMobileSearch"
      >
        <v-icon size="20">mdi-magnify</v-icon>
      </v-btn>

      <!-- Current Chapter / Page Progress Indicator (Desktop / Tablet) -->
      <v-chip
        v-if="viewMode === 'paged'"
        size="small"
        color="primary"
        variant="tonal"
        class="font-weight-semibold d-none d-md-inline-flex me-2"
      >
        <v-icon start icon="mdi-bookmark-outline" size="14" />
        {{ currentPage === 1 ? 'Introduction' : `Chapter ${currentPage - 1} of 10` }}
      </v-chip>

      <!-- Reading Mode Toggle Button -->
      <v-btn
        size="small"
        variant="text"
        color="primary"
        class="text-none d-none d-sm-inline-flex me-1 font-weight-medium"
        :prepend-icon="viewMode === 'paged' ? 'mdi-book-open-page-variant-outline' : 'mdi-format-list-bulleted'"
        :title="viewMode === 'paged' ? 'Switch to continuous scroll mode' : 'Switch to focused book mode'"
        @click="$emit('toggle-view-mode')"
      >
        {{ viewMode === 'paged' ? 'Book Mode' : 'Continuous' }}
      </v-btn>

      <!-- Theme Mode Toggle -->
      <v-btn
        icon
        variant="text"
        size="small"
        class="me-1"
        :aria-label="isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'"
        :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
        @click="$emit('toggle-theme')"
      >
        <v-icon size="20" :color="isDark ? 'amber' : 'primary'">
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
        title="Print or Save as PDF"
        aria-label="Print or export document to PDF"
        @click="$emit('trigger-print')"
      >
        Print / PDF
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useDisplay } from 'vuetify'
import type { ModuleDoc } from '@/data/manualData'
import { searchModules } from '@/utils/searchHelper'

const { smAndDown } = useDisplay()

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
const searchInputRef = ref<any>(null)
const mobileSearchWrapperRef = ref<HTMLElement | null>(null)
const mobileSearchInputRef = ref<any>(null)
const mobileSearchOpen = ref(false)
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

const openMobileSearch = () => {
  mobileSearchOpen.value = true
  isFocused.value = true
  nextTick(() => {
    const inputEl = mobileSearchWrapperRef.value?.querySelector('input')
    if (inputEl) {
      inputEl.focus()
    }
  })
}

const closeMobileSearch = () => {
  mobileSearchOpen.value = false
  isFocused.value = false
}

const onSelectResultMobile = (moduleId: string) => {
  closeMobileSearch()
  emit('select-module', moduleId)
}

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
  if (mobileSearchOpen.value) {
    mobileSearchOpen.value = false
  }
  emit('select-module', moduleId)
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node
  const inDesktop = searchWrapperRef.value && searchWrapperRef.value.contains(target)
  const inMobile = mobileSearchWrapperRef.value && mobileSearchWrapperRef.value.contains(target)
  if (!inDesktop && !inMobile) {
    isFocused.value = false
  }
}

// Global Ctrl+K / Cmd+K listener
const handleGlobalKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    if (smAndDown.value) {
      openMobileSearch()
    } else {
      const inputEl = searchWrapperRef.value?.querySelector('input')
      if (inputEl) {
        inputEl.focus()
        inputEl.select()
        isFocused.value = true
      }
    }
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('keydown', handleGlobalKeydown)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('keydown', handleGlobalKeydown)
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

.mobile-search-bar {
  width: 100%;
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

.mobile-dropdown {
  position: fixed !important;
  top: 62px !important;
  left: 8px !important;
  right: 8px !important;
  width: calc(100vw - 16px) !important;
  max-height: calc(100vh - 80px) !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18) !important;
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

.search-kbd-badge {
  background-color: rgba(var(--v-theme-on-surface), 0.06);
  border: 1px solid rgba(var(--v-border-color), 0.18);
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.6875rem;
  font-family: inherit;
  color: rgb(var(--v-theme-secondary));
  font-weight: 600;
  letter-spacing: 0.02em;
}

@media print {
  .doc-header,
  :deep(.v-app-bar) {
    display: none !important;
  }
}
</style>
