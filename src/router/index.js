// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../views/LoginView.vue'),},
  { path: '/dashboard', name:'dashboard', component: () => import('../views/HomePage.vue'),},
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

