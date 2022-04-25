<template>
  <q-toolbar class="text-primary my-toolbar">
    <q-btn flat round dense icon="menu" />
    <q-toolbar-title> Nombre de la empresa </q-toolbar-title>

    <q-menu :persistent="persistanceMenu">
      <sidebar-menu class="my-sidebar" :menu="menu" :collapsed="isMobile" />
    </q-menu>

    <q-tabs shrink>
      <img
        :src="userProfileImage"
        loading="eager"
        color="secondary"
        text-color="white"
        style="height: 55px; width: 85px; border-radius: 5px"
        alt="Profile Image"
      />
      <div style="display: inline-block;"
           class="informationContainer">
        <div class="informationItems">
      <div><q-chip class="email-chip" square >{{userEmail}}</q-chip> </div>
      <div>
      <q-btn-dropdown stretch flat :label="userName">
        <q-list>
          <q-item-label header>{{ t('toolbar-settings') }}</q-item-label>
          <q-item clickable v-close-popup tabindex="0">
            <q-item-section avatar>
              <q-avatar
                icon="settings"
                color="secondary"
                text-color="white"
              ></q-avatar>
            </q-item-section>
            <q-item-section v-on:click="goToSetting">
              <q-item-label>{{ t('toolbar-settings') }}</q-item-label>
              <q-item-label caption>{{ t('toolbar-settings-dropdown') }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon name="info"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator inset spaced></q-separator>
        </q-list>
      </q-btn-dropdown>
      </div>
      </div>
      </div>
    </q-tabs>
  </q-toolbar>
</template>
<script setup lang="ts">
//LINK: https://github.com/yaminncco/vue-sidebar-menu/tree/next
//link: https://yaminncco.github.io/vue-sidebar-menu/#/basic-usage
import type {Ref} from "vue";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import router from "@/plugins/router";

const {t} = useI18n();

const menu = [
  {
    header: false,
    title: "AppName",
    hiddenOnCollapse: true,
  },
  {
    href: "/stats",
    title: t('toolbar-enterprise-stats'),
    icon: "fa fa-chart-line",
  },
  {
    href: "/mypage",
    title: t('toolbar-enterprise-my-page'),
    icon: "fa fa-star",
    child: [
      {
        href: "/productsconfig",
        title: t('toolbar-enterprise-products'),
        icon: "fa fa-briefcase",
      },
    ],
  },
  {
    href: "/clients",
    title: t('toolbar-enterprise-clients'),
    icon: "fa fa-handshake",
  },
  {
    header: "Div",
  },
  {
    badge: "vsm--badge_default"
  },

  {
    href: "/orders",
    title: t("toolbar-enterprise-orders"),
    icon: "fa fa-arrow-down",
    child: [
      {
        href: "/historic",
        title: t('toolbar-enterprise-historic'),
        icon: "fa fa-certificate",
      },
    ],
  },
  {
    href: "/inventoryprd",
    title: t('toolbar-enterprise-inventory'),
    icon: "fa fa-barcode",
  },
];

const isMobile: boolean = window.innerWidth < 700;

const userProfileImage: Ref<string> = ref('https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg');
const userName: Ref<string> = ref('Lola Lola');
const userEmail: Ref<string> = ref('lolalola@gmail.com');
const persistanceMenu: Ref<string> = isMobile ? ref('!persistent') : ref('persistent');

const goToSetting = () => {
  router.push('/settings');
}

//window.innerWidth

</script>

<style lang="scss" scoped>
.menu-ctn {
  min-height: 1000px;
  min-width: 300px;
}

.informationContainer {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.informationItems {
  display: inline-block;
  text-align: center;
}

.my-sidebar {
  margin-top: 50px;
  border-top-right-radius: 1%;
}

.my-toolbar {
  background-color: #2a2a2e;
}

.informationItems{
  display: inline-block;
  text-align: center;
}
.email-chip{
  background-color: transparent;
  color: aliceblue;
}
</style>
