import Vue from 'vue'
import Router from 'vue-router'
import LoginLayout from '../views/login/layout/LoginLayout'
Vue.use(Router)
import Layout from '../layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('../views/redirect/index')
      }
    ]
  },
  {
    path: '#',
    component: LoginLayout,
    redirect: '/login',
    hidden: true,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index'),
        meta: {
          title: '用户登录'
        }
      },
      // {
      //   path: '/register',
      //   name: 'Register',
      //   component: () => import('@/views/login/register'),
      //   meta: {
      //     title: '用户注册'
      //   }
      // },
      // {
      //   path: '/forgot',
      //   name: 'Forgot',
      //   component: () => import('@/views/login/forgot'),
      //   meta: {
      //     title: '忘记密码'
      //   }
      // }
    ]
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('../views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  // {
  //   path: '/404',
  //   component: () => import('../views/error-page/404'),
  //   hidden: true
  // },

  {
    path: '/401',
    component: () => import('../views/error-page/401'),
    hidden: true
  },

]

// 导入目录下的子路由
const subRouters = require.context('./modules', true, /\.js$/)
subRouters.keys().reduce((modules, modulePath) => {
  const value = subRouters(modulePath)
  constantRoutes.push(value.default)
}, {})

const createRouter = () => new Router({
  base: '/vfsc-v1',
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
