<template>
  <div class="department-management-sandbox rounded-xl border bg-surface overflow-hidden">
    <!-- Sandbox Control & Guide Header -->
    <div class="sandbox-top-bar px-4 py-3 bg-surface-variant d-flex flex-wrap align-center justify-space-between ga-3 border-b">
      <div class="d-flex align-center ga-2 flex-wrap">
        <v-chip size="small" color="primary" variant="flat" class="font-weight-bold">
          <v-icon start icon="mdi-flask-outline" size="14" />
          Interactive Sandbox
        </v-chip>
        <span class="text-caption font-weight-bold text-high-emphasis">
          Simulated Department Management Interface
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
          title="Reset dummy departments to default records"
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
                {{ selectedExplanation.permission || 'department.read' }}
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
          <span class="font-weight-bold text-high-emphasis">Departments</span>
        </div>
        <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
          <v-icon icon="mdi-clock-outline" size="14" />
          <span>Simulated Data Sync: {{ lastSyncTime }}</span>
        </div>
      </div>

      <!-- Main Application Card (Imitating Departments/index.vue) -->
      <v-card elevation="0" class="rounded-xl border bg-surface pa-4 pa-sm-6 main-imitation-card">
        <!-- TOP TOOLBAR: Filters & Actions -->
        <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-4">
          <!-- Filter by Entity (Left) -->
          <div class="d-flex flex-wrap align-center ga-2 position-relative flex-grow-1 sim-filters-wrapper">
            <!-- Badge 1: Entity Filter -->
            <GuideBadge
              v-if="sandboxMode === 'guide'"
              :explanation="EXPLANATIONS.entity_filter"
              location="bottom center"
              @hover="openFeatureExplanation('entity_filter')"
            />

            <!-- Entity Filter -->
            <v-select
              v-model="selectedEntity"
              :items="availableEntities"
              label="Filter by Entity"
              placeholder="All Entities"
              variant="outlined"
              density="compact"
              hide-details
              rounded="lg"
              clearable
              prepend-inner-icon="mdi-domain"
              class="sim-filter-select"
            />

            <v-btn
              v-if="selectedEntity"
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
                title="Synchronize department records"
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
                :explanation="EXPLANATIONS.create_department"
                location="bottom center"
                @hover="openFeatureExplanation('create_department')"
              />
              <v-btn
                color="primary"
                class="rounded-lg text-capitalize font-weight-medium"
                prepend-icon="mdi-plus"
                @click="openCreateDialog"
              >
                Create Department
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
            placeholder="Search departments by name or entity (e.g. Audit, Finance, Human Resource)..."
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
        <div v-if="filteredDepartments.length === 0" class="text-center py-12">
          <v-icon icon="mdi-office-building-cog-outline" size="56" color="medium-emphasis" class="mb-2" />
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis">No simulated departments found</div>
          <p class="text-caption text-medium-emphasis mb-3">
            {{ searchQuery || selectedEntity ? 'Try adjusting your search criteria or clearing filters.' : 'No departments currently provisioned in sandbox.' }}
          </p>
          <div class="d-flex justify-center ga-2">
            <v-btn v-if="selectedEntity" size="small" variant="outlined" color="primary" @click="clearFilters">
              Clear Filters
            </v-btn>
            <v-btn size="small" color="primary" @click="openCreateDialog">
              Create Department
            </v-btn>
          </div>
        </div>

        <!-- VIEW 1: GRID MODE (Department Cards) -->
        <div v-else-if="viewMode === 'grid'" class="position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.department_card"
            location="bottom center"
            @hover="openFeatureExplanation('department_card')"
          />

          <v-row dense>
            <v-col
              v-for="dept in paginatedDepartments"
              :key="dept.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                variant="outlined"
                class="department-grid-card rounded-xl pa-4 h-100 d-flex flex-column justify-space-between transition-swing position-relative"
                :class="{ 'card-highlight': sandboxMode === 'guide' }"
                @click="onCardClick(dept)"
              >
                <!-- Card Header: Avatar & Kebab Menu -->
                <div>
                  <div class="d-flex justify-space-between align-start mb-3">
                    <div class="d-flex align-center ga-3">
                      <v-avatar color="primary" variant="tonal" size="44" class="rounded-lg elevation-1">
                        <v-icon icon="mdi-office-building-marker-outline" size="24" color="primary" />
                      </v-avatar>
                      <div>
                        <v-chip
                          size="x-small"
                          color="primary"
                          variant="tonal"
                          class="font-weight-bold mb-1"
                        >
                          {{ dept.code }}
                        </v-chip>
                        <div class="text-caption text-medium-emphasis">
                          {{ dept.divisionsCount }} Divisions
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
                            title="View Department"
                            @click="viewDepartment(dept)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit Details"
                            @click="editDepartment(dept)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            prepend-icon="mdi-delete-outline"
                            title="Delete Department"
                            color="error"
                            @click="promptDeleteDepartment(dept)"
                          />
                        </v-list>
                      </v-menu>
                    </div>
                  </div>

                  <!-- Department Title -->
                  <div class="mb-1">
                    <div
                      class="text-subtitle-1 font-weight-bold text-truncate text-high-emphasis cursor-pointer hover-primary"
                      :title="dept.name"
                    >
                      {{ dept.name }}
                    </div>
                  </div>

                  <!-- Parent Entity Subtitle -->
                  <div class="d-flex align-center text-caption text-medium-emphasis mb-3 text-truncate">
                    <v-icon icon="mdi-domain" size="14" class="mr-1 flex-shrink-0 text-primary" />
                    <span class="text-truncate font-weight-medium">{{ dept.entity }}</span>
                  </div>

                  <v-divider class="my-2 opacity-30" />

                  <!-- Metrics Block -->
                  <div class="dept-metrics-grid">
                    <div class="metric-cell">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold" style="font-size: 0.65rem;">
                        Headcount
                      </div>
                      <div class="text-caption font-weight-bold text-high-emphasis">
                        {{ dept.headcount }} Employees
                      </div>
                    </div>
                    <div class="metric-cell">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold" style="font-size: 0.65rem;">
                        Status
                      </div>
                      <v-chip size="x-small" color="success" variant="flat" class="font-weight-medium">
                        Active
                      </v-chip>
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
                    @click.stop="viewDepartment(dept)"
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
            :explanation="EXPLANATIONS.department_card"
            location="bottom center"
            @hover="openFeatureExplanation('department_card')"
          />

          <v-card variant="outlined" class="rounded-xl overflow-hidden">
            <v-table density="compact" hover class="sim-dept-table">
              <thead>
                <tr>
                  <th class="font-weight-bold text-caption text-uppercase" style="width: 50px;">Icon</th>
                  <th class="font-weight-bold text-caption text-uppercase">Department Name</th>
                  <th class="font-weight-bold text-caption text-uppercase">Code</th>
                  <th class="font-weight-bold text-caption text-uppercase">Parent Entity</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Divisions</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Headcount</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Status</th>
                  <th class="font-weight-bold text-caption text-uppercase text-right" style="width: 80px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="dept in paginatedDepartments"
                  :key="dept.id"
                  class="cursor-pointer"
                  @click="onCardClick(dept)"
                >
                  <td>
                    <v-avatar size="32" color="primary" variant="tonal" class="rounded-lg">
                      <v-icon icon="mdi-office-building-marker-outline" size="18" color="primary" />
                    </v-avatar>
                  </td>
                  <td>
                    <div class="font-weight-bold text-body-2 text-high-emphasis">
                      {{ dept.name }}
                    </div>
                  </td>
                  <td>
                    <v-chip size="x-small" color="primary" variant="outlined" class="font-weight-medium">
                      {{ dept.code }}
                    </v-chip>
                  </td>
                  <td class="text-caption font-weight-medium">
                    {{ dept.entity }}
                  </td>
                  <td class="text-center text-caption font-weight-medium">
                    {{ dept.divisionsCount }} sub-teams
                  </td>
                  <td class="text-center text-caption font-weight-medium">
                    {{ dept.headcount }}
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
                            title="View Department"
                            @click="viewDepartment(dept)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit Department"
                            @click="editDepartment(dept)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            prepend-icon="mdi-delete-outline"
                            title="Delete"
                            color="error"
                            @click="promptDeleteDepartment(dept)"
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
            Showing <strong>{{ paginationStart }}-{{ paginationEnd }}</strong> of <strong>{{ filteredDepartments.length }}</strong> simulated departments
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

    <!-- DIALOG 1: VIEW DEPARTMENT MODAL -->
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card v-if="selectedDepartment" class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-office-building-marker-outline" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">Department Details</h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="viewDialog = false" />
        </div>

        <div class="d-flex align-center ga-4 mb-4 pa-3 rounded-lg bg-surface-variant">
          <v-avatar size="54" color="primary" variant="flat" class="text-white">
            <v-icon icon="mdi-office-building" size="28" />
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">{{ selectedDepartment.name }}</div>
            <div class="text-caption text-medium-emphasis">Code: {{ selectedDepartment.code }}</div>
            <div class="d-flex align-center ga-2 mt-1">
              <v-chip size="x-small" color="primary" variant="flat">
                {{ selectedDepartment.entity }}
              </v-chip>
              <v-chip size="x-small" color="success" variant="tonal">
                Active Unit
              </v-chip>
            </div>
          </div>
        </div>

        <v-list density="compact" class="border rounded-lg pa-0 mb-4">
          <v-list-item prepend-icon="mdi-domain">
            <v-list-item-title class="text-caption text-medium-emphasis">Parent Legal Entity</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDepartment.entity }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-sitemap-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Nested Operational Divisions</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDepartment.divisionsCount }} Registered Divisions</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-account-group-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Active Personnel</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDepartment.headcount }} Employees assigned</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-calendar-check-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Registration Timestamp</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedDepartment.createdAt }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <div class="d-flex justify-end ga-2">
          <v-btn
            variant="tonal"
            color="primary"
            class="text-none font-weight-medium"
            prepend-icon="mdi-pencil-outline"
            @click="editDepartment(selectedDepartment); viewDialog = false"
          >
            Edit Department
          </v-btn>
          <v-btn color="primary" class="text-none font-weight-medium" @click="viewDialog = false">
            Close
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- DIALOG 2: CREATE / EDIT DEPARTMENT MODAL -->
    <v-dialog v-model="createDialog" max-width="500" persistent>
      <v-card class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-3">
          <div class="d-flex align-center ga-2">
            <v-icon :icon="isEditing ? 'mdi-office-building-cog' : 'mdi-office-building-plus'" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">
              {{ isEditing ? 'Edit Department' : 'Create Department' }}
            </h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="createDialog = false" />
        </div>

        <p class="text-caption text-medium-emphasis mb-4">
          Parent-First Rule: Select parent Entity first, then assign Department Name and Cost Code.
        </p>

        <v-form @submit.prevent="saveDepartment">
          <v-row dense>
            <v-col cols="12">
              <v-select
                v-model="formDepartment.entity"
                :items="['Head Office', 'Goodlife Plans Inc.', 'Damayan', 'GLPI', 'Goodlife Coop']"
                label="Parent Entity *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                prepend-inner-icon="mdi-domain"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formDepartment.name"
                label="Department Name *"
                placeholder="e.g. Quality Assurance Department"
                variant="outlined"
                density="compact"
                hide-details="auto"
                prepend-inner-icon="mdi-office-building"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formDepartment.code"
                label="Department Code *"
                placeholder="e.g. DEP-QA"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formDepartment.headcount"
                label="Initial Headcount"
                type="number"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>
          </v-row>

          <div class="d-flex justify-end ga-2 mt-4 pt-3 border-t">
            <v-btn variant="text" class="text-none font-weight-medium" @click="createDialog = false">
              Cancel
            </v-btn>
            <v-btn color="primary" type="submit" class="text-none font-weight-medium" prepend-icon="mdi-content-save">
              {{ isEditing ? 'Save Changes' : 'Create Department' }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- DIALOG 3: DELETE CONFIRMATION -->
    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card v-if="departmentToDelete" class="rounded-xl pa-5">
        <div class="d-flex align-center ga-3 mb-3 text-error">
          <v-icon icon="mdi-alert-circle-outline" size="28" />
          <h3 class="text-h6 font-weight-bold mb-0">Confirm Deletion</h3>
        </div>

        <p class="text-body-2 text-high-emphasis mb-2">
          Are you sure you want to delete <strong>{{ departmentToDelete.name }}</strong>?
        </p>

        <v-alert
          v-if="departmentToDelete.divisionsCount > 0"
          type="warning"
          variant="tonal"
          density="compact"
          class="text-caption mb-3"
        >
          <strong>Warning:</strong> This department has <strong>{{ departmentToDelete.divisionsCount }} operational divisions</strong> mapped to it. Deleting it will leave sub-teams orphaned!
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

export interface DummyDepartment {
  id: string
  name: string
  code: string
  entity: string
  divisionsCount: number
  headcount: number
  createdAt: string
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

const DEFAULT_DEPARTMENTS: DummyDepartment[] = [
  {
    id: 'dept-1',
    name: 'Audit Department',
    code: 'DEP-AUD',
    entity: 'Head Office',
    divisionsCount: 2,
    headcount: 8,
    createdAt: 'Jan 10, 2026',
    isActive: true,
  },
  {
    id: 'dept-2',
    name: 'Claims Department',
    code: 'DEP-CLM',
    entity: 'Goodlife Plans Inc.',
    divisionsCount: 3,
    headcount: 14,
    createdAt: 'Jan 12, 2026',
    isActive: true,
  },
  {
    id: 'dept-3',
    name: 'Finance Department',
    code: 'DEP-FIN',
    entity: 'Goodlife Plans Inc.',
    divisionsCount: 4,
    headcount: 22,
    createdAt: 'Jan 14, 2026',
    isActive: true,
  },
  {
    id: 'dept-4',
    name: 'Human Resource',
    code: 'DEP-HR',
    entity: 'Head Office',
    divisionsCount: 3,
    headcount: 12,
    createdAt: 'Jan 15, 2026',
    isActive: true,
  },
  {
    id: 'dept-5',
    name: 'Information Technology',
    code: 'DEP-IT',
    entity: 'Head Office',
    divisionsCount: 3,
    headcount: 16,
    createdAt: 'Jan 18, 2026',
    isActive: true,
  },
  {
    id: 'dept-6',
    name: 'Operations',
    code: 'DEP-OPS',
    entity: 'Damayan',
    divisionsCount: 4,
    headcount: 35,
    createdAt: 'Jan 20, 2026',
    isActive: true,
  },
  {
    id: 'dept-7',
    name: 'Legal & Compliance',
    code: 'DEP-LGL',
    entity: 'Head Office',
    divisionsCount: 1,
    headcount: 5,
    createdAt: 'Feb 02, 2026',
    isActive: true,
  },
  {
    id: 'dept-8',
    name: 'Customer Care & Marketing',
    code: 'DEP-CCM',
    entity: 'Goodlife Coop',
    divisionsCount: 2,
    headcount: 18,
    createdAt: 'Feb 15, 2026',
    isActive: true,
  },
]

// Explanations Dictionary for Guide Mode
const EXPLANATIONS: Record<string, ExplanationInfo> = {
  entity_filter: {
    id: 'entity_filter',
    badgeNumber: 1,
    name: 'Filter by Entity Dropdown',
    icon: 'mdi-domain',
    location: 'Top Toolbar (Left)',
    purpose: 'Isolates functional departments according to parent legal corporate entity.',
    action: 'Select an Entity (e.g. Head Office, Goodlife Plans Inc.) to narrow visible department cards.',
    permission: 'department.read',
    tip: 'Parent-First Configuration Rule: Always verify company ownership before editing department cost allocations.',
  },
  search: {
    id: 'search',
    badgeNumber: 2,
    name: 'Instant Search Bar',
    icon: 'mdi-magnify',
    location: 'Below Toolbar',
    purpose: 'Real-time department filtering by title or parent entity.',
    action: 'Type any text to locate departments (e.g., "Finance", "Audit", "Human Resource").',
    permission: 'department.read',
    tip: 'Operates instantly without page refresh, filtering both Grid and List modes simultaneously.',
  },
  refresh: {
    id: 'refresh',
    badgeNumber: 3,
    name: 'Live Data Refresh',
    icon: 'mdi-refresh',
    location: 'Top Toolbar (Right)',
    purpose: 'Fetches latest department registrations and live headcount allocations directly from server.',
    action: 'Triggers an asynchronous fetch without reloading the browser window.',
    permission: 'department.read',
    tip: 'Useful after modifying organizational structures or transferring division sub-teams.',
  },
  view_toggle: {
    id: 'view_toggle',
    badgeNumber: 4,
    name: 'Grid vs List View Switcher',
    icon: 'mdi-view-grid-outline',
    location: 'Top Toolbar (Right)',
    purpose: 'Allows switching between visual building cards and dense data table view.',
    action: 'Click Grid for building avatar cards; click List for multi-column audit view.',
    permission: 'department.read',
    tip: 'Card view is recommended for hierarchical browsing; table view is recommended for bulk audits.',
  },
  create_department: {
    id: 'create_department',
    badgeNumber: 5,
    name: '+ Create Department Button',
    icon: 'mdi-plus',
    location: 'Top Toolbar (Far Right)',
    purpose: 'Opens the department registration modal to create a new functional unit under an Entity.',
    action: 'Opens modal where administrator selects Parent Entity, inputs Department Name and Cost Code.',
    permission: 'department.create',
    tip: 'Standardized nomenclature (e.g. "Department" suffix) ensures consistent organizational charts.',
  },
  department_card: {
    id: 'department_card',
    badgeNumber: 6,
    name: 'Department Card / Row Item',
    icon: 'mdi-office-building-marker-outline',
    location: 'Main Workspace Roster',
    purpose: 'Displays department code, parent entity, division count, and active employee headcount.',
    action: 'Click card to view detailed department profile modal.',
    permission: 'department.read',
    tip: 'Blue avatar represents corporate functional teams. Click "View Details" for full audit.',
  },
  action_menu: {
    id: 'action_menu',
    badgeNumber: 7,
    name: 'Contextual Action Menu (3-Dots)',
    icon: 'mdi-dots-vertical',
    location: 'Upper Right of Each Card or Row',
    purpose: 'Provides contextual operations: View Details, Edit Department, or Delete Department.',
    action: 'Click the 3 dots to open contextual dropdown for that specific department.',
    permission: 'department.update / department.delete',
    tip: 'Deletion Protection: Cannot delete a department that contains active divisions or assigned personnel.',
  },
  pagination: {
    id: 'pagination',
    badgeNumber: 8,
    name: 'Department Directory Pagination',
    icon: 'mdi-page-layout-footer',
    location: 'Bottom Footer Bar',
    purpose: 'Controls record density (4, 8, 12 rows per page) and multi-page roster navigation.',
    action: 'Adjust rows per page or use chevron buttons to navigate between directory pages.',
    permission: 'department.read',
    tip: 'Ensures swift rendering performance across large enterprise directories.',
  },
}

// Sandbox state
const sandboxMode = ref<'play' | 'guide'>('guide')
const departments = ref<DummyDepartment[]>([...DEFAULT_DEPARTMENTS])
const selectedExplanation = ref<ExplanationInfo | null>(EXPLANATIONS.entity_filter)

// Filter & View State
const searchQuery = ref('')
const selectedEntity = ref<string | null>(null)
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
const selectedDepartment = ref<DummyDepartment | null>(null)
const departmentToDelete = ref<DummyDepartment | null>(null)

// Form state
const formDepartment = ref({
  id: '',
  name: '',
  code: '',
  entity: 'Head Office',
  divisionsCount: 0,
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
const availableEntities = computed(() => {
  const set = new Set<string>()
  departments.value.forEach(d => set.add(d.entity))
  return Array.from(set).sort()
})

const clearFilters = () => {
  selectedEntity.value = null
  searchQuery.value = ''
  currentPage.value = 1
  triggerToast('Simulated Filters Cleared', 'primary', 'mdi-filter-off-outline')
}

// Filtered Departments
const filteredDepartments = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return departments.value.filter(d => {
    if (selectedEntity.value && d.entity !== selectedEntity.value) return false
    if (!q) return true
    return (
      d.name.toLowerCase().includes(q) ||
      d.code.toLowerCase().includes(q) ||
      d.entity.toLowerCase().includes(q)
    )
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredDepartments.value.length / itemsPerPage.value)))

const paginatedDepartments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredDepartments.value.slice(start, start + itemsPerPage.value)
})

const paginationStart = computed(() => {
  if (filteredDepartments.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredDepartments.value.length)
})

// Refresh simulation
const triggerRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    const now = new Date()
    lastSyncTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    triggerToast('Simulated server sync complete (8 departments synchronized)', 'success', 'mdi-sync')
  }, 750)
}

// Guide Explanation opener / hover handler
const openFeatureExplanation = (key: string) => {
  if (EXPLANATIONS[key]) {
    selectedExplanation.value = EXPLANATIONS[key]
  }
}

const onCardClick = (dept: DummyDepartment) => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('department_card')
  } else {
    viewDepartment(dept)
  }
}

// View Department
const viewDepartment = (dept: DummyDepartment) => {
  selectedDepartment.value = dept
  viewDialog.value = true
}

// Edit Department
const editDepartment = (dept: DummyDepartment) => {
  isEditing.value = true
  formDepartment.value = {
    id: dept.id,
    name: dept.name,
    code: dept.code,
    entity: dept.entity,
    divisionsCount: dept.divisionsCount,
    headcount: dept.headcount,
  }
  createDialog.value = true
}

// Create Department
const openCreateDialog = () => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('create_department')
  }
  isEditing.value = false
  formDepartment.value = {
    id: `dept-${Date.now()}`,
    name: '',
    code: '',
    entity: selectedEntity.value || 'Head Office',
    divisionsCount: 0,
    headcount: 0,
  }
  createDialog.value = true
}

// Save Department
const saveDepartment = () => {
  if (!formDepartment.value.name) {
    triggerToast('Department Name is required', 'warning', 'mdi-alert')
    return
  }

  const generatedCode = formDepartment.value.code || `DEP-${formDepartment.value.name.substring(0, 3).toUpperCase()}`

  if (isEditing.value) {
    const idx = departments.value.findIndex(d => d.id === formDepartment.value.id)
    if (idx !== -1) {
      departments.value[idx] = {
        ...departments.value[idx],
        name: formDepartment.value.name.trim(),
        code: generatedCode.trim(),
        entity: formDepartment.value.entity,
        headcount: Number(formDepartment.value.headcount) || departments.value[idx].headcount,
      }
      triggerToast(`Simulated Department "${formDepartment.value.name}" Updated!`, 'success')
    }
  } else {
    const newDept: DummyDepartment = {
      id: `dept-${Date.now()}`,
      name: formDepartment.value.name.trim(),
      code: generatedCode.trim(),
      entity: formDepartment.value.entity,
      divisionsCount: 0,
      headcount: Number(formDepartment.value.headcount) || 1,
      createdAt: 'Today',
      isActive: true,
    }
    departments.value.unshift(newDept)
    triggerToast(`Simulated Department "${newDept.name}" Created!`, 'success')
  }

  createDialog.value = false
}

// Delete confirmation
const promptDeleteDepartment = (dept: DummyDepartment) => {
  departmentToDelete.value = dept
  deleteDialog.value = true
}

const confirmDelete = () => {
  if (departmentToDelete.value) {
    const name = departmentToDelete.value.name
    departments.value = departments.value.filter(d => d.id !== departmentToDelete.value?.id)
    triggerToast(`Department "${name}" deleted from simulated roster`, 'info', 'mdi-delete')
  }
  deleteDialog.value = false
  departmentToDelete.value = null
}

// Reset data
const resetDummyData = () => {
  departments.value = JSON.parse(JSON.stringify(DEFAULT_DEPARTMENTS))
  searchQuery.value = ''
  selectedEntity.value = null
  currentPage.value = 1
  triggerToast('Sandbox Reset: Default Departments Restored', 'info', 'mdi-restore')
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
.department-management-sandbox {
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

.department-grid-card {
  transition: all 0.2s ease-in-out;
  border-color: rgba(var(--v-theme-on-surface), 0.12);
  background-color: rgb(var(--v-theme-surface));
}

.department-grid-card:hover {
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

.dept-metrics-grid {
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

.sim-dept-table th {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}
</style>
