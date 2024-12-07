<script setup lang="ts">
import type { NavLink } from '@/config/navigation';
import { RouterLink } from 'vue-router';

export interface INavLinkProps {
  link: NavLink;
}

defineOptions({ name: 'TheNavigationLink' });
defineProps<INavLinkProps>();
</script>

<template>
  <RouterLink
    :to="link.to"
    @click="link.action && link.action()"
  >
    {{ link.label }}
  </routerlink>
</template>

<style scoped>
a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

a:first-of-type {
  border: 0;
}

a.router-link-exact-active {
  color: var(--color-text);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
