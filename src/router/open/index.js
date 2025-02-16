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
        path: 'who-we-are',
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
        path: 'what-we-do',
        name: 'services',
        component: () => import('@/views/ServicesView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/HistoryView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'partners',
        name: 'partners-open',
        component: () => import('@/views/PartnersOpen.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'volunteer',
        name: 'volunteer',
        component: () => import('@/views/VolunteerPage.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: '/services/:title',
        name: 'service-detail',
        props: true,
        component: () => import('@/views/ServiceDetail.vue'),
        meta: {
          requiresAuth: false,
          title: 'Service Detail'
        }
      },
      {
        path: 'news',
        name: 'blogs',
        component: () => import('@/views/BlogsView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      // resources
      {
        path: 'documents',
        name: 'documents',
        component: () => import('@/views/DocumentsView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'publications',
        name: 'publications',
        component: () => import('@/views/PublicationView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'board-members',
        name: 'board-members',
        component: () => import('@/views/OurGovernance.vue'),
        meta: {
          requiresAuth: false
        }
      },

      {
        path: 'strategy',
        name: 'strategy',
        component: () => import('@/views/StrategyView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'privacy',
        name: 'privacy',
        component: () => import('@/views/PrivacyView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'terms',
        name: 'terms',
        component: () => import('@/views/TermsAndConditions.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'careers',
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
      // {
      //   path: 'blogs/:title',
      //   name: 'blog-detail2',
      //   props: true,
      //   component: () => import('@/views/BlogDetail2.vue'),
      //   meta: {
      //     requiresAuth: false
      //   }
      // },
      {
        path: 'tenders',
        name: 'tenders',
        component: () => import('@/views/TenderView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'beneficiaries',
        name: 'beneficiaries',
        component: () => import('@/views/BeneficiariesView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'policy',
        name: 'policy',
        component: () => import('@/views/PartnersOpen.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'faqs',
        name: 'faqs',
        component: () => import('@/views/FAQsView.vue'),
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'partnership',
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
      },
      {
        path: 'auth/reset-password',
        name: 'reset-password',
        component: () => import('@/views/ResetPassword.vue'),
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
  },
  {
    path: '/timeline',
    name: 'timeline',
    component: () => import('@/views/TimeLine.vue')
  }
]
export default OPEN_ROUTES
