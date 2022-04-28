import { createApp } from "vue";
import { Quasar } from "quasar";

import App from "./App.vue";

// Plugins
import router from "./plugins/router";
import quasarUserOptions from "./plugins/quasar/quasar-user-options";
import i18n from "./plugins/i18n/i18n";
// @ts-ignore
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/dist/vue-tel-input.css';
import VueGoogleMaps from '@fawmi/vue-google-maps'

//TODO: uncomment this appController when working with backend
// main Controllers
//import appController from '@/controller/Controller';

// Style
import "@/styles/base.css";
const globalOptions = {
  mode: 'auto',
  defaultCountry: 51
};


const app = createApp(App);

app.use(router);
app.use(Quasar, quasarUserOptions);
app.use(i18n);
app.use(VueTelInput, globalOptions);
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDxCh_CftOTvez_7uDvBINfYgmlJrEWCZc',
  },
});
//app.provide('appController', appController )
app.mount("#app");
