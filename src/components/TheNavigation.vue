<script setup lang="ts">
import { logoutLink, navigationLinks } from '@/config/navigation'
import { useUserStore } from '@/stores/useUserStore'
import { computed } from 'vue'
import HelloWorld from './TheHello.vue'
import NavLink from './TheNavigationLink.vue'

const userStore = useUserStore()

const visibleLinks = computed(() => {
  return navigationLinks.filter((link) => {
    if (link.requiresAuth && !userStore.isAuthenticated)
      return false

    if (link.requiresGuest && userStore.isAuthenticated)
      return false

    return true
  })
})
</script>

<template>
  <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50">

  <div class="wrapper">
    <HelloWorld msg="Welcome to the Supabase Auth App !" />

    <nav>
      <NavLink
        v-for="link in visibleLinks"
        :key="link.to.toString()"
        :link="link"
      />
      <NavLink
        v-if="userStore.isAuthenticated"
        :link="logoutLink"
      />
    </nav>
  </div>
</template>

<style scoped>
.logo {
  display: block;
}

nav {
  width: 100%;
  font-size: 14px;
  text-align: right;
}

@media (min-width: 1024px) {
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
  }

  nav {
    text-align: right;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 0;
  }
}
</style>
