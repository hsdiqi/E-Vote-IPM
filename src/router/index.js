import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // Auth
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/LoginPage.vue'),
    meta: { guest: true }
  },

  // Admin routes
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/pages/admin/DashboardPage.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'pemilu',
        name: 'Pemilu',
        component: () => import('@/pages/admin/PemiluPage.vue'),
        meta: { title: 'Pemilu' }
      },
      {
        path: 'kandidat',
        name: 'Kandidat',
        component: () => import('@/pages/admin/KandidatPage.vue'),
        meta: { title: 'Kandidat' }
      },
      {
        path: 'pemilih',
        name: 'Pemilih',
        component: () => import('@/pages/admin/PemilihPage.vue'),
        meta: { title: 'Pemilih' }
      },
      {
        path: 'rekapitulasi',
        name: 'Rekapitulasi',
        component: () => import('@/pages/admin/RekapitulasiPage.vue'),
        meta: { title: 'Rekapitulasi' }
      },
      {
        path: 'admins',
        name: 'AdminManagement',
        component: () => import('@/pages/admin/AdminManagementPage.vue'),
        meta: { title: 'Manajemen Admin' }
      },
    ]
  },

  // Voting routes (public)
  {
    path: '/vote',
    component: () => import('@/layouts/VoteLayout.vue'),
    children: [
      {
        path: '',
        name: 'VoteVerify',
        component: () => import('@/pages/voting/VerifyPage.vue'),
        meta: { title: 'Verifikasi Token' }
      },
      {
        path: 'ballot',
        name: 'VoteBallot',
        component: () => import('@/pages/voting/BallotPage.vue'),
        meta: { title: 'Pilih Kandidat' }
      },
      {
        path: 'success',
        name: 'VoteSuccess',
        component: () => import('@/pages/voting/SuccessPage.vue'),
        meta: { title: 'Voting Berhasil' }
      },
    ]
  },

  // Redirect
  {
    path: '/',
    redirect: '/admin/dashboard'
  },

  // Special pages
  {
    path: '/session-expired',
    name: 'SessionExpired',
    component: () => import('@/pages/SessionExpiredPage.vue')
  },
  {
    path: '/unauthorized',
    name: 'Unauthorized',
    component: () => import('@/pages/UnauthorizedPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guest && auth.isAuthenticated) {
    next({ name: 'Dashboard' })
  } else {
    next()
  }
})

export default router
