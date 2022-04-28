<template>
  <div class="contains-all">
    <div id="q-app" class="tabs-pos">
      <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        active-color="pink-13"
        active-bg-color="indigo-10"
        mobile-arrows
      >
        <q-tab
          icon="account_circle"
          class="text-purple individual-tab"
          name="general"
          label="General"
        ></q-tab>
        <q-tab
          icon="calendar_month"
          class="text-blue individual-tab"
          name="direction"
          label="Direction"
        ></q-tab>
        <q-tab
          icon="calendar_month"
          class="text-orange individual-tab"
          name="horario"
          label="Horario"
        ></q-tab>
        <q-tab
          icon="groups"
          class="text-teal individual-tab"
          name="equipo"
          label="Equipo"
        ></q-tab>
      </q-tabs>
    </div>

    <div id="q-app" class="forms-cont form-stl">
      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="text-white text-center firstTab"
        >
          <q-tab-panel name="general">
            <General />
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-orange text-white text-center"
        >
          <q-tab-panel name="equipo">
            <Team />
          </q-tab-panel>
        </q-tab-panels>
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="text-white text-center firstTab"
        >
          <q-tab-panel name="direction">
            <Direction />
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-down"
          class="text-white text-center firstTab"
        >
          <q-tab-panel name="horario">
            <Schedule />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";

import General from "./components/general/General.vue";
import Team from "./components/team/Team.vue";
import Schedule from "@/views/settings/myEnterprise/components/schedule/Schedule.vue";
import Direction from "@/views/settings/myEnterprise/components/direction/Direction.vue";
const tab: Ref<string> = ref("general");
</script>

<style scoped>
.form-stll {
  max-height: 84vh;
  height: 84vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  background-color: aqua !important;
}
.firstTab {
  background-color: #2a2a2e;
  padding-bottom: 0px;
}

.contains-all {
  min-height: 100%;
  position: relative;
  background-color: #2a2a2e;
}

.form-stl {
  padding-top: 70px;
  padding-bottom: 0;
  margin-bottom: 0;
}

.tabs-pos {
  background-color: #2a2a2e;
  top: 0;
  height: 70px;
  left: 0;
  position: absolute;
  right: 0;
}
</style>
