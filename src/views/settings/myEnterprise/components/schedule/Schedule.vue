<template>
  <div class=" mainCrd">
    <q-card class="my-card">
      <q-card-section>
        <template
        v-for="(day, index) in days"
        >
          <div >
          <q-item tag="label" class="itemContainer">
            <q-item-section>
              <q-item-label>{{day.val}}</q-item-label>
            </q-item-section>
            <q-item-section side >
              <q-toggle color="blue" v-model="day.active" val="battery" />
            </q-item-section>
            <q-item-section v-if="day.active">
              <div class="q-pa-md">
                <div class="q-mb-sm">
                  <q-badge color="teal">
                    From: {{ day.from }}
                  </q-badge>
                </div>

                <q-btn icon="access_time" round color="primary">
                  <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="proxyTime">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat @click="saveFrom(index)" v-close-popup />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-btn>
              </div>
            </q-item-section>


            <q-item-section v-if="day.active">
              <div class="q-pa-md">
                <div class="q-mb-sm">
                  <q-badge color="teal">
                    From: {{ day.to }}
                  </q-badge>
                </div>

                <q-btn icon="access_time" round color="primary">
                  <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="proxyTime">
                      <div class="row items-center justify-end q-gutter-sm">
                        <q-btn label="Cancel" color="primary" flat v-close-popup />
                        <q-btn label="OK" color="primary" flat @click="saveTo(index)" v-close-popup />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-btn>
              </div>
            </q-item-section>
          </q-item>
          </div>
        </template>
      </q-card-section>
      <q-card-actions>
        <q-btn flat @click="saveSchedule">Guardar</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type {Ref} from "vue";
import {ref} from "vue";
const saveFrom = (e: any) => {
  console.log({e});
  days.value[e].from = proxyTime.value;
}

const saveTo = (e: any) => {
  console.log({e});
  days.value[e].to = proxyTime.value;
}

//TODO: para el LUNESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
//TODO: para agregar horas, pon un boton de if dentro del if y que se agregue otro
//TODO: campo abajo,
//TODO: entonces from y to sería asi:
//TODO: from: Array<string>; to: Array<string>

const proxyTime = ref('');
const days: Ref<Array<{val: string, active: boolean, from?: string, to?: string}>> = ref([{val: 'Lunes', active: false}, {val: 'Martes', active: false}, {val: 'Miercoles', active: false}, {val: 'Jueves', active: false},{val: 'Viernes', active: false}])

const saveSchedule = ()=> {
  console.table(days.value)
}
</script>

<style scoped>
.mainCrd{
  height: 60vh ;
  width: 60vw ;
}
.my-card{
  color: #2a2a2e;
}
.itemContainer{
  background-color: #42b983;
}
</style>