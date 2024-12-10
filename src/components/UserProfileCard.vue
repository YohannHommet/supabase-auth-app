<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
import { computed } from 'vue';

interface Props {
  user: User | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  logout: [];
}>();

const formattedCreatedAt = computed(() => {
  return props.user?.created_at
    ? new Date(props.user.created_at).toLocaleDateString()
    : '-';
});

const formattedLastSignIn = computed(() => {
  return props.user?.last_sign_in_at
    ? new Date(props.user.last_sign_in_at).toLocaleDateString()
    : '-';
});
</script>

<template>
  <div class="profile__card">
    <div class="profile__header">
      <div class="profile__avatar">
        {{ user?.email?.[0].toUpperCase() }}
      </div>
      <p class="profile__email">
        {{ user?.email }}
      </p>
    </div>

    <div class="profile__details">
      <div class="profile__detail-list">
        <div class="profile__detail-item">
          <span class="profile__detail-label">User ID</span>
          <span class="profile__detail-value">{{ user?.id || '-' }}</span>
        </div>
        <div class="profile__detail-item">
          <span class="profile__detail-label">Email Status</span>
          <span class="profile__status" :class="{ 'profile__status--verified': user?.email_confirmed_at }">
            {{ user?.email_confirmed_at ? 'Verified' : 'Unverified' }}
          </span>
        </div>
        <div class="profile__detail-item">
          <span class="profile__detail-label">Account Created</span>
          <span class="profile__detail-value">{{ formattedCreatedAt }}</span>
        </div>
        <div class="profile__detail-item">
          <span class="profile__detail-label">Last Sign In</span>
          <span class="profile__detail-value">{{ formattedLastSignIn }}</span>
        </div>
        <div class="profile__detail-item">
          <span class="profile__detail-label">Role</span>
          <span class="profile__detail-value">{{ user?.role || 'User' }}</span>
        </div>
      </div>
    </div>

    <div class="profile__actions">
      <button class="profile__button profile__button--danger" @click="emit('logout')">
        Sign Out
      </button>
    </div>
  </div>
</template>

<style scoped>
.profile__card {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 600px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
}

.profile__card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #ef6868, #31b5ac, #31a8c2);
  opacity: 0.09;
  z-index: -1;
}

.profile__header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.profile__avatar {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 2.25rem;
  color: white;
  margin: 0 auto 1.25rem;
  box-shadow: 0 8px 16px rgba(99, 102, 241, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  position: relative;
}

.profile__avatar::after {
  content: '';
  position: absolute;
  inset: -3px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
  filter: blur(12px);
}

.profile__avatar:hover {
  box-shadow: 0 12px 24px rgba(99, 102, 241, 0.3);
}

.profile__avatar:hover::after {
  opacity: 0.6;
}

.profile__email {
  color: var(--color-text);
  opacity: 0.9;
  margin-top: 0.75rem;
  font-size: 1.1rem;
}

.profile__details {
  margin: 2.5rem 0;
}

.profile__detail-list {
  display: grid;
  gap: 1rem;
}

.profile__detail-item {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
}

.profile__detail-label {
  color: var(--color-text);
  opacity: 0.8;
  font-size: 0.95rem;
  font-weight: 500;
}

.profile__detail-value {
  font-weight: 600;
  letter-spacing: 0.01em;
}

.profile__status {
  padding: 0.35rem 1rem;
  border-radius: 2rem;
  font-size: 0.875rem;
  background: rgba(var(--color-background-rgb), 0.3);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.profile__status--verified {
  background: linear-gradient(135deg, #10b981, #04825a);
  color: white;
  border: none;
}

.profile__actions {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.profile__button {
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.profile__button--danger {
  background: linear-gradient(135deg, #ef4444, #ca2222);
  box-shadow: 0 4px 12px rgba(220, 38, 38, 0.2);
}

.profile__button--danger:hover {
  background: linear-gradient(135deg, #dc2626, #ac1a1a);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
}

.profile__button--danger:active {
  transform: translateY(0);
}

@media (max-width: 640px) {
  .profile {
    padding: 1rem;
  }

  .profile__card {
    padding: 1.75rem;
  }

  .profile__detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
