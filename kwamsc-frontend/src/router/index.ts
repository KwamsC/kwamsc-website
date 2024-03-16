import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/posts',
      name: 'blog',
      component: () => import('../views/PostsIndexView.vue')
    },
    {
      path: '/posts/create',
      name: 'post-create',
      component: () => import('../views/PostsCreateView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/posts/:id/view',
      name: 'post-view',
      component: () => import('../views/PostsShowView.vue')
    },
    {
      path: '/posts/:id/edit',
      name: 'post=edit',
      component: () => import('../views/PostsUpdateView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/RecipesIndexView.vue')
    },
    {
      path: '/recipes/create',
      name: 'recipe-create',
      component: () => import('../views/RecipesCreateView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/recipes/:id/view',
      name: 'recipes-view',
      component: () => import('../views/RecipesShowView.vue')
    },
    {
      path: '/recipes/:id/edit',
      name: 'recipes-edit',
      component: () => import('../views/RecipesEditView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/NotFound.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  if (requiresAuth && !(await getCurrentUser())) {
    return '/login'
  }
})

export default router
