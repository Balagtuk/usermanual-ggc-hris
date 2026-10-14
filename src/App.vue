<template>
  <v-app :theme="currentTheme">
    <!-- Top Bar -->
    <ManualHeader v-model:search-query="searchQuery" :modules="MANUAL_MODULES" :is-dark="isDark" :view-mode="viewMode"
      :current-page="currentPage" :total-pages="totalPages" :scroll-progress="scrollProgress"
      @toggle-drawer="drawer = !drawer" @toggle-theme="toggleTheme" @toggle-view-mode="toggleViewMode"
      @trigger-print="handlePrint" @select-module="onModuleSelected" />

    <!-- Navigation Drawer -->
    <ManualSidebar v-model="drawer" :modules="MANUAL_MODULES" :active-section="activeSection"
      :visible-module-ids="visibleModuleIds" @navigate="handleNavigation" />
    <div class="reading-progress-track no-print">
      <div class="reading-progress-bar" :style="{ width: `${scrollProgress}%` }" />
    </div>

    <!-- Main Content Area -->
    <v-main class="bg-background">
      <v-container fluid class="page-wrapper px-2 px-sm-6 py-4 py-sm-6 max-content-width">
        <!-- View Mode & Quick Breadcrumb Bar -->
        <div class="d-flex flex-wrap align-center justify-space-between ga-2 mb-5 no-print">
          <div class="d-flex align-center ga-2 flex-wrap">
            <v-chip size="small" color="primary" variant="tonal" class="font-weight-medium">
              <v-icon start
                :icon="viewMode === 'paged' ? 'mdi-book-open-page-variant-outline' : 'mdi-format-list-bulleted'"
                size="15" />
              {{ viewMode === 'paged' ? 'Book Mode' : 'Continuous View' }}
            </v-chip>
            <span v-if="viewMode === 'paged'" class="text-caption text-medium-emphasis font-weight-medium">
              &bull; {{ currentPageTitle }}
            </span>
          </div>

          <div class="d-flex align-center ga-2">
            <v-btn size="small" variant="text" color="primary" class="text-none font-weight-medium"
              prepend-icon="mdi-swap-horizontal" @click="toggleViewMode">
              {{ viewMode === 'paged' ? 'Switch to Continuous (All)' : 'Switch to Book Mode' }}
            </v-btn>
          </div>
        </div>

        <!-- Filter Count Banner (When reading a matched module on page 2+) -->
        <v-alert v-if="searchQuery.trim() && currentPage > 1" color="primary" variant="tonal" density="compact"
          class="mb-6 rounded-lg no-print" closable @click:close="searchQuery = ''">
          <div class="d-flex align-center justify-space-between flex-wrap ga-2">
            <span>
              Viewing match <strong>{{ currentPage - 1 }} of {{ filteredModules.length }}</strong> for "<em>{{
                searchQuery }}</em>"
            </span>
            <div class="d-flex align-center ga-2">
              <v-btn size="small" variant="text" color="primary" class="text-none font-weight-medium"
                prepend-icon="mdi-format-list-bulleted" @click="goToPage(1)">
                View Results List
              </v-btn>
              <v-btn size="small" variant="text" color="primary" class="text-none" @click="searchQuery = ''">
                Clear Filter
              </v-btn>
            </div>
          </div>
        </v-alert>

        <!-- CONTENT AREA: PAGED VIEW MODE -->
        <div v-else-if="viewMode === 'paged'">
          <!-- Page 1: Search Results View (when searching) OR Introduction (when not searching) -->
          <div v-if="currentPage === 1">
            <SearchResultsView v-if="searchQuery.trim()" :query="searchQuery" :results="searchResults"
              @select-module="onModuleSelected" @clear-search="searchQuery = ''"
              @apply-suggestion="(s) => searchQuery = s" />
            <IntroductionSection v-else :modules="MANUAL_MODULES" @start-tour="goToPage(2)"
              @select-module="onModuleSelectedFromIntro" />
          </div>

          <!-- Page 2+: Selected Module -->
          <div v-else-if="currentPagedModule">
            <ModuleSection :key="currentPagedModule.id" :module="currentPagedModule" />
          </div>

          <!-- Enterprise Bottom Previous / Next Chapter Cards (GitBook / Stripe Docs style) -->
          <div class="chapter-nav-grid mt-8 mb-4 no-print d-flex flex-wrap ga-4">
            <v-card v-if="currentPage > 1"
              class="chapter-nav-card flex-grow-1 pa-4 rounded-lg bg-surface border cursor-pointer" elevation="0"
              @click="goToPage(currentPage - 1)">
              <div class="d-flex align-center ga-2 text-caption text-medium-emphasis mb-1">
                <v-icon icon="mdi-arrow-left" size="14" />
                <span>PREVIOUS CHAPTER</span>
              </div>
              <div class="text-subtitle-2 font-weight-bold text-high-emphasis">
                {{ prevPageTitle }}
              </div>
            </v-card>

            <v-card v-if="currentPage < totalPages"
              class="chapter-nav-card flex-grow-1 pa-4 rounded-lg bg-surface border cursor-pointer text-end ms-auto"
              elevation="0" @click="goToPage(currentPage + 1)">
              <div class="d-flex align-center justify-end ga-2 text-caption text-medium-emphasis mb-1">
                <span>NEXT CHAPTER</span>
                <v-icon icon="mdi-arrow-right" size="14" />
              </div>
              <div class="text-subtitle-2 font-weight-bold text-primary">
                {{ nextPageTitle }}
              </div>
            </v-card>
          </div>

          <!-- Compact Page Pagination Controls -->
          <v-card class="pa-3 pa-md-4 rounded-lg bg-surface border no-print" elevation="0">
            <div class="d-flex flex-wrap align-center justify-space-between ga-3">
              <span class="text-caption text-medium-emphasis font-weight-medium">
                Chapter <strong>{{ currentPage }}</strong> of {{ totalPages }} &bull; Use Left/Right arrow keys to flip
              </span>
              <v-pagination v-model="currentPage" :length="totalPages" :total-visible="5" density="compact"
                active-color="primary" rounded="circle" />
            </div>
          </v-card>
        </div>

        <!-- CONTENT AREA: CONTINUOUS BOOK / SHOW ALL MODE (Ideal for printing) -->
        <div v-else>
          <SearchResultsView v-if="searchQuery.trim()" :query="searchQuery" :results="searchResults"
            @select-module="onModuleSelected" @clear-search="searchQuery = ''"
            @apply-suggestion="(s) => searchQuery = s" />
          <IntroductionSection v-else :modules="MANUAL_MODULES" @start-tour="scrollToSection('mod-user')"
            @select-module="scrollToSection" />

          <ModuleSection v-for="mod in filteredModules" :key="mod.id" :module="mod" />
        </div>
      </v-container>
      <!-- Floating Back to Top Button -->
      <v-btn v-show="showBackToTop" icon="mdi-arrow-up" color="primary" variant="flat" size="small"
        class="back-to-top-btn no-print" aria-label="Scroll to top of document" title="Scroll to top"
        @click="scrollToTop" />
    </v-main>

    <!-- Footer -->
    <ManualFooter />
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useTheme } from 'vuetify'
import { MANUAL_MODULES, type ModuleDoc } from '@/data/manualData'
import { searchModules } from '@/utils/searchHelper'
import ManualHeader from '@/components/ManualHeader.vue'
import ManualSidebar from '@/components/ManualSidebar.vue'
import IntroductionSection from '@/components/IntroductionSection.vue'
import ModuleSection from '@/components/ModuleSection.vue'
import SearchResultsView from '@/components/SearchResultsView.vue'
import ManualFooter from '@/components/ManualFooter.vue'

const theme = useTheme()
const savedTheme = (typeof window !== 'undefined' ? localStorage.getItem('ggc_manual_theme') : null) || 'light'
const currentTheme = ref<'light' | 'dark'>(savedTheme === 'dark' ? 'dark' : 'light')
const drawer = ref(true)
const searchQuery = ref('')
const activeSection = ref('intro')
const viewMode = ref<'paged' | 'all'>('paged')
const currentPage = ref(1)
const scrollProgress = ref(0)
const showBackToTop = ref(false)

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
const searchResults = computed(() => {
  return searchModules(MANUAL_MODULES, searchQuery.value)
})

const filteredModules = computed(() => {
  const query = searchQuery.value.trim()
  if (!query) return MANUAL_MODULES
  return searchResults.value.map((res) => res.module)
})

const visibleModuleIds = computed(() => {
  return new Set(filteredModules.value.map((m) => m.id))
})

// Automatically navigate to page 1 (Search Results view) when search starts
watch(searchQuery, (newQuery, oldQuery) => {
  if (newQuery.trim() && !oldQuery?.trim()) {
    currentPage.value = 1
  }
})

// Total pages: Page 1 is Introduction/Search Results + each filtered module
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
    activeSection.value = searchQuery.value.trim() ? 'search-results' : 'intro'
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
  if (currentPage.value === 1) {
    if (searchQuery.value.trim()) {
      return `Search: "${searchQuery.value}" (${searchResults.value.length} found)`
    }
    return 'Chapter 1: Introduction & Architecture'
  }
  return `${currentPagedModule.value?.num}. ${currentPagedModule.value?.title || 'Module'}`
})

const prevPageTitle = computed(() => {
  if (currentPage.value <= 1) return 'None'
  if (currentPage.value === 2) {
    return searchQuery.value.trim() ? 'Search Results' : 'Introduction & Governance'
  }
  const prevMod = filteredModules.value[currentPage.value - 3]
  return prevMod ? `${prevMod.num}. ${prevMod.title}` : 'Previous'
})

const nextPageTitle = computed(() => {
  if (currentPage.value >= totalPages.value) return 'End of Manual'
  if (currentPage.value === 1 && searchQuery.value.trim()) {
    const firstMatch = filteredModules.value[0]
    return firstMatch ? `${firstMatch.num}. ${firstMatch.title}` : 'Next'
  }
  const nextMod = filteredModules.value[currentPage.value - 1]
  return nextMod ? `${nextMod.num}. ${nextMod.title}` : 'Next'
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

// Module selection handler (from Header dropdown or Search Results view)
const onModuleSelected = (modId: string) => {
  activeSection.value = modId
  if (viewMode.value === 'paged') {
    const idx = filteredModules.value.findIndex((m) => m.id === modId)
    if (idx !== -1) {
      currentPage.value = idx + 2
    } else {
      // If module was filtered out, clear search so it becomes accessible
      searchQuery.value = ''
      const allIdx = MANUAL_MODULES.findIndex((m) => m.id === modId)
      if (allIdx !== -1) {
        currentPage.value = allIdx + 2
      }
    }
  } else {
    scrollToSection(modId)
  }
}

// Sidebar or intro card navigation handler
const handleNavigation = (sectionId: string, pageNumber?: number) => {
  if (sectionId === 'intro') {
    searchQuery.value = ''
    activeSection.value = 'intro'
    if (viewMode.value === 'paged') {
      currentPage.value = 1
    } else {
      scrollToSection('intro')
    }
  } else if (pageNumber !== undefined && !searchQuery.value.trim() && viewMode.value === 'paged') {
    activeSection.value = sectionId
    currentPage.value = pageNumber
  } else {
    onModuleSelected(sectionId)
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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
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

// Scrollspy for active link tracking and reading progress
const handleScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0
  showBackToTop.value = scrollTop > 320

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
  max-width: 1400px;
  margin: 0 auto;
}

.chapter-nav-card {
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  min-width: 240px;
}

.chapter-nav-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.4) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05) !important;
}

.back-to-top-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15) !important;
}

@media (max-width: 600px) {
  .chapter-nav-grid {
    flex-direction: column !important;
  }

  .chapter-nav-card {
    min-width: 100% !important;
    width: 100% !important;
  }

  .back-to-top-btn {
    bottom: 16px !important;
    right: 16px !important;
  }
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
