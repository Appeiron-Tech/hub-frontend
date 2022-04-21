import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/dashboard/Dashboard.vue'
import Clients from '../views/clients/Clients.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Dashboard
  },
  {
    path:'/clients',
    name: 'clients',
    component: Clients
  },
  {
    path:'/orders',
    name: 'orders',
    component: () => import('../views/orders/Orders.vue')
  },
  {
    path:'/mypage',
    name: 'mypage',
    component: () => import('../views/myPage/MyPage.vue')
  },
  {
    path:'/stats',
    name: 'stats',
    component: () => import('../views/stats/Stats.vue')
  },
  {
    path:'/inventoryprd',
    name: 'inventory',
    component: () => import('../views/inventory/Inventory.vue')
  }
  ,
  {
    path:'/productsconfig',
    name: 'productsconfig',
    component: () => import('../views/products/Products.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
