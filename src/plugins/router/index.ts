import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { BASE_URL } from "@/constants";

// Pages
import Dashboard from "@/views/dashboard/Dashboard.vue";
import Clients from "@/views/clients/Clients.vue";
import { useI18n } from "vue-i18n";
import { translate } from "@/plugins/i18n/i18n";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: {
      icon: "home",
    },
  },
  {
    path: "/clients",
    name: translate("toolbar-enterprise-clients"),
    component: Clients,
    meta: {
      icon: "groups",
    },
  },
  {
    path: "/orders",
    name: translate("toolbar-enterprise-orders"),
    component: () => import("@/views/orders/Orders.vue"),
    meta: {
      icon: "list_alt",
    },
  },
  {
    path: "/mypage",
    name: translate("toolbar-enterprise-my-page"),
    component: () => import("@/views/myPage/MyPage.vue"),
    meta: {
      icon: "web",
    },
  },
  {
    path: "/stats",
    name: translate("toolbar-enterprise-stats"),
    component: () => import("@/views/stats/Stats.vue"),
    meta: {
      icon: "insights",
    },
  },
  {
    path: "/inventoryprd",
    name: translate("toolbar-enterprise-inventory"),
    component: () => import("@/views/inventory/Inventory.vue"),
    meta: {
      icon: "inventory_2",
    },
    children: [
      {
        path: "/settings",
        name: "imasubchilddd",
        component: () => import("@/views/settings/Settings.vue"),
      },
    ],
  },
  {
    path: "/productsconfig",
    name: translate("toolbar-enterprise-products"),
    component: () => import("@/views/products/Products.vue"),
    meta: {
      icon: "category",
    },
  },
  {
    path: "/historic",
    name: translate("toolbar-enterprise-historic"),
    component: () => import("@/views/historic/Historic.vue"),
    meta: {
      icon: "query_stats",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      icon: "login",
    },
  },
  {
    path: "/settings",
    name: translate("toolbar-settings"),
    component: () => import("@/views/settings/Settings.vue"),
    meta: {
      icon: "settings",
    },
  },
  {
    path: "/myenterprise",
    name: translate("toolbar-settings-enterprise"),
    component: () => import("@/views/settings/myEnterprise/MyEnterprise.vue"),
    meta: {
      icon: "business",
    },
  },
];

const router = createRouter({
  history: createWebHistory(BASE_URL),
  routes,
});

export default router;
