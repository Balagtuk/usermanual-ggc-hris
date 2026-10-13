<template>
  <section id="overview" class="mb-8">
    <!-- Hero Banner -->
    <v-card
      class="hero-card pa-6 pa-md-8 mb-6 rounded-lg"
      elevation="0"
      color="primary"
    >
      <div class="d-flex flex-wrap align-center justify-space-between ga-3 mb-4">
        <div>
          <v-chip size="small" color="white" variant="outlined" class="mr-2 font-weight-medium">
            Version 2.0
          </v-chip>
          <v-chip size="small" color="white" variant="tonal" class="mr-2">
            Standard Operating Procedure
          </v-chip>
          <v-chip size="small" color="amber" variant="flat" class="font-weight-bold">
            Vuetify 3 Edition
          </v-chip>
        </div>

        <div class="text-caption opacity-80">
          Admin Settings &bull; 9 Core Modules
        </div>
      </div>

      <h1 class="text-h4 text-md-h3 font-weight-bold mb-3">
        GGC HRIS Admin Settings Manual
      </h1>

      <p class="text-body-1 opacity-90 max-width-text mb-6">
        Comprehensive interactive operations manual for system administrators managing enterprise organizational hierarchies, user accounts, and security access controls.
      </p>

      <div class="d-flex flex-wrap ga-2">
        <v-btn
          color="white"
          variant="flat"
          class="text-primary font-weight-bold text-none"
          prepend-icon="mdi-account-multiple"
          @click="$emit('jump', 'mod-user')"
        >
          User Management
        </v-btn>
        <v-btn
          color="white"
          variant="outlined"
          class="text-none font-weight-bold"
          prepend-icon="mdi-shield-key-outline"
          @click="$emit('jump', 'mod-role-permissions')"
        >
          Role Permissions Matrix
        </v-btn>
      </div>
    </v-card>

    <!-- Architecture Callout & Hierarchy Chain -->
    <v-card class="pa-6 rounded-lg mb-6" elevation="0">
      <div class="d-flex align-center mb-4">
        <v-avatar color="info" variant="tonal" size="42" class="mr-3">
          <v-icon icon="mdi-information" size="24" />
        </v-avatar>
        <div>
          <h2 class="text-h6 font-weight-bold">Hierarchy Rule of Thumb</h2>
          <p class="text-body-2 text-medium-emphasis">
            Always configure structures in parent-to-child sequence before provisioning user accounts:
          </p>
        </div>
      </div>

      <!-- Flow visualizer -->
      <div class="hierarchy-flow pa-4 rounded-lg bg-surface-variant d-flex flex-wrap align-center ga-2 justify-center">
        <v-chip color="primary" variant="flat" class="font-weight-bold" prepend-icon="mdi-domain">
          1. Entity
        </v-chip>
        <v-icon icon="mdi-arrow-right" size="18" class="text-medium-emphasis" />

        <v-chip color="primary" variant="tonal" class="font-weight-medium" prepend-icon="mdi-storefront-outline">
          2. Branch
        </v-chip>
        <v-icon icon="mdi-arrow-right" size="18" class="text-medium-emphasis" />

        <v-chip color="primary" variant="tonal" class="font-weight-medium" prepend-icon="mdi-account-group-outline">
          3. Department
        </v-chip>
        <v-icon icon="mdi-arrow-right" size="18" class="text-medium-emphasis" />

        <v-chip color="primary" variant="tonal" class="font-weight-medium" prepend-icon="mdi-sitemap-outline">
          4. Division
        </v-chip>
        <v-icon icon="mdi-arrow-right" size="18" class="text-medium-emphasis" />

        <v-chip color="primary" variant="tonal" class="font-weight-medium" prepend-icon="mdi-podium-gold">
          5. Position
        </v-chip>
        <v-icon icon="mdi-arrow-right" size="18" class="text-medium-emphasis" />

        <v-chip color="primary" variant="tonal" class="font-weight-medium" prepend-icon="mdi-badge-account-horizontal-outline">
          6. Job Title
        </v-chip>

        <span class="mx-2 text-caption font-weight-bold text-uppercase text-medium-emphasis">Then</span>

        <v-chip color="secondary" variant="flat" class="font-weight-bold" prepend-icon="mdi-matrix">
          Role Permissions
        </v-chip>
        <v-icon icon="mdi-arrow-right" size="18" class="text-medium-emphasis" />

        <v-chip color="success" variant="flat" class="font-weight-bold" prepend-icon="mdi-account-check">
          Individual Users
        </v-chip>
      </div>
    </v-card>
  </section>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'jump', targetId: string): void
}>()
</script>

<style scoped>
.max-width-text {
  max-width: 760px;
}
.hero-card {
  background: linear-gradient(135deg, #1867c0 0%, #0d47a1 100%);
}
</style>
