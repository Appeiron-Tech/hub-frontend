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
  },
  {
    path: "/clients",
    name: "clients",
    component: Clients,
  },
  {
    path: "/orders",
    name: "orders",
    component: () => import("@/views/orders/Orders.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("@/views/myPage/MyPage.vue"),
  },
  {
    path: "/stats",
    name: "stats",
    component: () => import("@/views/stats/Stats.vue"),
  },
  {
    path: "/inventoryprd",
    name: "inventory",
    component: () => import("@/views/inventory/Inventory.vue"),
  },
  {
    path: "/productsconfig",
    name: "productsconfig",
    component: () => import("@/views/products/Products.vue"),
  },
  {
    path: "/historic",
    name: "historic",
    component: () => import("@/views/historic/Historic.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/settings/Settings.vue"),
  },
  {
    path: "/myenterprise",
    name: "myenterprise",
    component: () => import("@/views/settings/myEnterprise/MyEnterprise.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

export default router;
