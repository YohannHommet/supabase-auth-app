import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'

export async function authGuard(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore()
  await userStore.getUser()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({
      path: '/login',
      query: { redirectTo: to.fullPath },
    })
  }

  next()
}
