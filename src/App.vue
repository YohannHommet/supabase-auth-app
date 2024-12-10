<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheBreadcrumb from './components/TheBreadcrumb.vue';
import TheNavigation from './components/TheNavigation.vue';
</script>

<template>
  <header>
    <TheNavigation />
  </header>
  <section class="breadcrumb">
    <TheBreadcrumb />
  </section>

  <main class="main" role="main">
    <RouterView />
  </main>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main {
  margin-bottom: auto;
}
</style>
