<template>
  <div class="entity-management-sandbox">
    <!-- TOP CONTROL / LEARNING BAR -->
    <SandboxHeader title="Entity Management Live Sandbox"
      subtitle="Interactive environment mirroring GGC HRIS Corporate Entity management with dummy legal units."
      icon="mdi-domain" v-model:sandbox-mode="sandboxMode" v-model:selected-explanation="selectedExplanation"
      reset-title="Reset dummy entities to default records" @reset="resetDummyData" />

    <!-- MAIN HRIS IMITATION WORKSPACE CARD -->
    <div class="entity-page-wrapper">
      <v-card elevation="0" class="rounded-xl border bg-surface pa-4 pa-sm-6 main-imitation-card">
        <!-- TOP TOOLBAR: Search, View Mode Toggle, Create Button -->
        <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-4">
          <!-- Left: Search Box -->
          <div class="flex-grow-1 position-relative" style="max-width: 480px; min-width: 240px;">
            <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.search" location="bottom center"
              @hover="openFeatureExplanation('search')" />
            <v-text-field v-model="searchQuery" placeholder="search here..." variant="outlined" hide-details
              density="compact" rounded="lg" clearable prepend-inner-icon="mdi-magnify" class="search-input" />
          </div>

          <!-- Right: Refresh, View Switcher, Create Button -->
          <div class="d-flex align-center ga-2 flex-wrap">
            <!-- Refresh Button -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.refresh" location="bottom center"
                @hover="openFeatureExplanation('refresh')" />
              <v-btn icon size="small" variant="outlined" class="rounded-lg" :loading="isRefreshing"
                @click="triggerRefresh">
                <v-icon size="18">mdi-refresh</v-icon>
              </v-btn>
            </div>

            <!-- View Toggle (Grid vs List) -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.view_toggle"
                location="bottom center" @hover="openFeatureExplanation('view_toggle')" />
              <ViewToggle v-model="viewMode" />
            </div>

            <!-- Create Button -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.create_entity"
                location="bottom center" @hover="openFeatureExplanation('create_entity')" />
              <v-btn color="primary" class="rounded-lg text-capitalize font-weight-medium" prepend-icon="mdi-plus"
                @click="openCreateDialog">
                Create
              </v-btn>
            </div>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredEntities.length === 0" class="text-center py-12">
          <v-icon icon="mdi-office-building-cog" size="56" color="medium-emphasis" class="mb-2" />
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis">No entities found</div>
          <p class="text-caption text-medium-emphasis mb-3">
            {{ searchQuery ? 'Try adjusting your search query.' : 'No entities registered yet.' }}
          </p>
          <div class="d-flex justify-center ga-2">
            <v-btn v-if="searchQuery" size="small" variant="outlined" color="primary" @click="searchQuery = ''">
              Clear Search
            </v-btn>
            <v-btn size="small" color="primary" @click="openCreateDialog">
              Create Entity
            </v-btn>
          </div>
        </div>

        <!-- VIEW 1: GRID MODE (Cards with subtle borders) -->
        <div v-else-if="viewMode === 'grid'" class="position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.entity_card" location="bottom center"
            @hover="openFeatureExplanation('entity_card')" />

          <v-row dense>
            <v-col v-for="entity in paginatedEntities" :key="entity.id" cols="12" sm="6" md="4" lg="3">
              <v-card variant="outlined"
                class="entity-card rounded-xl pa-4 transition-swing h-100 d-flex flex-column justify-space-between"
                :class="{ 'card-highlight': sandboxMode === 'guide' }" @click="onCardClick(entity)">
                <!-- Top Section -->
                <div>
                  <!-- Top Row: Logo & Horizontal Dots Menu -->
                  <div class="d-flex justify-space-between align-start mb-3">
                    <v-avatar size="48" rounded="circle" class="entity-avatar elevation-1">
                      <div class="avatar-fallback w-100 h-100 d-flex align-center justify-center font-weight-bold">
                        <v-icon size="24" color="primary">mdi-office-building-outline</v-icon>
                      </div>
                    </v-avatar>

                    <!-- Horizontal 3 dots menu -->
                    <div class="position-relative">
                      <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.action_menu" small
                        location="left center" @hover="openFeatureExplanation('action_menu')" />
                      <v-menu location="bottom end">
                        <template #activator="{ props: menuProps }">
                          <v-btn v-bind="menuProps" icon="mdi-dots-horizontal" size="x-small" variant="text"
                            color="medium-emphasis" @click.stop />
                        </template>
                        <v-list density="compact" class="rounded-lg" elevation="2">
                          <v-list-item prepend-icon="mdi-eye-outline" title="View Profile"
                            @click="viewEntity(entity)" />
                        </v-list>
                      </v-menu>
                    </div>
                  </div>

                  <!-- Entity Info -->
                  <div class="mb-2">
                    <div class="text-subtitle-1 font-weight-bold text-truncate cursor-pointer entity-title mb-1"
                      :title="entity.name" @click.stop="viewEntity(entity)">
                      {{ entity.name }}
                    </div>

                    <!-- Address & Member Count Row -->
                    <div class="d-flex justify-space-between align-center">
                      <div class="text-caption text-medium-emphasis text-truncate flex-grow-1 mr-2"
                        :title="formatAddress(entity)">
                        {{ formatAddress(entity) }}
                      </div>

                      <!-- Headcount badge with GuideBadge 7 -->
                      <div class="position-relative flex-shrink-0">
                        <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.headcount" small
                          location="top right" @hover="openFeatureExplanation('headcount')" />
                        <div class="count-pill d-inline-flex align-center px-2 py-1 rounded-pill">
                          <v-icon icon="mdi-account-group-outline" size="14" class="mr-1 text-medium-emphasis" />
                          <span class="text-caption font-weight-medium text-medium-emphasis">
                            {{ entity.members_count }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom Section -->
                <div>
                  <v-divider class="my-3 opacity-20" />

                  <!-- Bottom Row: Code & Status Pill with GuideBadge 8 -->
                  <div class="d-flex justify-space-between align-center position-relative">
                    <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.code_status" small
                      location="top center" @hover="openFeatureExplanation('code_status')" />
                    <span class="text-caption font-weight-bold letter-spacing-1 text-medium-emphasis text-uppercase">
                      {{ entity.entity_code }}
                    </span>

                    <v-chip size="x-small" :color="entity.status ? 'success' : 'error'" variant="tonal"
                      class="font-weight-medium px-2 text-capitalize">
                      {{ entity.status ? 'Active' : 'Inactive' }}
                    </v-chip>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- VIEW 2: LIST MODE (Table matching real EntityListView) -->
        <div v-else class="position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.entity_card" location="bottom center"
            @hover="openFeatureExplanation('entity_card')" />

          <v-card variant="outlined" class="rounded-xl overflow-hidden list-table-card">
            <v-table density="comfortable" class="sim-entity-table">
              <thead>
                <tr>
                  <th class="table-header" style="width: 70px;">Logo</th>
                  <th class="table-header">Entity Name</th>
                  <th class="table-header">Code</th>
                  <th class="table-header">Address</th>
                  <th class="table-header">Postal Code</th>
                  <th class="table-header text-center">Status</th>
                  <th class="table-header text-end" style="width: 80px;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(entity, index) in paginatedEntities" :key="entity.id" class="cursor-pointer hover-row"
                  @click="onCardClick(entity)">
                  <td>
                    <v-avatar size="36" rounded="circle" class="elevation-0 my-1 entity-logo-avatar">
                      <v-icon size="20" color="primary">mdi-office-building-outline</v-icon>
                    </v-avatar>
                  </td>
                  <td>
                    <div
                      class="font-weight-bold text-high-emphasis text-body-2 hover-primary text-truncate cursor-pointer"
                      style="max-width: 220px;" :title="entity.name" @click.stop="viewEntity(entity)">
                      {{ entity.name }}
                    </div>
                  </td>
                  <td>
                    <span class="font-weight-bold text-uppercase text-body-2 text-high-emphasis">
                      {{ entity.entity_code }}
                    </span>
                  </td>
                  <td>
                    <span class="text-caption text-medium-emphasis address-text">{{ formatAddress(entity) }}</span>
                  </td>
                  <td>
                    <span class="text-caption text-medium-emphasis postal-text">{{ entity.postal_code || '—' }}</span>
                  </td>
                  <td class="text-center position-relative">
                    <GuideBadge v-if="sandboxMode === 'guide' && index === 0" :explanation="EXPLANATIONS.code_status"
                      small location="top center" @hover="openFeatureExplanation('code_status')" />
                    <span :class="entity.status ? 'status-pill-active' : 'status-pill-inactive'">
                      {{ entity.status ? 'Active' : 'Inactive' }}
                    </span>
                  </td>
                  <td class="text-end position-relative">
                    <GuideBadge v-if="sandboxMode === 'guide' && index === 0" :explanation="EXPLANATIONS.action_menu"
                      small location="left center" @hover="openFeatureExplanation('action_menu')" />
                    <v-menu location="bottom end">
                      <template #activator="{ props: menuProps }">
                        <v-btn v-bind="menuProps" icon="mdi-dots-horizontal" size="x-small" variant="text"
                          color="high-emphasis" @click.stop />
                      </template>
                      <v-list density="compact" class="rounded-lg" elevation="2">
                        <v-list-item prepend-icon="mdi-eye-outline" title="View Profile" @click="viewEntity(entity)" />
                      </v-list>
                    </v-menu>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </div>

        <!-- BOTTOM PAGINATION BAR -->
        <div class="d-flex flex-wrap align-center justify-space-between ga-3 mt-4 pt-3 border-t position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.pagination" small location="top center"
            @hover="openFeatureExplanation('pagination')" />

          <div class="text-caption text-medium-emphasis">
            Showing <strong>{{ paginationStart }}-{{ paginationEnd }}</strong> of <strong>{{ filteredEntities.length
              }}</strong>
            entities
          </div>

          <div class="d-flex align-center ga-3">
            <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
              <span>Rows per page:</span>
              <v-btn-toggle v-model="itemsPerPage" mandatory density="compact" color="primary">
                <v-btn :value="4" size="x-small">4</v-btn>
                <v-btn :value="8" size="x-small">8</v-btn>
                <v-btn :value="12" size="x-small">12</v-btn>
              </v-btn-toggle>
            </div>

            <div class="d-flex align-center ga-1">
              <v-btn icon="mdi-chevron-left" size="x-small" variant="outlined" :disabled="currentPage === 1"
                @click="currentPage--" />
              <span class="text-caption font-weight-bold px-2">{{ currentPage }} / {{ totalPages }}</span>
              <v-btn icon="mdi-chevron-right" size="x-small" variant="outlined" :disabled="currentPage >= totalPages"
                @click="currentPage++" />
            </div>
          </div>
        </div>
      </v-card>
    </div>

    <!-- DIALOG 1: VIEW ENTITY PROFILE MODAL (Faithfully imitating HRIS Entity Information) -->
    <v-dialog v-model="viewDialog" max-width="560">
      <v-card v-if="selectedEntity" class="mx-auto rounded-2xl w-100 bg-surface">
        <!-- Header -->
        <v-card-item class="pb-3 px-6 pt-5">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon class="mr-2" size="24" color="primary">mdi-file-document-outline</v-icon>
              <span class="text-h6 font-weight-bold text-high-emphasis">Entity Information</span>
            </div>

            <v-btn aria-label="Close" color="error" icon="mdi-close" size="32" variant="text"
              style="color: #ff7a59 !important;" @click="viewDialog = false" />
          </div>
        </v-card-item>

        <v-divider />

        <!-- View Body -->
        <v-card-text class="pt-5 px-6 pb-2">
          <!-- Top Row: Logo, Name & Status -->
          <div class="d-flex align-center justify-space-between mb-5">
            <div class="d-flex align-center ga-4">
              <v-avatar size="64" rounded="circle" class="elevation-2 bg-surface">
                <v-icon size="32" color="primary">mdi-office-building-outline</v-icon>
              </v-avatar>
              <div>
                <div class="text-subtitle-1 font-weight-bold text-high-emphasis">{{ selectedEntity.name }}</div>
                <div class="text-caption text-medium-emphasis text-uppercase font-weight-bold">{{
                  selectedEntity.entity_code
                  }}</div>
              </div>
            </div>

            <v-chip size="small" :color="selectedEntity.status ? 'success' : 'error'" variant="tonal"
              class="font-weight-medium px-2 text-capitalize">
              {{ selectedEntity.status ? 'Active' : 'Inactive' }}
            </v-chip>
          </div>

          <v-divider class="my-4 opacity-15" />

          <!-- Details Grid with GuideBadge 10 -->
          <div class="position-relative">
            <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.view_details" location="bottom center"
              @hover="openFeatureExplanation('view_details')" />

            <v-row dense class="mb-3">
              <v-col cols="12" sm="7">
                <div class="text-caption text-medium-emphasis mb-1">Entity Name</div>
                <div class="text-subtitle-2 font-weight-bold text-high-emphasis">{{ selectedEntity.name }}</div>
              </v-col>
              <v-col cols="12" sm="5">
                <div class="text-caption text-medium-emphasis mb-1">Entity Code</div>
                <div class="text-subtitle-2 font-weight-bold text-uppercase text-high-emphasis">{{
                  selectedEntity.entity_code }}</div>
              </v-col>
            </v-row>

            <v-row dense class="mb-3">
              <v-col cols="12">
                <div class="text-caption text-medium-emphasis mb-1">Total Employees</div>
                <div class="d-flex align-center font-weight-bold text-high-emphasis">
                  <v-icon icon="mdi-account-group-outline" size="16" class="mr-1 text-primary" />
                  <span>{{ selectedEntity.members_count }} personnel</span>
                </div>
              </v-col>
            </v-row>

            <div class="mb-4">
              <div class="text-caption text-medium-emphasis mb-1">Address</div>
              <div class="text-body-2 font-weight-medium text-high-emphasis">{{ formatAddress(selectedEntity) }}</div>
            </div>

            <v-row dense class="mb-2">
              <v-col cols="12" sm="6">
                <div class="text-caption text-medium-emphasis mb-1">Postal Code</div>
                <div class="text-subtitle-2 font-weight-bold text-high-emphasis">{{ selectedEntity.postal_code || '—' }}
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-divider class="my-2" />

        <!-- Actions -->
        <v-card-actions class="px-6 py-4 d-flex align-center ga-3">
          <div v-if="sandboxMode === 'guide'" class="mr-auto d-flex align-center">
            <GuideBadge inline :explanation="EXPLANATIONS.view_actions" location="top start"
              @hover="openFeatureExplanation('view_actions')" />
          </div>
          <v-spacer v-else />

          <v-btn color="error" variant="flat" class="text-capitalize rounded-lg font-weight-medium px-5"
            style="background-color: #ff7a59 !important; color: white !important;" @click="triggerSimDelete">
            Delete
          </v-btn>

          <v-btn variant="flat" class="text-capitalize rounded-lg font-weight-medium px-5"
            style="background-color: #5c6b77 !important; color: white !important;" @click="switchToEditFromView">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOG 2: CREATE / EDIT ENTITY MODAL (Faithfully imitating HRIS EntityCrudDialog) -->
    <v-dialog v-model="createDialog" max-width="560" persistent>
      <v-card class="rounded-2xl bg-surface">
        <!-- Header -->
        <v-card-item class="pb-3 px-6 pt-5">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon class="mr-2" size="24" color="primary">mdi-file-document-outline</v-icon>
              <span class="text-h6 font-weight-bold text-high-emphasis">
                {{ isEditing ? 'Edit Entity Information' : 'Create Entity Information' }}
              </span>
            </div>
            <v-btn aria-label="Close" color="error" icon="mdi-close" size="32" variant="text"
              style="color: #ff7a59 !important;" @click="createDialog = false" />
          </div>
        </v-card-item>

        <v-divider />

        <!-- Form Body -->
        <v-card-text class="pt-4 px-6 pb-2">
          <v-form @submit.prevent="saveEntity">
            <!-- Logo Section -->
            <div class="mb-4">
              <label class="text-medium-emphasis mb-2 d-block text-caption font-weight-medium">Entity Logo</label>
              <div class="d-flex align-center ga-4">
                <v-avatar size="64" rounded="circle" class="elevation-2 bg-surface">
                  <v-icon size="30" color="primary">mdi-office-building-outline</v-icon>
                </v-avatar>

                <div class="d-flex align-center ga-2">
                  <v-btn variant="outlined" prepend-icon="mdi-tray-arrow-up"
                    class="text-capitalize rounded-lg font-weight-medium" @click="triggerSimUploadLogo">
                    Upload logo
                  </v-btn>
                </div>
              </div>
            </div>

            <!-- Row: Entity Name & Code -->
            <v-row dense class="mb-3">
              <v-col cols="12" sm="7">
                <label class="text-medium-emphasis mb-1 d-block text-caption font-weight-medium">
                  Entity Name <span class="text-error">*</span>
                </label>
                <v-text-field v-model="formEntity.name" placeholder="e.g. Head Office" variant="outlined"
                  density="comfortable" rounded="lg" hide-details="auto" />
              </v-col>
              <v-col cols="12" sm="5">
                <label class="text-medium-emphasis mb-1 d-block text-caption font-weight-medium">
                  Entity Code <span class="text-error">*</span>
                </label>
                <v-text-field v-model="formEntity.entity_code" placeholder="e.g. HO" variant="outlined"
                  density="comfortable" rounded="lg" hide-details="auto" />
              </v-col>
            </v-row>

            <!-- Address Information Section with GuideBadge 12 -->
            <div class="mb-3 position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.edit_address"
                location="bottom center" @hover="openFeatureExplanation('edit_address')" />

              <div class="text-subtitle-2 font-weight-bold text-high-emphasis mb-2">Address Information</div>

              <!-- Row 1: Province & Municipality -->
              <v-row dense class="mb-2">
                <v-col cols="12" sm="6">
                  <label class="text-medium-emphasis mb-1 d-block text-caption">Province <span
                      class="text-error">*</span></label>
                  <v-select v-model="formEntity.province" :items="availableProvinces" placeholder="Select province"
                    variant="outlined" density="comfortable" rounded="lg" hide-details="auto"
                    @update:model-value="onProvinceChange" />
                </v-col>
                <v-col cols="12" sm="6">
                  <label class="text-medium-emphasis mb-1 d-block text-caption">City / Municipality <span
                      class="text-error">*</span></label>
                  <v-select v-model="formEntity.municipality" :items="availableMunicipalities"
                    placeholder="Select municipality" variant="outlined" density="comfortable" rounded="lg"
                    hide-details="auto" :disabled="!formEntity.province" @update:model-value="onMunicipalityChange" />
                </v-col>
              </v-row>

              <!-- Row 2: Barangay & Street -->
              <v-row dense class="mb-2">
                <v-col cols="12" sm="6">
                  <label class="text-medium-emphasis mb-1 d-block text-caption">Barangay <span
                      class="text-error">*</span></label>
                  <v-select v-model="formEntity.barangay" :items="availableBarangays" placeholder="Select barangay"
                    variant="outlined" density="comfortable" rounded="lg" hide-details="auto"
                    :disabled="!formEntity.municipality" />
                </v-col>
                <v-col cols="12" sm="6">
                  <label class="text-medium-emphasis mb-1 d-block text-caption">Street</label>
                  <v-text-field v-model="formEntity.street" placeholder="Enter street (optional)" variant="outlined"
                    density="comfortable" rounded="lg" hide-details="auto" />
                </v-col>
              </v-row>
            </div>

            <!-- Postal Code & Status Row -->
            <v-row dense class="mb-2">
              <v-col cols="12" :sm="isEditing ? 6 : 12">
                <label class="text-medium-emphasis mb-1 d-block text-caption font-weight-medium">
                  Postal Code <span class="text-error">*</span>
                </label>
                <v-text-field v-model="formEntity.postal_code" placeholder="e.g. 8002" variant="outlined"
                  density="comfortable" rounded="lg" hide-details="auto" />
              </v-col>
              <v-col v-if="isEditing" cols="12" sm="6">
                <label class="text-medium-emphasis mb-1 d-block text-caption font-weight-medium">
                  Status <span class="text-error">*</span>
                </label>
                <v-select v-model="formEntityStatus" :items="['Active', 'Inactive']" placeholder="Select status"
                  variant="outlined" density="comfortable" rounded="lg" hide-details="auto" />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider class="my-2" />

        <!-- Actions -->
        <v-card-actions class="px-6 py-4 d-flex align-center ga-3">
          <div v-if="sandboxMode === 'guide'" class="mr-auto d-flex align-center">
            <GuideBadge inline :explanation="EXPLANATIONS.edit_actions" location="top start"
              @hover="openFeatureExplanation('edit_actions')" />
          </div>
          <v-spacer v-else />

          <v-btn variant="flat" class="text-capitalize rounded-lg font-weight-medium px-4"
            style="background-color: #e2e8f0 !important; color: #334155 !important;" @click="createDialog = false">
            Cancel
          </v-btn>

          <v-btn color="primary" variant="flat" class="text-capitalize rounded-lg font-weight-medium px-5 text-white"
            style="background-color: #0284c7 !important;" @click="saveEntity">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- TOAST NOTIFICATION -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="2800" rounded="lg">
      <div class="d-flex align-center ga-2 text-caption font-weight-bold">
        <v-icon :icon="snackbarIcon" size="18" />
        <span>{{ snackbarText }}</span>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GuideBadge from './GuideBadge.vue'
import ViewToggle from './ViewToggle.vue'
import SandboxHeader from './SandboxHeader.vue'
import type { ExplanationInfo, SandboxMode, ViewMode } from '@/types/sandbox'
import {
  DEFAULT_ENTITIES,
  ENTITY_EXPLANATIONS as EXPLANATIONS,
  type DummyEntity,
} from '@/data/sandbox/entitySandboxData'
import { PHILIPPINE_ADDRESS_DATA as ADDRESS_DATA } from '@/data/sandbox/addressData'

// Sandbox state
const sandboxMode = ref<SandboxMode>('guide')
const entities = ref<DummyEntity[]>([...DEFAULT_ENTITIES])
const selectedExplanation = ref<ExplanationInfo | null>(EXPLANATIONS.search)

// Filter & View State
const searchQuery = ref('')
const viewMode = ref<ViewMode>('grid')
const isRefreshing = ref(false)

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(8)

// Modals
const viewDialog = ref(false)
const createDialog = ref(false)
const isEditing = ref(false)
const selectedEntity = ref<DummyEntity | null>(null)

// Form state
const formEntity = ref({
  id: '',
  name: '',
  entity_code: '',
  province: '',
  municipality: '',
  barangay: '',
  street: '',
  postal_code: '',
  status: true,
})

const formEntityStatus = computed({
  get: () => (formEntity.value.status ? 'Active' : 'Inactive'),
  set: (val: string) => {
    formEntity.value.status = val === 'Active'
  },
})


const availableProvinces = computed(() => Object.keys(ADDRESS_DATA).sort())

const availableMunicipalities = computed(() => {
  if (!formEntity.value.province || !ADDRESS_DATA[formEntity.value.province]) return []
  return Object.keys(ADDRESS_DATA[formEntity.value.province]).sort()
})

const availableBarangays = computed(() => {
  if (!formEntity.value.province || !formEntity.value.municipality) return []
  const prov = ADDRESS_DATA[formEntity.value.province]
  if (!prov || !prov[formEntity.value.municipality]) return []
  return prov[formEntity.value.municipality].slice().sort()
})

const onProvinceChange = () => {
  formEntity.value.municipality = ''
  formEntity.value.barangay = ''
}

const onMunicipalityChange = () => {
  formEntity.value.barangay = ''
}

// Toast notification
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')
const snackbarIcon = ref('mdi-check-circle')

const triggerToast = (text: string, color = 'success', icon = 'mdi-check-circle') => {
  snackbarText.value = text
  snackbarColor.value = color
  snackbarIcon.value = icon
  snackbar.value = true
}

const triggerSimUploadLogo = () => {
  triggerToast('Simulated Logo Upload: Corporate emblem attached', 'info', 'mdi-tray-arrow-up')
}

// Filtered Entities
const filteredEntities = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return entities.value

  return entities.value.filter(e => {
    return (
      e.name.toLowerCase().includes(q) ||
      e.entity_code.toLowerCase().includes(q) ||
      e.municipality.toLowerCase().includes(q) ||
      e.province.toLowerCase().includes(q)
    )
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredEntities.value.length / itemsPerPage.value)))

const paginatedEntities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredEntities.value.slice(start, start + itemsPerPage.value)
})

const paginationStart = computed(() => {
  if (filteredEntities.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredEntities.value.length)
})

// Refresh simulation
const triggerRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    triggerToast('Simulated server sync complete (6 entities synchronized)', 'success', 'mdi-sync')
  }, 750)
}

const openFeatureExplanation = (key: string) => {
  if (EXPLANATIONS[key]) {
    selectedExplanation.value = EXPLANATIONS[key]
  }
}

const onCardClick = (entity: DummyEntity) => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('entity_card')
  } else {
    viewEntity(entity)
  }
}

const formatAddress = (entity: DummyEntity): string => {
  const parts: string[] = []
  if (entity.street) parts.push(entity.street)
  if (entity.barangay) parts.push(entity.barangay)
  if (entity.municipality) parts.push(entity.municipality)
  if (entity.province && entity.province !== entity.municipality) parts.push(entity.province)
  return parts.join(', ') || 'No address provided'
}

// View Entity
const viewEntity = (entity: DummyEntity) => {
  selectedEntity.value = entity
  viewDialog.value = true
}

// Edit Entity
const editEntity = (entity: DummyEntity) => {
  isEditing.value = true
  formEntity.value = {
    id: entity.id,
    name: entity.name,
    entity_code: entity.entity_code,
    province: entity.province,
    municipality: entity.municipality,
    barangay: entity.barangay,
    street: entity.street,
    postal_code: entity.postal_code,
    status: entity.status,
  }
  createDialog.value = true
}

// Create Entity
const openCreateDialog = () => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('create_entity')
  }
  isEditing.value = false
  formEntity.value = {
    id: `ent-${Date.now()}`,
    name: '',
    entity_code: '',
    province: 'Davao del Sur',
    municipality: 'Digos City',
    barangay: 'Zone 3',
    street: '',
    postal_code: '8002',
    status: true,
  }
  createDialog.value = true
}

// Save Entity
const saveEntity = () => {
  if (!formEntity.value.name || !formEntity.value.entity_code) {
    triggerToast('Entity Name and Entity Code are required', 'warning', 'mdi-alert')
    return
  }

  if (isEditing.value) {
    const idx = entities.value.findIndex(e => e.id === formEntity.value.id)
    if (idx !== -1) {
      entities.value[idx] = {
        ...entities.value[idx],
        name: formEntity.value.name.trim(),
        entity_code: formEntity.value.entity_code.trim().toUpperCase(),
        province: formEntity.value.province,
        municipality: formEntity.value.municipality,
        barangay: formEntity.value.barangay,
        street: formEntity.value.street.trim(),
        postal_code: formEntity.value.postal_code.trim(),
        status: formEntity.value.status,
      }
      triggerToast(`Simulated Entity "${formEntity.value.name}" Updated!`, 'success')
    }
  } else {
    const newEntity: DummyEntity = {
      id: `ent-${Date.now()}`,
      name: formEntity.value.name.trim(),
      entity_code: formEntity.value.entity_code.trim().toUpperCase(),
      province: formEntity.value.province,
      municipality: formEntity.value.municipality,
      barangay: formEntity.value.barangay,
      street: formEntity.value.street.trim(),
      postal_code: formEntity.value.postal_code.trim(),
      members_count: 0,
      status: formEntity.value.status,
    }
    entities.value.unshift(newEntity)
    triggerToast(`Simulated Entity "${newEntity.name}" Created!`, 'success')
  }

  createDialog.value = false
}

// Delete Entity
const triggerSimDelete = () => {
  if (!selectedEntity.value) return
  const name = selectedEntity.value.name
  const id = selectedEntity.value.id
  entities.value = entities.value.filter(e => e.id !== id)
  viewDialog.value = false
  triggerToast(`Simulated Entity "${name}" deleted`, 'error', 'mdi-delete-outline')
}

// Switch from view to edit
const switchToEditFromView = () => {
  if (!selectedEntity.value) return
  const entity = selectedEntity.value
  viewDialog.value = false
  editEntity(entity)
}

// Reset data
const resetDummyData = () => {
  entities.value = JSON.parse(JSON.stringify(DEFAULT_ENTITIES))
  searchQuery.value = ''
  currentPage.value = 1
  triggerToast('Sandbox Reset: Default Entities Restored', 'info', 'mdi-restore')
}

defineExpose({
  openCreateDialog,
  setMode: (mode: 'play' | 'guide') => { sandboxMode.value = mode },
  openProfile: (entity?: DummyEntity) => {
    viewEntity(entity || entities.value[0])
  },
  openEdit: (entity?: DummyEntity) => {
    editEntity(entity || entities.value[0])
  },
  setSearch: (q: string) => {
    searchQuery.value = q
  },
  triggerRefresh: () => {
    resetDummyData()
  },
  focusFeature: (key: string) => {
    sandboxMode.value = 'guide'
    openFeatureExplanation(key)
  }
})
</script>

<style scoped>
.entity-management-sandbox {
  width: 100%;
}

.search-input {
  max-width: 100%;
}

.search-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.12;
}

.entity-card {
  position: relative;
  background-color: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  border-radius: 18px !important;
  transition: all 0.2s ease-in-out;
}

.entity-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.45) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.entity-avatar {
  background-color: #f0f7ff;
  border: 1px solid rgba(2, 132, 199, 0.12);
}

.avatar-fallback {
  background-color: rgba(2, 132, 199, 0.08);
}

.entity-title {
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.entity-title:hover {
  color: rgb(var(--v-theme-primary));
}

.count-pill {
  background-color: rgba(var(--v-theme-on-surface), 0.04);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.letter-spacing-1 {
  letter-spacing: 0.08em;
  font-size: 0.68rem;
}

.card-highlight {
  cursor: pointer;
}

.hover-primary:hover {
  color: rgb(var(--v-theme-primary)) !important;
}

.hover-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.03);
}

.main-imitation-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}

.list-table-card {
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  background-color: #ffffff;
}

.table-header {
  color: #64748b !important;
  font-weight: 600 !important;
  font-size: 0.85rem !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06) !important;
  background-color: #ffffff !important;
  text-transform: none !important;
  padding: 12px 16px !important;
}

.entity-logo-avatar {
  background-color: #f0f7ff;
  border: 1px solid rgba(2, 132, 199, 0.15);
}

.sim-entity-table td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.04) !important;
  padding: 12px 16px !important;
}

.status-pill-active {
  display: inline-block;
  background-color: #e8f8f0;
  color: #10b981;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 9999px;
  letter-spacing: 0.01em;
}

.status-pill-inactive {
  display: inline-block;
  background-color: #fee2e2;
  color: #ef4444;
  font-size: 0.78rem;
  font-weight: 600;
  padding: 4px 14px;
  border-radius: 9999px;
  letter-spacing: 0.01em;
}

.address-text,
.postal-text {
  color: #64748b !important;
  font-size: 0.84rem !important;
}

.sandbox-mode-toggle :deep(.v-btn--active) {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
}
</style>
