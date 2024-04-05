import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',

      component: () => import('@/views/OpenMaster.vue'),
      meta: {
        requiresAuth: false
      },

      children: [
        {
          path: '',
          component: HomeView,
          name: 'home'
        },
        {
          path: 'contact',
          name: 'contact',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/ContactUs.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'team',
          name: 'team',
          component: () => import('../views/TeamView.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'donate',
          name: 'donate',
          component: () => import('../views/DonateView.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'service',
          name: 'services',
          component: () => import('../views/ServicesView.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'blogs',
          name: 'blogs',
          component: () => import('../views/BlogsView.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'gallery',
          name: 'gallery',
          component: () => import('../views/GalleryView.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/LoginView.vue'),
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/forgotPassword.vue'),
          meta: {
            requiresAuth: false
          }
        }
      ]
      // children: [
      //   {
      //     path: 'projects',
      //     name: 'projects',
      //     component: () => '../views/HomeView.vue'
      //   },

      //   {
      //     path: 'services',
      //     name: 'blog',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'services',
      //     name: 'donate',
      //     component: () => '../views/HomeView.vue'
      //   },

      //   {
      //     path: 'services',
      //     name: 'join-us',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'services',
      //     name: 'plan',
      //     component: () => '../views/HomeView.vue'
      //   },

      //   {
      //     path: 'services',
      //     name: 'testimonials',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'services',
      //     name: 'operational',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'services',
      //     name: 'supporting',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'services',
      //     name: 'careers',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'services',
      //     name: 'volunteer-opportunities',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'services',
      //     name: 'internship-program',
      //     component: () => '../views/HomeView.vue'
      //   },
      //   {
      //     path: 'contact',
      //     name: 'contact',
      //     component: () => '../views/ContactUs.vue'
      //   }
      // ]
    },

    {
      path: '/rest',
      name: 'dashboard',
      component: () => import('../views/protected/ProtectedMaster.vue'),
      meta: {
        requiresAuth: true,
        role: 'admin'
      },
      children: [
        {
          path: '',
          component: () => import('@/components/protected/AdminHome.vue'),
          name: 'admin-home'
        },
        {
          path: 'blogs',
          component: () => import('@/views/protected/BlogsView.vue'),
          name: 'admin-blogs'
        },
        {
          path: 'blogs/add',
          component: () => import('@/views/protected/AddBlog.vue'),
          name: 'admin-add-blogs'
        },
        {
          path: 'services',
          component: () => import('@/views/protected/ServicesView.vue'),
          name: 'admin-services'
        },
        {
          path: 'team',
          component: () => import('@/views/protected/TeamsView.vue'),
          name: 'team'
        },
        {
          path: 'donations',
          component: () => import('@/views/protected/DonationView.vue'),
          name: 'donations'
        },
        {
          path: 'messages',
          component: () => import('@/views/protected/ContactUs.vue'),
          name: 'messages'
        }
      ]
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: () => import('../views/NetworkError.vue'),
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
    const hasPermission = userHasPermission(role) // Replace this with your authorization logic
    if (expiryDate()) {
      // logOut()
      return next({ name: 'login' })
    }
    if (hasPermission) {
      // If the user has the necessary permissions, allow access
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
