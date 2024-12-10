<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
import UserProfileCard from '@/components/UserProfileCard.vue';
import { useUserStore } from '@/stores/useUserStore';
import { onMounted, ref } from 'vue';

defineOptions({ name: 'UserProfileView' });

const connectedUser = ref<User | null>(null);
const handleLogout = async () => await useUserStore().logout();

onMounted(async () => connectedUser.value = await useUserStore().getUser());
</script>

<template>
  <section class="profile">
    <UserProfileCard :user="connectedUser" @logout="handleLogout" />
  </section>
</template>

<style scoped>
.profile {
  display: grid;
  place-items: center;
  min-height: 100%;
  padding-block: 2rem;
  position: relative;
}
</style>
