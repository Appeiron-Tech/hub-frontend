import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { BASE_URL } from "@/constants";

// Pages
import Dashboard from "@/views/dashboard/Dashboard.vue";
import Clients from "@/views/clients/Clients.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: {
      icon: 'home'
    }
  },
  {
    path: "/clients",
    name: "clients",
    component: Clients,
    meta: {
      icon: 'groups'
    }
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/orders/Orders.vue"),
    meta: {
      icon: 'list_alt'
    }
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/myPage/MyPage.vue"),
    meta:{
      icon:'web'
    }
  },
  {
    path: "/stats",
    name: "stats",
    component: () => import("@/views/stats/Stats.vue"),
    meta:{
      icon:'insights'
    }
  },
  {
    path: "/inventoryprd",
    name: "inventory",
    component: () => import("@/views/inventory/Inventory.vue"),
    meta:{
      icon:'inventory_2'
    }
  },
  {
    path: "/productsconfig",
    name: "productsconfig",
    component: () => import("@/views/products/Products.vue"),
    meta:{
      icon:'category'
    }
  },
  {
    path: "/historic",
    name: "historic",
    component: () => import("@/views/historic/Historic.vue"),
    meta:{
      icon:'query_stats'
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
    meta:{
      icon:'login'
    }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/settings/Settings.vue"),
    meta:{
      icon:'settings'
    }
  },
  {
    path: "/myenterprise",
    name: "myenterprise",
    component: () => import("@/views/settings/myEnterprise/MyEnterprise.vue"),
    meta:{
      icon:'business'
    }
  },
];

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

export default router;
