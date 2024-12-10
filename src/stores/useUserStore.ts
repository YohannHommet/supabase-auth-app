import type { User } from '@supabase/supabase-js';
import { supabase } from '@/plugins/supabase';
import router from '@/router';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  // State
  const user = ref<User | null>(null);
  const loading = ref(false);
  const initialized = ref(false);

  // Getters
  const isAuthenticated = computed(() => !!user.value);

  // Actions
  const getUser = async () => {
    if (initialized.value)
      return user.value;

    try {
      loading.value = true;
      const { data: { user: userData }, error } = await supabase.auth.getUser();

      if (error)
        throw error;

      user.value = userData;
      return userData;
    }
    catch (error: unknown) {
      const typedError = error as Error;
      user.value = null;
      throw typedError;
    }
    finally {
      loading.value = false;
      initialized.value = true;
    }
  };

  const logout = async () => {
    try {
      loading.value = true;
      await supabase.auth.signOut();
      user.value = null;
      router.push('/home');
    }
    catch (error: unknown) {
      const typedError = error as Error;
      throw typedError;
    }
    finally {
      loading.value = false;
    }
  };

  // Initialize user on auth state change
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session && session.user ? session.user : null;
  });

  return {
    // State
    user,
    loading,
    initialized,
    // Getters
    isAuthenticated,
    // Actions
    getUser,
    logout,
  };
});
