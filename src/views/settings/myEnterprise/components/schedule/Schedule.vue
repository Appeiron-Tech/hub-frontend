<template>
  <div class="text-h4 subtitle-crs">
    Permite al cliente saber los horarios de atención
  </div>

  <div class="mainCrd">
    <q-card class="my-card" flat>
      <q-card-section>
        <template v-for="(day, index) in days">
          <q-item tag="label" class="itemContainer">
            <div class="items-hours-containar">
              <div class="item-laber-day">
                <q-item-section>
                  <q-item-label>{{ day.val }}</q-item-label>
                </q-item-section>

                <q-item-section side class="togglebtn">
                  <q-toggle
                    color="green"
                    v-model="day.active"
                    val="battery"
                    checked-icon="schedule"
                    unchecked-icon="event_busy"
                  />
                </q-item-section>
              </div>
              <div class="first-hours-child">
                <q-item-section v-if="day.active">
                  <div class="">
                    <q-input
                      v-model="day.from[0]"
                      mask="time"
                      outlined
                      style="max-width: 150px; margin-left: 15px"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="proxyTime">
                              <div
                                class="row items-center justify-end q-gutter-sm"
                              >
                                <q-btn
                                  label="Cancel"
                                  color="primary"
                                  flat
                                  v-close-popup
                                />
                                <q-btn
                                  label="OK"
                                  color="primary"
                                  flat
                                  @click="saveFrom(index, 0)"
                                  v-close-popup
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-item-section>

                <q-item-section v-if="day.active">
                  <div class="">
                    <q-input
                      v-model="day.to[0]"
                      mask="time"
                      outlined
                      style="max-width: 150px; margin-left: 15px"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="proxyTime">
                              <div
                                class="row items-center justify-end q-gutter-sm"
                              >
                                <q-btn
                                  label="Cancel"
                                  color="primary"
                                  flat
                                  v-close-popup
                                />
                                <q-btn
                                  label="OK"
                                  color="primary"
                                  flat
                                  @click="saveTo(index, 0)"
                                  v-close-popup
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-item-section>
              </div>

              <div :class="day.hasMoreThanOneHour ? 'second-hours-child' : ''">
                <q-item-section v-if="day.hasMoreThanOneHour && day.active">
                  <div class="">
                    <q-input
                      v-model="day.from[1]"
                      mask="time"
                      outlined
                      style="max-width: 150px; margin-left: 15px"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="proxyTime">
                              <div
                                class="row items-center justify-end q-gutter-sm"
                              >
                                <q-btn
                                  label="Cancel"
                                  color="primary"
                                  flat
                                  v-close-popup
                                />
                                <q-btn
                                  label="OK"
                                  color="primary"
                                  flat
                                  @click="saveFrom(index, 1)"
                                  v-close-popup
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-item-section>

                <q-item-section v-if="day.hasMoreThanOneHour && day.active">
                  <div class="">
                    <q-input
                      v-model="day.to[1]"
                      mask="time"
                      outlined
                      style="max-width: 150px; margin-left: 15px"
                      :rules="['time']"
                    >
                      <template v-slot:append>
                        <q-icon name="access_time" class="cursor-pointer">
                          <q-popup-proxy
                            cover
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-time v-model="proxyTime">
                              <div
                                class="row items-center justify-end q-gutter-sm"
                              >
                                <q-btn
                                  label="Cancel"
                                  color="primary"
                                  flat
                                  v-close-popup
                                />
                                <q-btn
                                  label="OK"
                                  color="primary"
                                  flat
                                  @click="saveTo(index, 1)"
                                  v-close-popup
                                />
                              </div>
                            </q-time>
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </div>
                </q-item-section>
              </div>
              <div class="item-hours-actins">
                <q-btn
                  v-if="day.active"
                  round
                  :color="day.hasMoreThanOneHour ? 'red' : 'blue'"
                  :icon="day.hasMoreThanOneHour ? 'close' : 'add'"
                  @click="addHours(index)"
                  class="btn-add-hours"
                />
                <h6
                  style="
                    max-width: 50px;
                    font-size: 12px;
                    white-space: nowrap;
                    color: red;
                  "
                  v-if="day.hasErrorFormat"
                >
                  Hours are incompatible
                </h6>
              </div>
            </div>
          </q-item>
        </template>
      </q-card-section>
      <q-card-actions class="actions-schedule">
        <q-btn align="between" color="green" @click="saveSchedule"
          >Guardar</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { ref } from "vue";

const saveFrom = (e: any, hourIndex: number) => {
  days.value[e].from[hourIndex] = proxyTime.value;
  if (days.value[e].hasMoreThanOneHour) {
    days.value[e].hasErrorFormat =
      days.value[e].from[1] <= days.value[e].to[0] ||
      days.value[e].from[1] <= days.value[e].from[0];
  }
};

const saveTo = (e: any, hourIndex: number) => {
  days.value[e].to[hourIndex] = proxyTime.value;
  if (!days.value[e].hasMoreThanOneHour) {
    days.value[e].hasErrorFormat = days.value[e].to[0] <= days.value[e].from[0];
  } else if (days.value[e].hasMoreThanOneHour) {
    days.value[e].hasErrorFormat =
      days.value[e].to[1] <= days.value[e].from[1] ||
      days.value[e].to[1] <= days.value[e].to[0];
  }
};

const proxyTime = ref("");
const days: Ref<
  Array<{
    val: string;
    active: boolean;
    from: Array<string>;
    to: Array<string>;
    hasErrorFormat: boolean;
    hasMoreThanOneHour: boolean;
  }>
> = ref([
  {
    val: "Lunes",
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false,
  },
  {
    val: "Martes",
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false,
  },
  {
    val: "Miercoles",
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false,
  },
  {
    val: "Jueves",
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false,
  },
  {
    val: "Viernes",
    active: false,
    hasErrorFormat: false,
    from: [],
    to: [],
    hasMoreThanOneHour: false,
  },
]);

const saveSchedule = () => {
  console.table(days.value);
  console.log(days.value);
};

const addHours = (index: any) => {
  days.value[index].hasMoreThanOneHour = !days.value[index].hasMoreThanOneHour;
  if (!days.value[index].hasMoreThanOneHour) {
    days.value[index].from.pop();
    days.value[index].to.pop();
  }
};
</script>

<style scoped>
.my-card {
  color: #111111;
  background-color: #ffffff;
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
    flex-wrap: nowrap;
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

.subtitle-crs {
  color: #605f5f;
  margin-bottom: 15px;
  text-align: left;
  font-size: medium;
}

.actions-schedule {
  margin-left: 40%;
}
</style>
