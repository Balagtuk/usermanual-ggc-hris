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

    <!-- Live Search Field (Prominent, wide, uncompressed) -->
    <div class="search-wrapper d-none d-sm-flex me-4">
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
      />
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
defineProps<{
  searchQuery: string
  isDark: boolean
  viewMode: 'paged' | 'all'
  currentPage: number
  totalPages: number
}>()

defineEmits<{
  (e: 'toggle-drawer'): void
  (e: 'toggle-theme'): void
  (e: 'toggle-view-mode'): void
  (e: 'trigger-print'): void
  (e: 'go-home'): void
  (e: 'update:searchQuery', val: string): void
}>()
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
  flex: 0 1 480px;
  width: 480px;
  min-width: 280px;
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

@media print {
  .doc-header,
  :deep(.v-app-bar) {
    display: none !important;
  }
}
</style>
