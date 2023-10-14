import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Articles'
      },
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'Article: This is an article title which is not very long'
      },
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((toRoute, _, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Blog';
  next();
})

export default router
