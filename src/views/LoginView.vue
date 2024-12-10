<script setup lang="ts">
import TheLogin from '@/components/TheLogin.vue';

defineOptions({ name: 'LoginView' });
</script>

<template>
  <section class="section">
    <h1 class="section__header">
      This is a login page
    </h1>
    <TheLogin />
  </section>
</template>
