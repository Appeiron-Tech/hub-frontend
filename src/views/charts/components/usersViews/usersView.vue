<template>
  <Suspense>
    <template #default>
      <div>
  <highcharts :options="chartOptions" ></highcharts>
  <q-dialog v-model="userViewController.showDialog">
    <selected-country />
  </q-dialog>

      </div>
    </template>
    <template #fallback>
      <h5>cargando</h5>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import userViewController from "@/views/charts/components/usersViews/userView";
import {defineProps, reactive, ref, watch} from "vue";
import SelectedCountry from "@/views/charts/components/usersViews/components/selectedCountry.vue";

//NOTE: This is the used library
//LINK: https://www.npmjs.com/package/highcharts-vue


await userViewController.loadInfo();
let chartOptions = reactive(userViewController.getChartOptions());
watch(
  () => userViewController.getChartOptions(),
  () => {
    // chartOptions.series[0].data = userViewController.getChartOptions().series[0].data;
    console.log('sdadasd',userViewController.getChartOptions());
    chartOptions = userViewController.getChartOptions();
  },
  {immediate: true, deep: true}
);
</script>

<style scoped>

</style>