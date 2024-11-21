<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'TheBreadcrumb' })

const route = useRoute()

const breadcrumb = computed(() => route.meta.breadcrumb)
</script>

<template>
  <nav v-if="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li>
        {{ breadcrumb.label }}
      </li>
    </ol>
  </nav>
</template>
