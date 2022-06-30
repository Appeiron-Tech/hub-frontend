<template>
    <q-card class="selectedCountry">
      <highcharts  :options="chartOptions" ></highcharts>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup @click="closeDialog" />
      </q-card-actions>
    </q-card>
</template>

<script lang="ts" setup>
import userViewController from "@/views/charts/components/usersViews/userView";

const chartOptions = [{
  series: [{
    type: 'pie',
    allowPointSelect: true,
    keys: ['name', 'y', 'selected', 'sliced'],
    data: [
      ['Apples', 29.9, false],
      ['Pears', 71.5, false],
      ['Oranges', 106.4, false],
      ['Plums', 129.2, false],
      ['Bananas', 144.0, false],
      ['Peaches', 176.0, false],
      ['Prunes', 135.6, true, true],
      ['Avocados', 148.5, false]
    ],
    showInLegend: true
  }]
}]

const closeDialog=() => {
  userViewController.showDialog = false;
}
</script>

<style scoped>
.selectedCountry{
  width: 80vw;
}
</style>