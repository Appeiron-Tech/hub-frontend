import {createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized} from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import { BASE_URL } from "@/constants";

// Pages
import Dashboard from "@/views/dashboard/Dashboard.vue";
import Clients from "@/views/clients/Clients.vue";
import { useI18n } from "vue-i18n";
import { translate } from "@/plugins/i18n/i18n";
import appController from "@/controller/Controller";

const history = createWebHistory();

const routes: Array<RouteRecordRaw> = [
  //public paths
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/Login.vue"),
    meta: {
      icon: "login",
      public: true,
      onlyWhenLoggedOut: true,
      hide: true
    },
  },
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: {
      icon: "home",
      hide: false
    },
  },
  {
    path: "/admin/clients",
    name: translate("toolbar-enterprise-clients"),
    component: Clients,
    meta: {
      icon: "groups",
      hide: false
    },
  },
  {
    path: "/admin/orders",
    name: translate("toolbar-enterprise-orders"),
    component: () => import("@/views/orders/Orders.vue"),
    meta: {
      icon: "list_alt",
      hide: false
    },
  },
  {
    path: "/admin/mypage",
    name: translate("toolbar-enterprise-my-page"),
    component: () => import("@/views/myPage/MyPage.vue"),
    meta: {
      icon: "web",
      hide: false
    },
  },
  {
    path: "/admin/stats",
    name: translate("toolbar-enterprise-stats"),
    component: () => import("@/views/stats/Stats.vue"),
    meta: {
      icon: "insights",
      hide: false
    },
  },
  {
    path: "/admin/inventoryprd",
    name: translate("toolbar-enterprise-inventory"),
    component: () => import("@/views/inventory/Inventory.vue"),
    meta: {
      icon: "inventory_2",
      hide: false
    },
  },
  {
    path: "/admin/productsconfig",
    name: translate("toolbar-enterprise-products"),
    component: () => import("@/views/products/Products.vue"),
    meta: {
      icon: "category",
      hide: false
    },
  },
  {
    path: "/admin/historic",
    name: translate("toolbar-enterprise-historic"),
    component: () => import("@/views/historic/Historic.vue"),
    meta: {
      icon: "query_stats",
      hide: false
    },
  },
  {
    path: "/admin/charts",
    name: 'charts',
    component: () => import("@/views/charts/Charts.vue"),
    meta: {
      icon: "query_stats",
      hide: false
    },
  },
  {
    path: "/admin/settings",
    name: translate("toolbar-settings"),
    component: () => import("@/views/settings/Settings.vue"),
    meta: {
      icon: "settings",
      hide: false
    },
  },
  {
    path: "/admin/myenterprise",
    name: translate("toolbar-settings-enterprise"),
    component: () => import("@/views/settings/myEnterprise/MyEnterprise.vue"),
    meta: {
      icon: "business",
      hide: false
    },
  },
];

const router = createRouter({
  history,
  routes,
});

// ******************************************************************
// **** Logout is managed but the apiService,
// **** if it return an unauthorized the page is redirect to Login
// ******************************************************************

// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
//   // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
//   // else next();

//   const isPublic = to.matched.some(record => record.meta.public)
//   const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)

//   // if (!isPublic && !appController.user.getIsAuthenticated()) {
//   //   return next({
//   //     path:'/login',
//   //     query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
//   //   });
//   // }
//   // Do not allow user to visit login page or register page if they are logged in
//   // if (appController.user.getIsAuthenticated() && onlyWhenLoggedOut) {
//   //   return next('/')
//   // }
//   // else
//   next();
// })

export default router;
