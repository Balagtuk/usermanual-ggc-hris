<template>
  <article :id="module.id" class="module-wrapper mb-8">
    <!-- Top Minimal Breadcrumb -->
    <BaseBreadcrumb
      :title="module.title"
      :breadcrumbs="breadcrumbs"
    />

    <!-- Main Module Documentation Card (Borderless) -->
    <v-card class="module-card pa-4 pa-sm-6 pa-md-8 rounded-lg bg-surface" elevation="0">
      <!-- Header Area: Chapter, Title, Route & Permissions -->
      <header class="d-flex flex-wrap align-start justify-space-between ga-3 mb-6 pb-2">
        <div class="d-flex align-start ga-3">
          <div class="chapter-number-badge">
            {{ module.num }}
          </div>
          <div>
            <div class="d-flex align-center ga-2 flex-wrap mb-1">
              <h1 class="text-h5 font-weight-bold tracking-tight mb-0">
                {{ module.title }}
              </h1>
              <!-- Menu Navigation Path (User-friendly) -->
              <v-chip
                v-if="module.menuPath"
                size="x-small"
                color="primary"
                variant="tonal"
                class="font-weight-medium"
              >
                <v-icon start icon="mdi-navigation-variant-outline" size="13" />
                Menu: {{ module.menuPath }}
              </v-chip>
              <v-chip v-else size="x-small" color="primary" variant="tonal" class="font-weight-medium">
                Chapter {{ module.num }}
              </v-chip>

              <v-chip size="x-small" color="secondary" variant="tonal" class="font-weight-medium">
                {{ module.category }}
              </v-chip>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ module.description }}
            </p>
          </div>
        </div>

        <!-- Authorized Roles / Permissions & Page Tag -->
        <div class="d-flex flex-column align-sm-end align-start ga-2">
          <span class="text-caption font-weight-semibold text-primary">
            Chapter {{ module.num }} of 10
          </span>
          <div v-if="module.authorizedRoles && module.authorizedRoles.length > 0" class="d-flex flex-wrap align-center ga-1">
            <span class="text-caption font-weight-medium text-medium-emphasis mr-1">Authorized Roles:</span>
            <v-chip
              v-for="role in module.authorizedRoles"
              :key="role"
              size="x-small"
              variant="tonal"
              color="primary"
              class="font-weight-medium"
            >
              <v-icon start icon="mdi-account-lock-outline" size="13" />
              {{ role }}
            </v-chip>
          </div>
          <div v-else class="d-flex flex-wrap ga-1">
            <v-chip
              v-for="perm in module.permissions"
              :key="perm"
              size="x-small"
              variant="tonal"
              color="secondary"
              class="font-weight-medium"
            >
              <v-icon start icon="mdi-shield-check-outline" size="13" />
              {{ perm }}
            </v-chip>
          </div>
        </div>
      </header>

      <v-divider class="my-5 opacity-40" />

      <!-- Module Overview & Purpose -->
      <section class="mb-8">
        <h2 class="section-title mb-2">
          Overview & System Purpose
        </h2>
        <p class="text-body-1 text-high-emphasis leading-relaxed mb-0">
          {{ module.overview }}
        </p>
      </section>

      <!-- Screen Components & Buttons Directory -->
      <section v-if="module.uiFeatures && module.uiFeatures.length > 0" class="mb-8">
        <div class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2">
          <div>
            <div class="d-flex align-center ga-2 mb-1">
              <h2 class="section-title mb-0">
                Screen Components & Buttons Directory
              </h2>
              <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                Interactive
              </v-chip>
            </div>
            <p class="text-caption text-medium-emphasis mb-0">
              Operational breakdown of every control. Click any button row to test an interactive micro-simulation:
            </p>
          </div>
          <div class="d-flex align-center ga-2">
            <v-chip size="small" color="primary" variant="tonal" class="font-weight-medium">
              <v-icon start icon="mdi-tune-vertical" size="15" />
              {{ module.uiFeatures.length }} Controls Documented
            </v-chip>
          </div>
        </div>

        <v-card class="rounded-lg overflow-hidden border inner-card" elevation="0">
          <v-table density="comfortable" class="doc-controls-table bg-transparent">
            <thead>
              <tr>
                <th class="font-weight-bold text-caption text-uppercase" style="width: 220px;">Component / Button</th>
                <th class="font-weight-bold text-caption text-uppercase" style="width: 160px;">Screen Location</th>
                <th class="font-weight-bold text-caption text-uppercase">Operational Purpose & Functionality</th>
                <th class="font-weight-bold text-caption text-uppercase text-right" style="width: 120px;">Try Simulation</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ctrl in module.uiFeatures"
                :key="ctrl.name"
                class="control-row cursor-pointer"
                title="Click to test interactive simulation"
                @click="openControlSimulator(ctrl)"
              >
                <td class="py-3">
                  <div class="d-flex align-center ga-2">
                    <v-avatar size="28" color="primary" variant="tonal" class="rounded control-avatar">
                      <v-icon :icon="ctrl.icon || 'mdi-cursor-default-click-outline'" size="16" color="primary" />
                    </v-avatar>
                    <span class="font-weight-bold text-body-2 text-high-emphasis">{{ ctrl.name }}</span>
                  </div>
                </td>
                <td class="py-3">
                  <v-chip size="x-small" variant="tonal" color="secondary" class="font-weight-medium">
                    {{ ctrl.location }}
                  </v-chip>
                </td>
                <td class="py-3">
                  <div class="text-body-2 font-weight-medium text-high-emphasis mb-1">
                    {{ ctrl.purpose }}
                  </div>
                  <div class="text-caption text-medium-emphasis leading-relaxed">
                    {{ ctrl.action }}
                  </div>
                </td>
                <td class="py-3 text-right">
                  <v-btn
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="text-none font-weight-bold"
                    prepend-icon="mdi-play-circle-outline"
                    @click.stop="openControlSimulator(ctrl)"
                  >
                    Simulate
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </section>

      <!-- Experience Mode Switcher (Handbook Walkthrough vs Live Sandbox) -->
      <div v-if="module.id === 'mod-user'" class="d-flex align-center justify-space-between mb-6 pa-3 rounded-lg bg-surface border flex-wrap ga-3">
        <div class="d-flex align-center ga-2">
          <v-avatar size="32" color="primary" variant="tonal">
            <v-icon icon="mdi-flask-outline" size="18" color="primary" />
          </v-avatar>
          <div>
            <div class="text-subtitle-2 font-weight-bold text-high-emphasis">
              Interactive Sandbox Experience Available
            </div>
            <div class="text-caption text-medium-emphasis">
              Explore the live simulated user management interface or follow the step-by-step handbook walkthrough.
            </div>
          </div>
        </div>

        <v-btn-toggle
          v-model="experienceTab"
          mandatory
          density="compact"
          color="primary"
          rounded="lg"
          class="border"
        >
          <v-btn value="walkthrough" size="small" class="text-none font-weight-medium px-3">
            <v-icon start icon="mdi-book-open-page-variant-outline" size="15" />
            Handbook Walkthrough
          </v-btn>
          <v-btn value="sandbox" size="small" class="text-none font-weight-medium px-3">
            <v-icon start icon="mdi-flask-outline" size="15" />
            Interactive Sandbox 🧪
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Live Sandbox Mode -->
      <section v-if="module.id === 'mod-user' && experienceTab === 'sandbox'" class="mb-8">
        <UserManagementSandbox />
      </section>

      <!-- Standard Walkthrough & Screenshots Mode -->
      <template v-else>
        <!-- Interface Screenshot Visual Reference (Only for modules without visual step handbook) -->
        <section v-if="!hasVisualSteps" class="mb-8">
          <ModuleScreenshot :module="module" />
        </section>

      <!-- Step-by-Step Operating Procedure -->
      <section v-if="module.steps && module.steps.length > 0" class="mb-8">
        <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
          <div>
            <h2 class="section-title mb-1">
              {{ hasVisualSteps ? 'Step-by-Step Handbook Walkthrough' : 'Step-by-Step Procedure' }}
            </h2>
            <p v-if="hasVisualSteps" class="text-caption text-medium-emphasis mb-0">
              Follow each visual step below to complete standard operations in this module. Click any screenshot to view full resolution.
            </p>
          </div>
          <v-chip v-if="hasVisualSteps" size="small" color="primary" variant="tonal" class="font-weight-bold">
            <v-icon start icon="mdi-book-open-page-variant-outline" size="16" />
            {{ module.steps.length }} Visual Steps
          </v-chip>
        </div>

        <!-- Sequential Visual Walkthrough (Handbook Style for User, Entity, Branch) -->
        <div v-if="hasVisualSteps" class="d-flex flex-column ga-6">
          <v-card
            v-for="step in module.steps"
            :key="step.number"
            class="visual-step-card rounded-lg pa-4 pa-sm-5 pa-md-6 inner-card"
            elevation="0"
          >
            <!-- Step Header Bar -->
            <div class="d-flex flex-wrap align-center justify-space-between ga-3 mb-3">
              <div class="d-flex align-center ga-3">
                <span class="step-badge">STEP 0{{ step.number }}</span>
                <h3 class="text-subtitle-1 font-weight-bold mb-0 text-high-emphasis">
                  {{ step.title }}
                </h3>
              </div>
              <div class="d-flex align-center ga-2">
                <v-btn
                  size="x-small"
                  variant="text"
                  color="medium-emphasis"
                  :prepend-icon="copiedStep === step.number ? 'mdi-check' : 'mdi-link-variant'"
                  class="text-none font-weight-medium"
                  :title="copiedStep === step.number ? 'Link copied!' : 'Copy direct link to this step'"
                  aria-label="Copy step link"
                  @click="copyStepLink(step.number)"
                >
                  {{ copiedStep === step.number ? 'Copied!' : 'Copy link' }}
                </v-btn>
                <v-chip
                  v-if="step.image"
                  size="x-small"
                  variant="tonal"
                  color="primary"
                  class="font-weight-medium cursor-pointer"
                  @click="openLightbox(step)"
                >
                  <v-icon start icon="mdi-magnify-plus-outline" size="13" />
                  Expand image
                </v-chip>
              </div>
            </div>

            <!-- Step Operational Guidance Text -->
            <p class="text-body-2 text-high-emphasis leading-relaxed mb-4">
              {{ step.description }}
            </p>

            <!-- Embedded Step Screenshot Frame -->
            <div
              v-if="step.image"
              class="step-image-frame rounded-lg overflow-hidden border cursor-pointer bg-background position-relative"
              @click="openLightbox(step)"
            >
              <!-- Window top bar -->
              <div class="window-bar px-3 px-sm-4 py-2 bg-surface-variant d-flex align-center justify-space-between border-b">
                <div class="d-flex align-center ga-2 text-truncate">
                  <span class="window-dot d-none d-sm-inline-block" style="background-color: rgba(var(--v-theme-on-surface), 0.25);" />
                  <span class="window-dot d-none d-sm-inline-block" style="background-color: rgba(var(--v-theme-on-surface), 0.25);" />
                  <span class="window-dot d-none d-sm-inline-block" style="background-color: rgba(var(--v-theme-on-surface), 0.25);" />
                  <span class="text-caption font-weight-medium ml-1 ml-sm-2 text-medium-emphasis text-truncate">
                    Step {{ step.number }}: {{ step.title }}
                  </span>
                </div>
                <v-chip size="x-small" variant="tonal" color="primary" class="d-none d-sm-inline-flex flex-shrink-0">
                  Screenshot Reference
                </v-chip>
              </div>

              <!-- Real Image View -->
              <div class="position-relative">
                <v-img
                  :src="step.image"
                  :alt="step.alt || step.title"
                  max-height="460"
                  cover
                  class="step-screenshot-img"
                >
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height bg-surface-variant pa-8">
                      <v-progress-circular indeterminate color="primary" size="32" />
                    </div>
                  </template>
                </v-img>

                <!-- Hover Overlay -->
                <div class="step-image-overlay d-flex align-center justify-center">
                  <v-chip color="white" variant="flat" class="text-primary font-weight-bold">
                    <v-icon start icon="mdi-arrow-expand" />
                    Click to View Full-Size Screenshot
                  </v-chip>
                </div>
              </div>

              <!-- Caption & Highlights Footer -->
              <div class="pa-4 bg-surface border-t">
                <p v-if="step.caption" class="text-body-2 font-weight-medium text-high-emphasis mb-2 leading-relaxed">
                  {{ step.caption }}
                </p>

                <div v-if="step.highlights && step.highlights.length > 0" class="d-flex flex-wrap align-center ga-1 pt-1">
                  <span class="text-caption font-weight-bold text-medium-emphasis mr-1">Visible Features & Controls:</span>
                  <v-chip
                    v-for="hl in step.highlights"
                    :key="hl"
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="font-weight-medium"
                  >
                    <v-icon start icon="mdi-check-circle-outline" size="12" />
                    {{ hl }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-card>
        </div>

        <!-- Standard Compact Grid for Modules 4-9 (No step images) -->
        <v-row v-else dense>
          <v-col
            v-for="step in module.steps"
            :key="step.number"
            cols="12"
            sm="6"
            md="6"
            lg="3"
          >
            <div class="step-card pa-4 rounded-lg h-100 inner-card">
              <div class="d-flex align-center ga-2 mb-2">
                <span class="step-circle">{{ step.number }}</span>
                <h3 class="text-subtitle-2 font-weight-bold mb-0">
                  {{ step.title }}
                </h3>
              </div>
              <p class="text-caption text-medium-emphasis mb-0 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </v-col>
        </v-row>
      </section>
    </template>

      <!-- Form Fields Reference Table -->
      <section v-if="module.fields && module.fields.length > 0" class="mb-8">
        <h2 class="section-title mb-3">
          Form Fields Reference
        </h2>
        <div class="rounded-lg overflow-hidden inner-card">
          <v-table density="comfortable" hover class="doc-table">
            <thead>
              <tr>
                <th style="width: 220px;">Field Name</th>
                <th style="width: 130px;">Requirement</th>
                <th style="width: 120px;">Data Type</th>
                <th>Validation / Rules & Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="field in module.fields" :key="field.name">
                <td class="font-weight-medium">
                  <code class="field-name-code">{{ field.name }}</code>
                </td>
                <td>
                  <v-chip
                    size="x-small"
                    :color="field.requirement === 'Required' ? 'primary' : 'secondary'"
                    variant="flat"
                    class="font-weight-bold"
                  >
                    {{ field.requirement }}
                  </v-chip>
                </td>
                <td>
                  <span class="text-caption text-medium-emphasis font-mono">
                    {{ field.dataType || 'String' }}
                  </span>
                </td>
                <td class="text-body-2 text-medium-emphasis py-2">
                  {{ field.description }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </section>

      <!-- Additional Matrix Table (Role Permissions Matrix, etc.) -->
      <section v-if="module.additionalTable" class="mb-8">
        <h2 class="section-title mb-3">
          {{ module.additionalTable.title }}
        </h2>
        <div class="rounded-lg overflow-hidden inner-card">
          <v-table density="comfortable" hover class="doc-table">
            <thead>
              <tr>
                <th
                  v-for="h in module.additionalTable.headers"
                  :key="h"
                >
                  {{ h }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in module.additionalTable.rows" :key="idx">
                <td class="font-weight-medium text-body-2 text-primary">
                  {{ row.col1 }}
                </td>
                <td>
                  <code class="field-name-code">{{ row.col2 }}</code>
                </td>
                <td class="text-body-2 text-medium-emphasis">
                  {{ row.col3 }}
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </section>

      <!-- Administrative Best Practices / Callout Alert with Distinct Visual Treatments -->
      <v-alert
        v-if="module.callout"
        :color="calloutColor"
        variant="tonal"
        class="rounded-lg mt-5 border-s-4"
        density="comfortable"
      >
        <template #prepend>
          <v-icon :icon="calloutIcon" size="22" class="me-2" />
        </template>
        <template #title>
          <span class="font-weight-bold text-subtitle-2">{{ module.callout.title }}</span>
        </template>
        <div class="text-body-2 mt-1 leading-relaxed">
          {{ module.callout.text }}
        </div>
      </v-alert>
    </v-card>

    <!-- Lightbox Dialog for Step Screenshots with Zoom, Fullscreen on mobile, and Esc support -->
    <v-dialog v-model="lightboxOpen" max-width="1200" scrollable :fullscreen="smAndDown" @keydown.esc="lightboxOpen = false">
      <v-card class="rounded-lg overflow-hidden">
        <v-toolbar color="primary" density="comfortable" class="text-white">
          <v-toolbar-title class="text-subtitle-1 font-weight-bold">
            {{ module.num }}. {{ module.title }} &mdash; {{ lightboxTitle }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn
            :icon="isLightboxZoomed ? 'mdi-magnify-minus-outline' : 'mdi-magnify-plus-outline'"
            variant="text"
            :title="isLightboxZoomed ? 'Reset zoom' : 'Enlarge image'"
            @click="isLightboxZoomed = !isLightboxZoomed"
          />
          <v-btn icon="mdi-close" variant="text" title="Close (Esc)" @click="lightboxOpen = false" />
        </v-toolbar>

        <v-card-text class="pa-4 bg-background">
          <!-- Lightbox View Info Banner -->
          <div class="mb-3 pa-3 rounded-lg bg-surface border">
            <p class="text-body-2 text-high-emphasis mb-1 font-weight-medium">
              {{ lightboxCaption }}
            </p>

            <div v-if="lightboxHighlights.length > 0" class="d-flex flex-wrap align-center ga-1 pt-1">
              <span class="text-caption font-weight-bold text-medium-emphasis mr-1">Visible Actions & Features:</span>
              <v-chip
                v-for="feat in lightboxHighlights"
                :key="feat"
                size="x-small"
                variant="tonal"
                color="primary"
              >
                <v-icon start icon="mdi-check-circle-outline" size="12" />
                {{ feat }}
              </v-chip>
            </div>
          </div>

          <div class="rounded-lg border overflow-hidden bg-surface text-center">
            <v-img
              :src="lightboxImage"
              :alt="lightboxTitle"
              class="w-100 transition-all"
              :style="{ transform: isLightboxZoomed ? 'scale(1.25)' : 'none', transformOrigin: 'top center' }"
              max-height="750"
              contain
            />
          </div>
        </v-card-text>

        <v-card-actions class="px-4 py-3 bg-surface border-t">
          <span class="text-caption text-medium-emphasis">
            <span v-if="module.menuPath">Menu: {{ module.menuPath }} &bull; </span>GGC HRIS Admin Handbook &bull; Chapter {{ module.num }}
          </span>
          <v-spacer />
          <v-btn color="primary" variant="flat" class="text-none" @click="lightboxOpen = false">
            Close Preview
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Interactive Control Inspector & Micro-Simulator Modal (Option 1) -->
    <v-dialog
      v-model="simModalOpen"
      :fullscreen="smAndDown"
      max-width="680"
      transition="dialog-bottom-transition"
    >
      <v-card v-if="selectedControl" class="rounded-xl overflow-hidden elevation-12 border bg-surface">
        <!-- Dialog Header Bar -->
        <v-toolbar color="surface" density="comfortable" class="border-b px-4">
          <v-avatar size="32" color="primary" variant="tonal" class="mr-3 rounded">
            <v-icon :icon="selectedControl.icon || 'mdi-cursor-default-click-outline'" size="18" color="primary" />
          </v-avatar>
          <div class="text-truncate">
            <div class="text-subtitle-2 font-weight-bold text-high-emphasis text-truncate">
              {{ selectedControl.name }}
            </div>
            <div class="text-caption text-medium-emphasis text-truncate">
              {{ selectedControl.location }} &bull; {{ module.title }}
            </div>
          </div>
          <v-spacer />
          <v-chip size="x-small" color="primary" variant="tonal" class="mr-2 font-weight-bold d-none d-sm-inline-flex">
            Interactive Sandbox
          </v-chip>
          <v-btn icon="mdi-close" variant="text" size="small" @click="simModalOpen = false" />
        </v-toolbar>

        <v-card-text class="pa-4 pa-sm-6">
          <!-- Overview Card -->
          <div class="pa-4 rounded-lg bg-surface-variant border mb-4">
            <div class="text-caption text-uppercase font-weight-bold text-primary mb-1">
              Operational Purpose
            </div>
            <p class="text-body-2 font-weight-medium text-high-emphasis mb-2 leading-relaxed">
              {{ selectedControl.purpose }}
            </p>
            <div class="d-flex align-start ga-2 text-caption text-medium-emphasis">
              <v-icon icon="mdi-information-outline" size="16" class="mt-0-5 flex-shrink-0 text-primary" />
              <span>{{ selectedControl.action }}</span>
            </div>
          </div>

          <!-- Sandbox Stage Container -->
          <div class="simulator-stage rounded-lg border pa-4 pa-sm-5 mb-4 position-relative">
            <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
              <div class="d-flex align-center ga-2">
                <span class="live-indicator-dot" />
                <span class="text-caption font-weight-bold text-uppercase text-primary letter-spacing-wide">
                  Live Interactive Sandbox
                </span>
              </div>
              <span class="text-caption text-medium-emphasis">
                Test the button below to observe system behavior:
              </span>
            </div>

            <!-- 1. REFRESH SIMULATOR -->
            <div v-if="controlType === 'refresh'" class="py-2 text-center">
              <div class="d-flex justify-center align-center ga-3 mb-4">
                <v-btn
                  color="primary"
                  variant="flat"
                  size="large"
                  :loading="simRefreshSpinning"
                  class="text-none font-weight-bold px-6 shadow-sm"
                  prepend-icon="mdi-refresh"
                  @click="triggerSimRefresh"
                >
                  Click to Refresh Data
                </v-btn>
              </div>

              <v-fade-transition>
                <div v-if="simSyncSuccess" class="sync-success-pill pa-3 rounded-lg border d-inline-flex align-center ga-2 text-caption font-weight-medium">
                  <v-icon icon="mdi-check-circle" color="success" size="18" />
                  <span>Synchronized with Central HRIS Database at <strong>{{ simLastSynced }}</strong></span>
                </div>
                <div v-else class="text-caption text-medium-emphasis">
                  Click the button above to simulate querying live database records.
                </div>
              </v-fade-transition>
            </div>

            <!-- 2. GRID / LIST VIEW TOGGLE SIMULATOR -->
            <div v-else-if="controlType === 'grid-list'" class="py-1">
              <div class="d-flex align-center justify-space-between mb-4 flex-wrap ga-2">
                <span class="text-caption font-weight-bold text-medium-emphasis">Toggle Display Format:</span>
                <v-btn-toggle v-model="simViewMode" mandatory density="comfortable" color="primary" variant="outlined">
                  <v-btn value="grid" prepend-icon="mdi-view-grid-outline" class="text-none text-caption font-weight-bold">
                    Grid Cards
                  </v-btn>
                  <v-btn value="list" prepend-icon="mdi-format-list-bulleted" class="text-none text-caption font-weight-bold">
                    Spreadsheet List
                  </v-btn>
                </v-btn-toggle>
              </div>

              <!-- Animated View Canvas -->
              <div v-if="simViewMode === 'grid'" class="sim-grid-container ga-3">
                <v-card v-for="emp in simEmployees.slice(0, 2)" :key="emp.name" class="pa-3 rounded-lg border bg-surface" elevation="0">
                  <div class="d-flex align-center ga-3 mb-2">
                    <v-avatar color="primary" variant="tonal" size="36" class="font-weight-bold">
                      {{ emp.avatar }}
                    </v-avatar>
                    <div class="text-truncate">
                      <div class="text-subtitle-2 font-weight-bold text-truncate">{{ emp.name }}</div>
                      <div class="text-caption text-medium-emphasis text-truncate">{{ emp.role }}</div>
                    </div>
                  </div>
                  <div class="d-flex align-center justify-space-between text-caption pt-1 border-t">
                    <span class="text-medium-emphasis">{{ emp.branch }}</span>
                    <v-chip size="x-small" color="success" variant="flat" class="font-weight-bold">Active</v-chip>
                  </div>
                </v-card>
              </div>

              <div v-else class="rounded-lg border overflow-hidden bg-surface">
                <div v-for="emp in simEmployees.slice(0, 2)" :key="emp.name" class="d-flex align-center justify-space-between pa-3 border-b text-caption">
                  <div class="d-flex align-center ga-2 text-truncate">
                    <v-avatar color="primary" variant="tonal" size="24" class="font-weight-bold text-caption">
                      {{ emp.avatar }}
                    </v-avatar>
                    <span class="font-weight-bold text-high-emphasis">{{ emp.name }}</span>
                    <span class="text-medium-emphasis d-none d-sm-inline">({{ emp.role }})</span>
                  </div>
                  <div class="d-flex align-center ga-2">
                    <span class="text-medium-emphasis d-none d-sm-inline">{{ emp.branch }}</span>
                    <v-chip size="x-small" color="success" variant="flat">Active</v-chip>
                  </div>
                </div>
              </div>
            </div>

            <!-- 3. REAL-TIME SEARCH SIMULATOR -->
            <div v-else-if="controlType === 'search'" class="py-1">
              <v-text-field
                v-model="simSearchQuery"
                density="compact"
                variant="outlined"
                placeholder="Type name, title, or branch (e.g., 'Sarah', 'Admin', 'Cebu')..."
                prepend-inner-icon="mdi-magnify"
                clearable
                hide-details
                class="mb-3"
              />

              <div class="d-flex align-center justify-space-between mb-2">
                <span class="text-caption font-weight-bold text-medium-emphasis">
                  Matching Real-Time Results:
                </span>
                <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-bold">
                  {{ simFilteredEmployees.length }} of {{ simEmployees.length }} Records
                </v-chip>
              </div>

              <div class="rounded-lg border overflow-hidden bg-surface max-h-180 overflow-y-auto">
                <div
                  v-for="emp in simFilteredEmployees"
                  :key="emp.name"
                  class="d-flex align-center justify-space-between pa-3 border-b text-caption"
                >
                  <div class="d-flex align-center ga-2 text-truncate">
                    <v-avatar color="primary" variant="tonal" size="26" class="font-weight-bold">
                      {{ emp.avatar }}
                    </v-avatar>
                    <div>
                      <div class="font-weight-bold text-high-emphasis">{{ emp.name }}</div>
                      <div class="text-caption text-medium-emphasis">{{ emp.role }} &bull; {{ emp.branch }}</div>
                    </div>
                  </div>
                  <v-chip size="x-small" :color="emp.active ? 'success' : 'secondary'" variant="flat">
                    {{ emp.active ? 'Active' : 'Inactive' }}
                  </v-chip>
                </div>
                <div v-if="simFilteredEmployees.length === 0" class="pa-4 text-center text-caption text-medium-emphasis">
                  No matching employees found for "{{ simSearchQuery }}".
                </div>
              </div>
            </div>

            <!-- 4. 3-DOTS ACTION MENU SIMULATOR -->
            <div v-else-if="controlType === 'action-menu'" class="py-1">
              <div class="pa-4 rounded-lg border bg-surface d-flex align-center justify-space-between mb-3">
                <div class="d-flex align-center ga-3 text-truncate">
                  <v-avatar color="primary" variant="tonal" size="40" class="font-weight-bold">
                    JD
                  </v-avatar>
                  <div>
                    <div class="text-subtitle-2 font-weight-bold">John Doe</div>
                    <div class="text-caption text-medium-emphasis">HR Specialist &bull; Goodlife Plans Inc.</div>
                  </div>
                </div>

                <!-- 3-Dots Menu Button -->
                <v-menu location="bottom end" transition="slide-y-transition">
                  <template #activator="{ props: menuProps }">
                    <v-btn
                      v-bind="menuProps"
                      icon="mdi-dots-vertical"
                      variant="tonal"
                      color="primary"
                      size="small"
                      title="Click to open operational actions"
                    />
                  </template>
                  <v-list density="compact" elevation="6" class="rounded-lg border py-1" min-width="190">
                    <v-list-item
                      prepend-icon="mdi-card-account-details-outline"
                      title="View Profile Details"
                      @click="triggerSimMenuAction('View Profile Details')"
                    />
                    <v-list-item
                      prepend-icon="mdi-pencil-outline"
                      title="Edit Record"
                      @click="triggerSimMenuAction('Edit Record')"
                    />
                    <v-list-item
                      prepend-icon="mdi-shield-account-outline"
                      title="Manage Permissions"
                      @click="triggerSimMenuAction('Manage Permissions')"
                    />
                    <v-divider class="my-1" />
                    <v-list-item
                      prepend-icon="mdi-account-off-outline"
                      title="Deactivate Account"
                      color="error"
                      @click="triggerSimMenuAction('Deactivate Account')"
                    />
                  </v-list>
                </v-menu>
              </div>

              <v-fade-transition>
                <div v-if="simMenuToast" class="pa-3 rounded-lg border bg-primary-lighten-5 text-primary text-caption font-weight-medium d-flex align-center ga-2">
                  <v-icon icon="mdi-check-circle-outline" size="16" />
                  <span>{{ simMenuToast }}</span>
                </div>
                <div v-else class="text-caption text-medium-emphasis text-center">
                  Click the <strong>⋮ (3-dots)</strong> button on the right of the user card to inspect available operational actions.
                </div>
              </v-fade-transition>
            </div>

            <!-- 5. STATUS BADGE / TOGGLE SIMULATOR -->
            <div v-else-if="controlType === 'status'" class="py-2 text-center">
              <div class="d-flex justify-center align-center ga-4 mb-4">
                <span class="text-body-2 font-weight-bold text-high-emphasis">Simulated Record State:</span>
                <v-btn
                  :color="simRecordStatus ? 'success' : 'secondary'"
                  variant="flat"
                  size="small"
                  class="text-none font-weight-bold px-4"
                  :prepend-icon="simRecordStatus ? 'mdi-check-circle' : 'mdi-close-circle-outline'"
                  @click="simRecordStatus = !simRecordStatus"
                >
                  {{ simRecordStatus ? 'Active' : 'Inactive' }} (Click to Toggle)
                </v-btn>
              </div>

              <div class="pa-3 rounded-lg border bg-surface text-left">
                <div class="text-caption font-weight-bold mb-1" :class="simRecordStatus ? 'text-success' : 'text-medium-emphasis'">
                  {{ simRecordStatus ? '✓ Record is Active' : '✕ Record is Suspended (Inactive)' }}
                </div>
                <p class="text-caption text-medium-emphasis mb-0 leading-relaxed">
                  {{ simRecordStatus
                    ? 'The employee has active portal access and can log into authorized modules. Profile appears in department rosters and organizational charts.'
                    : 'The employee session is immediately revoked and system login is blocked. The record remains permanently safely preserved in the database for historical audit and reporting.' }}
                </p>
              </div>
            </div>

            <!-- 6. CREATE RECORD SIMULATOR -->
            <div v-else-if="controlType === 'create'" class="py-1">
              <div class="d-flex justify-center mb-3">
                <v-btn
                  color="primary"
                  variant="flat"
                  prepend-icon="mdi-plus"
                  class="text-none font-weight-bold px-6 shadow-sm"
                  @click="simCreateModal = true"
                >
                  {{ selectedControl.name }}
                </v-btn>
              </div>

              <!-- Mini form simulator -->
              <v-expand-transition>
                <div v-if="simCreateModal" class="pa-4 rounded-lg border bg-surface">
                  <div class="d-flex align-center justify-space-between mb-3">
                    <span class="text-subtitle-2 font-weight-bold">Create New Record Dialog</span>
                    <v-btn icon="mdi-close" size="x-small" variant="text" @click="simCreateModal = false" />
                  </div>
                  <v-text-field
                    v-model="simCreateName"
                    label="Full Name / Record Title *"
                    density="compact"
                    variant="outlined"
                    class="mb-3"
                    hide-details
                  />
                  <v-select
                    v-model="simCreateRole"
                    :items="['HR Specialist', 'Branch Manager', 'Operations Lead', 'IT Administrator']"
                    label="Assigned Role *"
                    density="compact"
                    variant="outlined"
                    class="mb-3"
                    hide-details
                  />
                  <div class="d-flex justify-end ga-2 pt-2">
                    <v-btn size="small" variant="text" class="text-none" @click="simCreateModal = false">
                      Cancel
                    </v-btn>
                    <v-btn size="small" color="primary" variant="flat" class="text-none font-weight-bold" @click="triggerSimCreateSubmit">
                      Save Record
                    </v-btn>
                  </div>
                </div>
              </v-expand-transition>

              <v-fade-transition>
                <div v-if="simCreateSuccess" class="pa-3 mt-3 rounded-lg border bg-success-lighten-5 text-success text-caption font-weight-medium d-flex align-center ga-2">
                  <v-icon icon="mdi-check-circle" size="18" />
                  <span>Success: New record registered and appended to active roster!</span>
                </div>
              </v-fade-transition>
            </div>

            <!-- 6b. CASCADING ADDRESS SIMULATOR (PH MUNICIPALITIES & BARANGAYS) -->
            <div v-else-if="controlType === 'cascading-address'" class="py-1">
              <div class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2">
                <span class="text-caption font-weight-bold text-medium-emphasis">
                  Philippine Geographic Cascading Hierarchy:
                </span>
                <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                  Province &rarr; City/Municipality &rarr; Barangay
                </v-chip>
              </div>

              <v-row dense class="mb-2">
                <!-- 1. Province Dropdown -->
                <v-col cols="12" sm="4">
                  <v-select
                    :model-value="simProvince"
                    :items="provinceList"
                    label="1. Province *"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-map-marker-radius-outline"
                    hide-details
                    @update:model-value="onProvinceChange"
                  />
                </v-col>

                <!-- 2. City / Municipality Dropdown -->
                <v-col cols="12" sm="4">
                  <v-select
                    :model-value="simCity"
                    :items="cityList"
                    label="2. City / Municipality *"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-city-variant-outline"
                    hide-details
                    @update:model-value="onCityChange"
                  />
                </v-col>

                <!-- 3. Barangay Dropdown -->
                <v-col cols="12" sm="4">
                  <v-select
                    v-model="simBarangay"
                    :items="barangayList"
                    label="3. Barangay *"
                    density="compact"
                    variant="outlined"
                    prepend-inner-icon="mdi-home-city-outline"
                    hide-details
                  />
                </v-col>
              </v-row>

              <!-- Auto-Filled Postal Code -->
              <div class="d-flex align-center flex-wrap ga-3 mb-3">
                <v-text-field
                  v-model="simPostalCode"
                  label="Auto-Resolved ZIP Code"
                  density="compact"
                  variant="outlined"
                  prepend-inner-icon="mdi-numeric"
                  hide-details
                  style="max-width: 190px;"
                  readonly
                />
                <div class="text-caption text-medium-emphasis">
                  Postal Code auto-resolves based on the selected Philippine municipality.
                </div>
              </div>

              <!-- Real-Time Verified Address Preview Card -->
              <div class="pa-3 rounded-lg border bg-surface">
                <div class="d-flex align-center justify-space-between text-caption mb-1">
                  <span class="text-medium-emphasis font-weight-medium">Full Structured Entity Address:</span>
                  <v-chip size="x-small" color="success" variant="flat" class="font-weight-bold">
                    Verified PSGC Hierarchy
                  </v-chip>
                </div>
                <div class="text-body-2 font-weight-bold text-high-emphasis">
                  Brgy. {{ simBarangay }}, {{ simCity }}, {{ simProvince }}, Philippines (ZIP: {{ simPostalCode }})
                </div>
                <div class="text-caption text-medium-emphasis mt-1">
                  Selecting a Province dynamically resets and filters Municipalities. Selecting a Municipality automatically loads all official registered Barangays and ZIP codes.
                </div>
              </div>
            </div>

            <!-- 6c. STATUTORY REGION SELECTOR SIMULATOR (DOLE / NWPC WAGE COMPLIANCE) -->
            <div v-else-if="controlType === 'region-selector'" class="py-1">
              <div class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2">
                <span class="text-caption font-weight-bold text-medium-emphasis">
                  Philippine Administrative Region & DOLE Wage Mapping:
                </span>
                <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                  NWPC / DOLE Statutory Rates
                </v-chip>
              </div>

              <v-select
                v-model="simSelectedRegionCode"
                :items="phRegionsList"
                item-title="name"
                item-value="code"
                density="compact"
                variant="outlined"
                label="Official Philippine Administrative Region *"
                prepend-inner-icon="mdi-map-marker-check-outline"
                hide-details
                class="mb-3"
              />

              <!-- Statutory Compliance Details Card -->
              <div class="pa-4 rounded-lg border bg-surface">
                <div class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2 border-b pb-2">
                  <div>
                    <div class="text-caption text-medium-emphasis">Selected Administrative Region</div>
                    <div class="text-subtitle-2 font-weight-bold text-primary">{{ selectedRegionInfo.name }}</div>
                  </div>
                  <div class="text-right">
                    <div class="text-caption text-medium-emphasis">Daily Statutory Minimum Wage</div>
                    <v-chip size="small" color="success" variant="flat" class="font-weight-bold text-subtitle-2">
                      {{ selectedRegionInfo.minWage }}
                    </v-chip>
                  </div>
                </div>

                <v-row dense class="text-caption mb-1">
                  <v-col cols="12" sm="6">
                    <div class="text-medium-emphasis font-weight-medium">Regional Tripartite Wage Board (RTWPB):</div>
                    <div class="text-high-emphasis font-weight-bold">{{ selectedRegionInfo.rtwpb }}</div>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <div class="text-medium-emphasis font-weight-medium">Covered Provinces / Cities:</div>
                    <div class="text-high-emphasis">{{ selectedRegionInfo.provincesSample }}</div>
                  </v-col>
                </v-row>

                <div class="pt-2 border-t mt-2">
                  <div class="d-flex align-start ga-2 text-caption">
                    <v-icon icon="mdi-calendar-check" size="16" color="primary" class="mt-0-5 flex-shrink-0" />
                    <div>
                      <span class="font-weight-bold text-high-emphasis">Statutory Holiday Sync: </span>
                      <span class="text-medium-emphasis">
                        Automatically applies local special non-working days (e.g., {{ selectedRegionInfo.holidays }}) to payroll attendance for all staff assigned to branches under this region.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 6d. AUTO-FORMATTING PH CONTACT NUMBER SIMULATOR -->
            <div v-else-if="controlType === 'contact-input'" class="py-1">
              <div class="d-flex align-center justify-space-between mb-3 flex-wrap ga-2">
                <span class="text-caption font-weight-bold text-medium-emphasis">
                  Philippine Contact Number Auto-Formatter:
                </span>
                <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                  PH Numbers Only
                </v-chip>
              </div>

              <v-text-field
                v-model="simPhoneRaw"
                label="Philippine Contact Number *"
                density="compact"
                variant="outlined"
                placeholder="e.g., 09171234567 or (082) 224-5678"
                prepend-inner-icon="mdi-phone"
                clearable
                hide-details
                class="mb-3"
                @update:model-value="handlePhoneInput"
              >
                <template #prepend>
                  <v-chip size="small" variant="tonal" color="primary" class="font-weight-bold">
                    🇵🇭 +63
                  </v-chip>
                </template>
              </v-text-field>

              <!-- Quick test presets -->
              <div class="d-flex align-center flex-wrap ga-2 mb-3">
                <span class="text-caption text-medium-emphasis font-weight-medium">Quick Presets:</span>
                <v-btn
                  size="x-small"
                  variant="tonal"
                  color="primary"
                  class="text-none font-weight-bold"
                  @click="applyPhonePreset('09178891234')"
                >
                  Globe Mobile (0917)
                </v-btn>
                <v-btn
                  size="x-small"
                  variant="tonal"
                  color="primary"
                  class="text-none font-weight-bold"
                  @click="applyPhonePreset('09205547890')"
                >
                  Smart Mobile (0920)
                </v-btn>
                <v-btn
                  size="x-small"
                  variant="tonal"
                  color="primary"
                  class="text-none font-weight-bold"
                  @click="applyPhonePreset('0822245678')"
                >
                  Davao Landline (082)
                </v-btn>
              </div>

              <!-- Real-time formatted feedback card -->
              <div class="pa-4 rounded-lg border bg-surface">
                <div class="d-flex align-center justify-space-between mb-2 flex-wrap ga-2 border-b pb-2">
                  <div>
                    <div class="text-caption text-medium-emphasis">Standardized Display Format</div>
                    <div class="text-subtitle-1 font-weight-bold font-mono text-primary">
                      {{ formattedPhoneDisplay || '09XX-XXX-XXXX' }}
                    </div>
                  </div>
                  <div>
                    <v-chip
                      size="small"
                      :color="isPhoneValid ? 'success' : 'warning'"
                      variant="flat"
                      class="font-weight-bold"
                    >
                      <v-icon start :icon="isPhoneValid ? 'mdi-check-circle' : 'mdi-alert-circle-outline'" size="14" />
                      {{ isPhoneValid ? 'Valid PH Number' : 'Incomplete / Invalid' }}
                    </v-chip>
                  </div>
                </div>

                <v-row dense class="text-caption mb-1">
                  <v-col cols="12" sm="6">
                    <span class="text-medium-emphasis">Carrier / Number Type: </span>
                    <strong class="text-high-emphasis">{{ detectedCarrier }}</strong>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <span class="text-medium-emphasis">Stored Database Format: </span>
                    <code class="font-mono text-primary font-weight-bold">{{ storedPhoneE164 }}</code>
                  </v-col>
                </v-row>

                <div class="text-caption text-medium-emphasis pt-2 border-t mt-2">
                  Entered digits are dynamically sanitized into Philippine <code>09XX-XXX-XXXX</code> spacing. Eliminates misdialed hotlines on emergency rosters and automated branch SMS dispatches.
                </div>
              </div>
            </div>

            <!-- 7. DROPDOWN FILTER SIMULATOR -->
            <div v-else-if="controlType === 'dropdown-filter'" class="py-1">
              <v-select
                v-model="simSelectedFilter"
                :items="dropdownItems"
                density="compact"
                variant="outlined"
                :label="selectedControl.name.includes('Branch') ? 'Select Branch Filter Scope' : (selectedControl.name.includes('Department') ? 'Select Department Scope' : 'Select Entity (Company / Subsidiary)')"
                hide-details
                class="mb-3"
              />

              <div class="pa-3 rounded-lg border bg-surface">
                <div class="d-flex align-center justify-space-between text-caption mb-1">
                  <span class="text-medium-emphasis">Selected Organization:</span>
                  <span class="font-weight-bold text-primary">{{ simSelectedFilter }}</span>
                </div>
                <div class="d-flex align-center justify-space-between text-caption">
                  <span class="text-medium-emphasis">Dataset Status:</span>
                  <v-chip size="x-small" color="primary" variant="tonal" class="font-weight-bold">
                    Filtered to {{ simSelectedFilter }} organizational records
                  </v-chip>
                </div>
              </div>
            </div>

            <!-- 8. FILE UPLOAD SIMULATOR -->
            <div v-else-if="controlType === 'upload'" class="py-1">
              <div
                class="upload-dropzone pa-6 rounded-lg border border-dashed text-center cursor-pointer bg-surface"
                @click="triggerSimUpload"
              >
                <v-icon icon="mdi-cloud-upload-outline" size="36" color="primary" class="mb-2" />
                <div class="text-subtitle-2 font-weight-bold mb-1">
                  Click to Simulate File Upload
                </div>
                <div class="text-caption text-medium-emphasis">
                  Supports PNG, JPG, or SVG (Max 5MB)
                </div>

                <div v-if="simUploading" class="mt-4">
                  <v-progress-linear :model-value="simUploadProgress" color="primary" height="6" rounded />
                  <div class="text-caption text-medium-emphasis mt-1">Uploading... {{ simUploadProgress }}%</div>
                </div>

                <v-fade-transition>
                  <div v-if="simUploadSuccess" class="mt-4 d-inline-flex align-center ga-2 text-success text-caption font-weight-bold">
                    <v-icon icon="mdi-check-circle" size="18" />
                    <span>profile_avatar_2026.png uploaded & validated!</span>
                  </div>
                </v-fade-transition>
              </div>
            </div>

            <!-- 9. PAGINATION SIMULATOR -->
            <div v-else-if="controlType === 'pagination'" class="py-2 text-center">
              <div class="d-flex align-center justify-space-between flex-wrap ga-2 pa-3 rounded-lg border bg-surface mb-3">
                <span class="text-caption text-medium-emphasis">
                  Showing <strong>{{ (simCurrentPage - 1) * simRowsPerPage + 1 }}-{{ Math.min(simCurrentPage * simRowsPerPage, 48) }}</strong> of <strong>48</strong> records
                </span>
                <div class="d-flex align-center ga-2">
                  <span class="text-caption text-medium-emphasis">Rows:</span>
                  <v-btn-toggle v-model="simRowsPerPage" mandatory density="compact" color="primary">
                    <v-btn :value="10" size="x-small">10</v-btn>
                    <v-btn :value="25" size="x-small">25</v-btn>
                    <v-btn :value="50" size="x-small">50</v-btn>
                  </v-btn-toggle>
                </div>
              </div>

              <div class="d-flex justify-center align-center ga-2">
                <v-btn
                  size="small"
                  variant="outlined"
                  icon="mdi-chevron-left"
                  :disabled="simCurrentPage === 1"
                  @click="simCurrentPage--"
                />
                <v-btn
                  v-for="p in [1, 2, 3]"
                  :key="p"
                  size="small"
                  :variant="simCurrentPage === p ? 'flat' : 'text'"
                  :color="simCurrentPage === p ? 'primary' : 'medium-emphasis'"
                  class="font-weight-bold"
                  @click="simCurrentPage = p"
                >
                  {{ p }}
                </v-btn>
                <v-btn
                  size="small"
                  variant="outlined"
                  icon="mdi-chevron-right"
                  :disabled="simCurrentPage === 3"
                  @click="simCurrentPage++"
                />
              </div>
            </div>

            <!-- 10. PERMISSIONS MATRIX SIMULATOR -->
            <div v-else-if="controlType === 'permissions'" class="py-1">
              <div class="d-flex align-center justify-space-between mb-3">
                <span class="text-caption font-weight-bold text-medium-emphasis">Capability Checklist:</span>
                <v-chip size="x-small" color="primary" variant="flat" class="font-weight-bold">
                  {{ simCapabilities.filter(c => c.checked).length }} of {{ simCapabilities.length }} Enabled
                </v-chip>
              </div>

              <div class="rounded-lg border bg-surface pa-2">
                <div
                  v-for="cap in simCapabilities"
                  :key="cap.id"
                  class="d-flex align-center justify-space-between px-3 py-2 border-b cursor-pointer hover-bg"
                  @click="cap.checked = !cap.checked"
                >
                  <span class="text-caption font-weight-medium text-high-emphasis">{{ cap.label }}</span>
                  <v-checkbox-btn v-model="cap.checked" color="primary" density="compact" hide-details />
                </div>
              </div>
            </div>

            <!-- 11. GENERIC FALLBACK SIMULATOR -->
            <div v-else class="py-2 text-center">
              <v-btn
                color="primary"
                variant="flat"
                size="large"
                class="text-none font-weight-bold px-6 mb-3 shadow-sm"
                :prepend-icon="selectedControl.icon || 'mdi-cursor-default-click-outline'"
                @click="simGenericClicks++"
              >
                Trigger {{ selectedControl.name }}
              </v-btn>
              <div class="text-caption text-medium-emphasis">
                Simulated action test count: <strong>{{ simGenericClicks }}</strong> clicks registered
              </div>
            </div>
          </div>

          <!-- Operator Pro-Tip Card -->
          <div class="pa-4 rounded-lg bg-surface border mb-4 d-flex align-start ga-3">
            <v-icon icon="mdi-lightbulb-on" color="warning" size="22" class="mt-0-5 flex-shrink-0" />
            <div>
              <div class="text-subtitle-2 font-weight-bold text-high-emphasis mb-1">
                Operator Best Practice & Policy Tip
              </div>
              <p class="text-caption text-medium-emphasis mb-0 leading-relaxed">
                {{ getControlTip(selectedControl) }}
              </p>
            </div>
          </div>

          <!-- Direct Jump to Handbook Step Button -->
          <div v-if="module.steps && module.steps.length > 0" class="text-center pt-1">
            <v-btn
              variant="tonal"
              color="primary"
              class="text-none font-weight-bold"
              prepend-icon="mdi-file-document-arrow-right-outline"
              @click="jumpToStep(selectedControl)"
            >
              Jump to Handbook Step for this Control &rarr;
            </v-btn>
          </div>
        </v-card-text>

        <v-card-actions class="px-6 py-3 border-t bg-surface d-flex align-center justify-space-between">
          <span class="text-caption text-medium-emphasis">
            GGC HRIS Interactive Component Handbook
          </span>
          <v-btn color="primary" variant="flat" class="text-none font-weight-bold px-4" @click="simModalOpen = false">
            Close Sandbox
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import type { ModuleDoc, StepItem, UIFeatureControl } from '@/data/manualData'
import ModuleScreenshot from '@/components/ModuleScreenshot.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'
import UserManagementSandbox from '@/components/sandbox/UserManagementSandbox.vue'

const { smAndDown } = useDisplay()

const props = defineProps<{
  module: ModuleDoc
}>()

const experienceTab = ref<'walkthrough' | 'sandbox'>('walkthrough')

watch(() => props.module.id, () => {
  experienceTab.value = 'walkthrough'
})

const breadcrumbs = computed(() => [
  { text: 'Manual', disabled: false },
  { text: props.module.category, disabled: false },
  { text: props.module.title, disabled: true },
])

const hasVisualSteps = computed(() => {
  return props.module.steps?.some(step => !!step.image) || false
})

const lightboxOpen = ref(false)
const lightboxImage = ref('')
const lightboxTitle = ref('')
const lightboxCaption = ref('')
const lightboxHighlights = ref<string[]>([])
const isLightboxZoomed = ref(false)
const copiedStep = ref<number | null>(null)

// -------------------------------------------------------------
// Interactive Micro-Simulation Modal State & Handlers (Option 1)
// -------------------------------------------------------------
const simModalOpen = ref(false)
const selectedControl = ref<UIFeatureControl | null>(null)

// 1. Refresh Simulation
const simRefreshSpinning = ref(false)
const simLastSynced = ref('10:45 AM')
const simSyncSuccess = ref(false)

const triggerSimRefresh = () => {
  simRefreshSpinning.value = true
  simSyncSuccess.value = false
  setTimeout(() => {
    simRefreshSpinning.value = false
    simSyncSuccess.value = true
    const now = new Date()
    simLastSynced.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }, 900)
}

// 2. Grid vs List View Simulation
const simViewMode = ref<'grid' | 'list'>('grid')

// 3. Real-time Search Simulation
const simSearchQuery = ref('')
const simEmployees = [
  { name: 'John Doe', role: 'HR Specialist', dept: 'Human Resource', branch: 'Head Office', avatar: 'JD', active: true },
  { name: 'Sarah Connor', role: 'Claims Analyst', dept: 'Claims Department', branch: 'Bansalan Branch', avatar: 'SC', active: true },
  { name: 'Alex Vance', role: 'IT Administrator', dept: 'Information Technology', branch: 'Head Office', avatar: 'AV', active: true },
  { name: 'Elena Rostova', role: 'Finance Officer', dept: 'Finance Department', branch: 'Digos Branch', avatar: 'ER', active: false },
]

const simFilteredEmployees = computed(() => {
  if (!simSearchQuery.value || !simSearchQuery.value.trim()) return simEmployees
  const q = simSearchQuery.value.toLowerCase().trim()
  return simEmployees.filter(e =>
    e.name.toLowerCase().includes(q) ||
    e.role.toLowerCase().includes(q) ||
    e.dept.toLowerCase().includes(q) ||
    e.branch.toLowerCase().includes(q)
  )
})

// 4. 3-Dots Action Menu Simulation
const simMenuToast = ref('')
const triggerSimMenuAction = (actionTitle: string) => {
  simMenuToast.value = `Simulated action "${actionTitle}" triggered for John Doe.`
  setTimeout(() => {
    if (simMenuToast.value.includes(actionTitle)) {
      simMenuToast.value = ''
    }
  }, 2500)
}

// 5. Status Toggle Simulation
const simRecordStatus = ref(true)

// 6. Create Record Simulation
const simCreateModal = ref(false)
const simCreateName = ref('Maria Santos')
const simCreateRole = ref('HR Specialist')
const simCreateSuccess = ref(false)

const triggerSimCreateSubmit = () => {
  simCreateSuccess.value = true
  simCreateModal.value = false
  setTimeout(() => {
    simCreateSuccess.value = false
  }, 3000)
}

// 7. Dropdown Filter Simulation
const simEntityOptions = [
  'Damayan',
  'GLPI',
  'Goodlife Chapel',
  'Goodlife Coop',
  'Goodlife Plans Inc.',
  'Head Office',
  'Goodlife Casket',
]

const simDepartmentOptions = [
  'Human Resource',
  'Finance Department',
  'Audit Department',
  'Claims Department',
  'Information Technology',
]

const simBranchOptions = [
  'Head Office Branch',
  'Bansalan Branch',
  'Digos Branch',
  'Cebu Branch',
  'Davao Branch',
  'Makati Branch',
]

const dropdownItems = computed(() => {
  const name = (selectedControl.value?.name || '').toLowerCase()
  if (name.includes('department') || name.includes('dept')) {
    return simDepartmentOptions
  }
  if (name.includes('branch')) {
    return simBranchOptions
  }
  return simEntityOptions
})

const simSelectedFilter = ref('Goodlife Plans Inc.')

// 7b. Cascading Address Simulation (Philippines PSGC Hierarchy)
const simProvince = ref('Davao del Sur')
const simCity = ref('Digos City')
const simBarangay = ref('Zone 1 (Poblacion)')
const simPostalCode = ref('8002')

interface LocationData {
  cities: {
    [city: string]: {
      postalCode: string
      barangays: string[]
    }
  }
}

const phLocationDatabase: Record<string, LocationData> = {
  'Davao del Sur': {
    cities: {
      'Digos City': {
        postalCode: '8002',
        barangays: ['Zone 1 (Poblacion)', 'San Jose', 'Aplaya', 'Tres de Mayo', 'Dulangan', 'Sinawilan'],
      },
      'Bansalan': {
        postalCode: '8005',
        barangays: ['Poblacion', 'Kinuskusan', 'Dolo', 'Marber', 'New Clarin', 'Managa'],
      },
      'Matanao': {
        postalCode: '8003',
        barangays: ['Poblacion', 'Manga', 'Kibao', 'Sinawilan'],
      },
      'Santa Cruz': {
        postalCode: '8001',
        barangays: ['Poblacion', 'Astorga', 'Coronon', 'Darong'],
      },
      'Hagonoy': {
        postalCode: '8006',
        barangays: ['Poblacion', 'Guihing', 'Aplaya', 'San Guillermo'],
      },
    },
  },
  'Cebu': {
    cities: {
      'Cebu City': {
        postalCode: '6000',
        barangays: ['Lahug', 'Mabolo', 'Guadalupe', 'Banilad', 'Kamputhaw'],
      },
      'Mandaue City': {
        postalCode: '6014',
        barangays: ['Subangdaku', 'Tipolo', 'Bakilid', 'Banilad', 'Centro'],
      },
      'Lapu-Lapu City': {
        postalCode: '6015',
        barangays: ['Poblacion', 'Maribago', 'Mactan', 'Basak'],
      },
      'Talisay City': {
        postalCode: '6045',
        barangays: ['Poblacion', 'Bulacao', 'Dumlog', 'Lawaan'],
      },
    },
  },
  'Metro Manila (NCR)': {
    cities: {
      'Makati City': {
        postalCode: '1200',
        barangays: ['Bel-Air', 'Poblacion', 'San Lorenzo', 'Urdaneta', 'Palanan', 'Bangkal'],
      },
      'Quezon City': {
        postalCode: '1100',
        barangays: ['Diliman', 'Cubao', 'Batasan Hills', 'Commonwealth', 'Loyola Heights'],
      },
      'City of Manila': {
        postalCode: '1000',
        barangays: ['Ermita', 'Malate', 'Binondo', 'Intramuros', 'Sampaloc'],
      },
      'Taguig City': {
        postalCode: '1630',
        barangays: ['Fort Bonifacio (BGC)', 'Ususan', 'Tuktukan', 'Western Bicutan'],
      },
    },
  },
  'Davao del Norte': {
    cities: {
      'Tagum City': {
        postalCode: '8100',
        barangays: ['Mankilam', 'Magugpo Poblacion', 'Visayan Village', 'San Miguel'],
      },
      'Panabo City': {
        postalCode: '8105',
        barangays: ['Santo Niño', 'San Francisco', 'Salvacion', 'Gredu'],
      },
    },
  },
  'Leyte': {
    cities: {
      'Tacloban City': {
        postalCode: '6500',
        barangays: ['Downtown Poblacion', 'San Jose', 'Marasbaras', 'Abucay'],
      },
      'Ormoc City': {
        postalCode: '6541',
        barangays: ['Poblacion', 'Cogon', 'Can-adieng', 'Ipil'],
      },
    },
  },
}

const provinceList = Object.keys(phLocationDatabase)

const cityList = computed(() => {
  const prov = phLocationDatabase[simProvince.value]
  return prov ? Object.keys(prov.cities) : []
})

const barangayList = computed(() => {
  const prov = phLocationDatabase[simProvince.value]
  if (!prov) return []
  const cityData = prov.cities[simCity.value]
  return cityData ? cityData.barangays : []
})

const onProvinceChange = (newProv: string) => {
  simProvince.value = newProv
  const cities = cityList.value
  const firstCity = cities[0] || ''
  onCityChange(firstCity)
}

const onCityChange = (newCity: string) => {
  simCity.value = newCity
  const prov = phLocationDatabase[simProvince.value]
  if (prov && prov.cities[newCity]) {
    simPostalCode.value = prov.cities[newCity].postalCode
    const b = prov.cities[newCity].barangays
    simBarangay.value = b[0] || ''
  } else {
    simPostalCode.value = ''
    simBarangay.value = ''
  }
}

// 7c. Statutory Region Selector Simulation (DOLE / NWPC Wage Compliance)
interface RegionData {
  code: string
  name: string
  rtwpb: string
  minWage: string
  provincesSample: string
  holidays: string
}

const phRegionsList: RegionData[] = [
  {
    code: 'Region XI',
    name: 'Region XI - Davao Region',
    rtwpb: 'RTWPB-XI (Wage Order No. RB-XI-22)',
    minWage: '₱481.00 / day',
    provincesSample: 'Davao del Sur, Davao City, Davao del Norte, Davao de Oro',
    holidays: 'Araw ng Dabaw, Kadayawan Festival, Digos Charter Day',
  },
  {
    code: 'Region VII',
    name: 'Region VII - Central Visayas',
    rtwpb: 'RTWPB-VII (Wage Order No. ROVII-24)',
    minWage: '₱468.00 / day',
    provincesSample: 'Cebu, Bohol, Negros Oriental, Siquijor',
    holidays: 'Sinulog Festival, Cebu Province Charter Day',
  },
  {
    code: 'NCR',
    name: 'NCR - National Capital Region (Metro Manila)',
    rtwpb: 'RTWPB-NCR (Wage Order No. NCR-24)',
    minWage: '₱645.00 / day',
    provincesSample: 'Makati, Quezon City, City of Manila, Taguig, Pasig',
    holidays: 'Araw ng Maynila, Quezon City Day, Ninoy Aquino Day',
  },
  {
    code: 'Region VIII',
    name: 'Region VIII - Eastern Visayas',
    rtwpb: 'RTWPB-VIII (Wage Order No. RB-VIII-23)',
    minWage: '₱405.00 / day',
    provincesSample: 'Leyte, Southern Leyte, Samar, Northern Samar, Biliran',
    holidays: 'Leyte Gulf Landing, Tacloban Sangyaw Festival',
  },
  {
    code: 'Region X',
    name: 'Region X - Northern Mindanao',
    rtwpb: 'RTWPB-X (Wage Order No. RX-22)',
    minWage: '₱438.00 / day',
    provincesSample: 'Misamis Oriental, Bukidnon, Lanao del Norte, Camiguin',
    holidays: 'Higalaay Festival, Araw ng Misamis Oriental',
  },
  {
    code: 'Region XII',
    name: 'Region XII - SOCCSKSARGEN',
    rtwpb: 'RTWPB-XII (Wage Order No. RB-XII-23)',
    minWage: '₱403.00 / day',
    provincesSample: 'South Cotabato, General Santos City, Cotabato, Sarangani',
    holidays: 'T’nalak Festival, Tuna Festival',
  },
  {
    code: 'Region IV-A',
    name: 'Region IV-A - CALABARZON',
    rtwpb: 'RTWPB-IV-A (Wage Order No. RB-IVA-20)',
    minWage: '₱520.00 / day',
    provincesSample: 'Cavite, Laguna, Batangas, Rizal, Quezon',
    holidays: 'Araw ng Laguna, Cavite Day',
  },
  {
    code: 'Region III',
    name: 'Region III - Central Luzon',
    rtwpb: 'RTWPB-III (Wage Order No. RB-III-24)',
    minWage: '₱500.00 / day',
    provincesSample: 'Pampanga, Bulacan, Bataan, Nueva Ecija, Tarlac',
    holidays: 'Araw ng Pampanga, Bataan Day',
  },
]

const simSelectedRegionCode = ref('Region XI')
const selectedRegionInfo = computed(() => {
  return phRegionsList.find(r => r.code === simSelectedRegionCode.value) || phRegionsList[0]
})

// 7d. Philippine Contact Number Auto-Formatting Simulation
const simPhoneRaw = ref('0917-889-1234')

const formatPhilippineNumber = (val: string): string => {
  if (!val) return ''
  let digits = val.replace(/\D/g, '')

  if (digits.startsWith('63') && digits.length > 2) {
    digits = '0' + digits.slice(2)
  }

  if (digits.startsWith('09')) {
    if (digits.length <= 4) return digits
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 11)}`
  }

  if (digits.startsWith('0') && digits.length >= 3 && !digits.startsWith('09')) {
    const area = digits.slice(0, 3)
    const rest = digits.slice(3)
    if (rest.length <= 3) return `(${area}) ${rest}`
    return `(${area}) ${rest.slice(0, 3)}-${rest.slice(3, 7)}`
  }

  if (digits.startsWith('9')) {
    digits = '0' + digits
    if (digits.length <= 4) return digits
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 11)}`
  }

  return digits
}

const handlePhoneInput = (val: string) => {
  simPhoneRaw.value = formatPhilippineNumber(val)
}

const applyPhonePreset = (rawNumber: string) => {
  simPhoneRaw.value = formatPhilippineNumber(rawNumber)
}

const formattedPhoneDisplay = computed(() => {
  return formatPhilippineNumber(simPhoneRaw.value)
})

const isPhoneValid = computed(() => {
  const digits = (simPhoneRaw.value || '').replace(/\D/g, '')
  if (digits.startsWith('09') && digits.length === 11) return true
  if (digits.startsWith('0') && !digits.startsWith('09') && digits.length >= 9 && digits.length <= 10) return true
  return false
})

const detectedCarrier = computed(() => {
  const digits = (simPhoneRaw.value || '').replace(/\D/g, '')
  if (digits.startsWith('09')) {
    const prefix = digits.slice(0, 4)
    const globePrefixes = ['0915', '0916', '0917', '0926', '0927', '0935', '0936', '0945', '0955', '0956', '0965', '0966', '0967', '0975', '0977', '0995', '0997']
    const smartPrefixes = ['0908', '0918', '0919', '0920', '0921', '0928', '0929', '0939', '0946', '0947', '0948', '0949', '0950', '0951', '0961', '0963', '0968', '0970', '0981', '0989', '0998', '0999']
    const ditoPrefixes = ['0991', '0992', '0993', '0994']

    if (globePrefixes.includes(prefix)) return 'Globe / TM Telecom'
    if (smartPrefixes.includes(prefix)) return 'Smart / TNT Telecom'
    if (ditoPrefixes.includes(prefix)) return 'DITO Telecommunity'
    return 'Philippine Cellular Mobile'
  }
  if (digits.startsWith('082')) return 'Davao Regional Landline (PLDT/Bayantel)'
  if (digits.startsWith('032')) return 'Cebu Regional Landline (PLDT/Globe)'
  if (digits.startsWith('02')) return 'Metro Manila Landline (PLDT/Globe)'
  if (digits.startsWith('0')) return 'Philippine Provincial Landline'
  return 'Unrecognized / Incomplete Syntax'
})

const storedPhoneE164 = computed(() => {
  const digits = (simPhoneRaw.value || '').replace(/\D/g, '')
  if (digits.startsWith('0')) {
    return `+63${digits.slice(1)}`
  }
  return digits ? `+63${digits}` : '+63XXXXXXXXXX'
})

// 8. Upload Simulation
const simUploading = ref(false)
const simUploadProgress = ref(0)
const simUploadSuccess = ref(false)

const triggerSimUpload = () => {
  if (simUploading.value) return
  simUploading.value = true
  simUploadProgress.value = 0
  simUploadSuccess.value = false
  const interval = setInterval(() => {
    simUploadProgress.value += 25
    if (simUploadProgress.value >= 100) {
      clearInterval(interval)
      simUploading.value = false
      simUploadSuccess.value = true
    }
  }, 180)
}

// 9. Pagination Simulation
const simCurrentPage = ref(1)
const simRowsPerPage = ref(10)

// 10. Capability Matrix Simulation
const simCapabilities = ref([
  { id: 'view', label: 'View Records & Rosters', checked: true },
  { id: 'create', label: 'Create New Entries', checked: true },
  { id: 'edit', label: 'Modify Existing Data', checked: true },
  { id: 'deactivate', label: 'Deactivate / Archive Records', checked: false },
  { id: 'export', label: 'Export Data (CSV / PDF)', checked: true },
])

// 11. Generic Click Simulation
const simGenericClicks = ref(0)

// Helper: Determine control simulator type
const controlType = computed(() => {
  if (!selectedControl.value) return 'generic'
  const name = selectedControl.value.name.toLowerCase()
  const icon = (selectedControl.value.icon || '').toLowerCase()

  if (name.includes('refresh') || icon.includes('refresh')) return 'refresh'
  if (name.includes('grid') || name.includes('list') || name.includes('view toggle') || icon.includes('view-grid') || icon.includes('format-list')) return 'grid-list'
  if (name.includes('search') || icon.includes('magnify')) return 'search'
  if (name.includes('3-dots') || name.includes('action menu') || name.includes('row action') || icon.includes('dots-vertical')) return 'action-menu'
  if (name.includes('status') || icon.includes('toggle-switch')) return 'status'
  if (name.includes('create') || icon.includes('plus')) return 'create'
  if (name.includes('upload') || name.includes('photo') || name.includes('logo') || icon.includes('camera') || icon.includes('upload')) return 'upload'
  if (name.includes('address') || name.includes('cascading')) return 'cascading-address'
  if (name.includes('region')) return 'region-selector'
  if (name.includes('contact') || name.includes('phone')) return 'contact-input'
  if (name.includes('filter') || name.includes('dropdown') || name.includes('selector') || name.includes('parent')) return 'dropdown-filter'
  if (name.includes('page') || name.includes('pagination') || name.includes('items per page')) return 'pagination'
  if (name.includes('permission') || name.includes('matrix') || name.includes('capability') || name.includes('bulk select')) return 'permissions'
  return 'generic'
})

// Helper: Get best practice operator tip
const getControlTip = (ctrl: UIFeatureControl): string => {
  const type = controlType.value
  switch (type) {
    case 'refresh':
      return 'Best practice: Click Refresh after performing batch updates or when working across multiple browser tabs to guarantee the display reflects the latest backend database state.'
    case 'grid-list':
      return 'Pro-tip: Use Grid View on desktop monitors to easily inspect visual profile cards and logos. Switch to List View when reviewing high-volume tables or sorting multiple columns.'
    case 'search':
      return 'Search tip: The search bar operates in real-time. You can filter by first name, last name, email, or department code without needing to reload the page.'
    case 'action-menu':
      return 'Security tip: Actions in the 3-dots menu are governed by your assigned role permissions. If an action like "Deactivate" is dimmed, your account has view-only rights.'
    case 'status':
      return 'Governance rule: Inactivating an entry suspends login and active assignment immediately. The record is never permanently erased, preserving audit and historical integrity.'
    case 'create':
      return 'Form tip: All required fields are marked with an asterisk (*). The system will validate unique codes and email formats prior to enabling the Save button.'
    case 'upload':
      return 'Image guidelines: Supported file formats are PNG, JPEG, and WebP (maximum 5MB). High-resolution square dimensions (1:1 ratio) render best on ID badges and cards.'
    case 'cascading-address':
      return 'Geographic hierarchy rule: Always select the Province first. The system automatically restricts Municipality options to official Philippine Standard Geographic Code (PSGC) local government units, eliminating geographical typos.'
    case 'region-selector':
      return 'DOLE wage compliance rule: Mapping a branch to its official Philippine Region is mandatory. The HRIS payroll engine automatically enforces statutory minimum wage floors, overtime rates, and special regional non-working holiday compensation based on the Regional Tripartite Wage Board (RTWPB) order.'
    case 'contact-input':
      return 'Philippine phone formatting rule: Only valid Philippine digits are accepted. Numbers are automatically formatted to standard 09XX-XXX-XXXX syntax and normalized to international +63 (E.164) format in the database for automated branch notifications.'
    case 'dropdown-filter':
      return 'Filtering workflow: Selecting an Entity will automatically filter available Branches and Departments to only those belonging to the selected organization.'
    case 'pagination':
      return 'Navigation tip: For rapid processing, switch rows per page to 50 or 100. The total record counter dynamically reflects the filtered count.'
    case 'permissions':
      return 'Security principle: Follow the Principle of Least Privilege. Only grant edit/delete capabilities to designated administrators.'
    default:
      return 'Standard operation: Click or select this component as outlined in the step-by-step handbook procedure below.'
  }
}

// Open simulator
const openControlSimulator = (ctrl: UIFeatureControl) => {
  selectedControl.value = ctrl
  simMenuToast.value = ''
  simSyncSuccess.value = false
  simCreateSuccess.value = false
  simUploadSuccess.value = false
  simUploadProgress.value = 0
  simCreateModal.value = false
  simGenericClicks.value = 0

  const name = ctrl.name.toLowerCase()
  if (name.includes('address') || name.includes('cascading')) {
    simProvince.value = 'Davao del Sur'
    simCity.value = 'Digos City'
    simBarangay.value = 'Zone 1 (Poblacion)'
    simPostalCode.value = '8002'
  } else if (name.includes('region')) {
    simSelectedRegionCode.value = 'Region XI'
  } else if (name.includes('contact') || name.includes('phone')) {
    simPhoneRaw.value = '0917-889-1234'
  } else if (name.includes('department') || name.includes('dept')) {
    simSelectedFilter.value = 'Human Resource'
  } else if (name.includes('branch')) {
    simSelectedFilter.value = 'Head Office Branch'
  } else {
    simSelectedFilter.value = 'Goodlife Plans Inc.'
  }

  simModalOpen.value = true
}

// Jump to handbook step and highlight
const jumpToStep = (ctrl: UIFeatureControl) => {
  simModalOpen.value = false
  const steps = props.module.steps || []
  const found = steps.find(s =>
    s.title.toLowerCase().includes(ctrl.name.toLowerCase()) ||
    s.description.toLowerCase().includes(ctrl.name.toLowerCase()) ||
    (s.highlights && s.highlights.some(h => h.toLowerCase().includes(ctrl.name.toLowerCase())))
  )
  const targetStep = found ? found.number : 1

  setTimeout(() => {
    const el = document.getElementById(`step-${targetStep}`)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.add('step-flash-highlight')
      setTimeout(() => el.classList.remove('step-flash-highlight'), 2200)
    }
  }, 250)
}

const openLightbox = (step: StepItem) => {
  if (!step.image) return
  isLightboxZoomed.value = false
  lightboxImage.value = step.image
  lightboxTitle.value = `Step ${step.number}: ${step.title}`
  lightboxCaption.value = step.caption || step.description
  lightboxHighlights.value = step.highlights || []
  lightboxOpen.value = true
}

const copyStepLink = (stepNum: number) => {
  const url = `${window.location.origin}${window.location.pathname}#step-${stepNum}`
  navigator.clipboard.writeText(url)
  copiedStep.value = stepNum
  setTimeout(() => {
    if (copiedStep.value === stepNum) {
      copiedStep.value = null
    }
  }, 2000)
}

const calloutIcon = computed(() => {
  switch (props.module.callout?.type) {
    case 'warning': return 'mdi-alert-outline'
    case 'tip': return 'mdi-lightbulb-on-outline'
    case 'success': return 'mdi-check-circle-outline'
    default: return 'mdi-information-outline'
  }
})

const calloutColor = computed(() => {
  switch (props.module.callout?.type) {
    case 'warning': return 'warning'
    case 'tip': return 'success'
    case 'success': return 'success'
    default: return 'primary'
  }
})
</script>

<style scoped>
.leading-relaxed {
  line-height: 1.68;
}

.tracking-tight {
  letter-spacing: -0.015em;
}

.section-title {
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgb(var(--v-theme-primary));
}

.chapter-number-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.route-tag {
  background: rgba(var(--v-theme-primary), 0.09);
  color: rgb(var(--v-theme-primary));
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-family: monospace;
}

.step-card {
  transition: transform 0.15s ease-in-out;
}

.step-card:hover {
  transform: translateY(-2px);
}

.step-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary));
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.doc-table {
  background: transparent !important;
}

.doc-table th,
.doc-controls-table th {
  font-size: 0.75rem !important;
  font-weight: 700 !important;
  letter-spacing: 0.05em;
  background-color: rgba(var(--v-theme-surface), 0.75);
  color: rgb(var(--v-theme-on-surface));
  border-bottom: 1px solid rgba(var(--v-border-color), 0.15) !important;
}

.control-row {
  cursor: pointer;
  transition: all 0.18s ease;
}

.control-row:hover {
  background-color: rgba(var(--v-theme-primary), 0.06) !important;
}

.control-row:hover .control-avatar {
  transform: scale(1.12);
}

.control-avatar {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.control-row td {
  border-bottom: 1px solid rgba(var(--v-border-color), 0.08) !important;
}

.simulator-stage {
  background: rgba(var(--v-theme-surface-variant), 0.45);
  border: 1px solid rgba(var(--v-border-color), 0.18) !important;
}

.live-indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.7);
  animation: pulseDot 2s infinite;
}

@keyframes pulseDot {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(var(--v-theme-primary), 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0);
  }
}

.sim-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.sync-success-pill {
  background: rgba(var(--v-theme-success), 0.1);
  color: rgb(var(--v-theme-success));
  border-color: rgba(var(--v-theme-success), 0.25) !important;
}

.upload-dropzone {
  border: 2px dashed rgba(var(--v-border-color), 0.35) !important;
  transition: all 0.2s ease;
}

.upload-dropzone:hover {
  border-color: rgb(var(--v-theme-primary)) !important;
  background-color: rgba(var(--v-theme-primary), 0.04) !important;
}

.hover-bg:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

.letter-spacing-wide {
  letter-spacing: 0.05em;
}

@keyframes flashHighlight {
  0% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0.8);
    border-color: rgb(var(--v-theme-primary));
  }
  50% {
    box-shadow: 0 0 0 8px rgba(var(--v-theme-primary), 0.3);
    border-color: rgb(var(--v-theme-primary));
  }
  100% {
    box-shadow: 0 0 0 0 rgba(var(--v-theme-primary), 0);
  }
}

.step-flash-highlight {
  animation: flashHighlight 1.8s ease;
  border-color: rgb(var(--v-theme-primary)) !important;
}

.max-h-180 {
  max-height: 180px;
}

.field-name-code {
  background: rgba(var(--v-theme-surface), 0.8);
  padding: 3px 7px;
  border-radius: 5px;
  font-size: 0.8125rem;
  font-family: monospace;
}

.font-mono {
  font-family: monospace;
}

.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  border-radius: 6px;
  background-color: rgba(var(--v-theme-primary), 0.12);
  color: rgb(var(--v-theme-primary));
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.visual-step-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step-image-frame {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step-image-frame:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.step-image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.step-image-frame:hover .step-image-overlay {
  opacity: 1;
}

.window-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

@media (max-width: 600px) {
  .step-screenshot-img {
    max-height: 280px !important;
  }
  .chapter-number-badge {
    width: 32px !important;
    height: 32px !important;
    font-size: 0.95rem !important;
    border-radius: 8px !important;
  }
}
</style>
