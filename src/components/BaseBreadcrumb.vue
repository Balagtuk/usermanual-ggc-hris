<template>
  <nav class="breadcrumb-nav mb-4" aria-label="Breadcrumb">
    <v-breadcrumbs :items="formattedBreadcrumbs" density="compact" class="pa-0 text-caption">
      <template #divider>
        <v-icon size="14" color="grey">mdi-chevron-right</v-icon>
      </template>
      <template #title="{ item }">
        <span
          class="transition-all"
          :class="item.disabled ? 'text-primary font-weight-semibold' : 'text-medium-emphasis font-weight-regular'"
        >
          {{ item.title }}
        </span>
      </template>
    </v-breadcrumbs>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface BreadcrumbItem {
  title?: string
  text?: string
  disabled?: boolean
  href?: string
}

const props = defineProps<{
  title?: string
  subtitle?: string
  breadcrumbs: BreadcrumbItem[]
}>()

const formattedBreadcrumbs = computed(() => {
  return props.breadcrumbs.map((b) => ({
    title: b.title || b.text || '',
    disabled: b.disabled,
    href: b.href,
  }))
})
</script>

<style scoped>
.breadcrumb-nav {
  display: flex;
  align-items: center;
}

:deep(.v-breadcrumbs) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

:deep(.v-breadcrumbs-item) {
  font-size: 0.8125rem;
}
</style>
