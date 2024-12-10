<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineOptions({ name: 'TheBreadcrumb' });

const route = useRoute();

const breadcrumb = computed(() => route.meta.breadcrumb);
</script>

<template>
  <nav v-if="breadcrumb && breadcrumb.parent" aria-label="Breadcrumb" class="breadcrumb">
    <router-link :to="breadcrumb.parent.path">
      {{ breadcrumb.parent.label }}
    </router-link>
    <span>/</span>
    <span>{{ breadcrumb.label }}</span>
  </nav>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  color: var(--color-text-muted);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  gap: 0.5rem;
  font-size: 0.8rem;

  a {
    color: var(--color-text-muted);
    text-decoration: none;
  }
}
</style>
