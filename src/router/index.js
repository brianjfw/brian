import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../pages/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../pages/about.vue')
  },
  {
    path: '/archive',
    name: 'archive',
    component: () => import('../pages/archive.vue')
  },
  {
    path: '/works/:slug',
    name: 'works-slug',
    component: () => import('../pages/works/_slug.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 