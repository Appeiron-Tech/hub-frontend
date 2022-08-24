<template>
  <q-card
    class="my-card"
    flat
    bordered
  >
    <q-card-section>
      <div class="row justify-between q-my-sm">
        <div class="col">
          <p style="font-weight: bold; opacity: 0.6 !important;">
            {{ cardSection.config.title }}
          </p>
        </div>
        <div v-if="cardSection.config.show !== undefined" class="col-2">
        show: {{cardSection.config.show}}
          <q-toggle v-model="cardSection.config.show" style="float: right;"/>
        </div>
      </div>
      <div v-if="cardSection.config.description" class="row justify-center q-my-sm">
        <div class="col-4" style="text-align: center;">
          <q-input
            borderless
            input-style="text-align: center;"
            v-model="cardSection.config.description"
            autogrow
          />
        </div>
        <div class="col-12" style="text-align: center;">
          <span>{{cardSection.config.description}}</span><q-icon name="edit" />
        </div>
      </div>

      <div
        class="row q-gutter-none"
        style="width: 100%"
      >
        <div class="col-12">
          <slot>
          </slot>
        </div>
        <q-inner-loading
          :showing="cardSection.config.loading"
          label="Please wait..."
          label-style="font-size: 1.1em"
        >
          <q-spinner-bars color="purple" />
        </q-inner-loading>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';
import type { CCardFormWrapper } from './CardFormWrapper';

export interface ICardFormWrapper {
  config: CCardFormWrapper
}

const cardSection = defineProps<ICardFormWrapper>()

</script>