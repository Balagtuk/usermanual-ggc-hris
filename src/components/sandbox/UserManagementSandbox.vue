<template>
  <div class="user-management-sandbox rounded-xl border bg-surface overflow-hidden">
    <!-- Sandbox Control & Guide Header -->
    <div class="sandbox-top-bar px-4 py-3 bg-surface-variant d-flex flex-wrap align-center justify-space-between ga-3 border-b">
      <div class="d-flex align-center ga-2 flex-wrap">
        <v-chip size="small" color="primary" variant="flat" class="font-weight-bold">
          <v-icon start icon="mdi-flask-outline" size="14" />
          Interactive Sandbox
        </v-chip>
        <span class="text-caption font-weight-bold text-high-emphasis">
          Simulated User Management Interface
        </span>
        <v-chip size="x-small" variant="tonal" color="secondary" class="d-none d-sm-inline-flex">
          Safe Playground &bull; No live database changes
        </v-chip>
      </div>

      <!-- Mode Switch, Maximize & Reset Controls -->
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
          title="Reset dummy roster to default records"
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
                {{ selectedExplanation.permission || 'user.read' }}
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
          <span class="font-weight-bold text-high-emphasis">Users</span>
        </div>
        <div class="d-flex align-center ga-1 text-caption text-medium-emphasis">
          <v-icon icon="mdi-clock-outline" size="14" />
          <span>Simulated Data Sync: {{ lastSyncTime }}</span>
        </div>
      </div>

      <!-- Main Application Card (Imitating User/index.vue) -->
      <v-card elevation="0" class="rounded-xl border bg-surface pa-4 pa-sm-6 main-imitation-card">
        <!-- TOP TOOLBAR: Filters & Actions -->
        <div class="d-flex flex-wrap justify-space-between align-center ga-3 mb-4">
          <!-- Org Filters (Left) -->
          <div class="d-flex flex-wrap align-center ga-2 position-relative flex-grow-1 sim-filters-wrapper">
            <!-- Badge 1: Filters -->
            <GuideBadge
              v-if="sandboxMode === 'guide'"
              :explanation="EXPLANATIONS.filters"
              location="bottom center"
              @hover="openFeatureExplanation('filters')"
            />

            <!-- Entity Filter -->
            <v-select
              v-model="selectedEntity"
              :items="availableEntities"
              label="Entity"
              placeholder="All Entities"
              variant="outlined"
              density="compact"
              hide-details
              rounded="lg"
              clearable
              class="sim-filter-select"
              @update:model-value="onEntityChange"
            />

            <!-- Branch Filter -->
            <v-select
              v-model="selectedBranch"
              :items="availableBranches"
              label="Branch"
              placeholder="All Branches"
              variant="outlined"
              density="compact"
              hide-details
              rounded="lg"
              clearable
              class="sim-filter-select"
              :disabled="!selectedEntity && availableBranches.length === 0"
              @update:model-value="onBranchChange"
            />

            <!-- Department Filter -->
            <v-select
              v-model="selectedDepartment"
              :items="availableDepartments"
              label="Department"
              placeholder="All Departments"
              variant="outlined"
              density="compact"
              hide-details
              rounded="lg"
              clearable
              class="sim-filter-select"
            />

            <v-btn
              v-if="hasActiveFilters"
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
                title="Synchronize user records"
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
                :explanation="EXPLANATIONS.create_user"
                location="bottom center"
                @hover="openFeatureExplanation('create_user')"
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
            placeholder="Search users by name, @username, or email..."
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
        <div v-if="filteredUsers.length === 0" class="text-center py-12">
          <v-icon icon="mdi-account-search-outline" size="56" color="medium-emphasis" class="mb-2" />
          <div class="text-subtitle-1 font-weight-bold text-high-emphasis">No simulated users found</div>
          <p class="text-caption text-medium-emphasis mb-3">
            {{ searchQuery || hasActiveFilters ? 'Try adjusting your search criteria or clearing filters.' : 'No users currently provisioned in sandbox.' }}
          </p>
          <div class="d-flex justify-center ga-2">
            <v-btn v-if="hasActiveFilters" size="small" variant="outlined" color="primary" @click="clearFilters">
              Clear Filters
            </v-btn>
            <v-btn size="small" color="primary" @click="openCreateDialog">
              Create Dummy User
            </v-btn>
          </div>
        </div>

        <!-- VIEW 1: GRID MODE (Cards) -->
        <div v-else-if="viewMode === 'grid'" class="position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.user_card"
            location="bottom center"
            @hover="openFeatureExplanation('user_card')"
          />

          <v-row dense>
            <v-col
              v-for="user in paginatedUsers"
              :key="user.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-card
                variant="outlined"
                class="user-grid-card rounded-xl pa-4 h-100 d-flex flex-column justify-space-between transition-swing position-relative"
                :class="{ 'card-highlight': sandboxMode === 'guide' }"
                @click="onCardClick(user)"
              >
                <!-- Top Card: Status & Kebab Action Menu -->
                <div>
                  <div class="d-flex justify-space-between align-center mb-3">
                    <v-chip
                      size="x-small"
                      :color="user.isActive ? 'success' : 'error'"
                      variant="flat"
                      class="font-weight-bold text-capitalize"
                    >
                      {{ user.isActive ? 'Active' : 'Inactive' }}
                    </v-chip>

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
                            title="View Profile"
                            @click="viewUser(user)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit User"
                            @click="editUser(user)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            :prepend-icon="user.isActive ? 'mdi-account-cancel-outline' : 'mdi-account-check-outline'"
                            :title="user.isActive ? 'Deactivate Account' : 'Activate Account'"
                            :color="user.isActive ? 'error' : 'success'"
                            @click="toggleUserStatus(user)"
                          />
                        </v-list>
                      </v-menu>
                    </div>
                  </div>

                  <!-- Avatar Initials / Photo -->
                  <div class="d-flex justify-center align-center mb-2">
                    <v-avatar size="52" :color="user.avatarColor" class="elevation-1 text-white font-weight-bold text-subtitle-2">
                      {{ user.initials }}
                    </v-avatar>
                  </div>

                  <!-- Name & Username -->
                  <div class="text-center mb-1">
                    <div
                      class="text-subtitle-2 font-weight-bold text-truncate text-high-emphasis cursor-pointer hover-primary"
                      :title="user.fullName"
                    >
                      {{ user.fullName }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      &#64;{{ user.username }}
                    </div>
                  </div>

                  <!-- Email -->
                  <div class="d-flex align-center justify-center text-caption text-medium-emphasis mb-3 text-truncate">
                    <v-icon icon="mdi-email-outline" size="13" class="mr-1 flex-shrink-0" />
                    <span class="text-truncate">{{ user.email }}</span>
                  </div>

                  <v-divider class="my-2 opacity-30" />

                  <!-- Org Block Grid -->
                  <div class="org-block-grid">
                    <div class="org-cell mb-1">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold letter-spacing-1" style="font-size: 0.65rem;">
                        Entity
                      </div>
                      <div class="text-caption font-weight-medium text-truncate" :title="user.entity">
                        {{ user.entity }}
                      </div>
                    </div>
                    <div class="org-cell mb-1">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold letter-spacing-1" style="font-size: 0.65rem;">
                        Branch
                      </div>
                      <div class="text-caption font-weight-medium text-truncate" :title="user.branch">
                        {{ user.branch }}
                      </div>
                    </div>
                    <div class="org-cell">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold letter-spacing-1" style="font-size: 0.65rem;">
                        Department
                      </div>
                      <div class="text-caption font-weight-medium text-truncate" :title="user.department">
                        {{ user.department }}
                      </div>
                    </div>
                    <div class="org-cell">
                      <div class="text-caption text-disabled text-uppercase font-weight-bold letter-spacing-1" style="font-size: 0.65rem;">
                        Role
                      </div>
                      <div class="text-caption font-weight-medium text-truncate text-primary" :title="user.role">
                        {{ user.role }}
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
                    @click.stop="viewUser(user)"
                  >
                    Inspect Profile
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- VIEW 2: LIST MODE (v-data-table) -->
        <div v-else class="position-relative">
          <GuideBadge
            v-if="sandboxMode === 'guide'"
            :explanation="EXPLANATIONS.user_card"
            location="bottom center"
            @hover="openFeatureExplanation('user_card')"
          />

          <v-card variant="outlined" class="rounded-xl overflow-hidden">
            <v-table density="compact" hover class="sim-user-table">
              <thead>
                <tr>
                  <th class="font-weight-bold text-caption text-uppercase" style="width: 50px;">Avatar</th>
                  <th class="font-weight-bold text-caption text-uppercase">Full Name & Username</th>
                  <th class="font-weight-bold text-caption text-uppercase">Corporate Email</th>
                  <th class="font-weight-bold text-caption text-uppercase">Entity</th>
                  <th class="font-weight-bold text-caption text-uppercase">Branch</th>
                  <th class="font-weight-bold text-caption text-uppercase">Department</th>
                  <th class="font-weight-bold text-caption text-uppercase">Role</th>
                  <th class="font-weight-bold text-caption text-uppercase text-center">Status</th>
                  <th class="font-weight-bold text-caption text-uppercase text-right" style="width: 80px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in paginatedUsers"
                  :key="user.id"
                  class="cursor-pointer"
                  @click="onCardClick(user)"
                >
                  <td>
                    <v-avatar size="32" :color="user.avatarColor" class="text-white text-caption font-weight-bold">
                      {{ user.initials }}
                    </v-avatar>
                  </td>
                  <td>
                    <div class="font-weight-bold text-body-2 text-high-emphasis">
                      {{ user.fullName }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      &#64;{{ user.username }}
                    </div>
                  </td>
                  <td class="text-caption text-medium-emphasis">
                    {{ user.email }}
                  </td>
                  <td class="text-caption font-weight-medium">
                    {{ user.entity }}
                  </td>
                  <td class="text-caption text-medium-emphasis">
                    {{ user.branch }}
                  </td>
                  <td class="text-caption text-medium-emphasis">
                    {{ user.department }}
                  </td>
                  <td>
                    <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                      {{ user.role }}
                    </v-chip>
                  </td>
                  <td class="text-center">
                    <v-chip
                      size="x-small"
                      :color="user.isActive ? 'success' : 'error'"
                      variant="flat"
                      class="font-weight-bold"
                    >
                      {{ user.isActive ? 'Active' : 'Inactive' }}
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
                            title="View Profile"
                            @click="viewUser(user)"
                          />
                          <v-list-item
                            prepend-icon="mdi-pencil-outline"
                            title="Edit User"
                            @click="editUser(user)"
                          />
                          <v-divider class="my-1" />
                          <v-list-item
                            :prepend-icon="user.isActive ? 'mdi-account-cancel-outline' : 'mdi-account-check-outline'"
                            :title="user.isActive ? 'Deactivate' : 'Activate'"
                            :color="user.isActive ? 'error' : 'success'"
                            @click="toggleUserStatus(user)"
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
            Showing <strong>{{ paginationStart }}-{{ paginationEnd }}</strong> of <strong>{{ filteredUsers.length }}</strong> simulated users
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

    <!-- DIALOG 1: VIEW USER PROFILE MODAL -->
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card v-if="selectedUser" class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-4">
          <div class="d-flex align-center ga-2">
            <v-icon icon="mdi-badge-account-outline" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">Simulated User Profile</h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="viewDialog = false" />
        </div>

        <div class="d-flex align-center ga-4 mb-4 pa-3 rounded-lg bg-surface-variant">
          <v-avatar size="60" :color="selectedUser.avatarColor" class="text-white text-h6 font-weight-bold">
            {{ selectedUser.initials }}
          </v-avatar>
          <div>
            <div class="text-subtitle-1 font-weight-bold">{{ selectedUser.fullName }}</div>
            <div class="text-caption text-medium-emphasis">&#64;{{ selectedUser.username }}</div>
            <div class="d-flex align-center ga-2 mt-1">
              <v-chip size="x-small" :color="selectedUser.isActive ? 'success' : 'error'" variant="flat">
                {{ selectedUser.isActive ? 'Active Status' : 'Inactive Status' }}
              </v-chip>
              <v-chip size="x-small" color="primary" variant="tonal">
                {{ selectedUser.role }}
              </v-chip>
            </div>
          </div>
        </div>

        <v-list density="compact" class="border rounded-lg pa-0 mb-4">
          <v-list-item prepend-icon="mdi-email-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Corporate Email</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedUser.email }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-domain">
            <v-list-item-title class="text-caption text-medium-emphasis">Assigned Entity</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedUser.entity }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-storefront-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Physical Branch</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedUser.branch }}</v-list-item-subtitle>
          </v-list-item>
          <v-divider />
          <v-list-item prepend-icon="mdi-account-group-outline">
            <v-list-item-title class="text-caption text-medium-emphasis">Department</v-list-item-title>
            <v-list-item-subtitle class="font-weight-medium text-high-emphasis">{{ selectedUser.department }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <div class="d-flex justify-end ga-2">
          <v-btn
            variant="tonal"
            :color="selectedUser.isActive ? 'error' : 'success'"
            class="text-none font-weight-medium"
            @click="toggleUserStatus(selectedUser); viewDialog = false"
          >
            {{ selectedUser.isActive ? 'Deactivate User' : 'Activate User' }}
          </v-btn>
          <v-btn color="primary" class="text-none font-weight-medium" @click="viewDialog = false">
            Close
          </v-btn>
        </div>
      </v-card>
    </v-dialog>

    <!-- DIALOG 2: CREATE / EDIT USER MODAL -->
    <v-dialog v-model="createDialog" max-width="540" persistent>
      <v-card class="rounded-xl pa-5">
        <div class="d-flex align-center justify-space-between mb-3">
          <div class="d-flex align-center ga-2">
            <v-icon :icon="isEditing ? 'mdi-account-edit-outline' : 'mdi-account-plus-outline'" size="24" color="primary" />
            <h3 class="text-h6 font-weight-bold mb-0">
              {{ isEditing ? 'Simulated Edit User' : 'Simulated Create User' }}
            </h3>
          </div>
          <v-btn icon="mdi-close" size="small" variant="text" @click="createDialog = false" />
        </div>

        <p class="text-caption text-medium-emphasis mb-4">
          Fill in simulated fields below to test account creation without affecting production data.
        </p>

        <v-form @submit.prevent="saveUser">
          <v-row dense>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formUser.firstName"
                label="First Name *"
                placeholder="e.g. Maria"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formUser.lastName"
                label="Last Name *"
                placeholder="e.g. Santos"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formUser.username"
                label="Username *"
                placeholder="e.g. msantos"
                prefix="@"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="formUser.email"
                label="Corporate Email *"
                placeholder="msantos@goodlife.com"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="formUser.entity"
                :items="['Goodlife Plans Inc.', 'Damayan', 'GLPI', 'Goodlife Coop', 'Head Office']"
                label="Entity *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="formUser.branch"
                :items="['Head Office Branch', 'Bansalan Branch', 'Digos Branch', 'Cebu Branch', 'Davao Branch']"
                label="Branch *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="formUser.department"
                :items="['Human Resource', 'Finance Department', 'Information Technology', 'Claims Department', 'Operations']"
                label="Department *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                v-model="formUser.role"
                :items="['HR Administrator', 'HR Specialist', 'Branch Manager', 'System Super Admin', 'Staff User']"
                label="Assigned Role *"
                variant="outlined"
                density="compact"
                hide-details="auto"
                class="mb-3"
              />
            </v-col>

            <v-col cols="12">
              <v-switch
                v-model="formUser.isActive"
                label="Active Account Status"
                color="success"
                density="compact"
                hide-details
              />
            </v-col>
          </v-row>

          <div class="d-flex justify-end ga-2 mt-4 pt-3 border-t">
            <v-btn variant="text" class="text-none font-weight-medium" @click="createDialog = false">
              Cancel
            </v-btn>
            <v-btn color="primary" type="submit" class="text-none font-weight-medium" prepend-icon="mdi-content-save">
              {{ isEditing ? 'Save Changes' : 'Create User' }}
            </v-btn>
          </div>
        </v-form>
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

export interface DummyUser {
  id: string
  fullName: string
  username: string
  email: string
  entity: string
  branch: string
  department: string
  role: string
  isActive: boolean
  avatarColor: string
  initials: string
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

const DEFAULT_USERS: DummyUser[] = [
  {
    id: 'usr-1',
    fullName: 'Maria Santos',
    username: 'msantos',
    email: 'maria.santos@goodlife.com',
    entity: 'Goodlife Plans Inc.',
    branch: 'Head Office Branch',
    department: 'Human Resource',
    role: 'HR Specialist',
    isActive: true,
    avatarColor: 'indigo',
    initials: 'MS',
  },
  {
    id: 'usr-2',
    fullName: 'John Doe',
    username: 'jdoe',
    email: 'john.doe@goodlife.com',
    entity: 'Goodlife Plans Inc.',
    branch: 'Head Office Branch',
    department: 'Information Technology',
    role: 'System Super Admin',
    isActive: true,
    avatarColor: 'teal',
    initials: 'JD',
  },
  {
    id: 'usr-3',
    fullName: 'Sarah Connor',
    username: 'sconnor',
    email: 'sarah.connor@goodlife.com',
    entity: 'Goodlife Plans Inc.',
    branch: 'Bansalan Branch',
    department: 'Claims Department',
    role: 'HR Administrator',
    isActive: true,
    avatarColor: 'purple',
    initials: 'SC',
  },
  {
    id: 'usr-4',
    fullName: 'Alex Vance',
    username: 'avance',
    email: 'alex.vance@goodlife.com',
    entity: 'GLPI',
    branch: 'Digos Branch',
    department: 'Operations',
    role: 'Branch Manager',
    isActive: true,
    avatarColor: 'blue-grey',
    initials: 'AV',
  },
  {
    id: 'usr-5',
    fullName: 'Elena Rostova',
    username: 'erostova',
    email: 'elena.rostova@goodlife.com',
    entity: 'Goodlife Coop',
    branch: 'Cebu Branch',
    department: 'Finance Department',
    role: 'Staff User',
    isActive: false,
    avatarColor: 'red',
    initials: 'ER',
  },
  {
    id: 'usr-6',
    fullName: 'Roberto Gomez',
    username: 'rgomez',
    email: 'roberto.gomez@goodlife.com',
    entity: 'Damayan',
    branch: 'Head Office Branch',
    department: 'Human Resource',
    role: 'HR Administrator',
    isActive: true,
    avatarColor: 'deep-orange',
    initials: 'RG',
  },
  {
    id: 'usr-7',
    fullName: 'Jasmine Lee',
    username: 'jlee',
    email: 'jasmine.lee@goodlife.com',
    entity: 'Goodlife Plans Inc.',
    branch: 'Davao Branch',
    department: 'Finance Department',
    role: 'Staff User',
    isActive: true,
    avatarColor: 'cyan',
    initials: 'JL',
  },
  {
    id: 'usr-8',
    fullName: 'Carlos Mendoza',
    username: 'cmendoza',
    email: 'carlos.mendoza@goodlife.com',
    entity: 'Goodlife Plans Inc.',
    branch: 'Digos Branch',
    department: 'Operations',
    role: 'Branch Manager',
    isActive: true,
    avatarColor: 'brown',
    initials: 'CM',
  },
]

// Explanations Dictionary for Guide Mode
const EXPLANATIONS: Record<string, ExplanationInfo> = {
  filters: {
    id: 'filters',
    badgeNumber: 1,
    name: 'Cascading Org Hierarchy Filters',
    icon: 'mdi-filter-variant',
    location: 'Top Toolbar (Left)',
    purpose: 'Isolates employee accounts by corporate Entity, physical Branch, and Department functional unit.',
    action: 'Select an Entity to narrow available branches. Selecting a Branch then narrows available departments, strictly following corporate hierarchy.',
    permission: 'user.read',
    tip: 'Parent-First Configuration Rule: Branch options depend on Entity. Click "Clear" at any time to return to full company roster.',
  },
  search: {
    id: 'search',
    badgeNumber: 2,
    name: 'Instant Keyword Search Bar',
    icon: 'mdi-magnify',
    location: 'Below Toolbar',
    purpose: 'Instant real-time search across multiple user account attributes without reloading.',
    action: 'Type any text to simultaneously filter across Full Name, Username handle (@username), and Corporate Email.',
    permission: 'user.read',
    tip: 'Search is non-case-sensitive and operates instantly as you type each keystroke.',
  },
  refresh: {
    id: 'refresh',
    badgeNumber: 3,
    name: 'Live Data Refresh',
    icon: 'mdi-refresh',
    location: 'Top Toolbar (Right)',
    purpose: 'Fetches the freshest account statuses, biometric links, and credentials from the server.',
    action: 'Triggers an asynchronous fetch without reloading the browser window.',
    permission: 'user.read',
    tip: 'Useful after another administrator issues credentials or updates an account role.',
  },
  view_toggle: {
    id: 'view_toggle',
    badgeNumber: 4,
    name: 'Grid vs List View Switcher',
    icon: 'mdi-view-grid-outline',
    location: 'Top Toolbar (Right)',
    purpose: 'Allows switching between visual profile cards and compact data table mode.',
    action: 'Click Grid for photo card view with organizational badges; click List for dense data table suitable for bulk reviews.',
    permission: 'user.read',
    tip: 'Your view mode preference is remembered during your active session.',
  },
  create_user: {
    id: 'create_user',
    badgeNumber: 5,
    name: 'Create User Action Button',
    icon: 'mdi-plus',
    location: 'Top Toolbar (Far Right)',
    purpose: 'Opens the User Provisioning modal dialog to issue new credentials and assign initial roles.',
    action: 'Opens modal where HR specifies Full Name, Username, Corporate Email, Entity, Branch, Department, and Role.',
    permission: 'user.create (HR Administrator / Super Admin)',
    tip: 'Ensure the target Entity, Branch, and Department exist before provisioning the user.',
  },
  user_card: {
    id: 'user_card',
    badgeNumber: 6,
    name: 'User Identity & Org Card',
    icon: 'mdi-card-account-details-outline',
    location: 'Main Workspace Roster',
    purpose: 'Presents user identity, status pill, email, and 4-tier organizational assignment at a glance.',
    action: 'Clicking anywhere on the card or clicking "Inspect Profile" opens detailed profile view modal.',
    permission: 'user.read',
    tip: 'Colors and badges follow corporate theme tokens. Red pills flag Inactive accounts.',
  },
  action_menu: {
    id: 'action_menu',
    badgeNumber: 7,
    name: 'Contextual Kebab (3-Dots) Action Menu',
    icon: 'mdi-dots-vertical',
    location: 'Top-right corner of each card or row',
    purpose: 'Provides quick actions per user: View Profile, Edit User, or Toggle Active/Inactive status.',
    action: 'Click the 3 dots to open the contextual action dropdown for that specific user account.',
    permission: 'user.update / user.delete',
    tip: 'Always choose "Deactivate" rather than permanently deleting accounts with historical logs.',
  },
  pagination: {
    id: 'pagination',
    badgeNumber: 8,
    name: 'Roster Pagination & Rows Selector',
    icon: 'mdi-page-layout-footer',
    location: 'Bottom Footer Bar',
    purpose: 'Controls record density and navigation across multi-page employee rosters.',
    action: 'Adjust rows per page (4, 8, 12) or use previous/next arrows to traverse pages.',
    permission: 'user.read',
    tip: 'Keeps screen rendering snappy even with large enterprise workforces.',
  },
}

// Sandbox state
const sandboxMode = ref<'play' | 'guide'>('guide')
const users = ref<DummyUser[]>([...DEFAULT_USERS])
const selectedExplanation = ref<ExplanationInfo | null>(EXPLANATIONS.filters)

// Filter & View State
const searchQuery = ref('')
const selectedEntity = ref<string | null>(null)
const selectedBranch = ref<string | null>(null)
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
const isEditing = ref(false)
const selectedUser = ref<DummyUser | null>(null)

// Form state
const formUser = ref({
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  entity: 'Goodlife Plans Inc.',
  branch: 'Head Office Branch',
  department: 'Human Resource',
  role: 'HR Specialist',
  isActive: true,
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

// Available options based on cascading rules
const availableEntities = computed(() => {
  const set = new Set<string>()
  users.value.forEach(u => set.add(u.entity))
  return Array.from(set).sort()
})

const availableBranches = computed(() => {
  const set = new Set<string>()
  users.value.forEach(u => {
    if (!selectedEntity.value || u.entity === selectedEntity.value) {
      set.add(u.branch)
    }
  })
  return Array.from(set).sort()
})

const availableDepartments = computed(() => {
  const set = new Set<string>()
  users.value.forEach(u => {
    const matchEntity = !selectedEntity.value || u.entity === selectedEntity.value
    const matchBranch = !selectedBranch.value || u.branch === selectedBranch.value
    if (matchEntity && matchBranch) {
      set.add(u.department)
    }
  })
  return Array.from(set).sort()
})

const hasActiveFilters = computed(() => {
  return !!(selectedEntity.value || selectedBranch.value || selectedDepartment.value)
})

const onEntityChange = () => {
  selectedBranch.value = null
  selectedDepartment.value = null
  currentPage.value = 1
}

const onBranchChange = () => {
  selectedDepartment.value = null
  currentPage.value = 1
}

const clearFilters = () => {
  selectedEntity.value = null
  selectedBranch.value = null
  selectedDepartment.value = null
  currentPage.value = 1
  triggerToast('Simulated Filters Cleared', 'primary', 'mdi-filter-off-outline')
}

// Filtered Users
const filteredUsers = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return users.value.filter(u => {
    if (selectedEntity.value && u.entity !== selectedEntity.value) return false
    if (selectedBranch.value && u.branch !== selectedBranch.value) return false
    if (selectedDepartment.value && u.department !== selectedDepartment.value) return false

    if (!q) return true

    return (
      u.fullName.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    )
  })
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredUsers.value.length / itemsPerPage.value)))

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredUsers.value.slice(start, start + itemsPerPage.value)
})

const paginationStart = computed(() => {
  if (filteredUsers.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredUsers.value.length)
})

// Refresh simulation
const triggerRefresh = () => {
  isRefreshing.value = true
  setTimeout(() => {
    isRefreshing.value = false
    const now = new Date()
    lastSyncTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    triggerToast('Simulated server sync complete (8 records synchronized)', 'success', 'mdi-sync')
  }, 750)
}

// Guide Explanation opener / hover handler
const openFeatureExplanation = (key: string) => {
  if (EXPLANATIONS[key]) {
    selectedExplanation.value = EXPLANATIONS[key]
  }
}

const onCardClick = (user: DummyUser) => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('user_card')
  } else {
    viewUser(user)
  }
}

// View User
const viewUser = (user: DummyUser) => {
  selectedUser.value = user
  viewDialog.value = true
}

// Edit User
const editUser = (user: DummyUser) => {
  isEditing.value = true
  const parts = user.fullName.split(' ')
  formUser.value = {
    id: user.id,
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
    username: user.username,
    email: user.email,
    entity: user.entity,
    branch: user.branch,
    department: user.department,
    role: user.role,
    isActive: user.isActive,
  }
  createDialog.value = true
}

// Create User
const openCreateDialog = () => {
  if (sandboxMode.value === 'guide') {
    openFeatureExplanation('create_user')
  }
  isEditing.value = false
  formUser.value = {
    id: `usr-${Date.now()}`,
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    entity: selectedEntity.value || 'Goodlife Plans Inc.',
    branch: selectedBranch.value || 'Head Office Branch',
    department: selectedDepartment.value || 'Human Resource',
    role: 'HR Specialist',
    isActive: true,
  }
  createDialog.value = true
}

// Save User
const saveUser = () => {
  if (!formUser.value.firstName || !formUser.value.username) {
    triggerToast('First name and username are required', 'warning', 'mdi-alert')
    return
  }

  const fullName = `${formUser.value.firstName.trim()} ${formUser.value.lastName.trim()}`.trim()
  const initials = `${formUser.value.firstName.charAt(0)}${formUser.value.lastName.charAt(0) || ''}`.toUpperCase()

  if (isEditing.value) {
    const idx = users.value.findIndex(u => u.id === formUser.value.id)
    if (idx !== -1) {
      users.value[idx] = {
        ...users.value[idx],
        fullName,
        username: formUser.value.username.replace('@', ''),
        email: formUser.value.email || `${formUser.value.username}@goodlife.com`,
        entity: formUser.value.entity,
        branch: formUser.value.branch,
        department: formUser.value.department,
        role: formUser.value.role,
        isActive: formUser.value.isActive,
        initials,
      }
      triggerToast(`Simulated User "${fullName}" Updated!`, 'success')
    }
  } else {
    const newUser: DummyUser = {
      id: `usr-${Date.now()}`,
      fullName,
      username: formUser.value.username.replace('@', ''),
      email: formUser.value.email || `${formUser.value.username}@goodlife.com`,
      entity: formUser.value.entity,
      branch: formUser.value.branch,
      department: formUser.value.department,
      role: formUser.value.role,
      isActive: formUser.value.isActive,
      avatarColor: 'teal',
      initials: initials || 'NU',
    }
    users.value.unshift(newUser)
    triggerToast(`Simulated User "${fullName}" Created!`, 'success')
  }

  createDialog.value = false
}

// Toggle status
const toggleUserStatus = (user: DummyUser) => {
  user.isActive = !user.isActive
  triggerToast(
    `Simulated account ${user.fullName} is now ${user.isActive ? 'Active' : 'Inactive'}`,
    user.isActive ? 'success' : 'error',
    user.isActive ? 'mdi-account-check' : 'mdi-account-cancel'
  )
}

// Reset data
const resetDummyData = () => {
  users.value = JSON.parse(JSON.stringify(DEFAULT_USERS))
  searchQuery.value = ''
  selectedEntity.value = null
  selectedBranch.value = null
  selectedDepartment.value = null
  currentPage.value = 1
  triggerToast('Sandbox Reset: Default Dummy Users Restored', 'info', 'mdi-restore')
}
</script>

<style scoped>
.user-management-sandbox {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease-in-out;
  width: 100%;
}

.sim-filters-wrapper {
  gap: 12px;
}

.sim-filter-select {
  flex: 1 1 180px;
  min-width: 160px;
  max-width: 280px;
}

.search-input {
  max-width: 100%;
}

.user-grid-card {
  transition: all 0.2s ease-in-out;
  border-color: rgba(var(--v-theme-on-surface), 0.12);
  background-color: rgb(var(--v-theme-surface));
}

.user-grid-card:hover {
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

.org-block-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.org-cell {
  overflow: hidden;
}

.letter-spacing-1 {
  letter-spacing: 0.05em;
}

.main-imitation-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}

.sim-user-table th {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}
</style>
