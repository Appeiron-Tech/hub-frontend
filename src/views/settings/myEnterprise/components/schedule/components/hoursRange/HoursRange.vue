<template>
  <Suspense>
    <template #default>
      <div>
        <q-toggle
          v-model="isOpened"
          checked-icon="check"
          color="red"
          label="Opened"
          unchecked-icon="clear"
        />

      <div v-for="(hour, index) in props.schedule">
        <div>
          <SingleHourRange :single-hour-range="hour" :has-more-than-an-hour="hastMoreThenAnHour" @more-hours="settingMoreHours" />
        </div>
      </div>
      </div>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import type {ISchedule} from "@/views/settings/myEnterprise/components/schedule/models/IScheduleSave";
import SingleHourRange
  from "@/views/settings/myEnterprise/components/schedule/components/hoursRange/component/SingleHourRange.vue";
import scheduleController from "@/views/settings/myEnterprise/components/schedule/Schedule";
import {computed, reactive, ref, type Ref, toRefs, watch} from "vue";

const props = defineProps<{
  weekDay: number,
  schedule:  Array<ISchedule> | undefined
}>();

const emits = defineEmits<{
  (e: 'removeRangeHour', id: number): void;
  (e: 'openRangeHour', numberDay: number, hadExistingHour?: boolean): void;
}>();
console.log({props})
const hoursRange  = reactive(props.schedule?.filter(e => e.weekDay === props.weekDay)!);

console.log({hoursRange})


const removeRangeHour =(id: number) => {
  emits('removeRangeHour', id);
}

const hastMoreThenAnHour = computed(()=> props.schedule?.length! > 1)

const openRangeHour = (numberday: number) => {
  emits("openRangeHour", numberday, false);
}
const hasErrorFormat= ref(false);


const isOpened = props.schedule?.length! > 0 ? ref(true) : ref(false);

function settingMoreHours(hasMoreThanAnHour: boolean, message: string, id?: number) {
  console.log("=>(HoursRange.vue:32) message", message);
  console.log("=>(HoursRange.vue:32) hasMoreThanAnHour", hasMoreThanAnHour);
  console.log("=>(HoursRange.vue:32) id", id);
  // if(!hasMoreThanAnHour){
  //   scheduleController.removeSpecificRangeHour(id!);
  // }
  if(!hasMoreThanAnHour){
    removeRangeHour(id!);
  }
  else {
    emits("openRangeHour", props.weekDay, true);
  }
}

watch(isOpened, (crr)=> {
  if(crr){
    openRangeHour(props.weekDay);
  }

})

watch(
  ()=> props,
  ()=> {
    isOpened.value = props.schedule?.length! > 0;
  },
  {immediate: true, deep: true}
)
</script>

<style scoped>

</style>