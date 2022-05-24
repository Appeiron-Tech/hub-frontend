<template >
  <div class="hour-container" v-if="props.singleHourRange.from !== undefined">
    <div class="col">
      <q-input filled v-model="props.singleHourRange.from" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="props.singleHourRange.from">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>

    <div class="col">
      <q-input filled v-model="props.singleHourRange.to" mask="time" :rules="['time']">
        <template v-slot:append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="props.singleHourRange.to">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col">
    <q-btn
      round
      :color="iconColor"
      :icon="iconName"
      @click="addHours"
      class="btn-add-hours"
    />
    </div>
  </div>
</template>


<script setup lang="ts">
import type {ISingleHourRange} from "@/views/settings/myEnterprise/components/schedule/models/IScheduleSave";
import {computed, type Ref, ref} from "vue";

const props = defineProps<{
  singleHourRange: ISingleHourRange,
  hasMoreThanAnHour: boolean
}>();

const emit = defineEmits<{
  (e:"moreHours", hasMoreThanAnHour: boolean, message: string, id?: number): void;
}>();



const iconName= computed(()=> props.hasMoreThanAnHour ? 'delete' : 'add');
const iconColor = computed(()=> props.hasMoreThanAnHour ? 'red' : 'blue');

const moreHours = (hasMore: boolean, message: string, id?: number) => {
  emit("moreHours", hasMore, message, id);
}

function addHours() {
  if(iconName.value.toUpperCase() == "ADD"){
    //iconName = 'delete';
    //iconColor = 'red';
    moreHours(true, 'add range hours');
  }
  else {
    //iconName.value = 'add';
    //iconColor.value = 'blue';
    moreHours(false, 'delete range hours', props.singleHourRange.id);
  }
}
</script>

<style scoped>
.hour-container{
  display: flex;
  justify-content: space-between;
}
.flex-grid-thirds .col {
  width: 32%;
}

.col {

  padding: 20px;
}
.btn-add-hours {
  width: 10px;
  height: 10px;
}
</style>