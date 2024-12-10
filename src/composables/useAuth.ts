import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../plugins/supabase';

export interface LoginStrategy {
  login: (params: LoginStrategyParams) => Promise<void>;
}

export interface LoginStrategyParams {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const loginError = ref<string | null>(null);

  const handleLogin = async (strategy: LoginStrategy, params: Partial<LoginStrategyParams>) => {
    try {
      await strategy.login(params as LoginStrategyParams);
      router.push('/profile');
    }
    catch (error: unknown) {
      const typedError = error as Error;
      loginError.value = typedError.message || 'An unknown error occurred';
    }
  };

  return {
    loginError,
    handleLogin,
  };
}

// Login strategies
export const passwordStrategy: LoginStrategy = {
  login: async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error)
      throw error;
  },
};

export const githubStrategy: LoginStrategy = {
  login: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error)
      throw error;
  },
};

export const magicLinkStrategy: LoginStrategy = {
  login: async ({ email }: Partial<LoginStrategyParams>) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email ?? '',
    });

    if (error)
      throw error;
  },
};
