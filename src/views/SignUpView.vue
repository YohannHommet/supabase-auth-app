<script setup lang="ts">
import TheSignUp from '@/components/SignUp.vue';

defineOptions({ name: 'SignUpView' });
</script>

<template>
  <section class="section">
    <h1 class="section__header">
      This is a signup page
    </h1>
    <TheSignUp />
  </section>
</template>
