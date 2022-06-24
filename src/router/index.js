import Vue from 'vue'
import VueRouter from 'vue-router'
import PageView from '@/components/Layout/View'
// import ViewComponent from '@/components/Layout/ViewComponent'
// import AuthView from '@/components/Layout/ViewAuth'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  // main route
  {
    path: '/',
    component: PageView,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home/Home'),
        meta: {
          viewComponent: 'MainView'
        }
      },
      {
        path: '/search',
        name: 'SearchResult',
        component: () => import('@/views/Home/SearchResult')
      },
      {
        path: '/remedies',
        name: 'Remedies',
        component: () => import('@/views/Remedy/Remedies'),
        meta: {
          viewComponent: 'MainView'
        }
      },
      {
        path: '/remedy/:id',
        name: 'DetailsRemedy',
        component: () => import('@/views/Remedy/Details'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/naturopaths',
        name: 'Naturopaths',
        component: () => import('@/views/Naturopaths/Naturopaths'),
        meta: {
          viewComponent: 'MainView'
        }
      },
      {
        path: '/naturopath/:id',
        name: 'NaturoDetails',
        component: () => import('@/views/Naturopaths/NaturoDetails'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/shop',
        name: 'Shop',
        component: () => import('@/views/Shop/Shop'),
        meta: {
          viewComponent: 'MainView'
        }
      },
      {
        path: '/shop/:id',
        name: 'DetailsProduct',
        component: () => import('@/views/Shop/Details'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/views/Shop/Cart'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/checkout-shipping',
        name: 'Shipping',
        component: () => import('@/views/Shop/Shipping'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/checkout-address-select',
        name: 'ShippingAddress',
        component: () => import('@/views/Shop/ShippingAddress'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/checkout-address-add',
        name: 'NewShippingAddress',
        component: () => import('@/views/Shop/NewShippingAddress'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/checkout-payment',
        name: 'Payment',
        component: () => import('@/views/Shop/Payment'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/new-payment',
        name: 'NewPayment',
        component: () => import('@/views/Shop/NewPayment'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/checkout-confirm',
        name: 'Confirm',
        component: () => import('@/views/Shop/Confirm'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/checkout-complete',
        name: 'Complete',
        component: () => import('@/views/Shop/Complete'),
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/notifications',
        name: 'Notifications',
        component: () => import('@/views/Notification/Notifications'),
        meta: {
          viewComponent: 'MainView'
        }
      },
      {
        path: '/articles',
        name: 'Articles',
        component: () => import('@/views/Articles/Articles.vue'),
        meta: {
          viewComponent: 'MainView'
        }
      },
      {
        path: '/articles/list',
        name: 'ArticleList',
        component: () => import('@/views/Articles/ArticleList.vue'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/articles/:id',
        name: 'ArticleDetails',
        component: () => import('@/views/Articles/ArticleDetails'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: 'articles/:id/comment',
        name: 'Comments',
        component: () => import('@/views/Articles/Comments'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/account',
        name: 'Account',
        component: () => import('@/views/Account/Account'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/languages',
        name: 'Languages',
        component: () => import('@/views/Account/Languages'),
        meta: {
          viewComponent: 'SubView'
        }
      },
      {
        path: '/chat',
        name: 'Chat',
        component: () => import('@/views/Chat/Chat'),
        meta: {
          viewComponent: 'MainView'
        }
      },
      {
        path: '/messages/:id',
        name: 'Messages',
        component: () => import('@/views/Chat/Messages'),
        meta: {
          viewComponent: 'SubView'
        }
      }
    ]
  },
  // login
  {
    path: '/login',
    // name: 'Authentication',
    component: PageView,
    invisible: true,
    children: [
      {
        path: '',
        name: 'LoginOptions',
        component: () => import('@/views/Authentication/LoginOptions'),
        invisible: true,
        meta: {
          viewComponent: 'SubViewSlideUpModal'
        }
      },
      {
        path: '/naturo-signup-email',
        name: 'NaturoSignupWithEmail',
        component: () => import('@/views/Authentication/NaturoSignupWithEmail'),
        invisible: true,
        meta: {
          viewComponent: 'SubViewSlideUpModal'
        }
      },
      {
        path: '/signup-phone',
        name: 'SignupWithPhone',
        component: () => import('@/views/Authentication/SignupWithPhone'),
        invisible: true,
        meta: {
          viewComponent: 'SubViewSlideUpModal'
        }
      },
      {
        path: '/confirm-code',
        name: 'ConfirmationCode',
        component: () => import('@/views/Authentication/ConfirmationCode'),
        invisible: true,
        meta: {
          viewComponent: 'SubViewSlideUpModal'
        }
      },
      {
        path: '/login-email',
        name: 'LoginWithEmail',
        component: () => import('@/views/Authentication/LoginWithEmail'),
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: () => import('@/views/Authentication/ForgotPassword'),
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/password-reset',
        name: 'UpdatePassword',
        component: () => import('@/views/Authentication/UpdatePassword'),
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      // signup
      {
        path: '/signup',
        name: 'SignupProfile',
        component: () => import('@/views/Authentication/SignupProfile'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/signup-email',
        name: 'SignupWithEmail',
        component: () => import('@/views/Authentication/SignupWithEmail'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/auth/:provider/redirect',
        name: 'ProviderRedirect',
        component: () => import('@/views/Authentication/ProviderRedirect'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/user-profile',
        name: 'ProfileUser',
        component: () => import('@/views/Authentication/ProfileUser'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/user-skills',
        name: 'YourSkills',
        component: () => import('@/views/Authentication/ProfileSkill'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/precautionary-form',
        name: 'PrecautionaryForm',
        component: () => import('@/views/Authentication/PrecautionaryForm'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/natway-chart',
        name: 'NatwayCharter',
        component: () => import('@/views/Authentication/NatwayChart'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/npnatway-chart',
        name: 'NaturoNatwayChart',
        component: () => import('@/views/Authentication/NaturoNatwayChart'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/natway-refuse',
        name: 'NatwayChartRefuse',
        component: () => import('@/views/Authentication/NatwayChartRefuse'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/npnatway-refuse',
        name: 'NaturoNatwayChartRefuse',
        component: () => import('@/views/Authentication/NaturoNatwayChartRefuse'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/contacts',
        name: 'Contacts',
        component: () => import('@/views/Authentication/Contacts'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/views/Authentication/Welcome'),
        invisible: true,
        meta: {
          viewComponent: 'SignupProcess'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//  if (
//    'requiresAuth' in to.meta &&
//    to.meta.requiresAuth &&
//    store.getters['auth/isLoggedIn'] === false
//  ) {
//    next('/login')
//  } else if (
//    'requiresAuth' in to.meta &&
//    !to.meta.requiresAuth &&
//    store.getters['auth/isLoggedIn'] === true
//  ) {
//    next()
//  } else {
//    next()
//  }
// })

export default router
