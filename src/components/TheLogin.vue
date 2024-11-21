<!-- src/components/Login.vue -->
<script setup lang="ts">
import { githubStrategy, magicLinkStrategy, passwordStrategy, useAuth } from '@/composables/useAuth'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const { loginError, handleLogin } = useAuth()
</script>

<template>
  <form @submit.prevent="() => handleLogin(passwordStrategy, { email, password })">
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button type="submit">
      Login
    </button>
    <div v-if="loginError">
      {{ loginError }}
    </div>
  </form>
  <!-- Github login -->
  <button @click="() => handleLogin(githubStrategy, {})">
    Login with Github
  </button>
  <!-- Magic link login -->
  <button @click="() => handleLogin(magicLinkStrategy, { email })">
    Login with Magic Link
  </button>
</template>
