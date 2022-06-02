<template>
  <div class="q-pa-md all-page-cnt">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="toolbar-cnt">
        <q-toolbar>
          <q-btn flat @click="menuCliker" round dense icon="menu" />
          <q-toolbar-title>
            <q-img class="logo-img" src="@/assets/logo_blanco.png" />
          </q-toolbar-title>

          <q-space />

          <q-tabs shrink>
            <img
              :src="userProfileImage"
              loading="eager"
              color="secondary"
              text-color="white"
              style="
                height: 45px;
                width: 55px;
                border-radius: 50%;
                margin-bottom: 10px;
                margin-top: 7px;
              "
              alt="Profile Image"
            />
            <div class="email-text">{{ userEmail }}</div>
            <q-btn-dropdown stretch flat :label="userName">
              <q-list>
                <q-item-label header>Settings</q-item-label>
                <q-item clickable v-close-popup tabindex="0">
                  <q-item-section avatar>
                    <q-avatar
                      icon="settings"
                      color="secondary"
                      text-color="white"
                    ></q-avatar>
                  </q-item-section>
                  <q-item-section v-on:click="goToSetting">
                    <q-item-label>Settings</q-item-label>
                    <q-item-label caption>Account settings</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="info"></q-icon>
                  </q-item-section>
                </q-item>

                <q-separator inset spaced></q-separator>
                <q-item clickable @click="doLogout()">
                  <q-item-section>{{ $t("toolbar-logout") }}</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-tabs>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        :show-if-above="!isMobile"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :mini="miniState"
        :width="200"
        :breakpoint="100"
        bordered
        style="background-color: #f0f7fb"
      >
        <q-list padding>
          <template
            v-slot:mini
            v-for="(route, index) in routesToShow"
            :key="'for_' + index"
          >
            <q-item clickable :to="route.path">
              <q-item-section avatar>
                <q-icon :name="route.meta.icon" />
              </q-item-section>
              <q-item-section>
                {{ route.name ? $t(route.name.toString()) : "" }}
              </q-item-section>
            </q-item>
          </template>
        </q-list>

        <q-scroll-area class="fit">
          <q-list padding>
            <template
              v-for="(route, index) in routesToShow"
              :key="'for_' + index"
            >
              <q-item clickable :to="route.path">
                <q-item-section avatar>
                  <q-icon :name="route.meta.icon" />
                </q-item-section>
                <q-item-section>
                  {{ route.name ? $t(route.name.toString()) : "" }}
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page class="q-px-lg q-py-md page-cnt">
          <router-view v-if="!app.loadingConfig" />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import { useRoute } from "vue-router";
import router from "@/plugins/router";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
const app: Controller = injectStrict("appController");
const isMobile: boolean = window.innerWidth < 500;
const miniState = isMobile ? ref(true) : ref(false);
const drawer = ref(false);
const userProfileImage: Ref<string | null> = ref(
  "https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg"
);

const userName: Ref<string | null> = ref("Lola Lola");
const userEmail: Ref<string | null> = ref("lola@gmail.com");
const goToSetting = () => {
  router.push("/settings");
};
const menuCliker = () => {
  drawer.value = !drawer.value;
  if (isMobile) {
    miniState.value = true;
  } else {
    miniState.value = false;
  }
};

const doLogout = async function (): Promise<void> {
  await app.user.logout();
  await router.push({ name: "Login" });
};

const routes = router.options.routes;

const routesToShow = Object.assign(
  [],
  routes.filter((e) => e.meta!.hide === false)
);

const route = useRoute();
</script>

<style lang="sass" scoped>
.mini-slot
  transition: background-color .28s
  &:hover
    background-color: rgba(0, 0, 0, .04)

.mini-icon
  font-size: 1.718em

  & + &
    margin-top: 18px

.headerTool
  padding-top: 0px !important

.all-page-cnt
  padding: 0


.page-cnt
  background-color: #ffffff

.toolbar-cnt
  background-color: #2bacdf
  height: 65px

.minegocio-title
  font-size: 25px
  padding-bottom: 15px

.online-badge
  position: absolute
  left: 130px
  top: 30px
  background-color: #ffffff
  color: #000000

.logo-img
  height: 55px
  width: 150px

.email-text
  position: absolute
  top: 37px
  left: 63px
</style>
