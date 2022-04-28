<template>
  <div class="mainContainer">
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-card class="my-cardd" bordered>
        <q-card-section>
          <div class="text-overline subgroupsTittle">Nombre del negocio</div>
          <q-input
            filled
            v-model="enterpriseName"
            label="Enterprise name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
          <q-separator dark />
        </q-card-section>
      </q-card>

      <q-card class="my-cardd" flat bordered>
        <q-card-section>
          <div class="text-overline subgroupsTittle">Numeros telefonicos</div>
          <q-separator spaced dark color="teal-10" />
          <br />
          <div class="row phoneNumsCtn">
            <div class="col-4 ">
              <vue-tel-input inputOptions.placeholder="Orders num" v-model="ordersWsp"></vue-tel-input>
            </div>
            <div class="col-4">
              <vue-tel-input v-model="principalNum"></vue-tel-input>
            </div>
          </div>
          <br />
        </q-card-section>
      </q-card>

      <q-card class="my-cardd" bordered>
        <q-card-section>
          <div class="text-overline subgroupsTittle">Moneda</div>
          <q-select
            label="Scale"
            transition-show="scale"
            transition-hide="scale"
            filled
            v-model="currency"
            :options="availableCurrency"
          />
          <q-separator dark />
        </q-card-section>
      </q-card>

      <q-card class="my-cardd" bordered>
        <q-card-section>
          <div class="text-overline subgroupsTittle">Idioma</div>
          <q-select
            label="Scale"
            transition-show="scale"
            transition-hide="scale"
            filled
            v-model="language"
            :options="availableLanguages"
          />
          <q-separator dark />
        </q-card-section>
      </q-card>


      <q-card class="my-cardd" bordered>
        <q-card-section>
          <div class="text-overline subgroupsTittle">Datos de la empresa</div>
          <div class=" enterpriseSelectData">
            <div class="enterpriseSelectDataChild">
              <q-select
                label="Scale"
                transition-show="scale"
                transition-hide="scale"
                filled
                v-model="language"
                :options="availableLanguages"
              />
            </div>
            <div class="enterpriseSelectDataChild">
              <q-select
                label="Scale"
                transition-show="scale"
                transition-hide="scale"
                filled
                v-model="language"
                :options="availableLanguages"
              />
            </div>
            <div class="enterpriseSelectDataChild">
              <q-select
                label="Scale"
                transition-show="scale"
                transition-hide="scale"
                filled
                v-model="language"
                :options="availableLanguages"
              />
            </div>
          </div>
          <div class=" enterprisescndSelectData">
            <div class="enterpriseSelectDataChild">
              <q-select
                label="Scale"
                transition-show="scale"
                transition-hide="scale"
                filled
                v-model="language"
                :options="availableLanguages"
              />
            </div>
            <div class="enterpriseSelectDataChild">
              <q-select
                label="Scale"
                transition-show="scale"
                transition-hide="scale"
                filled
                v-model="language"
                :options="availableLanguages"
              />
            </div>
            <div class="enterpriseSelectDataChild">
              <q-select
                label="Scale"
                transition-show="scale"
                transition-hide="scale"
                filled
                v-model="language"
                :options="availableLanguages"
              />
            </div>

          </div>
          <q-separator dark />
        </q-card-section>
      </q-card>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref, type Ref } from "vue";
import generalSettings from "./general";
import { VueTelInput } from "vue-tel-input"
const $q = useQuasar();
const enterpriseName: Ref<string | null> = ref(null);
const ordersWsp: Ref<number | null> = ref(null);
const principalNum: Ref<number | null> = ref(null);
const currency = ref("PEN");
const availableCurrency: Array<string> = ["PEN", "USD", "EUR"];
const language: Ref<string> = ref("Español");
const availableLanguages: Array<string> = ["Español", "English"];
</script>

<style scoped>
.subgroupsTittle {
  color: black;
}
.my-cardd {
  width: 90vw;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
}
.mainContainer {
  align-items: center;
  justify-content: center;
  height: 100%;
}
.enterpriseSelectData{
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.enterpriseSelectDataChild{
  width: 30vw;
}

.enterprisescndSelectData{
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.phoneNumsCtn{
  margin-left: 15%;
  margin-right: 15%;
  gap: 15px;
  width: 90%;
}
</style>
