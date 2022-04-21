import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

// @ts-ignore
import quasarUserOptions from './quasar-user-options.ts'

import i18n from './plugins/i18n/i18n'


createApp(App).use(i18n).use(Quasar, quasarUserOptions).use(VueSidebarMenu).use(router).mount('#app')
