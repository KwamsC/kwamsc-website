import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/**
 * Route guard to protect admin routes
 * Only allows access if user is authenticated
 */
export function requireAuth(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const authStore = useAuthStore()

  // Initialize auth state if not already done
  if (!authStore.user.loggedIn) {
    authStore.init()
  }

  if (authStore.user.loggedIn) {
    next()
  } else {
    // Redirect to login page with return URL
    next({
      name: 'login',
      query: { returnTo: to.fullPath }
    })
  }
}
