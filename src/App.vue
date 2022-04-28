<template>
  <div class="q-pa-md all-page-cnt">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 100vh"
      class="shadow-2 rounded-borders"
    >
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="menuCliker" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
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
        class="bg-grey-3"
      >
          <q-list padding>
            <template
              v-slot:mini
              v-for="(route, index) in routes"
              :key="'for_'+index"
            >
              <q-item
                clickable
                :to="route.path"
              >
                <q-item-section avatar>
                  <q-icon :name="route.meta.icon" />
                </q-item-section>
                <q-item-section>
                  {{ route.name ? $t((route.name).toString()) : '' }}
                </q-item-section>
              </q-item>

            </template>

          </q-list>




        <q-scroll-area class="fit">
          <q-list padding>
            <template
            v-for="(route, index) in routes"
            :key="'for_'+index"
            >
              <q-item
                clickable
                :to="route.path"
              >
                <q-item-section avatar>
                  <q-icon :name="route.meta.icon" />
                </q-item-section>
                <q-item-section>
                  {{ route.name ? $t((route.name).toString()) : '' }}
                </q-item-section>
              </q-item>

            </template>

          </q-list>
        </q-scroll-area>

        <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode

        <div
          class="q-mini-drawer-hide absolute"
          style="top: 15px; right: -17px"
        >
          <q-btn
            dense
            round
            unelevated
            color="accent"
            icon="chevron_left"
            @click="miniState = true"
          />
        </div>-->
      </q-drawer>

      <q-page-container>
        <q-page class="q-px-lg q-py-md page-cnt">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {useRoute} from "vue-router";
import router from "@/plugins/router";

const isMobile: boolean = window.innerWidth < 500;
const miniState = isMobile ?  ref(true) : ref(false);
const drawer = ref(false);


const menuCliker=()=>{
  drawer.value = !drawer.value;
  if (isMobile){
    miniState.value = true;
  }
  else {
    miniState.value = false;
  }

}

const routes= router.options.routes;
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
  padding-top: 0
  padding-left: 0
  padding-right: 0


.page-cnt
  background-color: #2a2a2e
</style>
