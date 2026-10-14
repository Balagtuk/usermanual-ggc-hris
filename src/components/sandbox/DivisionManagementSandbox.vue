<template>
  <div class="division-management-sandbox rounded-xl border bg-surface overflow-hidden">
    <!-- Sandbox Control & Guide Header -->
    <div class="sandbox-top-bar px-4 py-3 bg-surface-variant d-flex flex-wrap align-center justify-space-between ga-3 border-b">
      <div class="d-flex align-center ga-2 flex-wrap">
        <v-chip size="small" color="primary" variant="flat" class="font-weight-bold">
          <v-icon start icon="mdi-flask-outline" size="14" />
          Interactive Sandbox
        </v-chip>
        <span class="text-caption font-weight-bold text-high-emphasis">
          Simulated Division Management Interface
        </span>
        <v-chip size="x-small" variant="tonal" color="secondary" class="d-none d-sm-inline-flex">
          Safe Playground &bull; No live database changes
        </v-chip>
      </div>

      <!-- Mode Switch & Reset Controls -->
      <div class="d-flex align-center ga-2 flex-wrap">
        <v-btn-toggle
          v-model="sandboxMode"
          mandatory
          density="compact"
          color="primary"
          rounded="lg"
          class="sandbox-mode-toggle border"
        >
          <v-btn value="play" size="small" class="text-none font-weight-medium px-3">
            <v-icon start icon="mdi-gamepad-variant-outline" size="15" />
            Try Live
          </v-btn>
          <v-btn value="guide" size="small" class="text-none font-weight-medium px-3">
            <v-icon start icon="mdi-lightbulb-on-outline" size="15" />
            Explain Controls
            <v-badge v-if="sandboxMode !== 'guide'" color="warning" dot floating />
          </v-btn>
        </v-btn-toggle>

        <v-btn
          size="small"
          variant="text"
          color="medium-emphasis"
          class="text-none font-weight-medium"
          prepend-icon="mdi-restore"
          title="Reset dummy divisions to default records"
          @click="resetDummyData"
        >
          Reset
        </v-btn>
      </div>
    </div>

    <!-- Active Guide Banner (When Guide Mode is ON) -->
    <v-expand-transition>
      <div v-if="sandboxMode === 'guide'" class="guide-banner px-4 py-2 bg-primary-lighten-5 border-b">
        <div class="d-flex align-center justify-space-between flex-wrap ga-2">
          <div class="d-flex align-center ga-2">
            <v-avatar size="24" color="primary" variant="flat">
              <v-icon icon="mdi-cursor-default-hover" size="14" color="white" />
            </v-avatar>
            <div>
              <span class="text-caption font-weight-bold text-primary mr-1">
                Hover Mode Active:
              </span>
              <span class="text-caption text-medium-emphasis">
                Move your mouse over any numbered badge (1 to 8) to see an instant pop-up explanation of that feature, its required permissions, and best practices.
              </span>
            </div>
          </div>
          <v-chip
            v-if="selectedExplanation"
            size="x-small"
            color="primary"
            variant="flat"
            closable
            @click:close="selectedExplanation = null"
          >
            Focused: {{ selectedExplanation.name }}
          </v-chip>
        </div>
      </div>
    </v-expand-transition>

    <!-- Guide Explanation Drawer / Active Pinned Card -->
    <v-expand-transition>
      <div v-if="sandboxMode === 'guide' && selectedExplanation" class="explanation-details-box pa-4 bg-surface border-b">
        <v-card variant="tonal" color="primary" class="rounded-lg pa-3 pa-sm-4">
          <div class="d-flex flex-wrap align-start justify-space-between ga-3 mb-2">
            <div class="d-flex align-center ga-3">
              <v-avatar size="34" color="primary" variant="flat">
                <v-icon :icon="selectedExplanation.icon || 'mdi-information'" size="18" color="white" />
              </v-avatar>
              <div>
                <div class="d-flex align-center ga-2 flex-wrap">
                  <h4 class="text-subtitle-1 font-weight-bold text-high-emphasis mb-0">
                    {{ selectedExplanation.name }}
                  </h4>
                  <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                    Control #{{ selectedExplanation.badgeNumber }}
                  </v-chip>
                  <v-chip size="x-small" color="secondary" variant="tonal">
                    {{ selectedExplanation.location }}
                  </v-chip>
                </div>
                <div class="text-caption text-medium-emphasis">
                  {{ selectedExplanation.purpose }}
                </div>
              </div>
            </div>

            <v-btn
              icon="mdi-close"
              size="x-small"
              variant="text"
              color="medium-emphasis"
              @click="selectedExplanation = null"
            />
          </div>

          <v-divider class="my-2" />

          <v-row dense class="text-caption mt-1">
            <v-col cols="12" md="6">
              <div class="font-weight-bold text-high-emphasis mb-1">
                <v-icon icon="mdi-play-circle-outline" size="14" class="mr-1 text-primary" />
                Operational Action:
              </div>
              <div class="text-medium-emphasis">
                {{ selectedExplanation.action }}
              </div>
            </v-col>
            <v-col cols="12" md="3">
              <div class="font-weight-bold text-high-emphasis mb-1">
                <v-icon icon="mdi-shield-lock-outline" size="14" class="mr-1 text-primary" />
                Required Permission:
              </div>
              <v-chip size="x-small" color="primary" variant="outlined" class="font-weight-bold">
                {{ selectedExplanation.permission || 'division.read' }}
              </v-chip>
            </v-col>
            <v-col cols="12" md="3">
              <div class="font-weight-bold text-high-emphasis mb-1">
                <v-icon icon="mdi-lightbulb-outline" size="14" class="mr-1 text-warning" />
                Administrator Tip:
              </div>
              <div class="text-medium-emphasis">
                {{ selectedExplanation.tip }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-expand-transition>

    <!-- SIMULATED REAL APPLICATION WINDOW -->
    <div class="simulated-app-window pa-4 pa-sm-6 bg-background">
      <!-- Simulated Breadcrumb -->
      <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
        <div class="d-flex align-center ga-2 text-caption">
          <span class="text-medium-emphasis cursor-pointer" @click="triggerToast('Navigated to Simulated Dashboard')">Dashboard</span>
          <span class="text-disabled">/</span>
          <span class="font-weight-bold text-high-emphasis">Divisions</span>
        </div>
        <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
          <v-icon icon="mdi-clock-outline" size="14" />
          <span>Simulated Data Sync: {{ lastSyncTime }}</span>
        </div>
      </div>

      <!-- Main Application Card (Imitating Divisions/index.vue) -->
      <v-card elevation="0" class="rounded-xl border bg-surface pa-4 pa-sm-6 main-imitation-card">
        <!-- TOP TOOLBAR: Filters & Actions -->
        <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-4">
          <!-- Filter by Department (Left) -->
          <div class="d-flex flex-wrap align-center ga-2 position-relative flex-grow-1 sim-filters-wrapper">
            <!-- Badge 1: Department Filter -->
            <GuideBadge
              v-if="sandboxMode === 'guide'"
              :explanation="EXPLANATIONS.dept_filter"
              location="bottom center"
              @hover="openFeatureExplanation('dept_filter')"
            />

            <!-- Department Filter -->
            <v-select
              v-model="selectedDepartment"
              :items="availableDepartments"
              label="Filter by Department"
              placeholder="All Departments"
              variant="outlined"
              density="compact"
              hide-details
              rounded="lg"
              clearable
              prepend-inner-icon="mdi-account-group-outline"
              class="sim-filter-select"
            />

            <v-btn
              v-if="selectedDepartment"
              variant="text"
              size="small"
              color="primary"
              class="text-capitalize font-weight-medium"
              @click="clearFilters"
            >
              Clear
            </v-btn>
          </div>

          <!-- Right Action Controls: Refresh, View Switch, Create -->
          <div class="d-flex align-center ga-3 position-relative">
            <!-- Refresh Button -->
            <div class="position-relative">
              <GuideBadge
                v-if="sandboxMode === 'guide'"
                :explanation="EXPLANATIONS.refresh"
                location="bottom center"
                @hover="openFeatureExplanation('refresh')"
              />
              <v-btn
                icon
                size="small"
                variant="outlined"
                rounded="lg"
                color="primary"
                :loading="isRefreshing"
                title="Synchronize division records"
                @click="triggerRefresh"
              >
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>

            <!-- View Mode Switch -->
            <div class="position-relative">
              <GuideBadge
                v-if="sandboxMode === 'guide'"
                :explanation="EXPLANATIONS.view_toggle"
                location="bottom center"
                @hover="openFeatureExplanation('view_toggle')"
              />
              <v-btn-toggle
                v-model="viewMode"
                mandatory
                density="compact"
                color="primary"
                rounded="lg"
                class="border"
              >
                <v-btn value="grid" size="small" icon title="Card Grid View">
                  <v-icon size="18">mdi-view-grid-outline</v-icon>
                </v-btn>
                <v-btn value="list" size="small" icon title="Table List View">
                  <v-icon size="18">mdi-view-list-outline</v-icon>
                </v-btn>
              </v-btn-toggle>
            </div>

            <!-- Create Button -->
            <div class="position-relative">
              <GuideBadge
                v-if="sandboxMode === 'guide'"
                :explanation="EXPLANATIONS.create_division"
                location="bottom center"
                @hover="openFeatureExplanation('create_division')"
              />
              <v-btn
                color="primary"
                class="rounded-lg text-capitalize font-weight-medium"
                prepend-icon="mdi-plus"
                @click="openCreateDialog"
              >
                Create Division
              </v-btn>
            </div>
          </div>
        </div>

        <!-- SEARCH BAR -->
        <div class="mb-4 position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.search"
            location="bottom center"
            @hover="openFeatureExplanation('search')"
          />
          <v-text-field
            v-model="searchQuery"
            placeholder="Search divisions by name, team lead, or parent department..."
            variant="outlined"
            hide-details
            density="compact"
            rounded="lg"
            clearable
            prepend-inner-icon="mdi-magnify"
            class="search-input"
          />
        </div>

        <!-- EMPTY STATE -->
        <div v-if="filteredDivisions.length === 0" class="text-center py-12">
          <v-icon icon="mdi-sitemap-outline" size="56" color="medium-emphasis" class="mb-2" />
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis">No simulated divisions found</div>
          <p class="text-caption text-medium-emphasis mb-3">
            {{ searchQuery || selectedDepartment ? 'Try adjusting your search query or department filter.' : 'No divisions currently provisioned in sandbox.' }}
          </p>
          <div class="d-flex justify-center ga-2">
            <v-btn v-if="selectedDepartment" size="small" variant="outlined" color="primary" @click="clearFilters">
              Clear Filters
            </v-btn>
            <v-btn size="small" color="primary" @click="openCreateDialog">
              Create Division
            </v-btn>
          </div>
        </div>

        <!-- VIEW 1: GRID MODE (Division Cards) -->
        <div v-else-if="viewMode === 'grid'" class="position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.division_card"
            location="bottom center"
            @hover="openFeatureExplanation('division_card')"
          />

          <v-row dense>
            <v-col
              v-for="div in paginatedDivisions"
              :key="div.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                variant="outlined"
                class="division-grid-card rounded-xl pa-4 h-100 d-flex flex-column justify-space-between transition-swing position-relative"
                :class="{ 'card-highlight': sandboxMode === 'guide' }"
                @click="onCardClick(div)"
              >
                <!-- Card Header: Avatar & Kebab Menu -->
                <div>
                  <div class="d-flex justify-space-between align-start mb-3">
                    <div class="d-flex align-center ga-3">
                      <v-avatar color="primary" variant="tonal" size="44" class="rounded-lg elevation-1">
                        <v-icon icon="mdi-source-branch" size="24" color="primary" />
                      </v-avatar>
                      <div>
                        <v-chip
                          size="x-small"
                          color="secondary"
                          variant="tonal"
                          class="font-weight-bold mb-1"
                        >
                          {{ div.code }}
                        </v-chip>
                        <div class="text-caption text-medium-emphasis">
                          {{ div.headcount }} Members
                        </div>
                      </div>
                    </div>

                    <!-- Kebab Menu -->
                    <div class="position-relative">
                      <GuideBadge
                        v-if="sandboxMode === 'guide'"
                        :explanation="EXPLANATIONS.action_menu"
                        small
                        location="left center"
                        @hover="openFeatureExplanation('action_menu')"
                      />
                      <v-menu location="bottom end">
                        <template #activator="{ props: menuProps }">
                          <v-btn
                            v-bind="menuProps"
                            icon="mdi-dots-vertical"
                            size="x-small"
                            variant="text"
                            color="medium-emphasis"
                            @click.stop
                          />
                        </template>
                        <v-list density="compact" class="rounded-lg" elevation="2">
                          <v-list-item
                            prepend-icon="mdi-eye-outline"
                            title="View Division"
                            @click="viewDivision(div)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit Details"
                            @click="editDivision(div)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            prepend-icon="mdi-delete-outline"
                            title="Delete Division"
                            color="error"
                            @click="promptDeleteDivision(div)"
                          />
                        </v-list>
                      </v-menu>
                    </div>
                  </div>

                  <!-- Division Title -->
                  <div class="mb-1">
                    <div
                      class="text-subtitle-1 font-weight-bold text-truncate text-high-emphasis cursor-pointer hover-primary"
                      :title="div.name"
                    >
                      {{ div.name }}
                    </div>
                  </div>

                  <!-- Parent Department Subtitle -->
                  <div class="d-flex align-center text-caption text-medium-emphasis mb-3 text-truncate">
                    <v-icon icon="mdi-account-group-outline" size="14" class="mr-1 flex-shrink-0 text-primary" />
                    <span class="text-truncate font-weight-medium">{{ div.department }}</span>
                  </div>

                  <v-divider class="my-2 opacity-30" />

                  <!-- Metrics Block -->
                  <div class="div-metrics-grid">
                    <div class="metric-cell">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold" style="font-size: 0.65rem;">
                        Sub-Team Lead
                      </div>
                      <div class="text-caption font-weight-bold text-high-emphasis text-truncate" :title="div.lead">
                        {{ div.lead }}
                      </div>
                    </div>
                    <div class="metric-cell">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold" style="font-size: 0.65rem;">
                        Parent Entity
                      </div>
                      <div class="text-caption font-weight-medium text-truncate text-medium-emphasis" :title="div.entity">
                        {{ div.entity }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom Quick Action -->
                <div class="mt-3 pt-2 border-t d-flex align-center justify-space-between">
                  <v-btn
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="text-none font-weight-medium w-100"
                    prepend-icon="mdi-eye-outline"
                    @click.stop="viewDivision(div)"
                  >
                    View Details
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- VIEW 2: LIST MODE (Table) -->
        <div v-else class="position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.division_card"
            location="bottom center"
            @hover="openFeatureExplanation('division_card')"
          />

          <v-card variant="outlined" class="rounded-xl overflow-hidden">
            <v-table density="compact" hover class="sim-div-table">
              <thead>
                <tr>
                  <th class="font-weight-bold text-caption text-uppercase" style="width: 50px;">Icon</th>
                  <th class="font-weight-bold text-caption text-uppercase">Division Name</th>
                  <th class="font-weight-bold text-caption text-uppercase">Code</th>
                  <th class="font-weight-bold text-caption text-uppercase">Parent Department</th>
                  <th class="font-weight-bold text-caption text-uppercase">Team Lead</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Headcount</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Status</th>
                  <th class="font-weight-bold text-caption text-uppercase text-right" style="width: 80px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="div in paginatedDivisions"
                  :key="div.id"
                  class="cursor-pointer"
                  @click="onCardClick(div)"
                >
                  <td>
                    <v-avatar size="32" color="primary" variant="tonal" class="rounded-lg">
                      <v-icon icon="mdi-source-branch" size="18" color="primary" />
                    </v-avatar>
                  </td>
                  <td>
                    <div class="font-weight-bold text-body-2 text-high-emphasis">
                      {{ div.name }}
                    </div>
                  </td>
                  <td>
                    <v-chip size="x-small" color="secondary" variant="outlined" class="font-weight-medium">
                      {{ div.code }}
                    </v-chip>
                  </td>
                  <td class="text-caption font-weight-medium">
                    {{ div.department }}
                  </td>
                  <td class="text-caption text-medium-emphasis">
                    {{ div.lead }}
                  </td>
                  <td class="text-center text-caption font-weight-bold">
                    {{ div.headcount }}
                  </td>
                  <td class="text-center">
                    <v-chip size="x-small" color="success" variant="flat" class="font-weight-bold">
                      Active
                    </v-chip>
                  </td>
                  <td class="text-right">
                    <div class="position-relative d-inline-block">
                      <GuideBadge
                        v-if="sandboxMode === 'guide'"
                        :explanation="EXPLANATIONS.action_menu"
                        small
                        location="left center"
                        @hover="openFeatureExplanation('action_menu')"
                      />
                      <v-menu location="bottom end">
                        <template #activator="{ props: menuProps }">
                          <v-btn
                            v-bind="menuProps"
                            icon="mdi-dots-vertical"
                            size="small"
                            variant="text"
                            @click.stop
                          />
                        </template>
                        <v-list density="compact" class="rounded-lg">
                          <v-list-item
                            prepend-icon="mdi-eye-outline"
                            title="View Division"
                            @click="viewDivision(div)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit Division"
                            @click="editDivision(div)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            prepend-icon="mdi-delete-outline"
                            title="Delete"
                            color="error"
                            @click="promptDeleteDivision(div)"
                          />
                        </v-list>
                      </v-menu>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </div>

        <!-- BOTTOM PAGINATION BAR -->
        <div class="d-flex flex-wrap align-center justify-space-between ga-3 mt-4 pt-3 border-t position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.pagination"
            small
            location="top center"
            @hover="openFeatureExplanation('pagination')"
          />

          <div class="text-caption text-medium-emphasis">
            Showing <strong>{{ paginationStart }}-{{ paginationEnd }}</strong> of <strong>{{ filteredDivisions.length }}</strong> simulated divisions
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
              <v-btn
                icon="mdi-chevron-left"
                size="x-small"
                variant="outlined"
                :disabled="currentPage === 1"
                @click="currentPage--"
              />
              <span class="text-caption font-weight-bold px-2">{{ currentPage }} / {{ totalPages }}</span>
              <v-btn
                icon="mdi-chevron-right"
                size="x-small"
                variant="outlined"
                :disabled="currentPage >= totalPages"
                @click="currentPage++"
              />
            </div>
          </div>
        </div>
      </v-card>
    </div>

    <!-- DIALOG 1: VIEW DIVISION MODAL -->
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card v-if="selectedDivision" class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-source-branch" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">Division Profile</h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="viewDialog = false" />
        </div>

        <div class="d-flex align-center ga-4 mb-4 pa-3 rounded-lg bg-surface-variant">
          <v-avatar size="54" color="primary" variant="flat" class="text-white">
            <v-icon icon="mdi-sitemap" size="28" />
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">{{ selectedDivision.name }}</div>
            <div class="text-caption text-medium-emphasis">Code: {{ selectedDivision.code }}</div>
            <div class="d-flex align-center ga-2 mt-1">
              <v-chip size="x-small" color="primary" variant="flat">
                {{ selectedDivision.department }}
              </v-chip>
              <v-chip size="x-small" color="success" variant="tonal">
                Active Sub-Team
              </v-chip>
            </div>
          </div>
        </div>

        <v-list density="compact" class="border rounded-lg pa-0 mb-4">
          <v-list-item prepend-icon="mdi-account-group-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Parent Department</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDivision.department }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-domain">
            <v-list-item-title class="text-caption text-medium-emphasis">Corporate Entity</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDivision.entity }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-account-tie">
            <v-list-item-title class="text-caption text-medium-emphasis">Division Lead</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDivision.lead }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-account-multiple-check-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Allocated Headcount</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDivision.headcount }} Employees assigned</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <div class="d-flex justify-end ga-2">
          <v-btn
            variant="tonal"
            color="primary"
            class="text-none font-weight-medium"
            prepend-icon="mdi-pencil-outline"
            @click="editDivision(selectedDivision); viewDialog = false"
          >
            Edit Division
          </v-btn>
          <v-btn color="primary" class="text-none font-weight-medium" @click="viewDialog = false">
            Close
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- DIALOG 2: CREATE / EDIT DIVISION MODAL -->
    <v-dialog v-model="createDialog" max-width="500" persistent>
      <v-card class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-3">
          <div class="d-flex align-center ga-2">
            <v-icon :icon="isEditing ? 'mdi-sitemap' : 'mdi-plus-box-multiple-outline'" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">
              {{ isEditing ? 'Edit Division' : 'Create Division' }}
            </h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="createDialog = false" />
        </div>

        <p class="text-caption text-medium-emphasis mb-4">
          Parent-First Rule: Select parent Department first, then assign Division Name and Team Lead.
        </p>

        <v-form @submit.prevent="saveDivision">
          <v-row dense>
            <v-col cols="12">
              <v-select
                v-model="formDivision.department"
                :items="['Human Resource', 'Information Technology', 'Finance Department', 'Operations', 'Audit Department']"
                label="Parent Department *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                prepend-inner-icon="mdi-account-group-outline"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formDivision.name"
                label="Division Name *"
                placeholder="e.g. Employee Relations Division"
                variant="outlined"
                density="compact"
                hide-details="auto"
                prepend-inner-icon="mdi-source-branch"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formDivision.code"
                label="Division Code *"
                placeholder="e.g. DIV-ER"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formDivision.headcount"
                label="Initial Headcount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formDivision.lead"
                label="Division Team Lead"
                placeholder="e.g. Maria Santos"
                variant="outlined"
                density="compact"
                hide-details="auto"
                prepend-inner-icon="mdi-account-tie"
                class="mb-3"
              />
            </v-col>
          </v-row>

          <div class="d-flex justify-end ga-2 mt-4 pt-3 border-t">
            <v-btn variant="text" class="text-none font-weight-medium" @click="createDialog = false">
              Cancel
            </v-btn>
            <v-btn color="primary" type="submit" class="text-none font-weight-medium" prepend-icon="mdi-content-save">
              {{ isEditing ? 'Save Changes' : 'Create Division' }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- DIALOG 3: DELETE CONFIRMATION -->
    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card v-if="divisionToDelete" class="rounded-xl pa-5">
        <div class="d-flex align-center ga-3 mb-3 text-error">
          <v-icon icon="mdi-alert-circle-outline" size="28" />
          <h3 class="text-h6 font-weight-bold mb-0">Confirm Deletion</h3>
        </div>

        <p class="text-body-2 text-high-emphasis mb-2">
          Are you sure you want to delete <strong>{{ divisionToDelete.name }}</strong>?
        </p>

        <v-alert
          v-if="divisionToDelete.headcount > 0"
          type="warning"
          variant="tonal"
          density="compact"
          class="text-caption mb-3"
        >
          <strong>Notice:</strong> This sub-team currently has <strong>{{ divisionToDelete.headcount }} employees assigned</strong>. Reassign staff prior to archiving.
        </v-alert>

        <div class="d-flex justify-end ga-2 mt-4">
          <v-btn variant="text" class="text-none" @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="error" class="text-none font-weight-bold" @click="confirmDelete">
            Delete Record
          </v-btn>
        </div>
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

export interface DummyDivision {
  id: string
  name: string
  code: string
  department: string
  entity: string
  lead: string
  headcount: number
  isActive: boolean
}

export interface ExplanationInfo {
  id: string
  badgeNumber: number
  name: string
  icon: string
  location: string
  purpose: string
  action: string
  permission: string
  tip: string
}

const DEFAULT_DIVISIONS: DummyDivision[] = [
  {
    id: 'div-1',
    name: 'Learning & Development',
    code: 'DIV-LND',
    department: 'Human Resource',
    entity: 'Head Office',
    lead: 'Maria Santos',
    headcount: 4,
    isActive: true,
  },
  {
    id: 'div-2',
    name: 'Recruitment & Talent Acquisition',
    code: 'DIV-REC',
    department: 'Human Resource',
    entity: 'Head Office',
    lead: 'Roberto Gomez',
    headcount: 5,
    isActive: true,
  },
  {
    id: 'div-3',
    name: 'Employee Relations',
    code: 'DIV-ER',
    department: 'Human Resource',
    entity: 'Head Office',
    lead: 'Liza Tan',
    headcount: 3,
    isActive: true,
  },
  {
    id: 'div-4',
    name: 'IT Infrastructure & Network',
    code: 'DIV-INF',
    department: 'Information Technology',
    entity: 'Head Office',
    lead: 'John Doe',
    headcount: 6,
    isActive: true,
  },
  {
    id: 'div-5',
    name: 'Software Development & QA',
    code: 'DIV-DEV',
    department: 'Information Technology',
    entity: 'Head Office',
    lead: 'Alex Vance',
    headcount: 7,
    isActive: true,
  },
  {
    id: 'div-6',
    name: 'General Accounting & AP',
    code: 'DIV-ACC',
    department: 'Finance Department',
    entity: 'Goodlife Plans Inc.',
    lead: 'Elena Rostova',
    headcount: 9,
    isActive: true,
  },
  {
    id: 'div-7',
    name: 'Treasury & Payroll',
    code: 'DIV-TRS',
    department: 'Finance Department',
    entity: 'Goodlife Plans Inc.',
    lead: 'Jasmine Lee',
    headcount: 6,
    isActive: true,
  },
  {
    id: 'div-8',
    name: 'Branch Operations & Logistics',
    code: 'DIV-OPS',
    department: 'Operations',
    entity: 'Damayan',
    lead: 'Carlos Mendoza',
    headcount: 15,
    isActive: true,
  },
]

// Explanations Dictionary for Guide Mode
const EXPLANATIONS: Record<string, ExplanationInfo> = {
  dept_filter: {
    id: 'dept_filter',
    badgeNumber: 1,
    name: 'Department Filter Dropdown',
    icon: 'mdi-account-group-outline',
    location: 'Top Toolbar (Left)',
    purpose: 'Filters operational sub-teams belonging to a selected parent Department.',
    action: 'Select a Department (e.g. Human Resource, Information Technology) to view its nested divisions.',
    permission: 'division.read',
    tip: 'Parent-First Configuration: Every Division must belong to exactly one parent Department.',
  },
  search: {
    id: 'search',
    badgeNumber: 2,
    name: 'Instant Search Bar',
    icon: 'mdi-magnify',
    location: 'Below Toolbar',
    purpose: 'Real-time keyword filtering across division names, leads, and parent departments.',
    action: 'Type any text to locate sub-teams immediately without page reloads.',
    permission: 'division.read',
    tip: 'Search filters both Grid and List modes instantaneously as you type.',
  },
  refresh: {
    id: 'refresh',
    badgeNumber: 3,
    name: 'Live Data Refresh',
    icon: 'mdi-refresh',
    location: 'Top Toolbar (Right)',
    purpose: 'Re-syncs registered division sub-units and team allocations directly from database.',
    action: 'Triggers an asynchronous fetch without reloading the browser window.',
    permission: 'division.read',
    tip: 'Useful after delegating team leads or reorganizing departmental sub-units.',
  },
  view_toggle: {
    id: 'view_toggle',
    badgeNumber: 4,
    name: 'Grid vs List View Switcher',
    icon: 'mdi-view-grid-outline',
    location: 'Top Toolbar (Right)',
    purpose: 'Allows switching between branch hierarchy cards and dense data table view.',
    action: 'Click Grid for branch avatar cards; click List for multi-column audit table.',
    permission: 'division.read',
    tip: 'List mode is ideal for bulk auditing team leads and departmental distributions.',
  },
  create_division: {
    id: 'create_division',
    badgeNumber: 5,
    name: '+ Create Division Button',
    icon: 'mdi-plus',
    location: 'Top Toolbar (Far Right)',
    purpose: 'Opens the division provisioning dialog to map a new sub-team under a parent department.',
    action: 'Opens modal where administrator selects Parent Department, inputs Division Name, Code, and Team Lead.',
    permission: 'division.create',
    tip: 'Parent-First Rule: Ensure the parent department is registered prior to creating divisions.',
  },
  division_card: {
    id: 'division_card',
    badgeNumber: 6,
    name: 'Division Hierarchy Card',
    icon: 'mdi-source-branch',
    location: 'Main Workspace Roster',
    purpose: 'Presents division title, parent department pill, designated team lead, and active members.',
    action: 'Click anywhere on card to open detailed profile modal.',
    permission: 'division.read',
    tip: 'Branch avatar visualizes nested operational hierarchy beneath parent departments.',
  },
  action_menu: {
    id: 'action_menu',
    badgeNumber: 7,
    name: 'Contextual Action Menu (3-Dots)',
    icon: 'mdi-dots-vertical',
    location: 'Upper Right of Each Card or Row',
    purpose: 'Provides contextual operations: View Details, Edit Division, or Delete Division.',
    action: 'Click the 3 dots to open contextual dropdown for that specific division.',
    permission: 'division.update / division.delete',
    tip: 'Deletion Protection: Ensure all employees are transferred before archiving a division.',
  },
  pagination: {
    id: 'pagination',
    badgeNumber: 8,
    name: 'Division Directory Pagination',
    icon: 'mdi-page-layout-footer',
    location: 'Bottom Footer Bar',
    purpose: 'Controls record density (4, 8, 12 rows per page) and multi-page roster navigation.',
    action: 'Adjust rows per page or use chevron buttons to navigate across pages.',
    permission: 'division.read',
    tip: 'Ensures optimal responsiveness when managing extensive enterprise sub-unit catalogs.',
  },
}

// Sandbox state
const sandboxMode = ref<'play' | 'guide'>('guide')
const divisions = ref<DummyDivision[]>([...DEFAULT_DIVISIONS])
const selectedExplanation = ref<ExplanationInfo | null>(EXPLANATIONS.dept_filter)

// Filter & View State
const searchQuery = ref('')
const selectedDepartment = ref<string | null>(null)
const viewMode = ref<'grid' | 'list'>('grid')
const isRefreshing = ref(false)
const lastSyncTime = ref('Just now')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = ref(8)

// Modals
const viewDialog = ref(false)
const createDialog = ref(false)
const deleteDialog = ref(false)
const isEditing = ref(false)
const selectedDivision = ref<DummyDivision | null>(null)
const divisionToDelete = ref<DummyDivision | null>(null)

// Form state
const formDivision = ref({
  id: '',
  name: '',
  code: '',
  department: 'Human Resource',
  lead: '',
  headcount: 0,
})

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

// Available options
const availableDepartments = computed(() => {
  const set = new Set<string>()
  divisions.value.forEach(d => set.add(d.department))
  return Array.from(set).sort()
})

const clearFilters = () => {
  selectedDepartment.value = null
  searchQuery.value = ''
  currentPage.value = 1
  triggerToast('Simulated Filters Cleared', 'primary', 'mdi-filter-off-outline')
}

// Filtered Divisions
const filteredDivisions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return divisions.value.filter(d => {
    if (selectedDepartment.value && d.department !== selectedDepartment.value) return false
    if (!q) return true
    return (
      d.name.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.department.toLowerCase().includes(q) ||
      d.lead.toLowerCase().includes(q)
    )
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredDivisions.value.length / itemsPerPage.value)))

const paginatedDivisions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredDivisions.value.slice(start, start + itemsPerPage.value)
})

const paginationStart = computed(() => {
  if (filteredDivisions.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredDivisions.value.length)
})

// Refresh simulation
const triggerRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    const now = new Date()
    lastSyncTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    triggerToast('Simulated server sync complete (8 divisions synchronized)', 'success', 'mdi-sync')
  }, 750)
}

// Guide Explanation opener / hover handler
const openFeatureExplanation = (key: string) => {
  if (EXPLANATIONS[key]) {
    selectedExplanation.value = EXPLANATIONS[key]
  }
}

const onCardClick = (div: DummyDivision) => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('division_card')
  } else {
    viewDivision(div)
  }
}

// View Division
const viewDivision = (div: DummyDivision) => {
  selectedDivision.value = div
  viewDialog.value = true
}

// Edit Division
const editDivision = (div: DummyDivision) => {
  isEditing.value = true
  formDivision.value = {
    id: div.id,
    name: div.name,
    code: div.code,
    department: div.department,
    lead: div.lead,
    headcount: div.headcount,
  }
  createDialog.value = true
}

// Create Division
const openCreateDialog = () => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('create_division')
  }
  isEditing.value = false
  formDivision.value = {
    id: `div-${Date.now()}`,
    name: '',
    code: '',
    department: selectedDepartment.value || 'Human Resource',
    lead: '',
    headcount: 0,
  }
  createDialog.value = true
}

// Save Division
const saveDivision = () => {
  if (!formDivision.value.name) {
    triggerToast('Division Name is required', 'warning', 'mdi-alert')
    return
  }

  const generatedCode = formDivision.value.code || `DIV-${formDivision.value.name.substring(0, 3).toUpperCase()}`

  if (isEditing.value) {
    const idx = divisions.value.findIndex(d => d.id === formDivision.value.id)
    if (idx !== -1) {
      divisions.value[idx] = {
        ...divisions.value[idx],
        name: formDivision.value.name.trim(),
        code: generatedCode.trim(),
        department: formDivision.value.department,
        lead: formDivision.value.lead || 'Unassigned',
        headcount: Number(formDivision.value.headcount) || divisions.value[idx].headcount,
      }
      triggerToast(`Simulated Division "${formDivision.value.name}" Updated!`, 'success')
    }
  } else {
    const newDiv: DummyDivision = {
      id: `div-${Date.now()}`,
      name: formDivision.value.name.trim(),
      code: generatedCode.trim(),
      department: formDivision.value.department,
      entity: 'Head Office',
      lead: formDivision.value.lead || 'Unassigned',
      headcount: Number(formDivision.value.headcount) || 1,
      isActive: true,
    }
    divisions.value.unshift(newDiv)
    triggerToast(`Simulated Division "${newDiv.name}" Created!`, 'success')
  }

  createDialog.value = false
}

// Delete confirmation
const promptDeleteDivision = (div: DummyDivision) => {
  divisionToDelete.value = div
  deleteDialog.value = true
}

const confirmDelete = () => {
  if (divisionToDelete.value) {
    const name = divisionToDelete.value.name
    divisions.value = divisions.value.filter(d => d.id !== divisionToDelete.value?.id)
    triggerToast(`Division "${name}" deleted from simulated roster`, 'info', 'mdi-delete')
  }
  deleteDialog.value = false
  divisionToDelete.value = null
}

// Reset data
const resetDummyData = () => {
  divisions.value = JSON.parse(JSON.stringify(DEFAULT_DIVISIONS))
  searchQuery.value = ''
  selectedDepartment.value = null
  currentPage.value = 1
  triggerToast('Sandbox Reset: Default Divisions Restored', 'info', 'mdi-restore')
}

const focusFeature = (key: string) => {
  sandboxMode.value = 'guide'
  if (EXPLANATIONS[key]) {
    selectedExplanation.value = EXPLANATIONS[key]
  }
}

defineExpose({
  focusFeature,
  setMode: (mode: 'play' | 'guide') => { sandboxMode.value = mode }
})
</script>

<style scoped>
.division-management-sandbox {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease-in-out;
  width: 100%;
}

.sim-filters-wrapper {
  gap: 12px;
}

.sim-filter-select {
  flex: 1 1 200px;
  min-width: 180px;
  max-width: 300px;
}

.search-input {
  max-width: 100%;
}

.division-grid-card {
  transition: all 0.2s ease-in-out;
  border-color: rgba(var(--v-theme-on-surface), 0.12);
  background-color: rgb(var(--v-theme-surface));
}

.division-grid-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.5);
  box-shadow: 0 4px 14px rgba(var(--v-theme-primary), 0.08);
}

.card-highlight {
  cursor: pointer;
}

.hover-primary:hover {
  color: rgb(var(--v-theme-primary)) !important;
}

.div-metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.metric-cell {
  overflow: hidden;
}

.main-imitation-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}

.sim-div-table th {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}
</style>
