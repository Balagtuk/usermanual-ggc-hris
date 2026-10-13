<template>
  <section class="search-results-section mb-8">
    <!-- Breadcrumb -->
    <BaseBreadcrumb
      :title="`Search: ${query}`"
      :breadcrumbs="breadcrumbs"
    />

    <!-- Header Card -->
    <v-card class="pa-4 pa-sm-6 rounded-lg mb-6 bg-surface search-hero-card" elevation="0">
      <div class="d-flex flex-wrap align-center justify-space-between ga-3 mb-2">
        <div class="d-flex align-center ga-2 flex-wrap">
          <v-chip size="small" color="primary" variant="flat" class="font-weight-bold">
            <v-icon start icon="mdi-magnify" size="14" />
            Search Results
          </v-chip>
          <v-chip size="small" color="secondary" variant="tonal" class="font-weight-medium">
            {{ results.length }} {{ results.length === 1 ? 'module match' : 'modules match' }}
          </v-chip>
        </div>

        <v-btn
          size="small"
          variant="tonal"
          color="primary"
          prepend-icon="mdi-close-circle-outline"
          class="text-none font-weight-medium"
          @click="$emit('clear-search')"
        >
          Clear Search Filter
        </v-btn>
      </div>

      <h1 class="text-h5 font-weight-bold mb-2">
        Results for <span class="text-primary">"{{ query }}"</span>
      </h1>
      <p class="text-body-2 text-medium-emphasis mb-0">
        Review matching modules below. Click on any chapter card to jump straight into its detailed operational guide.
      </p>
    </v-card>

    <!-- Empty State -->
    <v-card
      v-if="results.length === 0"
      class="pa-8 text-center rounded-lg my-6 bg-surface"
      elevation="0"
    >
      <v-avatar color="primary" variant="tonal" size="64" class="mb-4">
        <v-icon icon="mdi-file-search-outline" size="36" color="primary" />
      </v-avatar>
      <h3 class="text-h6 font-weight-bold mb-2">No Matching Modules Found</h3>
      <p class="text-body-2 text-medium-emphasis mb-5 max-w-500 mx-auto">
        No operational documentation matched "<strong>{{ query }}</strong>". Try searching for common terms:
      </p>

      <div class="d-flex flex-wrap justify-center ga-2 mb-6">
        <v-chip
          v-for="suggest in suggestions"
          :key="suggest"
          size="small"
          variant="outlined"
          color="primary"
          class="cursor-pointer font-weight-medium"
          @click="$emit('apply-suggestion', suggest)"
        >
          {{ suggest }}
        </v-chip>
      </div>

      <v-btn
        color="primary"
        variant="flat"
        prepend-icon="mdi-arrow-left"
        class="text-none font-weight-bold"
        @click="$emit('clear-search')"
      >
        Back to Documentation
      </v-btn>
    </v-card>

    <!-- Results Cards Grid -->
    <v-row v-else dense>
      <v-col
        v-for="item in results"
        :key="item.module.id"
        cols="12"
        md="6"
        class="mb-3"
      >
        <v-card
          class="result-card pa-5 rounded-lg h-100 bg-surface d-flex flex-column justify-space-between transition-all"
          elevation="0"
          @click="$emit('select-module', item.module.id)"
        >
          <div>
            <!-- Card Header -->
            <div class="d-flex align-center justify-space-between ga-2 mb-3">
              <div class="d-flex align-center ga-2">
                <div class="chapter-badge font-weight-bold">
                  {{ item.module.num }}
                </div>
                <span class="text-caption font-weight-medium text-medium-emphasis">Chapter {{ item.module.num }}</span>
              </div>
              <v-chip size="x-small" color="secondary" variant="tonal" class="font-weight-medium">
                {{ item.module.category }}
              </v-chip>
            </div>

            <!-- Title & Description -->
            <div class="d-flex align-center ga-2 mb-2">
              <v-icon :icon="item.module.icon" size="20" color="primary" />
              <h2 class="text-subtitle-1 font-weight-bold mb-0">
                {{ item.module.title }}
              </h2>
            </div>

            <p class="text-body-2 text-medium-emphasis mb-3 line-clamp-2">
              {{ item.module.description }}
            </p>

            <!-- Match Reasons Badges -->
            <div class="match-reasons-wrapper mb-3">
              <span class="text-caption text-medium-emphasis me-2 font-weight-medium">Matched in:</span>
              <v-chip
                v-for="reason in item.matchReasons"
                :key="reason"
                size="x-small"
                color="primary"
                variant="tonal"
                class="me-1 mb-1 font-weight-medium"
              >
                {{ reason }}
              </v-chip>
            </div>

            <!-- Preview Snippet Box -->
            <div class="preview-box pa-2 rounded mb-3">
              <div class="d-flex align-start ga-2">
                <v-icon icon="mdi-format-quote-open" size="14" color="primary" class="mt-1 flex-shrink-0" />
                <span class="text-caption text-medium-emphasis font-italic line-clamp-2">
                  {{ item.previewText }}
                </span>
              </div>
            </div>
          </div>

          <!-- Card Action Footer -->
          <div class="d-flex align-center justify-space-between pt-2 border-t">
            <span class="text-caption text-primary font-weight-medium">
              Chapter {{ item.module.num }} of 10
            </span>
            <v-btn
              size="small"
              variant="flat"
              color="primary"
              class="text-none font-weight-bold"
              append-icon="mdi-arrow-right"
              @click.stop="$emit('select-module', item.module.id)"
            >
              Open Chapter
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseBreadcrumb, { type BreadcrumbItem } from '@/components/BaseBreadcrumb.vue'
import type { MatchDetail } from '@/utils/searchHelper'

const props = defineProps<{
  query: string
  results: MatchDetail[]
}>()

defineEmits<{
  (e: 'select-module', moduleId: string): void
  (e: 'clear-search'): void
  (e: 'apply-suggestion', keyword: string): void
}>()

const suggestions = ['User Management', 'Roles & Permissions', 'Attendance', 'Leaves', 'Schedule', 'Branch']

const breadcrumbs = computed<BreadcrumbItem[]>(() => [
  { title: 'Home', disabled: false },
  { title: 'Search Results', disabled: true },
])
</script>

<style scoped>
.search-hero-card {
  border: 1px solid rgba(var(--v-theme-primary), 0.12);
}

.max-w-500 {
  max-width: 500px;
}

.result-card {
  border: 1px solid rgba(var(--v-border-color), var(--v-border-opacity, 0.08));
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.result-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.35);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.chapter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-size: 0.75rem;
}

.route-tag {
  background-color: rgba(var(--v-theme-on-surface), 0.06);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-family: monospace;
}

.preview-box {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
