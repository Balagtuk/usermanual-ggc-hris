<template>
  <v-navigation-drawer
    :model-value="modelValue"
    width="300"
    app
    elevation="0"
    class="doc-sidebar bg-surface border-e"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <!-- Filter Search Field & Mobile Close Button -->
    <div class="pa-3 border-b d-flex align-center justify-space-between ga-2">
      <v-text-field
        v-model="filterKeyword"
        placeholder="Filter chapters..."
        variant="solo-filled"
        flat
        density="compact"
        hide-details
        clearable
        prepend-inner-icon="mdi-filter-variant"
        class="sidebar-filter flex-grow-1"
      />
      <v-btn
        v-if="smAndDown"
        icon
        variant="text"
        size="small"
        class="text-medium-emphasis flex-shrink-0"
        aria-label="Close sidebar navigation"
        title="Close sidebar"
        @click="$emit('update:modelValue', false)"
      >
        <v-icon size="20">mdi-close</v-icon>
      </v-btn>
    </div>

    <!-- Navigation Tree -->
    <div class="sidebar-scroll pa-2 overflow-y-auto">
      <v-list density="compact" nav class="pa-1">
        <!-- 1. Category: Getting Started -->
        <div class="category-group mb-2">
          <button
            type="button"
            class="category-header-btn d-flex align-center justify-space-between w-100 rounded px-2 py-1"
            @click="isGettingStartedOpen = !isGettingStartedOpen"
          >
            <span class="category-header-text">Getting Started</span>
            <v-icon
              size="15"
              :icon="isGettingStartedOpen ? 'mdi-chevron-down' : 'mdi-chevron-right'"
              class="text-medium-emphasis"
            />
          </button>

          <v-expand-transition>
            <div v-show="isGettingStartedOpen" class="category-items mt-1">
              <v-list-item
                prepend-icon="mdi-book-open-page-variant-outline"
                :active="activeSection === 'intro'"
                rounded="md"
                class="nav-item mb-1"
                @click="scrollTo('intro', 1)"
              >
                <template #title>
                  <span class="nav-title-text">Introduction & Governance</span>
                </template>
              </v-list-item>
            </div>
          </v-expand-transition>
        </div>

        <v-divider class="my-2 opacity-30" />

        <!-- 2. Category: Account & Access -->
        <div class="category-group mb-2">
          <button
            type="button"
            class="category-header-btn d-flex align-center justify-space-between w-100 rounded px-2 py-1"
            @click="isAccountOpen = !isAccountOpen"
          >
            <div class="d-flex align-center ga-2">
              <span class="category-header-text">Account & Access</span>
              <v-chip
                v-if="filterKeyword.trim()"
                size="x-small"
                color="primary"
                variant="tonal"
                class="font-weight-bold"
              >
                {{ filteredAccountModules.length }}
              </v-chip>
            </div>
            <v-icon
              size="15"
              :icon="isAccountOpen ? 'mdi-chevron-down' : 'mdi-chevron-right'"
              class="text-medium-emphasis"
            />
          </button>

          <v-expand-transition>
            <div v-show="isAccountOpen" class="category-items mt-1">
              <v-list-item
                v-for="mod in filteredAccountModules"
                :key="mod.id"
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

              <div
                v-if="filteredAccountModules.length === 0 && filterKeyword.trim()"
                class="px-3 py-2 text-caption text-disabled font-italic"
              >
                No matching chapters
              </div>
            </div>
          </v-expand-transition>
        </div>

        <v-divider class="my-2 opacity-30" />

        <!-- 3. Category: Organizational Setup -->
        <div class="category-group mb-2">
          <button
            type="button"
            class="category-header-btn d-flex align-center justify-space-between w-100 rounded px-2 py-1"
            @click="isOrgOpen = !isOrgOpen"
          >
            <div class="d-flex align-center ga-2">
              <span class="category-header-text">Organizational Setup</span>
              <v-chip
                v-if="filterKeyword.trim()"
                size="x-small"
                color="primary"
                variant="tonal"
                class="font-weight-bold"
              >
                {{ filteredOrgModules.length }}
              </v-chip>
            </div>
            <v-icon
              size="15"
              :icon="isOrgOpen ? 'mdi-chevron-down' : 'mdi-chevron-right'"
              class="text-medium-emphasis"
            />
          </button>

          <v-expand-transition>
            <div v-show="isOrgOpen" class="category-items mt-1">
              <v-list-item
                v-for="mod in filteredOrgModules"
                :key="mod.id"
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

              <div
                v-if="filteredOrgModules.length === 0 && filterKeyword.trim()"
                class="px-3 py-2 text-caption text-disabled font-italic"
              >
                No matching chapters
              </div>
            </div>
          </v-expand-transition>
        </div>
      </v-list>
    </div>

    <!-- Sidebar Sticky Footer -->
    <template #append>
      <div class="pa-3 bg-surface border-t d-flex align-center justify-space-between text-caption text-medium-emphasis">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-book-check-outline" size="16" color="primary" />
          <span class="font-weight-medium">GGC HRIS Handbook</span>
        </div>
        <v-btn
          icon="mdi-chevron-double-left"
          size="x-small"
          variant="text"
          title="Collapse sidebar"
          aria-label="Collapse sidebar navigation"
          @click="$emit('update:modelValue', false)"
        />
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import type { ModuleDoc } from '@/data/manualData'

const { smAndDown } = useDisplay()

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
const isGettingStartedOpen = ref(true)
const isAccountOpen = ref(true)
const isOrgOpen = ref(true)

// When searching/filtering, automatically expand all categories
watch(filterKeyword, (kw) => {
  if (kw.trim()) {
    isGettingStartedOpen.value = true
    isAccountOpen.value = true
    isOrgOpen.value = true
  }
})

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
  if (smAndDown.value) {
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
.doc-sidebar {
  border-right: 1px solid rgba(var(--v-border-color), var(--v-border-opacity, 0.12)) !important;
}

.sidebar-scroll {
  height: calc(100vh - 120px);
}

.category-header-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
  user-select: none;
}

.category-header-btn:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
}

.category-header-text {
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--v-theme-secondary));
}

.sidebar-filter :deep(.v-field) {
  border-radius: 6px !important;
  font-size: 0.8125rem;
}

.nav-item {
  font-size: 0.8125rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  transition: all 0.15s ease-in-out;
  border-radius: 6px !important;
  min-height: 38px;
  padding-inline: 10px 10px !important;
  border-left: 3px solid transparent;
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

.nav-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
}

.nav-item.v-list-item--active {
  background-color: rgba(var(--v-theme-primary), 0.12) !important;
  color: rgb(var(--v-theme-primary)) !important;
  border-left-color: rgb(var(--v-theme-primary)) !important;
  font-weight: 600;
}

@media print {
  .doc-sidebar,
  :deep(.v-navigation-drawer) {
    display: none !important;
  }
}
</style>
