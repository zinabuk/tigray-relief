import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import PROTECTED_ROUTES from './protected'
import OPEN_ROUTES from './open'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...OPEN_ROUTES,
    ...PROTECTED_ROUTES,

    {
      path: '/404resource/:resource',
      name: '404resource',
      component: () => import('@/views/NotFound.vue'),
      props: true,
      meta: {
        requiresAuth: false
      }
    },

    // {
    //   path: '/network-error',
    //   name: 'NetworkError',
    //   component: () => import('../views/NetworkError.vue'),
    //   meta: {
    //     requiresAuth: false
    //   }
    // },

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        requiresAuth: false
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash
      }
    } else {
      return {
        top: 0,
        left: 0
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  const { requiresAuth, role } = to.meta
  const { isAuthenticated, expiryDate } = useAuthStore()
  if (!requiresAuth) {
    // If the route doesn't require authentication, allow access
    // if (isAuthenticated()) {
    //   return next({ name: 'dashboard' }) //default route
    // }
    // Otherwise, allow access to the route
    return next()
  }
  // If the route requires authentication, check if the user is authenticated
  if (isAuthenticated()) {
    // If the user is authenticated, check if the user has the necessary permissions
    const { userHasPermission } = useAuthStore()
    const hasPermission = userHasPermission(role)
    // Replace this with your authorization logic
    if (expiryDate()) {
      // logOut()
      return next({ name: 'login' })
    }
    if (hasPermission) {
      // If the user has the necessary permissions, allow access
      // if (role === 'admin') {
      //   router.push({ name: 'admin-home' })
      // } else {
      //   router.push({ name: 'staff-home' })
      // }
      return next()
    } else {
      // If the user doesn't have the necessary permissions, redirect to an error page or show an error message
      return next({ name: 'login' }) // Replace 'Unauthorized' with the name of your unauthorized access route
    }
  }

  // If the user is not authenticated, redirect to the login page
  return next({ name: 'login', params: { nextUrl: to.path } })
})

export default router
