import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export function titleGuard(to: RouteLocationNormalized) {
  if (to.meta.title) {
    document.title = `${to.meta.title} - SupAuth`;
  }
}

export function layoutGuard(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  if (to.meta.layout) {
    next();
  }

  next();
}
