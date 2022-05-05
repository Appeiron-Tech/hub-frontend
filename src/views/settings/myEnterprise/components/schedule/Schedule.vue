<template>
  <div class=" mainCrd">
    <q-card class="my-card">
      <q-card-section>
        <template
          v-for="(day, index) in days"
        >

          <q-item tag="label" class="itemContainer">
            <div class="items-hours-containar">
              <div class="item-laber-day">
                <q-item-section>
                  <q-item-label>{{ day.val }}</q-item-label>
                </q-item-section>

                <q-item-section side class="togglebtn">
                  <q-toggle  color="blue" v-model="day.active" val="battery"/>
                </q-item-section>
              </div>
              <div class="first-hours-child">
                <q-item-section v-if="day.active">
                  <div class="">
                    <div class="">
                      <q-badge color="teal">
                        From: {{ day.from[0] }}
                      </q-badge>
                    </div>

                    <q-btn icon="access_time" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="proxyTime">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup/>
                            <q-btn label="OK" color="primary" flat @click="saveFrom(index, 0)" v-close-popup/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </q-item-section>


                <q-item-section v-if="day.active">
                  <div class="">
                    <div class="">
                      <q-badge color="teal">
                        To: {{ day.to[0] }}
                      </q-badge>
                    </div>

                    <q-btn icon="access_time" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="proxyTime">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup/>
                            <q-btn label="OK" color="primary" flat @click="saveTo(index, 0)" v-close-popup/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </q-item-section>
              </div>

              <div :class="day.hasMoreThanOneHour ? 'second-hours-child': '' ">
                <q-item-section v-if="day.hasMoreThanOneHour && day.active">
                  <div class="">
                    <div class="">
                      <q-badge color="teal">
                        From: {{ day.from[1] }}
                      </q-badge>
                    </div>

                    <q-btn icon="access_time" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="proxyTime">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup/>
                            <q-btn label="OK" color="primary" flat @click="saveFrom(index, 1)" v-close-popup/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </q-item-section>


                <q-item-section v-if="day.hasMoreThanOneHour && day.active">
                  <div class="">
                    <div class="">
                      <q-badge color="teal">
                        To: {{ day.to[1] }}
                      </q-badge>
                    </div>

                    <q-btn icon="access_time" round color="primary">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="proxyTime">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup/>
                            <q-btn label="OK" color="primary" flat @click="saveTo(index, 1)" v-close-popup/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-btn>
                  </div>
                </q-item-section>
              </div>
              <div class="item-hours-actins">
                <q-btn v-if="day.active" round color="primary" :icon="day.hasMoreThanOneHour? 'delete': 'add'"
                       @click="addHours(index)" class="btn-add-hours"/>
                <h6 v-if="day.hasErrorFormat">Hours are incomsdspatible</h6>
              </div>
            </div>
          </q-item>

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


const saveFrom = (e: any, hourIndex: number) => {
  days.value[e].from[hourIndex] = proxyTime.value;
  if (days.value[e].hasMoreThanOneHour) {
    days.value[e].hasErrorFormat = days.value[e].from[1] <= days.value[e].to[0] || days.value[e].from[1] <= days.value[e].from[0];
  }
}

const saveTo = (e: any, hourIndex: number) => {
  days.value[e].to[hourIndex] = proxyTime.value;
  if (!days.value[e].hasMoreThanOneHour) {
    days.value[e].hasErrorFormat = days.value[e].to[0] <= days.value[e].from[0];
  } else if (days.value[e].hasMoreThanOneHour) {
    days.value[e].hasErrorFormat = days.value[e].to[1] <= days.value[e].from[1] || days.value[e].to[1] <= days.value[e].to[0];
  }
}


const proxyTime = ref('');
const days: Ref<Array<{ val: string, active: boolean, from: Array<string>, to: Array<string>, hasErrorFormat: boolean, hasMoreThanOneHour: boolean }>> = ref([
  {
    val: 'Lunes',
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false
  }, {
    val: 'Martes',
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false
  }, {
    val: 'Miercoles',
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false
  }, {val: 'Jueves', active: false, hasErrorFormat: false, from: [], to: [], hasMoreThanOneHour: false}, {
    val: 'Viernes',
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false
  }])

const saveSchedule = () => {
  console.table(days.value)
  console.log(days.value)
}

const addHours = (index: any) => {
  days.value[index].hasMoreThanOneHour = !days.value[index].hasMoreThanOneHour;
  if(!days.value[index].hasMoreThanOneHour){
    days.value[index].from.pop();
    days.value[index].to.pop();
  }
}
</script>

<style scoped>

.my-card {
  color: #d8d8dc;
  background-color: #3f3f42;
}

@media (min-width: 580px) {
  .mainCrd {
    height: 60vh;
    width: 60vw;
    margin: auto auto;
  }

  .itemContainer {

  }

  .btn-add-hours {

  }

  .items-hours-containar {
    display: flex;

    min-width: 100%;

  }

  .item-laber-day {
    flex-grow: 1;
  }

  .item-hours-actins {
    flex-grow: 1;
  }

  .first-hours-child {
    flex-grow: 1;
    display: flex;
  }

  .second-hours-child {
    flex-grow: 1;
    display: flex;
  }
}

@media (max-width: 579px) {

  .mainCrd {
    height: 80vh;
    width: 90vw;
  }

  .itemContainer {

  }

  .btn-add-hours {
    margin-top: 100%;
  }

  .items-hours-containar {
    width: 100vw;
    display: flex;
    gap: 5px;
  }

  .first-hours-child {
    flex-grow: 1;
  }

  .second-hours-child {
    flex-grow: 1;
  }
}


</style>