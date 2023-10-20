import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '../views/FeedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      meta: {
        title: 'Feed'
      },
      component: FeedView
    },
    {
      path: '/author-:name',
      name: 'author-feed',
      meta: {
        title: 'Feed'
      },
      component: FeedView
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: {
        title: 'Article'
      },
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'About'
      },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      meta: {
        title: 'Privacy'
      },
      component: () => import('../views/PrivacyView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      meta: {
        title: 'Not Found'
      },
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((toRoute, _, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : 'Blog';
  next();
})

export default router
