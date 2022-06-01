<template>
  <Suspense>
    <template #default>
      <div>
        <q-select rounded
                  outlined
                  v-model="selectedStore"
                  :options="teamController.localOptions"
                  label="Store"
                  emit-value
                  map-options
        />
        <div v-if="selectedStore"
             v-for="(weekDay) in weekDays"
             class="row q-mt-md"
        >
          <div class="col-md-2 text-h6">
            {{ $t(weekDay.label) }}
          </div>

          <div class="col-md-2">
            <q-toggle
              :modelValue="scheduleController.getIsOpened(weekDay.weekday)"
              @update:modelValue="isOpened => isOpened ? scheduleController.openScheduleByDay(weekDay.weekday) : scheduleController.closeScheduleByDay(weekDay.weekday)"
              checked-icon="check"
              color="green"
              :label="scheduleController.getIsOpened(weekDay.weekday) ? 'On' : 'Off'"
              unchecked-icon="clear"
            />
          </div>

          <div class="col-md-8">
              <HoursRange v-if="scheduleController.getScheduleByDay(weekDay.weekday)"
                      :schedule="scheduleController.getScheduleByDay(weekDay.weekday)"
              />
          </div>
        </div>
        <!-- <q-btn @click="saveInformation">SAVE</q-btn> -->
      </div>
    </template>
    <template #fallback>
      <span>Loading...</span>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import {ref, watch} from "vue";
import weekDays from "@/utils/weekDay";
import scheduleController from "@/views/settings/myEnterprise/components/schedule/Schedule";
import teamController from "@/views/settings/myEnterprise/components/team/teamTable/models/Team";
import HoursRange from "@/views/settings/myEnterprise/components/schedule/components/hoursRange/HoursRange.vue";

import type { ILocalOptions } from "../team/teamTable/models/ITeam";

await teamController.loadInfo();

const selectedStore: Ref<ILocalOptions | null> = ref(teamController.localOptions[0] || null)

watch(
  () => selectedStore,
  async () => {
    if (selectedStore.value)
      await scheduleController.loadInfo(selectedStore.value.id);
  },
  {immediate: true, deep: true}
)

</script>

<style scoped>
</style>
