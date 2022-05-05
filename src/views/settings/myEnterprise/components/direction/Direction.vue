<template>
  <div class="direction-whole-container">
    <div class="direction-list-child">
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        class="scroll-area"
      >
        <q-intersection
          v-for="(marker, index) in directionController.Stores"
          :key="index"
          transition="flip-right"
          class="example-item"
        >
          <q-item clickable>
            <q-item-section avatar>
              <q-icon name="store" style="color: #049dd9" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Name: {{ marker.store }}</q-item-label>
              <q-item-label style="color: #000000" caption lines="1">{{
                marker.address
              }}</q-item-label>
            </q-item-section>
            <q-item-section avatar @click="editExistingStore(marker)">
              <q-icon name="edit" style="color: #049dd9" />
            </q-item-section>
          </q-item>
        </q-intersection>
      </q-scroll-area>
    </div>
    <div class="direction-map-child">
      <GMapMap
        :center="center"
        :zoom="12"
        map-type-id="terrain"
        class="mapViewer"
      >
        <GMapCluster>
          <GMapMarker
            class="sddsdsdsd"
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :icon="{
              url: 'https://w7.pngwing.com/pngs/601/670/png-transparent-bmw-museum-car-mini-bmw-7-series-bmw-emblem-trademark-logo.png',
              scaledSize: { width: 47, height: 37 },
              labelOrigin: { x: 16, y: -10 },
            }"
            :clickable="true"
            :draggable="true"
            @click="center = m.position"
          />
        </GMapCluster>
      </GMapMap>
    </div>
  </div>

  <div id="app" class="modal-vue">
    <q-btn label="Nueva Tienda" color="primary" @click="openModal" />
    <!-- overlay -->
    <div class="overlay" v-if="opened" @click="opened = false"></div>

    <!-- modal -->
    <div class="modal" v-if="opened">
      <button class="close" @click="opened = false">x</button>
      <h3>{{ modalStoreTitle }}</h3>
      <q-input filled v-model="newStore.store" label="Nombre de la tienda" />
      <br />
      <q-input filled v-model="newStore.description" label="Descripcion" />
      <br />

      <q-separator color="orange" inset />
      <br />
      <GMapAutocomplete
        v-if="isAvailableOnGoogleMaps"
        class="direction-autocompleate"
        placeholder="Ubicacion"
        @place_changed="setPlace"
      >
      </GMapAutocomplete>

      <br />
      <button @click="saveStore">Guardar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
//LINK https://vue-map.netlify.app/components/marker.html
//LINk: https://developers.google.com/maps/documentation/javascript/places-autocomplete
//
import type { Ref } from "vue";
import directionController, {
  type IStore,
} from "@/views/settings/myEnterprise/components/direction/direction";
import { reactive, ref, watch } from "vue";

directionController.loadInfo();

//***************************************************
//******   GOOGLE MAPS LOCALS ***********************
//***************************************************
let markers: Array<{ position: { lat: number; lng: number } }> =
  directionController.Stores.map((e) => {
    return {
      position: {
        lat: e.latitude,
        lng: e.longitude,
      },
    };
  });
const center: any = markers
  .map((e) => {
    return {
      lat: e.position.lat,
      lng: e.position.lng,
    };
  })
  .reduce(function (ac, crrVal) {
    return {
      lat: ac.lat + crrVal.lat,
      lng: ac.lng + crrVal.lng,
    };
  });
center.lat = center.lat / markers.length;
center.lng = center.lng / markers.length;

//***************************************************
//******   GOOGLE MAPS AUTOCOMPLEATE ****************
//***************************************************
//LINK: https://developers.google.com/maps/documentation/places/web-service/details

const setPlace = (e: any) => {
  console.log({ e });
  console.log(e.geometry.viewport);
  console.log({
    position: { lat: e.geometry.viewport.Ab.h, lng: e.geometry.viewport.Va.h },
  });
  newStore.latitude = e.geometry.viewport.Ab.h;
  newStore.longitude = e.geometry.viewport.Va.h;
  newStore.placeLink = e.url;
  newStore.address = e.formatted_address;
  newStore.address_components = e.address_components;
};

//***************************************************
//******  MODAL NEW STORE     ***********************
//***************************************************
const modalStoreTitle: Ref<string> = ref("Nueva Tienda");
const openModal = () => {
  modalStoreTitle.value = "Nueva Tienda";
  newStore.store = "";
  newStore.address = "";
  newStore.cityId = 0;
  newStore.openAlways = 0;
  newStore.description = "";
  newStore.latitude = 0;
  newStore.longitude = 0;
  opened.value = true;
};

const editExistingStore = (store: any) => {
  modalStoreTitle.value = "Editar tienda: " + store.store;
  newStore.store = store.store;
  newStore.description = store.description;
  console.log({ newStore });
  opened.value = true;
  console.log({ store });
};
let newStore: IStore = reactive({
  id: "",
  store: "",
  description: "",
  address: "",
  main: 0,
  latitude: 0,
  longitude: 0,
  openAlways: 0,
  cityId: 0,
});
const opened = ref(false);

const saveStore = () => {
  console.log(newStore);
  if (modalStoreTitle.value === "Nueva Tienda") {
    directionController.saveOrEditNewStore(newStore, true);
  } else {
    directionController.saveOrEditNewStore(newStore, false);
  }

  opened.value = false;
};

const thumbStyle = {
  right: "2px",
  borderRadius: "5px",
  backgroundColor: "#027be3",
  width: "5px",
  opacity: "0.75",
};

const contentStyle = {
  backgroundColor: "#fff",
  color: "#000000",
};

watch(
  () => markers[0].position.lat,
  () => {
    console.log(markers);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
.mapViewer {
  width: 60vw;
  height: 60vh;
  margin: auto;
}

@media (max-width: 499px) {
  .direction-whole-container {
    display: block;
    justify-content: space-around;
    width: 100%;
  }

  .scroll-area {
    margin-top: 5%;
    height: 100px;
    margin-bottom: 10%;
  }
}

@media (min-width: 500px) {
  .direction-whole-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }

  .direction-list-child {
    flex-grow: 1;
  }

  .direction-map-child {
    flex-grow: 1;
    margin-bottom: 5%;
  }

  .scroll-area {
    margin-top: 50%;
    height: 400px;
    width: 320px;
    background-color: #ffffff;
  }
}

.example-item {
  height: 56px;
}

.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}

@media (min-width: 1001px) {
  .modal-vue .modal {
    position: relative;
    width: 40vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -30% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

@media (max-width: 530px) {
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -150% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

@media (min-width: 531px) and (max-width: 1000px) {
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -55% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

.direction-autocompleate {
  width: 37vw !important;
  height: 5vh;
  background-color: #dadada;
  border-radius: 5px;
  border-style: none;
  margin-bottom: 15px;
  padding-left: 10px;
}
</style>
