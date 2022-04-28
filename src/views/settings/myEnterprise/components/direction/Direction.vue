<template>
  <h2>Direccion</h2>
  <GMapMap
    :center="center"
    :zoom="7"
    map-type-id="terrain"
    class="mapViewer"
  >
    <GMapCluster>
      <GMapMarker
        class="sddsdsdsd"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon= '{
          url: "https://w7.pngwing.com/pngs/601/670/png-transparent-bmw-museum-car-mini-bmw-7-series-bmw-emblem-trademark-logo.png",
          scaledSize: {width: 47, height: 37},
          labelOrigin: {x: 16, y: -10}
      }'
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GMapCluster>
  </GMapMap>
</template>

<script setup lang="ts">
//LINK https://vue-map.netlify.app/components/marker.html

import { ref, watch} from "vue";
import type {Ref} from 'vue'

const center: Ref<{lat: number, lng: number}> = ref( {lat: -12.046373, lng: -77.042755});
const markers= [ {
  position: {
    lat: -12.046373, lng: -77.042755
  },
},
  {
    position: {
      lat: -12.2736, lng: -76.8694
    },
  }
]


watch(center,(current) => {
  console.log(current)
})
</script>

<style scoped>
.mapViewer{
  width: 60vw;
  height: 60vh;
  margin: auto;
}
</style>
