import type { RouteLocationRaw } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

export interface NavLink {
  to: RouteLocationRaw
  label: string
  requiresAuth?: boolean
  requiresGuest?: boolean
  action?: () => void
}

export const navigationLinks: NavLink[] = [
  {
    to: '/',
    label: 'Home',
  },
  {
    to: '/playground',
    label: 'Playground',
  },
  {
    to: '/profile',
    label: 'Profile',
    requiresAuth: true,
  },
  {
    to: '/about',
    label: 'About',
  },
  {
    to: '/login',
    label: 'Login',
    requiresGuest: true,
  },
  {
    to: '/signup',
    label: 'Signup',
    requiresGuest: true,
  },
]

// Separate logout link since it's special (has an action)
export const logoutLink: NavLink = {
  to: '/home',
  label: 'Logout',
  requiresAuth: true,
  action: () => useUserStore().logout(),
}
