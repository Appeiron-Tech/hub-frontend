<template>
  <q-drawer
    v-model="app.drawer"
    :show-if-above="!isMobile"
    @mouseover="app.miniState = false"
    @mouseout="app.miniState = true"
    :mini="app.miniState"
    :width="200"
    :breakpoint="100"
    bordered
    style="background-color: #f0f7fb"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <template
          v-for="(route, index) in routesToShow"
          :key="'for_' + index"
        >
          <q-item clickable :to="route.path">
            <q-item-section avatar>
              <q-icon :name="getRouteIcon(route.meta)" />
            </q-item-section>
            <q-item-section>
              {{ route.name ? route.name.toString() : "" }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import type Controller from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import type { RouteMeta } from "vue-router";
import router from "@/plugins/router";


const app: typeof Controller = injectStrict("appController");
const isMobile: boolean = window.innerWidth < 500;

const routes = router.options.routes;

const routesToShow = Object.assign(
  [],
  routes.filter((e) => e.meta!.hide === false)
);

const getRouteIcon = (
  _routeMeta: RouteMeta | undefined
): string | undefined => {
  if (_routeMeta && typeof _routeMeta.icon == "string") return _routeMeta!.icon;
  return undefined;
};
</script>

<style></style>
