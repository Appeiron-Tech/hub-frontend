<template>
  <PageWrapper :dateSelector="true">
    <div class="row q-gutter-none q-mb-md">
			<div
				v-for="(cardArea, idx) in cardsArea"
				:key="'card_' + idx"
				class="col-12 col-sm-4 q-px-xs"
			>
				<CardArea
					v-bind="cardArea"
					@selected="cardSelected"
				/>
			</div>
		</div>
		
  </PageWrapper>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import {CARD_CODES} from './IDashboard'

// Components
import PageWrapper from "@/components/pageWrapper/PageWrapper.vue";
import CardArea, { type ICardArea } from "./components/cardArea/CardArea.vue";


// ********
const app: Controller = injectStrict("appController");


/*************
Cards Area ***
**************/

const cardsArea: Array<ICardArea> = reactive([
  {
    code: CARD_CODES.SALES_NUMBER,
    title: "Cantidad de ventas",
    value: computed(() => "23 ventas"),
    diffs: computed(() => 11),
    from: "02/19/2020",
    to: "04/10/2022",

    color: "#7cb5ec",
    active: false,
    loading: computed(() => false)
  },
  {
    code: CARD_CODES.SALES_AMOUNT,
    title: "Ventas S/.",
    value: computed(() => 1235.31),
    diffs: computed(() => 23),
    from: "02/19/2020",
    to: "04/10/2022",

    color: "#7cb5ec",
    active: false,
    loading: computed(() => false)
  },
  {
    code: CARD_CODES.TICKETS,
    title: "Ticket medio",
    value: computed(() => "S/. 32.11"),
    diffs: computed(() => 18),
    from: "02/19/2020",
    to: "04/10/2022",

    color: "#7cb5ec",
    active: false,
    loading: computed(() => false)
  }
])

const cardSelected = function(cardCode : CARD_CODES): void{
  cardsArea.forEach((card: ICardArea) => card.active = card.code === cardCode)
}

</script>

<style scoped></style>
