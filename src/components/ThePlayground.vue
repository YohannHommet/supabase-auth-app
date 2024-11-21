<script setup lang="ts">
import { useFetch } from '@/composables/useFetch'
import { onBeforeMount, onMounted, ref } from 'vue'
import { supabase } from '../plugins/supabase'
import UserCardSkeleton from './UserCardSkeleton.vue'

interface Country {
  id: number
  name: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  website: string
}

defineOptions({
  name: 'ThePlayground',
})

const countries = ref<Country[]>([])
const users = ref<User[]>([])
const usersHasError = ref<boolean>(false)
const usersErrorMessage = ref<string | null>(null)
const isFetchingUsers = ref<boolean>(false)

onBeforeMount(async () => {
  const { hasError, errorMessage, data, isLoading } = await useFetch<User[]>({
    url: 'https://jsonplaceholder.typicode.com/users',
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  })

  users.value = data.value ?? []
  isFetchingUsers.value = isLoading.value
  usersHasError.value = hasError.value
  usersErrorMessage.value = errorMessage.value
})

async function getCountries() {
  const { data, error } = await supabase.from('countries').select()

  if (error)
    throw error

  countries.value = data
}

onMounted(() => {
  getCountries()
})
</script>

<template>
  <div>
    <h2>Countries from Supabase</h2>
    <ul>
      <li v-for="country in countries" :key="country.id">
        {{ country.name }}
      </li>
    </ul>
  </div>
  <div>
    <h2>Users</h2>
    <div class="user-cards">
      <template v-if="isFetchingUsers">
        <UserCardSkeleton v-for="n in 6" :key="n" />
      </template>
      <template v-else-if="usersHasError">
        <p>Error fetching users: {{ usersErrorMessage }}</p>
      </template>
      <template v-else>
        <div v-for="user in users" :key="user.id" class="user-card">
          <h3>{{ user.name }}</h3>
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> <a :href="`mailto:${user.email}`">{{ user.email }}</a></p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Website:</strong> <a :href="`http://${user.website}`" target="_blank" rel="noopener noreferrer">{{ user.website }}</a></p>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.user-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding-block: 8px;
  width: 100%;
}

.user-card {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    background-color 0.5s;
  width: 100%;
}

.user-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border-color: var(--color-border-hover);
}

.user-card h3 {
  margin-top: 0;
  color: var(--color-heading);
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.user-card p {
  color: var(--color-text);
  margin-bottom: 8px;
}

.user-card a {
  text-decoration: none;
  transition: color 0.3s;
}

.user-card a:hover {
  text-decoration: underline;
}

/* Tablet (2 columns) */
@media (min-width: 768px) and (max-width: 1023px) {
  .user-cards {
    grid-template-columns: repeat(2, 1fr);
    padding-block: 16px;
    gap: 24px;
  }
}

/* Desktop (3 columns) */
@media (min-width: 1024px) {
  .user-cards {
    grid-template-columns: repeat(3, 1fr);
    padding-block: 24px;
    gap: 32px;
  }
}

/* Large screens */
@media (min-width: 1440px) {
  .user-cards {
    padding-block: 24px;
  }
}
</style>
