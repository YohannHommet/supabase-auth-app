import { createRouter, createWebHistory } from 'vue-router';
import { authGuard } from './guards/auth.guard';
import { titleGuard } from './guards/meta.guard';
import { routes } from './routes/routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

// Register guards
router.beforeEach((to, from, next) => {
  authGuard(to, from, next);
  titleGuard(to);
});

export default router;
