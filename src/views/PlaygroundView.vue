<script setup lang="ts">
import ThePlayground from '@/components/ThePlayground.vue'

defineOptions({ name: 'PlaygroundView' })
</script>

<template>
  <section class="section">
    <h1 class="section__header">
      This is the playground page
    </h1>
    <ThePlayground />
  </section>
</template>
