import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards/auth.guard'
import { titleGuard } from './guards/meta.guard'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition)
      return savedPosition

    return { top: 0 }
  },

  routes,
})

// Register guards
router.beforeEach((to, from, next) => {
  authGuard(to, from, next)
  titleGuard(to)
})

export default router
