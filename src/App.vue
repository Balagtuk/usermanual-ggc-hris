<template>
  <v-app :theme="currentTheme">
    <!-- Top Bar -->
    <ManualHeader
      v-model:search-query="searchQuery"
      :is-dark="isDark"
      :view-mode="viewMode"
      :current-page="currentPage"
      :total-pages="totalPages"
      @toggle-drawer="drawer = !drawer"
      @toggle-theme="toggleTheme"
      @toggle-view-mode="toggleViewMode"
      @trigger-print="handlePrint"
    />

    <!-- Navigation Drawer -->
    <ManualSidebar
      v-model="drawer"
      :modules="MANUAL_MODULES"
      :active-section="activeSection"
      :visible-module-ids="visibleModuleIds"
      @navigate="handleNavigation"
    />

    <!-- Main Content Area -->
    <v-main class="bg-background">
      <v-container fluid class="page-wrapper px-sm-6 px-4 py-6 max-content-width">
        <!-- View Mode & Quick Breadcrumb Bar -->
        <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-5 no-print">
          <div class="d-flex align-center ga-2 flex-wrap">
            <v-chip size="small" color="primary" variant="tonal" class="font-weight-medium">
              <v-icon start :icon="viewMode === 'paged' ? 'mdi-book-open-page-variant-outline' : 'mdi-format-list-bulleted'" size="15" />
              {{ viewMode === 'paged' ? 'Paged Reading' : 'Continuous View' }}
            </v-chip>
            <span
              v-if="viewMode === 'paged'"
              class="text-caption text-medium-emphasis font-weight-medium"
            >
              &bull; {{ currentPageTitle }}
            </span>
          </div>

          <div class="d-flex align-center ga-2">
            <v-btn
              size="small"
              variant="text"
              color="primary"
              class="text-none font-weight-medium"
              prepend-icon="mdi-swap-horizontal"
              @click="toggleViewMode"
            >
              {{ viewMode === 'paged' ? 'Switch to Continuous (All)' : 'Switch to Paged Mode' }}
            </v-btn>
          </div>
        </div>

        <!-- Filter Count Banner (When searching) -->
        <v-alert
          v-if="searchQuery.trim()"
          color="primary"
          variant="tonal"
          density="compact"
          class="mb-6 rounded-lg no-print"
          closable
          @click:close="searchQuery = ''"
        >
          <div class="d-flex align-center justify-space-between flex-wrap ga-2">
            <span>
              Showing <strong>{{ filteredModules.length }}</strong> of {{ MANUAL_MODULES.length }} modules matching "<em>{{ searchQuery }}</em>"
            </span>
            <v-btn
              size="small"
              variant="text"
              color="primary"
              class="text-none"
              @click="searchQuery = ''"
            >
              Reset Filter
            </v-btn>
          </div>
        </v-alert>

        <!-- No Results Fallback -->
        <v-card
          v-if="filteredModules.length === 0"
          class="pa-8 text-center rounded-lg my-8 bg-surface"
          elevation="0"
        >
          <v-icon icon="mdi-file-search-outline" size="64" color="grey" class="mb-4" />
          <h3 class="text-h6 font-weight-bold mb-2">No Matching Modules Found</h3>
          <p class="text-body-2 text-medium-emphasis mb-4">
            Try searching for another keyword, field name, route, or permission code.
          </p>
          <v-btn
            color="primary"
            variant="flat"
            prepend-icon="mdi-refresh"
            @click="searchQuery = ''"
          >
            Clear Search
          </v-btn>
        </v-card>

        <!-- CONTENT AREA: PAGED VIEW MODE -->
        <div v-else-if="viewMode === 'paged'">
          <!-- Page 1: Introduction -->
          <div v-if="currentPage === 1">
            <IntroductionSection
              :modules="MANUAL_MODULES"
              @start-tour="goToPage(2)"
              @select-module="onModuleSelectedFromIntro"
            />
          </div>

          <!-- Page 2 to 10: Selected Module -->
          <div v-else-if="currentPagedModule">
            <ModuleSection
              :key="currentPagedModule.id"
              :module="currentPagedModule"
            />
          </div>

          <!-- Bottom Sticky/In-Flow Pagination Controls (Borderless) -->
          <v-card class="pa-4 pa-md-5 rounded-lg mt-6 bg-surface no-print" elevation="0">
            <div class="d-flex flex-wrap align-center justify-space-between ga-3">
              <!-- Previous Page Button -->
              <v-btn
                color="primary"
                variant="outlined"
                class="text-none font-weight-medium"
                prepend-icon="mdi-chevron-left"
                :disabled="currentPage <= 1"
                @click="goToPage(currentPage - 1)"
              >
                Previous: {{ prevPageTitle }}
              </v-btn>

              <!-- Central Pagination Indicators -->
              <div class="d-flex align-center ga-2">
                <v-pagination
                  v-model="currentPage"
                  :length="totalPages"
                  :total-visible="5"
                  density="comfortable"
                  active-color="primary"
                  rounded="circle"
                />
              </div>

              <!-- Next Page Button -->
              <v-btn
                color="primary"
                variant="flat"
                class="text-none font-weight-bold"
                append-icon="mdi-chevron-right"
                :disabled="currentPage >= totalPages"
                @click="goToPage(currentPage + 1)"
              >
                Next: {{ nextPageTitle }}
              </v-btn>
            </div>

            <!-- Page Quick Jump Footer -->
            <div class="d-flex align-center justify-space-between mt-3 pt-3 border-t text-caption text-medium-emphasis">
              <span>Use Left/Right arrow keys to turn pages</span>
              <span>Page <strong>{{ currentPage }}</strong> of {{ totalPages }}</span>
            </div>
          </v-card>
        </div>

        <!-- CONTENT AREA: CONTINUOUS BOOK / SHOW ALL MODE (Ideal for printing) -->
        <div v-else>
          <IntroductionSection
            :modules="MANUAL_MODULES"
            @start-tour="scrollToSection('mod-user')"
            @select-module="scrollToSection"
          />

          <ModuleSection
            v-for="mod in filteredModules"
            :key="mod.id"
            :module="mod"
          />
        </div>
      </v-container>
    </v-main>

    <!-- Footer -->
    <ManualFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'
import { MANUAL_MODULES, type ModuleDoc } from '@/data/manualData'
import ManualHeader from '@/components/ManualHeader.vue'
import ManualSidebar from '@/components/ManualSidebar.vue'
import IntroductionSection from '@/components/IntroductionSection.vue'
import ModuleSection from '@/components/ModuleSection.vue'
import ManualFooter from '@/components/ManualFooter.vue'

const theme = useTheme()
const savedTheme = (typeof window !== 'undefined' ? localStorage.getItem('ggc_manual_theme') : null) || 'light'
const currentTheme = ref<'light' | 'dark'>(savedTheme === 'dark' ? 'dark' : 'light')
const drawer = ref(true)
const searchQuery = ref('')
const activeSection = ref('intro')
const viewMode = ref<'paged' | 'all'>('paged')
const currentPage = ref(1)

const isDark = computed(() => currentTheme.value === 'dark')

const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  theme.global.name.value = currentTheme.value
  if (typeof window !== 'undefined') {
    localStorage.setItem('ggc_manual_theme', currentTheme.value)
  }
}

onMounted(() => {
  theme.global.name.value = currentTheme.value
})

const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'paged' ? 'all' : 'paged'
  if (viewMode.value === 'all') {
    nextTick(() => {
      scrollToSection(activeSection.value)
    })
  }
}

// Search and filter logic
const filteredModules = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return MANUAL_MODULES

  return MANUAL_MODULES.filter((m) => {
    const textTarget = [
      m.title,
      m.route,
      m.description,
      m.overview,
      ...m.permissions,
      ...(m.fields?.map((f) => `${f.name} ${f.description}`) || []),
      ...(m.steps?.map((s) => `${s.title} ${s.description}`) || []),
    ].join(' ').toLowerCase()

    return textTarget.includes(query)
  })
})

const visibleModuleIds = computed(() => {
  return new Set(filteredModules.value.map((m) => m.id))
})

// Total pages: Page 1 is Introduction + each filtered module
const totalPages = computed(() => {
  return 1 + filteredModules.value.length
})

// Determine which module is currently shown in paged mode
const currentPagedModule = computed<ModuleDoc | undefined>(() => {
  if (currentPage.value <= 1) return undefined
  return filteredModules.value[currentPage.value - 2]
})

// Synchronize activeSection whenever currentPage changes
watch(currentPage, (newPage) => {
  if (newPage === 1) {
    activeSection.value = 'intro'
  } else if (currentPagedModule.value) {
    activeSection.value = currentPagedModule.value.id
  }
  // Smooth scroll back to top of main content when turning pages
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// Reset to page 1 if current page exceeds total pages during searching
watch(totalPages, (newTotal) => {
  if (currentPage.value > newTotal) {
    currentPage.value = 1
  }
})

// Titles for pagination navigation buttons
const currentPageTitle = computed(() => {
  if (currentPage.value === 1) return 'Chapter 1: Introduction & Architecture'
  return `${currentPagedModule.value?.num}. ${currentPagedModule.value?.title || 'Module'}`
})

const prevPageTitle = computed(() => {
  if (currentPage.value <= 1) return 'None'
  if (currentPage.value === 2) return 'Introduction'
  const prevMod = filteredModules.value[currentPage.value - 3]
  return prevMod ? `${prevMod.num}. ${prevMod.title}` : 'Previous'
})

const nextPageTitle = computed(() => {
  if (currentPage.value >= totalPages.value) return 'End of Manual'
  const nextMod = filteredModules.value[currentPage.value - 1]
  return nextMod ? `${nextMod.num}. ${nextMod.title}` : 'Next'
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Sidebar or intro card navigation handler
const handleNavigation = (sectionId: string, pageNumber?: number) => {
  activeSection.value = sectionId
  if (viewMode.value === 'paged') {
    if (pageNumber !== undefined) {
      currentPage.value = pageNumber
    } else if (sectionId === 'intro') {
      currentPage.value = 1
    } else {
      const idx = filteredModules.value.findIndex((m) => m.id === sectionId)
      if (idx !== -1) {
        currentPage.value = idx + 2
      }
    }
  } else {
    scrollToSection(sectionId)
  }
}

const onModuleSelectedFromIntro = (modId: string) => {
  handleNavigation(modId)
}

const scrollToSection = (id: string) => {
  activeSection.value = id
  const target = document.getElementById(id)
  if (target) {
    const offset = 80
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = target.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

// Print handling: temporarily switch to continuous mode so all modules print
const handlePrint = () => {
  const previousMode = viewMode.value
  viewMode.value = 'all'
  nextTick(() => {
    window.print()
    // Restore previous mode after print dialogue closes
    setTimeout(() => {
      viewMode.value = previousMode
    }, 1000)
  })
}

// Keyboard arrow navigation
const handleKeyDown = (e: KeyboardEvent) => {
  // Ignore arrow navigation if user is typing in an input or textarea
  const target = e.target as HTMLElement
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    return
  }

  if (viewMode.value === 'paged') {
    if (e.key === 'ArrowLeft' && currentPage.value > 1) {
      goToPage(currentPage.value - 1)
    } else if (e.key === 'ArrowRight' && currentPage.value < totalPages.value) {
      goToPage(currentPage.value + 1)
    }
  }
}

// Scrollspy for active link tracking in continuous mode
const handleScroll = () => {
  if (viewMode.value !== 'all') return
  const scrollPos = window.scrollY + 140
  const sections = ['intro', ...MANUAL_MODULES.map((m) => m.id)]

  for (const id of sections) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        activeSection.value = id
        break
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.max-content-width {
  max-width: 1040px;
  margin: 0 auto;
}

@media print {
  .no-print {
    display: none !important;
  }
  .max-content-width {
    max-width: 100% !important;
    padding: 0 !important;
  }
}
</style>
