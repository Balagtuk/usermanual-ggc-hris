<template>
  <div class="branch-sandbox">
    <!-- TOP CONTROL / LEARNING BAR -->
    <SandboxHeader
      title="Branch Management Live Sandbox"
      subtitle="Interactive environment mirroring GGC HRIS Branch management with physical work sites and DOLE regions."
      icon="mdi-storefront-outline"
      v-model:sandbox-mode="sandboxMode"
      v-model:selected-explanation="selectedExplanation"
      reset-title="Reset dummy branches to default records"
      @reset="resetSandbox"
    />

    <!-- MAIN IMITATION CONTAINER (Imitating HRIS Branch Page) -->
    <v-card variant="outlined" class="rounded-2xl bg-surface border pa-4 pa-sm-5 main-imitation-card">
      <div class="sandbox-content">
        <!-- TOP TOOLBAR: Search + Filter (Left) | Refresh + ViewToggle + Create (Right) -->
        <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-5">
          <!-- LEFT: Search Input + Filter by Entity beside it -->
          <div class="d-flex align-center ga-3 flex-wrap flex-grow-1">
            <!-- Search Bar with GuideBadge 1 -->
            <div class="position-relative" style="width: 280px; max-width: 100%;">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.search" location="bottom left"
                @hover="openFeatureExplanation('search')" />
              <v-text-field v-model="searchQuery" placeholder="search here..." variant="outlined" hide-details
                density="compact" rounded="lg" clearable class="search-input" prepend-inner-icon="mdi-magnify" />
            </div>

            <!-- Filter by Entity with GuideBadge 2 -->
            <div class="position-relative" style="width: 220px; max-width: 100%;">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.entity_filter"
                location="bottom left" @hover="openFeatureExplanation('entity_filter')" />
              <v-select v-model="selectedEntityFilter" :items="entityFilterOptions" label="Entity"
                placeholder="All Entities" variant="outlined" density="compact" rounded="lg" hide-details clearable />
            </div>
          </div>

          <!-- RIGHT: RefreshButton + ViewToggle + Create Button -->
          <div class="d-flex align-center ga-2 flex-wrap">
            <!-- Refresh Button with GuideBadge 3 -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.refresh" location="bottom center"
                @hover="openFeatureExplanation('refresh')" />
              <v-btn icon="mdi-refresh" size="small" variant="outlined" rounded="lg" color="medium-emphasis"
                :loading="isRefreshing" title="Synchronize Branch Data" @click="simulateRefresh" />
            </div>

            <!-- Grid / List View Toggle with GuideBadge 4 -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.view_toggle"
                location="bottom center" @hover="openFeatureExplanation('view_toggle')" />
              <ViewToggle v-model="viewMode" />
            </div>

            <!-- Create Button with GuideBadge 5 -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.create_branch"
                location="bottom center" @hover="openFeatureExplanation('create_branch')" />
              <v-btn color="primary" class="rounded-lg text-capitalize font-weight-medium px-4 ml-1"
                prepend-icon="mdi-plus" @click="openCreateDialog">
                Create
              </v-btn>
            </div>
          </div>
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredBranches.length === 0" class="text-center py-12">
          <v-icon icon="mdi-storefront-remove-outline" size="56" color="medium-emphasis" class="mb-2" />
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis">No branches found</div>
          <p class="text-caption text-medium-emphasis mb-3">
            {{ searchQuery || selectedEntityFilter ? 'Try adjusting your search query or entity filter.' : 'Start by creating your first branch.' }}
          </p>
          <div class="d-flex justify-center ga-2">
            <v-btn v-if="searchQuery || selectedEntityFilter" size="small" variant="outlined" color="primary"
              @click="clearFilters">
              Clear Filters
            </v-btn>
            <v-btn size="small" color="primary" @click="openCreateDialog">
              Create Branch
            </v-btn>
          </div>
        </div>

        <!-- VIEW 1: GRID MODE (Cards with subtle borders matching BranchGridView.vue) -->
        <div v-else-if="viewMode === 'grid'" class="position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.branch_card" location="bottom center"
            @hover="openFeatureExplanation('branch_card')" />

          <v-row dense>
            <v-col v-for="branch in paginatedBranches" :key="branch.id" cols="12" sm="6" md="4" lg="3">
              <v-card variant="outlined"
                class="branch-card rounded-xl pa-4 transition-swing position-relative h-100 d-flex flex-column justify-space-between"
                :class="{ 'card-highlight': sandboxMode === 'guide' }" @click="onCardClick(branch)">
                <!-- 3-Dots Action Menu (Top-Right) with GuideBadge 8 -->
                <div class="action-menu-pos position-relative">
                  <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.action_menu" small
                    location="left center" @hover="openFeatureExplanation('action_menu')" />
                  <v-menu location="bottom end">
                    <template #activator="{ props: menuProps }">
                      <v-btn v-bind="menuProps" icon="mdi-dots-horizontal" size="x-small" variant="text"
                        color="medium-emphasis" @click.stop />
                    </template>
                    <v-list density="compact" class="rounded-lg" elevation="2">
                      <v-list-item prepend-icon="mdi-eye-outline" title="View Profile" @click="viewBranch(branch)" />
                    </v-list>
                  </v-menu>
                </div>

                <!-- Top Section: Initial Letter Avatar + Name & Location Subtitle -->
                <div>
                  <div class="d-flex align-center mb-4 pr-7">
                    <!-- Circular Avatar with First Letter with GuideBadge 7 -->
                    <div class="position-relative mr-3 flex-shrink-0">
                      <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.letter_avatar" small
                        location="top left" @hover="openFeatureExplanation('letter_avatar')" />
                      <div class="letter-avatar rounded-circle d-flex align-center justify-center">
                        <span class="letter-text">{{ getInitial(branch.name) }}</span>
                      </div>
                    </div>

                    <!-- Branch Name & Location Subtitle -->
                    <div class="text-truncate">
                      <div class="text-subtitle-1 font-weight-bold text-truncate cursor-pointer branch-title"
                        :title="branch.name" @click.stop="viewBranch(branch)">
                        {{ branch.name }}
                      </div>
                      <div class="text-caption text-medium-emphasis text-truncate" :title="getLocationSubtitle(branch)">
                        {{ getLocationSubtitle(branch) }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom Section: Hardcoded Employees & Established Duration -->
                <div>
                  <v-divider class="my-3 opacity-20" />

                  <div class="d-flex justify-space-between align-center text-caption text-medium-emphasis">
                    <!-- Left: Employees Count with GuideBadge 9 -->
                    <div class="d-flex align-center position-relative">
                      <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.headcount" small
                        location="top left" @hover="openFeatureExplanation('headcount')" />
                      <v-icon icon="mdi-account-group-outline" size="16" class="mr-1 text-medium-emphasis" />
                      <span class="font-weight-medium text-caption">{{ branch.employees_count }} Employees</span>
                    </div>

                    <!-- Right: Established Duration with GuideBadge 10 -->
                    <div class="position-relative">
                      <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.duration" small
                        location="top right" @hover="openFeatureExplanation('duration')" />
                      <span class="font-weight-medium text-caption text-medium-emphasis">
                        {{ formatEstablishedDuration(branch.established_date) }}
                      </span>
                    </div>
                  </div>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- VIEW 2: LIST MODE (Table matching real BranchListView.vue) -->
        <div v-else class="position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.branch_card" location="bottom center"
            @hover="openFeatureExplanation('branch_card')" />

          <v-card variant="outlined" class="rounded-xl overflow-hidden list-table-card">
            <v-table density="comfortable" class="sim-branch-table">
              <thead>
                <tr>
                  <th class="table-header">Branch Name</th>
                  <th class="table-header">Contact Number</th>
                  <th class="table-header">Email Address</th>
                  <th class="table-header">Address</th>
                  <th class="table-header text-end" style="width: 80px;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(branch, index) in paginatedBranches" :key="branch.id" class="cursor-pointer hover-row"
                  @click="onCardClick(branch)">
                  <td>
                    <div
                      class="font-weight-bold text-high-emphasis text-body-2 hover-primary text-truncate cursor-pointer"
                      style="max-width: 220px;" :title="branch.name" @click.stop="viewBranch(branch)">
                      {{ branch.name }}
                    </div>
                  </td>
                  <td>
                    <span class="text-caption text-medium-emphasis">{{ branch.contact_no || '—' }}</span>
                  </td>
                  <td>
                    <span class="text-caption text-medium-emphasis">{{ branch.email || '—' }}</span>
                  </td>
                  <td>
                    <span class="text-caption text-medium-emphasis">{{ formatAddress(branch) }}</span>
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
                        <v-list-item prepend-icon="mdi-eye-outline" title="View Profile" @click="viewBranch(branch)" />
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
            Showing <strong>{{ paginationStart }}-{{ paginationEnd }}</strong> of <strong>{{ filteredBranches.length
            }}</strong>
            branches
          </div>

          <div class="d-flex align-center ga-2">
            <v-btn icon="mdi-chevron-left" size="x-small" variant="text" :disabled="currentPage === 1"
              @click="currentPage--" />
            <span class="text-caption font-weight-medium">{{ currentPage }} / {{ totalPages || 1 }}</span>
            <v-btn icon="mdi-chevron-right" size="x-small" variant="text" :disabled="currentPage >= totalPages"
              @click="currentPage++" />
          </div>
        </div>
      </div>
    </v-card>

    <!-- DIALOG 1: VIEW BRANCH PROFILE MODAL (Faithfully imitating HRIS BranchCrudDialog View Mode) -->
    <v-dialog v-model="viewDialog" max-width="560" persistent>
      <v-card v-if="selectedBranch" class="rounded-2xl bg-surface">
        <!-- Header -->
        <v-card-item class="pb-3 px-6 pt-5">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon class="mr-2" size="24" color="primary">mdi-file-document-outline</v-icon>
              <span class="text-h6 font-weight-bold text-high-emphasis">Branch Information</span>
            </div>
            <v-btn aria-label="Close" color="error" icon="mdi-close" size="32" variant="text"
              style="color: #ff7a59 !important;" @click="viewDialog = false" />
          </div>
        </v-card-item>

        <v-divider />

        <!-- Details Grid -->
        <v-card-text class="pt-5 px-6 pb-2">
          <!-- Row 1: Branch Name & Entity Name -->
          <v-row dense class="mb-3">
            <v-col cols="12" sm="7">
              <div class="text-caption text-medium-emphasis mb-1">Branch Name</div>
              <div class="text-subtitle-2 font-weight-bold text-high-emphasis">{{ selectedBranch.name }}</div>
            </v-col>
            <v-col cols="12" sm="5">
              <div class="text-caption text-medium-emphasis mb-1">Entity</div>
              <div class="text-subtitle-2 font-weight-bold text-uppercase text-high-emphasis">
                {{ selectedBranch.entity_name || '—' }}
              </div>
            </v-col>
          </v-row>

          <!-- Row 2: Region & Total Employees with GuideBadge 12 -->
          <v-row dense class="mb-3 position-relative">
            <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.region_wage" location="bottom center"
              @hover="openFeatureExplanation('region_wage')" />
            <v-col cols="12" sm="7">
              <div class="text-caption text-medium-emphasis mb-1">Region</div>
              <div class="text-subtitle-2 font-weight-bold text-uppercase text-high-emphasis">
                {{ selectedBranch.region_name || '—' }}
              </div>
            </v-col>
            <v-col cols="12" sm="5">
              <div class="text-caption text-medium-emphasis mb-1">Total Employees</div>
              <div class="d-flex align-center font-weight-bold text-high-emphasis">
                <v-icon icon="mdi-account-group-outline" size="16" class="mr-1 text-primary" />
                <span>{{ selectedBranch.employees_count }} personnel</span>
              </div>
            </v-col>
          </v-row>

          <!-- Row 3: Address -->
          <div class="mb-3">
            <div class="text-caption text-medium-emphasis mb-1">Address</div>
            <div class="text-body-2 text-high-emphasis">{{ formatAddress(selectedBranch) }}</div>
          </div>

          <!-- Row 4: Postal Code & Contact Number -->
          <v-row dense class="mb-3">
            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis mb-1">Postal Code</div>
              <div class="text-body-2 text-high-emphasis">{{ selectedBranch.postal_code || '—' }}</div>
            </v-col>
            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis mb-1">Contact Number</div>
              <div class="text-body-2 text-high-emphasis">{{ selectedBranch.contact_no || '—' }}</div>
            </v-col>
          </v-row>

          <!-- Row 5: Status -->
          <v-row dense class="mb-2">
            <v-col cols="12" sm="6">
              <div class="text-caption text-medium-emphasis mb-1">Status</div>
              <div>
                <span :class="selectedBranch.status ? 'status-pill-active' : 'status-pill-inactive'">
                  {{ selectedBranch.status ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <!-- Footer Actions with GuideBadge 13 (inline) -->
        <v-card-actions class="px-6 py-4 d-flex justify-end align-center ga-3 position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.view_actions" location="top center"
            inline @hover="openFeatureExplanation('view_actions')" />

          <v-btn class="rounded-lg text-capitalize font-weight-medium px-5"
            style="background-color: #ff7a59 !important; color: white !important;" @click="simulateDelete">
            Delete
          </v-btn>

          <v-btn class="rounded-lg text-capitalize font-weight-medium px-5"
            style="background-color: #5c6b77 !important; color: white !important;" @click="switchToEditFromView">
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOG 2: CREATE / EDIT BRANCH MODAL (Faithfully imitating HRIS BranchCrudDialog) -->
    <v-dialog v-model="createDialog" max-width="560" persistent>
      <v-card class="rounded-2xl bg-surface">
        <!-- Header -->
        <v-card-item class="pb-3 px-6 pt-5">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon class="mr-2" size="24" color="primary">mdi-file-document-outline</v-icon>
              <span class="text-h6 font-weight-bold text-high-emphasis">
                {{ isEditing ? 'Edit Branch Information' : 'Create Branch Information' }}
              </span>
            </div>
            <v-btn aria-label="Close" color="error" icon="mdi-close" size="32" variant="text"
              style="color: #ff7a59 !important;" @click="createDialog = false" />
          </div>
        </v-card-item>

        <v-divider />

        <!-- Form Body -->
        <v-card-text class="pt-4 px-6 pb-2">
          <v-form @submit.prevent="saveBranch">
            <!-- Row: Entity Name & Region with GuideBadge 14 -->
            <div class="position-relative mb-3">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.region_select" location="top center"
                @hover="openFeatureExplanation('region_select')" />
              <v-row dense>
                <v-col cols="12" sm="7">
                  <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                    Entity Name <span class="text-error">*</span>
                  </label>
                  <v-autocomplete v-model="formBranch.entity_name" :items="ENTITY_OPTIONS" placeholder="Select Entity"
                    variant="outlined" density="comfortable" hide-details />
                </v-col>
                <v-col cols="12" sm="5">
                  <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                    Region <span class="text-error">*</span>
                  </label>
                  <v-autocomplete v-model="formBranch.region_name" :items="REGION_OPTIONS" placeholder="Select Region"
                    variant="outlined" density="comfortable" hide-details />
                </v-col>
              </v-row>
            </div>

            <!-- Row: Branch Name & Contact Number -->
            <v-row dense class="mb-3">
              <v-col cols="12" sm="7">
                <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                  Branch Name <span class="text-error">*</span>
                </label>
                <v-text-field v-model="formBranch.name" placeholder="e.g. Manila Branch" variant="outlined"
                  density="comfortable" hide-details />
              </v-col>
              <v-col cols="12" sm="5">
                <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                  Contact Number <span class="text-error">*</span>
                </label>
                <v-text-field v-model="formBranch.contact_no" placeholder="e.g. 0917-123-4567" variant="outlined"
                  density="comfortable" hide-details maxlength="13" @input="formatContactNumber" />
              </v-col>
            </v-row>

            <!-- Email Address -->
            <div class="mb-3">
              <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                Email Address <span class="text-error">*</span>
              </label>
              <v-text-field v-model="formBranch.email" placeholder="e.g. branch@company.com" variant="outlined"
                density="comfortable" hide-details />
            </div>

            <!-- Address Information Section with GuideBadge 15 -->
            <div class="mb-3 position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.address_cascade"
                location="top center" @hover="openFeatureExplanation('address_cascade')" />
              <div class="text-subtitle-2 font-weight-bold text-high-emphasis mb-2">Address Information</div>

              <!-- Row 1: Province & Municipality -->
              <v-row dense class="mb-2">
                <v-col cols="12" sm="6">
                  <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                    Province <span class="text-error">*</span>
                  </label>
                  <v-autocomplete v-model="formBranch.province" :items="availableProvinces"
                    placeholder="Select province" variant="outlined" density="comfortable" hide-details clearable
                    @update:model-value="onProvinceChange" />
                </v-col>
                <v-col cols="12" sm="6">
                  <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                    City / Municipality <span class="text-error">*</span>
                  </label>
                  <v-autocomplete v-model="formBranch.municipality" :items="availableMunicipalities"
                    placeholder="Select municipality" variant="outlined" density="comfortable" hide-details clearable
                    :disabled="!formBranch.province" @update:model-value="onMunicipalityChange" />
                </v-col>
              </v-row>

              <!-- Row 2: Barangay & Street -->
              <v-row dense>
                <v-col cols="12" sm="6">
                  <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                    Barangay <span class="text-error">*</span>
                  </label>
                  <v-autocomplete v-model="formBranch.barangay" :items="availableBarangays"
                    placeholder="Select barangay" variant="outlined" density="comfortable" hide-details clearable
                    :disabled="!formBranch.municipality" />
                </v-col>
                <v-col cols="12" sm="6">
                  <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">Street</label>
                  <v-text-field v-model="formBranch.street" placeholder="Enter street (optional)" variant="outlined"
                    density="comfortable" hide-details />
                </v-col>
              </v-row>
            </div>

            <!-- Postal Code & Status Row -->
            <v-row dense class="mb-2">
              <v-col cols="12" :sm="isEditing ? 6 : 12">
                <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                  Postal Code <span class="text-error">*</span>
                </label>
                <v-text-field v-model="formBranch.postal_code" placeholder="e.g. 8002" variant="outlined"
                  density="comfortable" hide-details />
              </v-col>
              <v-col v-if="isEditing" cols="12" sm="6">
                <label class="text-caption font-weight-medium text-medium-emphasis mb-1 d-block">
                  Status <span class="text-error">*</span>
                </label>
                <v-select v-model="formBranchStatus" :items="['Active', 'Inactive']" placeholder="Select status"
                  variant="outlined" density="comfortable" hide-details />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-divider />

        <!-- Actions with GuideBadge 16 (inline) -->
        <v-card-actions class="px-6 py-4 d-flex justify-end align-center ga-3 position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.form_actions" location="top center"
            inline @hover="openFeatureExplanation('form_actions')" />

          <v-btn class="rounded-lg text-capitalize font-weight-medium px-5"
            style="background-color: #e2e8f0 !important; color: #334155 !important;" @click="createDialog = false">
            Cancel
          </v-btn>

          <v-btn color="primary" variant="flat" class="text-capitalize rounded-lg font-weight-medium px-5 text-white"
            style="background-color: #0284c7 !important;" @click="saveBranch">
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
  DEFAULT_BRANCHES,
  BRANCH_EXPLANATIONS as EXPLANATIONS,
  ENTITY_OPTIONS,
  REGION_OPTIONS,
  type DummyBranch,
} from '@/data/sandbox/branchSandboxData'
import { PHILIPPINE_ADDRESS_DATA as ADDRESS_DATA } from '@/data/sandbox/addressData'

// State
const branches = ref<DummyBranch[]>([...DEFAULT_BRANCHES])
const sandboxMode = ref<SandboxMode>('guide')
const selectedExplanation = ref<ExplanationInfo | null>(EXPLANATIONS.search)
const viewMode = ref<ViewMode>('grid')
const searchQuery = ref('')
const selectedEntityFilter = ref<string | null>(null)
const isRefreshing = ref(false)
const currentPage = ref(1)
const itemsPerPage = 8

// Dialogs
const viewDialog = ref(false)
const createDialog = ref(false)
const isEditing = ref(false)
const selectedBranch = ref<DummyBranch | null>(null)

// Form State
const formBranch = ref<Partial<DummyBranch>>({
  name: '',
  entity_name: '',
  region_name: '',
  contact_no: '',
  email: '',
  province: '',
  municipality: '',
  barangay: '',
  street: '',
  postal_code: '',
  status: true,
})

const formBranchStatus = computed({
  get: () => (formBranch.value.status ? 'Active' : 'Inactive'),
  set: (val: string) => {
    formBranch.value.status = val === 'Active'
  },
})

// Address Cascading Getters
const availableProvinces = computed(() => Object.keys(ADDRESS_DATA).sort())

const availableMunicipalities = computed(() => {
  if (!formBranch.value.province || !ADDRESS_DATA[formBranch.value.province]) return []
  return Object.keys(ADDRESS_DATA[formBranch.value.province]).sort()
})

const availableBarangays = computed(() => {
  if (
    !formBranch.value.province ||
    !formBranch.value.municipality ||
    !ADDRESS_DATA[formBranch.value.province]?.[formBranch.value.municipality]
  ) {
    return []
  }
  return ADDRESS_DATA[formBranch.value.province][formBranch.value.municipality]
})

function onProvinceChange() {
  formBranch.value.municipality = ''
  formBranch.value.barangay = ''
}

function onMunicipalityChange() {
  formBranch.value.barangay = ''
}

// Auto format contact number as 09xx-xxx-xxxx
function formatContactNumber() {
  let val = formBranch.value.contact_no || ''
  val = val.replace(/\D/g, '')
  if (val.length > 11) val = val.substring(0, 11)
  if (val.length > 7) {
    val = `${val.substring(0, 4)}-${val.substring(4, 7)}-${val.substring(7)}`
  } else if (val.length > 4) {
    val = `${val.substring(0, 4)}-${val.substring(4)}`
  }
  formBranch.value.contact_no = val
}

// Toast
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')
const snackbarIcon = ref('mdi-check-circle-outline')

function notify(text: string, color = 'success', icon = 'mdi-check-circle-outline') {
  snackbarText.value = text
  snackbarColor.value = color
  snackbarIcon.value = icon
  snackbar.value = true
}

// Filter Options
const entityFilterOptions = computed(() => {
  const set = new Set(branches.value.map(b => b.entity_name).filter(Boolean))
  return Array.from(set).sort()
})

// Filtered Branches
const filteredBranches = computed(() => {
  let list = branches.value

  if (selectedEntityFilter.value) {
    list = list.filter(b => b.entity_name === selectedEntityFilter.value)
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(b => {
      const name = b.name.toLowerCase()
      const contact = (b.contact_no || '').toLowerCase()
      const addr = formatAddress(b).toLowerCase()
      const entity = (b.entity_name || '').toLowerCase()
      return name.includes(q) || contact.includes(q) || addr.includes(q) || entity.includes(q)
    })
  }

  return list
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredBranches.value.length / itemsPerPage))

const paginatedBranches = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredBranches.value.slice(start, start + itemsPerPage)
})

const paginationStart = computed(() => {
  if (filteredBranches.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, filteredBranches.value.length)
})

// Helpers
function getInitial(name?: string): string {
  if (!name || !name.trim()) return 'B'
  return name.trim().charAt(0).toUpperCase()
}

function getLocationSubtitle(branch: DummyBranch): string {
  const parts: string[] = []
  if (branch.municipality) parts.push(branch.municipality)
  if (branch.province && branch.province !== branch.municipality) parts.push(branch.province)
  return parts.join(', ') || 'Philippines'
}

function formatAddress(branch: DummyBranch): string {
  const parts: string[] = []
  if (branch.street) parts.push(branch.street)
  if (branch.barangay) parts.push(branch.barangay)
  if (branch.municipality) parts.push(branch.municipality)
  if (branch.province && branch.province !== branch.municipality) parts.push(branch.province)
  return parts.join(', ') || 'No address provided'
}

function formatEstablishedDuration(dateStr?: string): string {
  if (!dateStr) return 'N/A'
  const estDate = new Date(dateStr)
  if (isNaN(estDate.getTime())) return dateStr

  const now = new Date()
  const diffMonths = (now.getFullYear() - estDate.getFullYear()) * 12 + (now.getMonth() - estDate.getMonth())

  if (diffMonths <= 0) return 'Recent'
  if (diffMonths < 12) return `${diffMonths} ${diffMonths === 1 ? 'month' : 'months'}`

  const years = Math.floor(diffMonths / 12)
  return `${years} ${years === 1 ? 'year' : 'years'}`
}

function clearFilters() {
  searchQuery.value = ''
  selectedEntityFilter.value = null
}

function simulateRefresh() {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    notify('Simulated: Branch roster synchronized with biometric servers.')
  }, 600)
}

function resetSandbox() {
  branches.value = [...DEFAULT_BRANCHES]
  searchQuery.value = ''
  selectedEntityFilter.value = null
  currentPage.value = 1
  notify('Sandbox reset to default corporate branch records.')
}

function onCardClick(branch: DummyBranch) {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('branch_card')
  } else {
    viewBranch(branch)
  }
}

function viewBranch(branch: DummyBranch) {
  selectedBranch.value = branch
  viewDialog.value = true
}

function openCreateDialog() {
  isEditing.value = false
  formBranch.value = {
    name: '',
    entity_name: selectedEntityFilter.value || 'Damayan',
    region_name: 'REGION XI (DAVAO REGION)',
    contact_no: '',
    email: '',
    province: 'Davao del Sur',
    municipality: 'Digos City',
    barangay: 'Zone I',
    street: '',
    postal_code: '8002',
    status: true,
  }
  createDialog.value = true
}

function switchToEditFromView() {
  if (!selectedBranch.value) return
  isEditing.value = true
  formBranch.value = { ...selectedBranch.value }
  viewDialog.value = false
  createDialog.value = true
}

function saveBranch() {
  if (!formBranch.value.name || !formBranch.value.name.trim()) {
    notify('Please enter a branch facility name.', 'error', 'mdi-alert-circle-outline')
    return
  }

  if (isEditing.value && selectedBranch.value) {
    const idx = branches.value.findIndex(b => b.id === selectedBranch.value?.id)
    if (idx !== -1) {
      branches.value[idx] = {
        ...branches.value[idx],
        ...formBranch.value,
      } as DummyBranch
      notify(`Simulated: Updated "${formBranch.value.name}" successfully.`)
    }
  } else {
    const newBranch: DummyBranch = {
      id: `br-${Date.now()}`,
      name: formBranch.value.name || 'New Branch',
      entity_name: formBranch.value.entity_name || 'Damayan',
      region_name: formBranch.value.region_name || 'REGION XI (DAVAO REGION)',
      contact_no: formBranch.value.contact_no || '0917-000-0000',
      email: formBranch.value.email || 'branch@company.com',
      province: formBranch.value.province || 'Davao del Sur',
      municipality: formBranch.value.municipality || 'Digos City',
      barangay: formBranch.value.barangay || 'Zone I',
      street: formBranch.value.street || '',
      postal_code: formBranch.value.postal_code || '8002',
      employees_count: 15,
      established_date: new Date().toISOString().split('T')[0],
      status: true,
    }
    branches.value.unshift(newBranch)
    notify(`Simulated: Registered new branch "${newBranch.name}".`)
  }

  createDialog.value = false
}

function simulateDelete() {
  if (!selectedBranch.value) return
  const name = selectedBranch.value.name
  branches.value = branches.value.filter(b => b.id !== selectedBranch.value?.id)
  viewDialog.value = false
  notify(`Simulated: Branch "${name}" deleted.`, 'info', 'mdi-trash-can-outline')
}

function openFeatureExplanation(featureKey: string) {
  const exp = EXPLANATIONS[featureKey]
  if (exp) {
    selectedExplanation.value = exp
  }
}
</script>

<style scoped>
.branch-sandbox {
  font-family: inherit;
}

.search-input :deep(.v-field) {
  background-color: rgb(var(--v-theme-surface));
  --v-field-border-opacity: 0.12;
}

.branch-card {
  position: relative;
  background-color: rgb(var(--v-theme-surface)) !important;
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  border-radius: 18px !important;
  transition: all 0.2s ease-in-out;
}

.branch-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.45) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.action-menu-pos {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
}

/* Circular Avatar with First Letter */
.letter-avatar {
  width: 52px;
  height: 52px;
  background-color: rgba(2, 132, 199, 0.08);
  border: 1px solid rgba(2, 132, 199, 0.18);
}

.letter-text {
  color: rgb(var(--v-theme-primary));
  font-size: 24px;
  font-weight: 800;
  line-height: 1;
}

.branch-title {
  font-size: 1.05rem;
  letter-spacing: -0.01em;
}

.branch-title:hover {
  color: rgb(var(--v-theme-primary));
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

.sim-branch-table td {
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

.sandbox-mode-toggle :deep(.v-btn--active) {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
}
</style>
