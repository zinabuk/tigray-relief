const PROTECTED_ROUTES = [
  {
    path: '/rest',
    name: 'dashboard',
    component: () => import('@/views/protected/ProtectedMaster.vue'),

    children: [
      {
        path: '',
        component: () => import('@/views/protected/HeroView.vue'),
        name: 'admin-home',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'hero',
        component: () => import('@/views/protected/HeroView.vue'),
        name: 'admin-hero',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'staff',
        component: () => import('@/views/protected/Staff/StaffIndex.vue'),
        name: 'staff-home',
        meta: {
          requiresAuth: true,
          role: ['staff']
        }
      },
      {
        path: 'users',
        component: () => import('@/views/protected/UsersView.vue'),
        name: 'users',
        meta: {
          requiresAuth: true,
          role: 'admin'
        }
      },
      {
        path: 'blogs',
        component: () => import('@/views/protected/BlogsView.vue'),
        name: 'admin-blogs',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'faqs',
        component: () => import('@/views/protected/FaqsView.vue'),
        name: 'admin-faqs',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'beneficiary',
        component: () => import('@/views/protected/BeneficiaryView.vue'),
        name: 'admin-beneficiary',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'policy',
        component: () => import('@/views/protected/PolicyView.vue'),
        name: 'admin-policy',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'blogs/add',
        component: () => import('@/views/protected/AddBlog.vue'),
        name: 'admin-add-blogs',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'services',
        component: () => import('@/views/protected/ServicesView.vue'),
        name: 'admin-services',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'team',
        component: () => import('@/views/protected/TeamsView.vue'),
        name: 'team',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'team/add',
        component: () => import('@/views/protected/AddTeam.vue'),
        name: 'admin-add-team',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'volunteers',
        component: () => import('@/views/protected/VolunteersView.vue'),
        name: 'admin-volunteers',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'partners',
        component: () => import('@/views/protected/PartnersView.vue'),
        name: 'partner',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'donations',
        component: () => import('@/views/protected/DonationView.vue'),
        name: 'donations',
        meta: {
          requiresAuth: true,
          role: ['admin', 'staff']
        }
      },
      {
        path: 'messages',
        component: () => import('@/views/protected/ContactUs.vue'),
        name: 'messages'
      },
      {
        path: 'tenders',
        component: () => import('@/views/protected/TendersView.vue'),
        name: 'admin-tenders'
      },
      {
        path: 'gallery',
        component: () => import('@/views/protected/GalleryView.vue'),
        name: 'admin-gallery'
      }
    ]
  }
]

export default PROTECTED_ROUTES
