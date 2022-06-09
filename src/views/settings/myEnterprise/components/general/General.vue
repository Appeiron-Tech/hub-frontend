<template>
  <Suspense>
    <template #default>
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
                  v-model="generalInfo.enterpriseName"
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
                <vue-tel-input
                  :inputOptions="{
                    placeholder: $t('general-number-wsp'),
                  }"
                  v-model="generalInfo.ordersNum"
                ></vue-tel-input>
              </div>
              <div class="col-1"></div>
              <div class="col-1"></div>
              <div class="col-10" style="margin-top: 15px">
                <vue-tel-input
                  autoDefaultCountry
                  v-model="generalInfo.mainNum"
                  :inputOptions="{
                    placeholder: $t('general-number-main'),
                  }"
                ></vue-tel-input>
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
                  v-model="generalInfo.currency"
                  :options="generalSettings.$m_generalOptions.currencyOptions"
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
                  v-model="generalInfo.language"
                  :options="availableLanguages"
                />
              </div>
              <div class="col-1"></div>
            </div>
          </div>
        </div>

        <div class="gallery">
          <div
            class="enterpriseSelectDataChild"
            v-for="(question, index) in questionSelectors"
            :key="index"
          >
            <q-select
              :label="question"
              transition-show="scale"
              transition-hide="scale"
              outlined
              map-options
              stack-label
              emit-value
              option-value="optionCode"
              option-label="option"
              v-model="
                generalInfo.answers.filter((e) => e.question === question)[0]
                  .answer
              "
              :options="optionsForSelectors[index]"
              @update:model-value="
                (val) => {
                  selectorChanged(question, val);
                }
              "
            />
          </div>
        </div>

        <div class="gallery-2">
          <div>
            <q-input
              outlined
              v-model="generalInfo.urlFB"
              label="Facebook URL"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
                (val) => validateFbUrl(val) || 'Please enter a valid URL',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="fab fa-facebook" />
              </template>
            </q-input>
          </div>
          <div>
            <q-input
              outlined
              v-model="generalInfo.urlIG"
              label="Instagram URL"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
                (val) => validateIgUrl(val) || 'Please enter a valid URL',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="fab fa-instagram" /> </template
            ></q-input>
          </div>
        </div>

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </template>

    <template #fallback>
      <h3>loading</h3>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { reactive, ref, type Ref, watch, watchEffect } from "vue";
import generalSettings from "./general";
import { VueTelInput } from "vue-tel-input";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import { translate } from "@/plugins/i18n/i18n";
import { validateFbUrl, validateIgUrl, validURL } from "@/utils/validations";
import type { IAnswer } from "./IGeneral";

const app: Controller = injectStrict("appController");
await generalSettings.loadInfo();

const generalInfo = reactive(generalSettings.$m_generalSettingInfo);
console.log("%c⧭", "color: #02ec35", generalInfo);

//TODO: DELETE THIS:
/*const ordersWsp: Ref<number | null> = ref(null);
const principalNum: Ref<number | null> = ref(null);
const currency = ref("PEN");
const availableCurrency: Array<string> = ["PEN", "USD", "EUR"];
const language: Ref<string> = ref("Español");
const availableLanguages: Array<string> = ["Español", "English"];*/

//********* FOLLOWERS **********
const followers: Ref<number | null> = ref(null);

//*******Language
const availableLanguages =
  generalSettings.$m_generalOptions.languageOptions.map((e) => {
    return translate(e);
  });
//************ */

const onSubmit = () => {
  console.log("%c⧭", "color: #99adcc", generalInfo);
};
const onReset = () => {};

const questionSelectors = Object.assign(
  [],
  generalSettings.m_clientQuestions.map((e) => {
    return e.question;
  })
);

const optionsForSelectors = Object.assign(
  [],
  generalSettings.m_clientQuestions.map((e) => {
    return e.options;
  })
);

for (let i = 0; i < questionSelectors.length; i++) {
  //NOTE: I do this to get the compleate object for Question, cause 'questionSelectors' contains only the string word
  const currentCompleateQuestion = generalSettings.m_clientQuestions.find(
    (e) => e.question === questionSelectors[i]
  );
  const a: IAnswer = {
    question: currentCompleateQuestion?.question!,
    answer: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    questionCode: currentCompleateQuestion?.questionCode!,
    questionOptionCode: "",
  };
  if (
    !generalInfo.answers.find(
      (e) => e.question === currentCompleateQuestion?.question
    )
  ) {
    generalInfo.answers?.push(a);
  }
}

console.log("%c⧭", "color: #33cc99", generalInfo);

const selectorChanged = (question: any, val: any) => {
  console.log("%c⧭", "color: #eeff00", val);
  console.log("%c⧭", "color: #ffa280", question);
};

watch(
  () => generalInfo,
  () => {
    console.log("%c⧭", "color: #00258c", generalInfo);
  },
  { immediate: true, deep: true }
);
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
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    margin-left: 9.25%;
    margin-right: 8%;
  }
  .gallery-2 {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 5rem;
    grid-template-columns: repeat(auto-fit, minmax(60rem, 1fr));
    margin-left: 9.25%;
    margin-right: 8%;
  }
}

@media (max-width: 699px) {
  .gallery {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    margin-left: 13%;
    margin-right: 8%;
  }

  .gallery-2 {
    display: grid;
    gap: 1rem;
    grid-auto-rows: 3rem;
    grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
    margin-left: 13%;
    margin-right: 8%;
  }
}

.textView-txt {
  color: black;
  white-space: nowrap;
  margin-top: 10px;
}
</style>
