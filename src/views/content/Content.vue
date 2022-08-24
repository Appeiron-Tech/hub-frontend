<template>
  <PageWrapper>
    <div class="row q-gutter-none q-mb-md">
			<q-btn @click="test">Test</q-btn>
      <div class="col-12 q-px-xs">
				enterpriseName: {{enterpriseName}}
				<CardFormWrapper :config="enterpriseName">

				</CardFormWrapper>
			</div>
		</div>
	</PageWrapper>
</template>
<script setup lang="ts">
// Components
import PageWrapper from "@/components/pageWrapper/PageWrapper.vue";
import { computed } from "@vue/reactivity";
import { reactive, ref } from "vue";
import { CCardFormWrapper } from "./components/cardFormWrapper/CardFormWrapper";
import CardFormWrapper from "./components/cardFormWrapper/CardFormWrapper.vue";
import type { ICardFormWrapper } from "./components/cardFormWrapper/ICardFormWrapper";

// const enterpriseName: CCardFormWrapper = reactive({
// 	title: "TITLE",
// 	description: "Appeiron Tech",
// 	show: true
// })

const formConfig: ICardFormWrapper = {
	title: "TITLE",
	description: "Appeiron Tech",
	show: true
}

const enterpriseName = new CCardFormWrapper(formConfig)

const test = () => { 
	console.log("**** Test:", enterpriseName)
}

</script>
<style scoped>
</style>