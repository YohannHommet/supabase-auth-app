<script setup lang="ts">
defineOptions({ name: 'UserCardSkeleton' })
</script>

<template>
  <div class="user-card skeleton">
    <div class="skeleton-title" />
    <div class="skeleton-text" />
    <div class="skeleton-text" />
    <div class="skeleton-text" />
    <div class="skeleton-text" />
  </div>
</template>

<style scoped>
.skeleton {
  animation: loading 2s infinite;
}

.skeleton-title {
  height: 24px;
  background: #cfcfcf;
  margin-bottom: 15px;
  border-radius: 4px;
  width: 60%;
}

.skeleton-text {
  height: 16px;
  background: #d2d2d2;
  margin-bottom: 10px;
  border-radius: 4px;
  width: 100%;
}

@keyframes loading {
  0% {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0.5;
  }
}
</style>
