<template>
  <div class="user-management-sandbox">
    <!-- Sandbox Control & Guide Header -->
    <SandboxHeader
      title="User Management Live Sandbox"
      subtitle="Interactive environment mirroring GGC HRIS User & Access controls with simulated employee accounts."
      icon="mdi-account-cog"
      v-model:sandbox-mode="sandboxMode"
      v-model:selected-explanation="selectedExplanation"
      reset-title="Reset dummy roster to default records"
      @reset="resetDummyData"
    />

    <!-- SIMULATED REAL APPLICATION WINDOW -->
    <div class="simulated-app-window pa-4 pa-sm-6 bg-background rounded-xl border">
      <!-- Simulated Breadcrumb -->
      <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
        <div class="d-flex align-center ga-2 text-caption">
          <span class="text-medium-emphasis cursor-pointer"
            @click="triggerToast('Navigated to Simulated Dashboard')">Dashboard</span>
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
            <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.filters" location="bottom center"
              @hover="openFeatureExplanation('filters')" />

            <!-- Entity Filter -->
            <v-select v-model="selectedEntity" :items="availableEntities" label="Entity" placeholder="All Entities"
              variant="outlined" density="compact" hide-details rounded="lg" clearable class="sim-filter-select"
              @update:model-value="onEntityChange" />

            <!-- Branch Filter -->
            <v-select v-model="selectedBranch" :items="availableBranches" label="Branch" placeholder="All Branches"
              variant="outlined" density="compact" hide-details rounded="lg" clearable class="sim-filter-select"
              :disabled="!selectedEntity && availableBranches.length === 0" @update:model-value="onBranchChange" />

            <!-- Department Filter -->
            <v-select v-model="selectedDepartment" :items="availableDepartments" label="Department"
              placeholder="All Departments" variant="outlined" density="compact" hide-details rounded="lg" clearable
              class="sim-filter-select" />

            <v-btn v-if="hasActiveFilters" variant="text" size="small" color="primary"
              class="text-capitalize font-weight-medium" @click="clearFilters">
              Clear
            </v-btn>
          </div>

          <!-- Right Action Controls: Refresh, View Switch, Create -->
          <div class="d-flex align-center ga-3 position-relative">
            <!-- Refresh Button -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.refresh" location="bottom center"
                @hover="openFeatureExplanation('refresh')" />
              <v-btn icon size="small" variant="outlined" rounded="lg" color="primary" :loading="isRefreshing"
                title="Synchronize user records" @click="triggerRefresh">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>

            <!-- View Mode Switch -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.view_toggle"
                location="bottom center" @hover="openFeatureExplanation('view_toggle')" />
              <ViewToggle v-model="viewMode" />
            </div>

            <!-- Create Button -->
            <div class="position-relative">
              <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.create_user"
                location="bottom center" @hover="openFeatureExplanation('create_user')" />
              <v-btn color="primary" class="rounded-lg text-capitalize font-weight-medium" prepend-icon="mdi-plus"
                @click="openCreateDialog">
                Create
              </v-btn>
            </div>
          </div>
        </div>

        <!-- SEARCH BAR -->
        <div class="mb-4 position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.search" location="bottom center"
            @hover="openFeatureExplanation('search')" />
          <v-text-field v-model="searchQuery" placeholder="search here..."
            variant="outlined" hide-details density="compact" rounded="lg" clearable prepend-inner-icon="mdi-magnify"
            class="search-input" />
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
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.user_card" location="bottom center"
            @hover="openFeatureExplanation('user_card')" />

          <v-row dense>
            <v-col v-for="user in paginatedUsers" :key="user.id" cols="12" sm="6" md="4" lg="3">
              <v-card variant="outlined"
                class="user-card rounded-xl pa-4 transition-swing"
                :class="{ 'card-highlight': sandboxMode === 'guide' }" @click="onCardClick(user)">
                <!-- Top Card: Status & Horizontal Dots Action Menu -->
                <div class="d-flex justify-space-between align-center mb-3">
                  <v-chip size="x-small" :color="user.isActive ? 'success' : 'error'" variant="flat"
                    class="font-weight-medium px-2 text-capitalize flex-shrink-0">
                    {{ user.isActive ? 'Active' : 'Inactive' }}
                  </v-chip>

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
                        <v-list-item prepend-icon="mdi-eye-outline" title="View Profile" @click="viewUser(user)" />
                      </v-list>
                    </v-menu>
                  </div>
                </div>

                <!-- Avatar Initials -->
                <div class="d-flex justify-center align-center mb-3">
                  <v-avatar size="48" rounded="circle" class="user-avatar elevation-1">
                    <div class="avatar-fallback w-100 h-100 d-flex align-center justify-center font-weight-bold">
                      {{ user.initials }}
                    </div>
                  </v-avatar>
                </div>

                <!-- Name & Username -->
                <div class="d-flex justify-center align-center">
                  <div class="d-flex flex-column align-center">
                    <div
                      class="text-subtitle-1 font-weight-bold text-truncate cursor-pointer user-title"
                      :title="user.fullName" @click.stop="viewUser(user)">
                      {{ user.fullName }}
                    </div>
                    <div class="text-caption text-medium-emphasis" :title="user.username">
                      &#64;{{ user.username }}
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div class="d-flex justify-center align-center mb-3">
                  <div class="d-flex align-center text-caption text-medium-emphasis" :title="user.email">
                    <v-icon icon="mdi-email-outline" size="14" class="mr-1 flex-shrink-0" />
                    <span class="text-truncate">{{ user.email }}</span>
                  </div>
                </div>

                <v-divider class="my-3 opacity-20" />

                <!-- Org Block Grid -->
                <v-row dense class="org-block text-start mb-1">
                  <v-col cols="6">
                    <div class="text-caption text-medium-emphasis text-uppercase letter-spacing-1">
                      ENTITY
                    </div>
                    <div class="text-body-2 text-truncate" :title="user.entity">
                      {{ user.entity || '—' }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-caption text-medium-emphasis text-uppercase letter-spacing-1">
                      BRANCH
                    </div>
                    <div class="text-body-2 text-truncate" :title="user.branch">
                      {{ user.branch || '—' }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-caption text-medium-emphasis text-uppercase letter-spacing-1">
                      DEPARTMENT
                    </div>
                    <div class="text-body-2 text-truncate" :title="user.department">
                      {{ user.department || '—' }}
                    </div>
                  </v-col>
                  <v-col cols="6">
                    <div class="text-caption text-medium-emphasis text-uppercase letter-spacing-1">
                      DIVISION
                    </div>
                    <div class="text-body-2 text-truncate" :title="user.division || '—'">
                      {{ user.division || '—' }}
                    </div>
                  </v-col>
                </v-row>

                <v-divider class="my-3 opacity-20" />

                <!-- Bottom Row: Role -->
                <div class="d-flex justify-center align-center ga-2">
                  <span class="text-caption font-weight-bold letter-spacing-1 text-medium-emphasis text-uppercase text-truncate"
                    :title="user.role">
                    {{ user.role }}
                  </span>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <!-- VIEW 2: LIST MODE (v-data-table) -->
        <div v-else class="position-relative">
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.user_card" location="bottom center"
            @hover="openFeatureExplanation('user_card')" />

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
                <tr v-for="user in paginatedUsers" :key="user.id" class="cursor-pointer" @click="onCardClick(user)">
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
                    <v-chip size="x-small" :color="user.isActive ? 'success' : 'error'" variant="flat"
                      class="font-weight-bold">
                      {{ user.isActive ? 'Active' : 'Inactive' }}
                    </v-chip>
                  </td>
                  <td class="text-right">
                    <div class="position-relative d-inline-block">
                      <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.action_menu" small
                        location="left center" @hover="openFeatureExplanation('action_menu')" />
                      <v-menu location="bottom end">
                        <template #activator="{ props: menuProps }">
                          <v-btn v-bind="menuProps" icon="mdi-dots-vertical" size="small" variant="text" @click.stop />
                        </template>
                        <v-list density="compact" class="rounded-lg">
                          <v-list-item prepend-icon="mdi-eye-outline" title="View Profile" @click="viewUser(user)" />
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
          <GuideBadge v-if="sandboxMode === 'guide'" :explanation="EXPLANATIONS.pagination" small location="top center"
            @hover="openFeatureExplanation('pagination')" />

          <div class="text-caption text-medium-emphasis">
            Showing <strong>{{ paginationStart }}-{{ paginationEnd }}</strong> of <strong>{{ filteredUsers.length
              }}</strong>
            simulated users
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

    <!-- DIALOG 1: VIEW USER PROFILE MODAL (Faithfully imitating HRIS User Information) -->
    <v-dialog v-model="viewDialog" max-width="500">
      <v-card v-if="selectedUser" class="rounded-2xl bg-surface">
        <!-- Header -->
        <v-card-item class="pb-3 px-6 pt-5">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon class="mr-2" size="24" color="high-emphasis">mdi-account-outline</v-icon>
              <span class="text-h6 font-weight-bold text-high-emphasis">User Information</span>
            </div>

            <v-btn
              aria-label="Close"
              color="error"
              icon="mdi-close"
              size="32"
              variant="text"
              style="color: #ff7a59 !important;"
              @click="viewDialog = false"
            />
          </div>
        </v-card-item>

        <v-divider />

        <!-- View Body -->
        <v-card-text class="pt-5 px-6 pb-2">
          <!-- Status & User Type Badges -->
          <div class="d-flex align-center ga-2 mb-4 position-relative">
            <GuideBadge
              v-if="sandboxMode === 'guide'"
              :explanation="EXPLANATIONS.view_status_role"
              location="bottom center"
              @hover="openFeatureExplanation('view_status_role')"
            />
            <v-chip
              :color="selectedUser.isActive ? 'success' : 'secondary'"
              size="small"
              variant="tonal"
              class="font-weight-medium rounded-pill px-3"
            >
              {{ selectedUser.isActive ? 'Active' : 'Inactive' }}
            </v-chip>

            <v-chip
              color="secondary"
              size="small"
              variant="outlined"
              class="font-weight-medium rounded-pill"
            >
              <v-icon start icon="mdi-badge-account-outline" size="15" class="mr-1" />
              {{ selectedUser.role }}
            </v-chip>
          </div>

          <!-- Photo -->
          <div class="mb-5">
            <div class="text-medium-emphasis mb-2 text-body-2">Photo</div>
            <v-avatar class="elevation-2 bg-surface" rounded="circle" size="64">
              <v-icon size="32" color="primary">mdi-account</v-icon>
            </v-avatar>
          </div>

          <!-- Name -->
          <div class="mb-5 position-relative">
            <GuideBadge
              v-if="sandboxMode === 'guide'"
              :explanation="EXPLANATIONS.view_identity"
              location="bottom center"
              @hover="openFeatureExplanation('view_identity')"
            />
            <div class="text-medium-emphasis mb-1 text-body-2">Name</div>
            <div class="d-flex align-center ga-2 flex-wrap">
              <span class="text-h6 font-weight-bold text-high-emphasis">{{ selectedUser.fullName }}</span>
              <v-chip
                size="small"
                variant="tonal"
                color="primary"
                class="font-weight-bold rounded-pill"
              >
                &#64;{{ selectedUser.username }}
              </v-chip>
            </div>
          </div>

          <!-- Email -->
          <div class="mb-5">
            <div class="text-medium-emphasis mb-1 text-body-2">Email</div>
            <div class="text-h6 font-weight-bold text-high-emphasis" style="font-size: 1.05rem;">
              {{ selectedUser.email }}
            </div>
          </div>

          <!-- User Type -->
          <div class="mb-4">
            <div class="text-medium-emphasis mb-1 text-body-2">User Type</div>
            <div class="text-h6 font-weight-bold text-high-emphasis" style="font-size: 1.05rem;">
              {{ selectedUser.role }}
            </div>
          </div>
        </v-card-text>

        <v-divider class="my-2" />

        <!-- Actions -->
        <v-card-actions class="px-6 py-4 d-flex align-center ga-3">
          <div v-if="sandboxMode === 'guide'" class="mr-auto d-flex align-center">
            <GuideBadge
              inline
              :explanation="EXPLANATIONS.view_actions"
              location="top start"
              @hover="openFeatureExplanation('view_actions')"
            />
          </div>
          <v-spacer v-else />

          <v-btn
            color="error"
            variant="flat"
            class="text-capitalize rounded-lg font-weight-medium px-5"
            style="background-color: #ff7a59 !important; color: white !important;"
            @click="triggerSimDelete"
          >
            Delete
          </v-btn>

          <v-btn
            variant="flat"
            class="text-capitalize rounded-lg font-weight-medium px-5"
            style="background-color: #5c6b77 !important; color: white !important;"
            @click="switchToEditFromView"
          >
            Edit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- DIALOG 2: CREATE / EDIT USER MODAL (Faithfully imitating HRIS Edit User) -->
    <v-dialog v-model="createDialog" max-width="520" persistent>
      <v-card class="rounded-2xl bg-surface">
        <!-- Header -->
        <v-card-item class="pb-3 px-6 pt-5">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <v-icon class="mr-2" size="24" color="high-emphasis">mdi-account-outline</v-icon>
              <span class="text-h6 font-weight-bold text-high-emphasis">
                {{ isEditing ? 'Edit User' : 'Create User' }}
              </span>
            </div>
            <v-btn
              aria-label="Close"
              color="error"
              icon="mdi-close"
              size="32"
              variant="text"
              style="color: #ff7a59 !important;"
              @click="createDialog = false"
            />
          </div>
        </v-card-item>

        <v-divider />

        <!-- Form Body -->
        <v-card-text class="pt-4 px-6 pb-2">
          <v-form @submit.prevent="saveUser">
            <!-- Photo Section -->
            <div class="mb-4 position-relative">
              <GuideBadge
                v-if="sandboxMode === 'guide'"
                :explanation="EXPLANATIONS.edit_photo"
                location="bottom center"
                @hover="openFeatureExplanation('edit_photo')"
              />
              <label class="text-medium-emphasis mb-2 d-block">Photo</label>
              <div class="d-flex align-center ga-4">
                <v-avatar class="elevation-2 bg-surface" rounded="circle" size="68">
                  <v-icon size="32" color="primary">mdi-account</v-icon>
                </v-avatar>

                <div class="d-flex align-center ga-2">
                  <v-btn
                    variant="outlined"
                    prepend-icon="mdi-tray-arrow-up"
                    class="text-capitalize rounded-lg font-weight-medium"
                    @click="triggerSimUploadPhoto"
                  >
                    Upload Photo
                  </v-btn>
                </div>
              </div>
            </div>

            <!-- Username -->
            <div class="mb-4">
              <label class="text-medium-emphasis mb-1 d-block">Username</label>
              <v-text-field
                v-model="formUser.username"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                hide-details="auto"
              />
            </div>

            <!-- Name Row (First, Middle, Last) -->
            <div class="position-relative mb-2">
              <GuideBadge
                v-if="sandboxMode === 'guide'"
                :explanation="EXPLANATIONS.edit_names"
                location="bottom center"
                @hover="openFeatureExplanation('edit_names')"
              />
              <v-row dense>
                <v-col cols="12" sm="4">
                  <label class="text-medium-emphasis mb-1 d-block">First Name</label>
                  <v-text-field
                    v-model="formUser.firstName"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <label class="text-medium-emphasis mb-1 d-block">Middle Name</label>
                  <v-text-field
                    v-model="formUser.middleName"
                    placeholder="Middle Name"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
                <v-col cols="12" sm="4">
                  <label class="text-medium-emphasis mb-1 d-block">Last Name</label>
                  <v-text-field
                    v-model="formUser.lastName"
                    placeholder="Last Name"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
              </v-row>
            </div>

            <!-- Email -->
            <div class="mb-4">
              <label class="text-medium-emphasis mb-1 d-block">Email</label>
              <v-text-field
                v-model="formUser.email"
                placeholder="Email"
                type="email"
                variant="outlined"
                density="comfortable"
                rounded="lg"
                hide-details="auto"
              />
            </div>

            <!-- User Type & Status Row -->
            <div class="mb-2 position-relative">
              <GuideBadge
                v-if="sandboxMode === 'guide'"
                :explanation="EXPLANATIONS.edit_role_status"
                location="top center"
                @hover="openFeatureExplanation('edit_role_status')"
              />
              <v-row dense>
                <v-col :cols="isEditing ? 6 : 12">
                  <label class="text-medium-emphasis mb-1 d-block">User Type</label>
                  <v-select
                    v-model="formUser.role"
                    :items="['Manager', 'HR Administrator', 'HR Specialist', 'Branch Manager', 'System Super Admin', 'Staff User']"
                    placeholder="User Type"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
                <v-col v-if="isEditing" cols="6">
                  <label class="text-medium-emphasis mb-1 d-block">Status</label>
                  <v-select
                    v-model="formUserStatus"
                    :items="['Active', 'Inactive']"
                    placeholder="Status"
                    variant="outlined"
                    density="comfortable"
                    rounded="lg"
                    hide-details="auto"
                  />
                </v-col>
              </v-row>
            </div>
          </v-form>
        </v-card-text>

        <v-divider class="my-2" />

        <!-- Actions -->
        <v-card-actions class="px-6 py-4 d-flex align-center ga-3">
          <div v-if="sandboxMode === 'guide'" class="mr-auto d-flex align-center">
            <GuideBadge
              inline
              :explanation="EXPLANATIONS.edit_actions"
              location="top start"
              @hover="openFeatureExplanation('edit_actions')"
            />
          </div>
          <v-spacer v-else />

          <v-btn
            variant="flat"
            class="text-capitalize rounded-lg font-weight-medium px-4"
            style="background-color: #e2e8f0 !important; color: #334155 !important;"
            @click="createDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="primary"
            variant="flat"
            class="text-capitalize rounded-lg font-weight-medium px-5 text-white"
            style="background-color: #0284c7 !important;"
            @click="saveUser"
          >
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
  DEFAULT_USERS,
  USER_EXPLANATIONS as EXPLANATIONS,
  type DummyUser,
} from '@/data/sandbox/userSandboxData'

export type { DummyUser } from '@/data/sandbox/userSandboxData'
export type { ExplanationInfo } from '@/types/sandbox'

// Sandbox state
const sandboxMode = ref<SandboxMode>('guide')
const users = ref<DummyUser[]>([...DEFAULT_USERS])
const selectedExplanation = ref<ExplanationInfo | null>(EXPLANATIONS.filters)

// Filter & View State
const searchQuery = ref('')
const selectedEntity = ref<string | null>(null)
const selectedBranch = ref<string | null>(null)
const selectedDepartment = ref<string | null>(null)
const viewMode = ref<ViewMode>('grid')
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
  middleName: '',
  lastName: '',
  username: '',
  email: '',
  entity: 'Goodlife Plans Inc.',
  branch: 'Head Office Branch',
  department: 'Human Resource',
  role: 'Manager',
  isActive: true,
})

const formUserStatus = computed({
  get: () => (formUser.value.isActive ? 'Active' : 'Inactive'),
  set: (val: string) => {
    formUser.value.isActive = val === 'Active'
  },
})

const triggerSimUploadPhoto = () => {
  triggerToast('Simulated Photo Upload: Profile photo updated', 'info', 'mdi-tray-arrow-up')
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
  let first = user.firstName !== undefined ? user.firstName : ''
  let middle = user.middleName !== undefined ? user.middleName : ''
  let last = user.lastName !== undefined ? user.lastName : ''

  if (!first && parts.length >= 3) {
    first = parts[0]
    middle = parts[1]
    last = parts.slice(2).join(' ')
  } else if (!first && parts.length === 2) {
    first = parts[0]
    middle = ''
    last = parts[1]
  } else if (!first) {
    first = user.fullName
  }

  formUser.value = {
    id: user.id,
    firstName: first,
    middleName: middle,
    lastName: last,
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
    middleName: '',
    lastName: '',
    username: '',
    email: '',
    entity: selectedEntity.value || 'Goodlife Plans Inc.',
    branch: selectedBranch.value || 'Head Office Branch',
    department: selectedDepartment.value || 'Human Resource',
    role: 'Manager',
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

  const nameParts = [formUser.value.firstName.trim(), formUser.value.middleName.trim(), formUser.value.lastName.trim()].filter(Boolean)
  const fullName = nameParts.join(' ')
  const initials = `${formUser.value.firstName.charAt(0)}${formUser.value.lastName.charAt(0) || formUser.value.middleName.charAt(0) || ''}`.toUpperCase()

  if (isEditing.value) {
    const idx = users.value.findIndex(u => u.id === formUser.value.id)
    if (idx !== -1) {
      users.value[idx] = {
        ...users.value[idx],
        fullName,
        firstName: formUser.value.firstName.trim(),
        middleName: formUser.value.middleName.trim(),
        lastName: formUser.value.lastName.trim(),
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
      firstName: formUser.value.firstName.trim(),
      middleName: formUser.value.middleName.trim(),
      lastName: formUser.value.lastName.trim(),
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

// Delete from view dialog
const triggerSimDelete = () => {
  if (!selectedUser.value) return
  const name = selectedUser.value.fullName
  const id = selectedUser.value.id
  users.value = users.value.filter(u => u.id !== id)
  viewDialog.value = false
  triggerToast(`Simulated User "${name}" deleted from roster`, 'error', 'mdi-delete-outline')
}

// Switch from view to edit dialog
const switchToEditFromView = () => {
  if (!selectedUser.value) return
  const user = selectedUser.value
  viewDialog.value = false
  editUser(user)
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

defineExpose({
  openCreateDialog,
  setMode: (mode: 'play' | 'guide') => { sandboxMode.value = mode },
  openProfile: (user?: DummyUser) => {
    viewUser(user || users.value[0])
  },
  openEdit: (user?: DummyUser) => {
    editUser(user || users.value[0])
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

.search-input :deep(.v-field__outline) {
  --v-field-border-opacity: 0.12;
}

.user-card {
  position: relative;
  background-color: rgb(var(--v-theme-surface));
  border: 1px solid rgba(0, 0, 0, 0.08) !important;
  border-radius: 18px !important;
  transition: all 0.2s ease-in-out;
}

.user-card:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--v-theme-primary), 0.45) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.user-avatar {
  background-color: #f0f7ff;
  border: 1px solid rgba(2, 132, 199, 0.12);
}

.avatar-fallback {
  background-color: rgba(2, 132, 199, 0.08);
  font-size: 1rem;
  letter-spacing: 0.04em;
  color: #0284c7 !important;
}

.user-title:hover {
  color: rgb(var(--v-theme-primary));
}

.card-highlight {
  cursor: pointer;
}

.letter-spacing-1 {
  letter-spacing: 0.08em;
  font-size: 0.68rem;
}

.main-imitation-card {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.03);
}

.sim-user-table th {
  background-color: rgba(var(--v-theme-on-surface), 0.02);
}
</style>
