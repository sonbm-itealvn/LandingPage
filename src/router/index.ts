import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/dao-tao',
      name: 'education',
      component: () => import('../views/EducationView.vue'),
    },
    {
      path: '/sinh-vien',
      name: 'students',
      component: () => import('../views/StudentsView.vue'),
    },
    {
      path: '/hoat-dong-khoa',
      name: 'activities',
      component: () => import('../views/ActivitiesView.vue'),
    },
    {
      path: '/hop-tac-ket-noi',
      name: 'partnerships',
      component: () => import('../views/PartnershipsView.vue'),
    },
    {
      path: '/tin-tuc',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
