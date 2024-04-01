import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('../views/ManagerView.vue')
  },
  {
    path: '/manager/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/article',
    name: 'article',
    component: () => import('../views/ShowArticle.vue')
  },
  {
    path: '/article/sort',
    name: 'sort',
    component: () => import('../views/ArticelList.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: '',
  routes
})

export default router
