<template>
  <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
    <div class="mainContainer">
      <div class="selected-options-child"></div>
      <div class="form-cnt">
        <div class="row">
          <div class="col-1"></div>

          <div class="col-10">
            <q-input
              outlined
              :label="$t('general-tab-form-business')"
              v-model="enterpriseName"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </div>
          <div class="col-1"></div>
        </div>
        <br />
        <div class="row phoneNumsCtn">
          <div class="col-1"></div>

          <div class="col-10">
            <vue-tel-input v-model="ordersWsp"></vue-tel-input>
          </div>
          <div class="col-1"></div>
          <div class="col-1"></div>
          <div class="col-10" style="margin-top: 15px">
            <vue-tel-input v-model="principalNum"></vue-tel-input>
          </div>
        </div>
        <br />

        <div class="row">
          <div class="col-1"></div>

          <div class="col-10">
            <q-select
              :label="$t('general-tab-currency')"
              transition-show="scale"
              transition-hide="scale"
              outlined
              v-model="currency"
              :options="generalSettings.CurrencyOptions"
            />
            <br />
          </div>
          <div class="col-1"></div>
        </div>

        <div class="row">
          <div class="col-1"></div>

          <div class="col-10">
            <q-select
              :label="$t('general-tab-form-language')"
              transition-show="scale"
              transition-hide="scale"
              outlined
              v-model="language"
              :options="availableLanguages"
            />
          </div>
          <div class="col-1"></div>
        </div>
      </div>
    </div>

    <div class="gallery">
      <div class="enterpriseSelectDataChild">
        <q-select
          :label="$t('general-tab-form-business-type')"
          transition-show="scale"
          transition-hide="scale"
          outlined
          v-model="language"
          :options="generalSettings.BusinessTypeOptions"
        />
      </div>
      <div class="enterpriseSelectDataChild">
        <q-select
          :label="$t('general-tab-form-business-sell')"
          transition-show="scale"
          transition-hide="scale"
          outlined
          v-model="language"
          :options="availableLanguages"
        />
      </div>
      <div class="enterpriseSelectDataChild">
        <q-select
          :label="$t('general-tab-form-serve-customers')"
          transition-show="scale"
          transition-hide="scale"
          outlined
          v-model="language"
          :options="availableLanguages"
        />
      </div>

      <div class="enterpriseSelectDataChild">
        <q-select
          :label="$t('general-tab-form-followers')"
          transition-show="scale"
          transition-hide="scale"
          outlined
          v-model="language"
          :options="availableLanguages"
        />
      </div>
      <div class="enterpriseSelectDataChild">
        <q-select
          :label="$t('general-tab-form-food-app')"
          transition-show="scale"
          transition-hide="scale"
          outlined
          v-model="language"
          :options="availableLanguages"
        />
      </div>
      <div class="enterpriseSelectDataChild">
        <q-select
          :label="$t('general-tab-form-delivery')"
          transition-show="scale"
          transition-hide="scale"
          outlined
          v-model="language"
          :options="availableLanguages"
        />
      </div>
    </div>

    <div>
      <q-btn label="Submit" type="submit" color="primary" />
      <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref, type Ref } from "vue";
import generalSettings from "./general";
import { VueTelInput } from "vue-tel-input";
import type {Controller} from "@/controller/Controller";
import {injectStrict} from "@/utils/injections";

const app: Controller = injectStrict('appController');

const group = ref([]);
generalSettings.loadInfo();
const $q = useQuasar();
const enterpriseName: Ref<string | undefined> = ref(app.user.m_profile?.tenancies[0].name);
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

.mainContainer {
  display: row;
}
.selected-options-child {
  flex-grow: 0.3;
}

.form-cnt {
  flex-grow: 1;
}
.chb-options {
  color: black;
  margin-top: 30%;
}

.enterpriseSelectDataChild {
  height: 50px !important;
}

.gallery-checkbox {
  position: absolute;
}

@media (min-width: 700px) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 5rem;
    grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
    margin-left: 9.25%;
    margin-right: 8%;
  }
}

@media (max-width: 699px) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
    margin-left: 11%;
    margin-right: 8%;
  }
}

.textView-txt {
  color: black;
  white-space: nowrap;
  margin-top: 10px;
}
</style>
