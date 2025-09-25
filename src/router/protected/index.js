const PROTECTED_ROUTES = [
  {
    path: '/tbc',
    component: () => import('@/views/protected/ProtectedMaster.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/protected/DashboardView.vue'),
        name: 'dashboard',
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
        path: 'about-us',
        component: () => import('@/views/protected/AboutView.vue'),
        name: 'admin-about',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'history',
        component: () => import('@/views/protected/HistoryView.vue'),
        name: 'admin-history',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'organizational-starcture',
        component: () => import('@/views/protected/OrganizationalView.vue'),
        name: 'admin-oganizational',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'jobs',
        component: () => import('@/views/protected/JobsList.vue'),
        name: 'admin-jobs',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'createjob',
        component: () => import('@/views/protected/CreateJob.vue'),
        name: 'create-job',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'edit-job/:id',
        component: () => import('@/views/protected/EditJob.vue'),
        name: 'edit-job',
        props: true,
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'all-applicants/:id',
        component: () => import('@/views/protected/CareerApplicants.vue'),
        name: 'jobApplicants',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'tender-applicants/:id',
        component: () => import('@/views/protected/TenderApplicants.vue'),
        name: 'tenderApplicants',
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
          role: ['admin']
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
        path: 'account',
        name: 'account',
        meta: {
          requiresAuth: true,
          role: 'admin'
        },
        component: () => import('@/views/protected/AccountManagement.vue')
      },
      {
        path: 'news',
        component: () => import('@/views/protected/BlogsView.vue'),
        name: 'admin-blogs',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'contact-address',
        component: () => import('@/views/protected/ContactAddress.vue'),
        name: 'admin-contacts',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'social-medias',
        component: () => import('@/views/protected/SocialMedia.vue'),
        name: 'admin-socialMedias',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'faqs',
        component: () => import('@/views/protected/FaqsView.vue'),
        name: 'admin-faqs',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'beneficiary',
        component: () => import('@/views/protected/BeneficiaryView.vue'),
        name: 'admin-beneficiary',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      //resources
      {
        path: 'documents',
        component: () => import('@/views/protected/DocumentsView.vue'),
        name: 'admin-documents',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'publications',
        component: () => import('@/views/protected/PublicationView.vue'),
        name: 'admin-publications',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'strategies',
        component: () => import('@/views/protected/StrategyView.vue'),
        name: 'admin-strategy',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'strategies',
        component: () => import('@/views/protected/StrategiesView.vue'),
        name: 'admin-strategies',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'news/add',
        component: () => import('@/views/protected/AddBlog.vue'),
        name: 'admin-add-blogs',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'services',
        component: () => import('@/views/protected/ServicesView.vue'),
        name: 'admin-services',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'team',
        component: () => import('@/views/protected/TeamsView.vue'),
        name: 'team',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'privacy',
        component: () => import('@/views/protected/PrivacyPolicy.vue'),
        name: 'privacy-policy',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'team/add',
        component: () => import('@/views/protected/AddTeam.vue'),
        name: 'admin-add-team',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'volunteers',
        component: () => import('@/views/protected/VolunteersView.vue'),
        name: 'admin-volunteers',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'partners',
        component: () => import('@/views/protected/PartnersView.vue'),
        name: 'partner',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'donations',
        component: () => import('@/views/protected/DonationView.vue'),
        name: 'donations',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'messages',
        component: () => import('@/views/protected/ContactUs.vue'),
        name: 'messages',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      {
        path: 'tenders',
        component: () => import('@/views/protected/TendersView.vue'),
        name: 'admin-tenders',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }

      },
      {
        path: 'gallery',
        component: () => import('@/views/protected/GalleryView.vue'),
        name: 'admin-gallery',
        meta: {
          requiresAuth: true,
          role: ['admin']
        }
      },
      // {
      //   path: 'quill',
      //   name: 'quill',
      //   component: () => import('@/views/QUILLJS.vue')
      // }
    ]
  }
]

export default PROTECTED_ROUTES
