import { createApp } from "vue";
import { Quasar } from "quasar";

import App from "./App.vue";

// Plugins
import router from "./plugins/router";
import quasarUserOptions from "./plugins/quasar/quasar-user-options";
import i18n from "./plugins/i18n/i18n";

import VueSidebarMenu from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
//TODO: uncomment this appController when working with backend
// main Controllers
//import appController from '@/controller/Controller';

// Style
import "@/styles/base.css";


const app = createApp(App);

app.use(router);
app.use(Quasar, quasarUserOptions);
app.use(i18n);
app.use(VueSidebarMenu);
//app.provide('appController', appController )
app.mount("#app");
