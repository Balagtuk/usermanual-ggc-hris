<template>
  <article :id="module.id" class="module-wrapper mb-8">
    <!-- Top Minimal Breadcrumb -->
    <BaseBreadcrumb
      :title="module.title"
      :breadcrumbs="breadcrumbs"
    />

    <!-- Main Module Documentation Card (Borderless) -->
    <v-card class="module-card pa-6 pa-md-8 rounded-lg bg-surface" elevation="0">
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
              <code class="route-tag">{{ module.route }}</code>
              <v-chip size="x-small" color="secondary" variant="tonal" class="font-weight-medium">
                {{ module.category }}
              </v-chip>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-0">
              {{ module.description }}
            </p>
          </div>
        </div>

        <!-- Permissions & Page Tag -->
        <div class="d-flex flex-column align-sm-end align-start ga-2">
          <span class="text-caption font-weight-semibold text-primary">
            Chapter {{ module.num }} of 10
          </span>
          <div class="d-flex flex-wrap ga-1">
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

      <!-- Interface Screenshot Visual Reference -->
      <section class="mb-8">
        <ModuleScreenshot :module="module" />
      </section>

      <!-- Step-by-Step Operating Procedure -->
      <section v-if="module.steps && module.steps.length > 0" class="mb-8">
        <h2 class="section-title mb-3">
          Step-by-Step Procedure
        </h2>
        <v-row dense>
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

      <!-- Administrative Best Practices / Callout Alert -->
      <v-alert
        v-if="module.callout"
        color="primary"
        variant="tonal"
        class="rounded-lg mt-4"
        density="comfortable"
      >
        <template #title>
          <span class="font-weight-bold text-subtitle-2">{{ module.callout.title }}</span>
        </template>
        <div class="text-body-2 mt-1">
          {{ module.callout.text }}
        </div>
      </v-alert>
    </v-card>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ModuleDoc } from '@/data/manualData'
import ModuleScreenshot from '@/components/ModuleScreenshot.vue'
import BaseBreadcrumb from '@/components/BaseBreadcrumb.vue'

const props = defineProps<{
  module: ModuleDoc
}>()

const breadcrumbs = computed(() => [
  { text: 'Manual', disabled: false },
  { text: props.module.category, disabled: false },
  { text: props.module.title, disabled: true },
])
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

.doc-table th {
  font-size: 0.8125rem;
  font-weight: 600;
  background-color: rgba(var(--v-theme-surface), 0.7);
  color: rgb(var(--v-theme-on-surface));
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
</style>
