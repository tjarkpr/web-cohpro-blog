import { createRouter, createWebHistory } from 'vue-router'
import FeedView from '../views/FeedView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'feed',
      meta: {
        title: '://CohPro@Blog/Feed'
      },
      component: FeedView
    },
    {
      path: '/author-:name',
      name: 'author-feed',
      meta: {
        title: '://CohPro@Blog/Feed/Author'
      },
      component: FeedView
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: {
        title: '://CohPro@Blog/Feed/Article'
      },
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '://CohPro@Blog/About'
      },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/privacy',
      name: 'privacy',
      meta: {
        title: '://CohPro@Blog/Privacy'
      },
      component: () => import('../views/PrivacyView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      meta: {
        title: '://CohPro@Blog/NotFound'
      },
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((toRoute, _, next) => {
  window.document.title = toRoute.meta && toRoute.meta.title ? toRoute.meta.title : '://CohPro@Blog';
  next();
})

export default router
