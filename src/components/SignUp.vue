<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../plugins/supabase';

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const signupError = ref<string | null>(null);
const router = useRouter();

async function handleSignup() {
  if (password.value !== confirmPassword.value) {
    signupError.value = 'Passwords do not match';
    return;
  }

  try {
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (error)
      throw error;

    router.push('/login');
  }
  catch (error: unknown) {
    const typedError = error as Error;
    signupError.value = typedError.message;
  }
}
</script>

<template>
  <form @submit.prevent="handleSignup">
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <input v-model="confirmPassword" type="password" placeholder="Confirm Password">
    <button type="submit">
      Signup
    </button>
    <div v-if="signupError">
      {{ signupError }}
    </div>
  </form>
</template>
