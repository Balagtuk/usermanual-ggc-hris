<template>
  <div class="position-management-sandbox rounded-xl border bg-surface overflow-hidden">
    <!-- Sandbox Control & Guide Header -->
    <div class="sandbox-top-bar px-4 py-3 bg-surface-variant d-flex flex-wrap align-center justify-space-between ga-3 border-b">
      <div class="d-flex align-center ga-2 flex-wrap">
        <v-chip size="small" color="primary" variant="flat" class="font-weight-bold">
          <v-icon start icon="mdi-flask-outline" size="14" />
          Interactive Sandbox
        </v-chip>
        <span class="text-caption font-weight-bold text-high-emphasis">
          Simulated Position Management Interface
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
          title="Reset dummy positions to default records"
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
                {{ selectedExplanation.permission || 'position.read' }}
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
          <span class="font-weight-bold text-high-emphasis">Position</span>
        </div>
        <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
          <v-icon icon="mdi-clock-outline" size="14" />
          <span>Simulated Data Sync: {{ lastSyncTime }}</span>
        </div>
      </div>

      <!-- Main Application Card (Imitating Position/index.vue) -->
      <v-card elevation="0" class="rounded-xl border bg-surface pa-4 pa-sm-6 main-imitation-card">
        <!-- TOP TOOLBAR: Filters & Actions -->
        <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-4">
          <!-- Filter by Seniority Tier (Left) -->
          <div class="d-flex flex-wrap align-center ga-2 position-relative flex-grow-1 sim-filters-wrapper">
            <!-- Badge 1: Seniority Tier Filter -->
            <GuideBadge
              v-if="sandboxMode === 'guide'"
              :explanation="EXPLANATIONS.tier_filter"
              location="bottom center"
              @hover="openFeatureExplanation('tier_filter')"
            />

            <!-- Seniority Tier Filter -->
            <v-select
              v-model="selectedTier"
              :items="availableTiers"
              label="Filter by Rank Tier"
              placeholder="All Ranks"
              variant="outlined"
              density="compact"
              hide-details
              rounded="lg"
              clearable
              prepend-inner-icon="mdi-podium-gold"
              class="sim-filter-select"
            />

            <v-btn
              v-if="selectedTier"
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
                title="Synchronize position records"
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
                :explanation="EXPLANATIONS.create_position"
                location="bottom center"
                @hover="openFeatureExplanation('create_position')"
              />
              <v-btn
                color="primary"
                class="rounded-lg text-capitalize font-weight-medium"
                prepend-icon="mdi-plus"
                @click="openCreateDialog"
              >
                Create
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
            placeholder="Search positions by rank name (e.g. Manager, Director, Rank & File)..."
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
        <div v-if="filteredPositions.length === 0" class="text-center py-12">
          <v-icon icon="mdi-briefcase-search-outline" size="56" color="medium-emphasis" class="mb-2" />
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis">No simulated positions found</div>
          <p class="text-caption text-medium-emphasis mb-3">
            {{ searchQuery || selectedTier ? 'Try adjusting your search query or rank filter.' : 'No positions currently provisioned in sandbox.' }}
          </p>
          <div class="d-flex justify-center ga-2">
            <v-btn v-if="selectedTier" size="small" variant="outlined" color="primary" @click="clearFilters">
              Clear Filters
            </v-btn>
            <v-btn size="small" color="primary" @click="openCreateDialog">
              Create Position
            </v-btn>
          </div>
        </div>

        <!-- VIEW 1: GRID MODE (Position Cards) -->
        <div v-else-if="viewMode === 'grid'" class="position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.position_card"
            location="bottom center"
            @hover="openFeatureExplanation('position_card')"
          />

          <v-row dense>
            <v-col
              v-for="pos in paginatedPositions"
              :key="pos.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                variant="outlined"
                class="position-grid-card rounded-xl pa-4 h-100 d-flex flex-column justify-space-between transition-swing position-relative"
                :class="{ 'card-highlight': sandboxMode === 'guide' }"
                @click="onCardClick(pos)"
              >
                <!-- Top Row: Icon / Avatar & Action Menu -->
                <div>
                  <div class="d-flex justify-space-between align-start mb-3">
                    <!-- Position Avatar -->
                    <v-avatar size="48" color="primary" variant="tonal" class="rounded-circle elevation-1">
                      <v-icon icon="mdi-briefcase-outline" size="24" color="primary" />
                    </v-avatar>

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
                            title="View Position"
                            @click="viewPosition(pos)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit Position"
                            @click="editPosition(pos)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            prepend-icon="mdi-delete-outline"
                            title="Delete Position"
                            color="error"
                            @click="promptDeletePosition(pos)"
                          />
                        </v-list>
                      </v-menu>
                    </div>
                  </div>

                  <!-- Position Info -->
                  <div class="d-flex justify-space-between align-center mb-1">
                    <div class="text-truncate pr-2">
                      <div
                        class="text-subtitle-1 font-weight-bold text-truncate cursor-pointer hover-primary"
                        :title="pos.name"
                      >
                        {{ pos.name }}
                      </div>
                      <div class="text-caption text-medium-emphasis text-truncate" :title="`Created: ${pos.createdAt}`">
                        Created: {{ pos.createdAt }}
                      </div>
                    </div>

                    <!-- Role Badge Pill -->
                    <div class="role-pill d-flex align-center px-2 py-1 rounded-pill flex-shrink-0 bg-surface-variant">
                      <v-icon icon="mdi-shield-account-outline" size="14" class="mr-1 text-medium-emphasis" />
                      <span class="text-caption font-weight-medium text-medium-emphasis">
                        Role
                      </span>
                    </div>
                  </div>

                  <v-divider class="my-3 opacity-20" />

                  <!-- Metrics Block -->
                  <div class="pos-metrics-grid">
                    <div class="metric-cell">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold" style="font-size: 0.65rem;">
                        Seniority Tier
                      </div>
                      <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                        {{ pos.tier }}
                      </v-chip>
                    </div>
                    <div class="metric-cell text-right">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold" style="font-size: 0.65rem;">
                        Headcount
                      </div>
                      <div class="text-caption font-weight-bold text-high-emphasis">
                        {{ pos.headcount }} Employees
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Bottom Row: Status -->
                <div class="d-flex justify-space-between align-center mt-3 pt-2 border-t">
                  <v-chip
                    size="x-small"
                    color="success"
                    variant="flat"
                    class="font-weight-medium px-2 text-capitalize"
                  >
                    Active
                  </v-chip>
                  <v-btn
                    size="x-small"
                    variant="text"
                    color="primary"
                    class="text-none font-weight-medium"
                    @click.stop="viewPosition(pos)"
                  >
                    Inspect Rank &rarr;
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
            :explanation="EXPLANATIONS.position_card"
            location="bottom center"
            @hover="openFeatureExplanation('position_card')"
          />

          <v-card variant="outlined" class="rounded-xl overflow-hidden">
            <v-table density="compact" hover class="sim-pos-table">
              <thead>
                <tr>
                  <th class="font-weight-bold text-caption text-uppercase" style="width: 50px;">Icon</th>
                  <th class="font-weight-bold text-caption text-uppercase">Position Name</th>
                  <th class="font-weight-bold text-caption text-uppercase">Seniority Tier</th>
                  <th class="font-weight-bold text-caption text-uppercase">Role Classification</th>
                  <th class="font-weight-bold text-caption text-uppercase">Created Date</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Headcount</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Status</th>
                  <th class="font-weight-bold text-caption text-uppercase text-right" style="width: 80px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="pos in paginatedPositions"
                  :key="pos.id"
                  class="cursor-pointer"
                  @click="onCardClick(pos)"
                >
                  <td>
                    <v-avatar size="32" color="primary" variant="tonal" class="rounded-circle">
                      <v-icon icon="mdi-briefcase-outline" size="18" color="primary" />
                    </v-avatar>
                  </td>
                  <td>
                    <div class="font-weight-bold text-body-2 text-high-emphasis">
                      {{ pos.name }}
                    </div>
                  </td>
                  <td>
                    <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                      {{ pos.tier }}
                    </v-chip>
                  </td>
                  <td class="text-caption text-medium-emphasis">
                    {{ pos.roleCategory }}
                  </td>
                  <td class="text-caption text-medium-emphasis">
                    {{ pos.createdAt }}
                  </td>
                  <td class="text-center text-caption font-weight-bold">
                    {{ pos.headcount }}
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
                            title="View Position"
                            @click="viewPosition(pos)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit Position"
                            @click="editPosition(pos)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            prepend-icon="mdi-delete-outline"
                            title="Delete"
                            color="error"
                            @click="promptDeletePosition(pos)"
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
            Showing <strong>{{ paginationStart }}-{{ paginationEnd }}</strong> of <strong>{{ filteredPositions.length }}</strong> simulated positions
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

    <!-- DIALOG 1: VIEW POSITION MODAL -->
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card v-if="selectedPosition" class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-briefcase-outline" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">Position Rank Classification</h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="viewDialog = false" />
        </div>

        <div class="d-flex align-center ga-4 mb-4 pa-3 rounded-lg bg-surface-variant">
          <v-avatar size="54" color="primary" variant="flat" class="text-white">
            <v-icon icon="mdi-briefcase" size="28" />
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">{{ selectedPosition.name }}</div>
            <div class="text-caption text-medium-emphasis">Seniority Tier: {{ selectedPosition.tier }}</div>
            <div class="d-flex align-center ga-2 mt-1">
              <v-chip size="x-small" color="primary" variant="flat">
                {{ selectedPosition.roleCategory }}
              </v-chip>
              <v-chip size="x-small" color="success" variant="tonal">
                Active Classification
              </v-chip>
            </div>
          </div>
        </div>

        <v-list density="compact" class="border rounded-lg pa-0 mb-4">
          <v-list-item prepend-icon="mdi-podium">
            <v-list-item-title class="text-caption text-medium-emphasis">Rank Tier Hierarchy</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedPosition.tier }} Level</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-shield-check-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Approval Matrix Delegation</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedPosition.approvalAuthority }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-account-multiple-check-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Active Personnel Headcount</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedPosition.headcount }} Employees hold this position rank</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-calendar-clock">
            <v-list-item-title class="text-caption text-medium-emphasis">Created Timestamp</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedPosition.createdAt }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <div class="d-flex justify-end ga-2">
          <v-btn
            variant="tonal"
            color="primary"
            class="text-none font-weight-medium"
            prepend-icon="mdi-pencil-outline"
            @click="editPosition(selectedPosition); viewDialog = false"
          >
            Edit Position
          </v-btn>
          <v-btn color="primary" class="text-none font-weight-medium" @click="viewDialog = false">
            Close
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- DIALOG 2: CREATE / EDIT POSITION MODAL -->
    <v-dialog v-model="createDialog" max-width="500" persistent>
      <v-card class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-3">
          <div class="d-flex align-center ga-2">
            <v-icon :icon="isEditing ? 'mdi-briefcase-edit' : 'mdi-briefcase-plus'" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">
              {{ isEditing ? 'Edit Position Information' : 'Create Position Information' }}
            </h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="createDialog = false" />
        </div>

        <p class="text-caption text-medium-emphasis mb-4">
          Define standardized corporate rank classification dictating approval thresholds and salary grade bands.
        </p>

        <v-form @submit.prevent="savePosition">
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model="formPosition.name"
                label="Position Name *"
                placeholder="e.g. Senior Specialist"
                variant="outlined"
                density="compact"
                hide-details="auto"
                prepend-inner-icon="mdi-briefcase-outline"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="formPosition.tier"
                :items="['Executive', 'Director', 'Manager', 'Senior', 'Rank & File', 'Staff']"
                label="Seniority Tier *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                prepend-inner-icon="mdi-podium"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="formPosition.roleCategory"
                :items="['Executive Leadership', 'Corporate Officer', 'Operational Supervisor', 'Advanced Technical Lead', 'Standard Personnel', 'Entry Personnel']"
                label="Role Category *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="formPosition.approvalAuthority"
                label="Approval Authority Level"
                placeholder="e.g. Tier 2 Sign-off (Up to ₱50,000)"
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
              {{ isEditing ? 'Save Changes' : 'Create Position' }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- DIALOG 3: DELETE CONFIRMATION -->
    <v-dialog v-model="deleteDialog" max-width="450">
      <v-card v-if="positionToDelete" class="rounded-xl pa-5">
        <div class="d-flex align-center ga-3 mb-3 text-error">
          <v-icon icon="mdi-alert-circle-outline" size="28" />
          <h3 class="text-h6 font-weight-bold mb-0">Confirm Deletion</h3>
        </div>

        <p class="text-body-2 text-high-emphasis mb-2">
          Are you sure you want to delete <strong>{{ positionToDelete.name }}</strong>?
        </p>

        <v-alert
          v-if="positionToDelete.headcount > 0"
          type="warning"
          variant="tonal"
          density="compact"
          class="text-caption mb-3"
        >
          <strong>Warning:</strong> This position rank is currently assigned to <strong>{{ positionToDelete.headcount }} active employees</strong>. Deleting it will leave their job positions unclassified!
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

export interface DummyPosition {
  id: string
  name: string
  tier: string
  roleCategory: string
  createdAt: string
  headcount: number
  approvalAuthority: string
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

const DEFAULT_POSITIONS: DummyPosition[] = [
  {
    id: 'pos-1',
    name: 'Executive Vice President',
    tier: 'Executive',
    roleCategory: 'Corporate Officer',
    createdAt: 'Aug 15, 2026',
    headcount: 2,
    approvalAuthority: 'Executive Sign-off (₱500,000+)',
    isActive: true,
  },
  {
    id: 'pos-2',
    name: 'Director',
    tier: 'Director',
    roleCategory: 'Executive Leadership',
    createdAt: 'Sep 01, 2026',
    headcount: 4,
    approvalAuthority: 'Division Sign-off (Up to ₱200,000)',
    isActive: true,
  },
  {
    id: 'pos-3',
    name: 'Manager',
    tier: 'Manager',
    roleCategory: 'Operational Supervisor',
    createdAt: 'Sep 21, 2026',
    headcount: 12,
    approvalAuthority: 'Department Sign-off (Up to ₱50,000)',
    isActive: true,
  },
  {
    id: 'pos-4',
    name: 'Assistant Manager',
    tier: 'Manager',
    roleCategory: 'Operational Supervisor',
    createdAt: 'Sep 21, 2026',
    headcount: 8,
    approvalAuthority: 'Unit Sign-off (Up to ₱20,000)',
    isActive: true,
  },
  {
    id: 'pos-5',
    name: 'Senior Specialist',
    tier: 'Senior',
    roleCategory: 'Advanced Technical Lead',
    createdAt: 'Sep 22, 2026',
    headcount: 15,
    approvalAuthority: 'Standard Requisition Verification',
    isActive: true,
  },
  {
    id: 'pos-6',
    name: 'Rank & File I',
    tier: 'Rank & File',
    roleCategory: 'Standard Personnel',
    createdAt: 'Sep 25, 2026',
    headcount: 45,
    approvalAuthority: 'Individual Requestor',
    isActive: true,
  },
  {
    id: 'pos-7',
    name: 'Rank & File II',
    tier: 'Rank & File',
    roleCategory: 'Standard Personnel',
    createdAt: 'Sep 25, 2026',
    headcount: 32,
    approvalAuthority: 'Individual Requestor',
    isActive: true,
  },
  {
    id: 'pos-8',
    name: 'Associate',
    tier: 'Staff',
    roleCategory: 'Entry Personnel',
    createdAt: 'Oct 01, 2026',
    headcount: 20,
    approvalAuthority: 'Individual Requestor',
    isActive: true,
  },
]

// Explanations Dictionary for Guide Mode
const EXPLANATIONS: Record<string, ExplanationInfo> = {
  tier_filter: {
    id: 'tier_filter',
    badgeNumber: 1,
    name: 'Seniority Tier Filter Dropdown',
    icon: 'mdi-podium-gold',
    location: 'Top Toolbar (Left)',
    purpose: 'Filters organizational positions by vertical rank classification (Executive, Director, Manager, Senior, Rank & File).',
    action: 'Select a Seniority Tier to isolate positions belonging to that management level.',
    permission: 'position.read',
    tip: 'Positions dictate approval matrix thresholds and salary grade scale tiers across all subsidiaries.',
  },
  search: {
    id: 'search',
    badgeNumber: 2,
    name: 'Instant Search Bar',
    icon: 'mdi-magnify',
    location: 'Below Toolbar',
    purpose: 'Real-time search across standardized position rank classifications.',
    action: 'Type any text to locate position titles (e.g., "Manager", "Senior", "Rank & File") instantly.',
    permission: 'position.read',
    tip: 'Instant keystroke filtering applies simultaneously to both visual cards and data table modes.',
  },
  refresh: {
    id: 'refresh',
    badgeNumber: 3,
    name: 'Live Data Refresh',
    icon: 'mdi-refresh',
    location: 'Top Toolbar (Right)',
    purpose: 'Synchronizes position ranks, seniority scores, and active headcount links from the database.',
    action: 'Triggers an asynchronous fetch without reloading the browser window.',
    permission: 'position.read',
    tip: 'Useful after promoting personnel or adding new salary grade classifications.',
  },
  view_toggle: {
    id: 'view_toggle',
    badgeNumber: 4,
    name: 'Grid vs List View Switcher',
    icon: 'mdi-view-grid-outline',
    location: 'Top Toolbar (Right)',
    purpose: 'Allows switching between visual briefcase rank cards and tabular inventory audit mode.',
    action: 'Click Grid for briefcase cards; click List for dense tabular view with role categories and creation dates.',
    permission: 'position.read',
    tip: 'Visual cards highlight role indicators and timestamps matching the GGC HRIS standard.',
  },
  create_position: {
    id: 'create_position',
    badgeNumber: 5,
    name: '+ Create Position Button',
    icon: 'mdi-plus',
    location: 'Top Toolbar (Far Right)',
    purpose: 'Opens the Position Information creation dialog to establish a standardized corporate rank.',
    action: 'Opens modal where administrator specifies Position Name, Seniority Tier, Role Category, and Approval Level.',
    permission: 'position.create',
    tip: 'Distinguish Positions (vertical ranks) from specific Job Titles (job contractual roles).',
  },
  position_card: {
    id: 'position_card',
    badgeNumber: 6,
    name: 'Position Rank Card',
    icon: 'mdi-briefcase-outline',
    location: 'Main Workspace Roster',
    purpose: 'Visualizes rank classification with briefcase avatar, creation date, Role badge pill, and Active status.',
    action: 'Click anywhere on card or click "Inspect Rank" to view full rank details.',
    permission: 'position.read',
    tip: 'Light blue circular avatar with briefcase icon provides immediate visual recognition in org charts.',
  },
  action_menu: {
    id: 'action_menu',
    badgeNumber: 7,
    name: 'Contextual Action Menu (3-Dots)',
    icon: 'mdi-dots-vertical',
    location: 'Upper Right of Each Card or Row',
    purpose: 'Provides contextual operations: View Position, Edit Position, or Delete Position.',
    action: 'Click the 3 dots to open contextual dropdown for that specific position.',
    permission: 'position.update / position.delete',
    tip: 'Active Headcount Check: Never delete a position that is currently assigned to active employees.',
  },
  pagination: {
    id: 'pagination',
    badgeNumber: 8,
    name: 'Position Directory Pagination',
    icon: 'mdi-page-layout-footer',
    location: 'Bottom Footer Bar',
    purpose: 'Controls record density (4, 8, 12 rows per page) and multi-page rank navigation.',
    action: 'Adjust rows per page or use chevron buttons to navigate across pages.',
    permission: 'position.read',
    tip: 'Ensures snappy rendering and easy navigation across standardized rank catalogs.',
  },
}

// Sandbox state
const sandboxMode = ref<'play' | 'guide'>('guide')
const positions = ref<DummyPosition[]>([...DEFAULT_POSITIONS])
const selectedExplanation = ref<ExplanationInfo | null>(EXPLANATIONS.tier_filter)

// Filter & View State
const searchQuery = ref('')
const selectedTier = ref<string | null>(null)
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
const selectedPosition = ref<DummyPosition | null>(null)
const positionToDelete = ref<DummyPosition | null>(null)

// Form state
const formPosition = ref({
  id: '',
  name: '',
  tier: 'Manager',
  roleCategory: 'Operational Supervisor',
  approvalAuthority: 'Department Sign-off (Up to ₱50,000)',
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
const availableTiers = computed(() => {
  const set = new Set<string>()
  positions.value.forEach(p => set.add(p.tier))
  return Array.from(set).sort()
})

const clearFilters = () => {
  selectedTier.value = null
  searchQuery.value = ''
  currentPage.value = 1
  triggerToast('Simulated Filters Cleared', 'primary', 'mdi-filter-off-outline')
}

// Filtered Positions
const filteredPositions = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return positions.value.filter(p => {
    if (selectedTier.value && p.tier !== selectedTier.value) return false
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      p.tier.toLowerCase().includes(q) ||
      p.roleCategory.toLowerCase().includes(q)
    )
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPositions.value.length / itemsPerPage.value)))

const paginatedPositions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredPositions.value.slice(start, start + itemsPerPage.value)
})

const paginationStart = computed(() => {
  if (filteredPositions.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredPositions.value.length)
})

// Refresh simulation
const triggerRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    const now = new Date()
    lastSyncTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    triggerToast('Simulated server sync complete (8 positions synchronized)', 'success', 'mdi-sync')
  }, 750)
}

// Guide Explanation opener / hover handler
const openFeatureExplanation = (key: string) => {
  if (EXPLANATIONS[key]) {
    selectedExplanation.value = EXPLANATIONS[key]
  }
}

const onCardClick = (pos: DummyPosition) => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('position_card')
  } else {
    viewPosition(pos)
  }
}

// View Position
const viewPosition = (pos: DummyPosition) => {
  selectedPosition.value = pos
  viewDialog.value = true
}

// Edit Position
const editPosition = (pos: DummyPosition) => {
  isEditing.value = true
  formPosition.value = {
    id: pos.id,
    name: pos.name,
    tier: pos.tier,
    roleCategory: pos.roleCategory,
    approvalAuthority: pos.approvalAuthority,
  }
  createDialog.value = true
}

// Create Position
const openCreateDialog = () => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('create_position')
  }
  isEditing.value = false
  formPosition.value = {
    id: `pos-${Date.now()}`,
    name: '',
    tier: selectedTier.value || 'Manager',
    roleCategory: 'Operational Supervisor',
    approvalAuthority: 'Department Sign-off (Up to ₱50,000)',
  }
  createDialog.value = true
}

// Save Position
const savePosition = () => {
  if (!formPosition.value.name) {
    triggerToast('Position Name is required', 'warning', 'mdi-alert')
    return
  }

  if (isEditing.value) {
    const idx = positions.value.findIndex(p => p.id === formPosition.value.id)
    if (idx !== -1) {
      positions.value[idx] = {
        ...positions.value[idx],
        name: formPosition.value.name.trim(),
        tier: formPosition.value.tier,
        roleCategory: formPosition.value.roleCategory,
        approvalAuthority: formPosition.value.approvalAuthority,
      }
      triggerToast(`Simulated Position "${formPosition.value.name}" Updated!`, 'success')
    }
  } else {
    const newPos: DummyPosition = {
      id: `pos-${Date.now()}`,
      name: formPosition.value.name.trim(),
      tier: formPosition.value.tier,
      roleCategory: formPosition.value.roleCategory,
      createdAt: 'Today',
      headcount: 0,
      approvalAuthority: formPosition.value.approvalAuthority || 'Standard Requisition',
      isActive: true,
    }
    positions.value.unshift(newPos)
    triggerToast(`Simulated Position "${newPos.name}" Created!`, 'success')
  }

  createDialog.value = false
}

// Delete confirmation
const promptDeletePosition = (pos: DummyPosition) => {
  positionToDelete.value = pos
  deleteDialog.value = true
}

const confirmDelete = () => {
  if (positionToDelete.value) {
    const name = positionToDelete.value.name
    positions.value = positions.value.filter(p => p.id !== positionToDelete.value?.id)
    triggerToast(`Position "${name}" deleted from simulated roster`, 'info', 'mdi-delete')
  }
  deleteDialog.value = false
  positionToDelete.value = null
}

// Reset data
const resetDummyData = () => {
  positions.value = JSON.parse(JSON.stringify(DEFAULT_POSITIONS))
  searchQuery.value = ''
  selectedTier.value = null
  currentPage.value = 1
  triggerToast('Sandbox Reset: Default Positions Restored', 'info', 'mdi-restore')
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
.position-management-sandbox {
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

.position-grid-card {
  transition: all 0.2s ease-in-out;
  border-color: rgba(var(--v-theme-on-surface), 0.12);
  background-color: rgb(var(--v-theme-surface));
}

.position-grid-card:hover {
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

.pos-metrics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  align-items: center;
}

.metric-cell {
  overflow: hidden;
}

.role-pill {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  font-size: 0.75rem;
}

.main-imitation-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}

.sim-pos-table th {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}
</style>
