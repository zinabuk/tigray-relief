// import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
const OPEN_ROUTES = [
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
        component: () => import('@/views/ContactUs.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'team',
        name: 'team',
        component: () => import('@/views/TeamView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'donate',
        name: 'donate',
        component: () => import('@/views/DonateView.vue'),
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
        component: () => import('@/views/AboutView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'service',
        name: 'services',
        component: () => import('@/views/ServicesView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'service/:title',
        name: 'service-detail',
        props: true,
        component: () => import('@/views/ServiceDetail.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('@/views/BlogsView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'jobs',
        name: 'jobs',
        component: () => import('@/views/JobList.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'blogs/:title',
        name: 'blog-detail',
        props: true,
        component: () => import('@/views/BlogDetail.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'tenders',
        name: 'tenders',
        component: () => import('@/views/TenderView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'partinership',
        name: 'partners',
        component: () => import('@/views/PartnersView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'gallery',
        name: 'gallery',
        component: () => import('@/views/GalleryView.vue'),
        meta: {
          requiresAuth: false
        }
      },

      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/forgotPassword.vue'),
        meta: {
          requiresAuth: false
        }
      }
    ]
  },

  {
    path: '/Login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }
]
export default OPEN_ROUTES
