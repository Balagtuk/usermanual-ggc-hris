<template>
  <v-footer class="border-t py-6 bg-surface text-center d-flex flex-column ga-2 mt-8">
    <div class="d-flex align-center justify-center ga-3 flex-wrap">
      <span class="text-caption text-medium-emphasis">
        &copy; {{ currentYear }} GGC HRIS &bull; Internal Administration Manual
      </span>
      <v-chip size="x-small" color="primary" variant="flat">
        Confidential
      </v-chip>
      <v-chip size="x-small" color="secondary" variant="outlined">
        Vuetify 3
      </v-chip>
    </div>
    <div class="text-caption text-disabled">
      Designed for enterprise human resource information systems operations.
    </div>
  </v-footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
