import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home',
      layout: 'default',
      breadcrumb: {
        label: 'Home',
      },
    },
  },
  {
    path: '/playground',
    name: 'playground',
    component: () => import('@/views/PlaygroundView.vue'),
    meta: {
      title: 'Playground',
      layout: 'default',
      breadcrumb: {
        label: 'Playground',
      },
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      requiresAuth: false,
      title: 'Login',
      layout: 'auth',
    },
    beforeEnter(to, _from, next) {
      if (useUserStore().isAuthenticated)
        next({ name: 'home' })
      else
        next()
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/SignUpView.vue'),
    meta: {
      requiresAuth: false,
      title: 'Sign Up',
      layout: 'auth',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/UserProfileView.vue'),
    meta: {
      requiresAuth: true,
      title: 'Profile',
      layout: 'default',
      breadcrumb: {
        label: 'Profile',
      },
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      requiresAuth: false,
      title: 'About',
      layout: 'default',
      breadcrumb: {
        label: 'About',
      },
    },
  },
  // Add a catch-all route for non-existing routes
  {
    path: '/:catchAll(.*)',
    name: 'catch-all',
    component: () => import('@/views/HomeView.vue'),
  },
]
