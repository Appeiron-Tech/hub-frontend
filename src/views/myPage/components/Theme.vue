<template>
  <div class="cardContainer">
    <h6>Opciones de tema</h6>
    <div v-for="(index, color) in colors" :key="index">
      <SingleBtnColor :color="color.toString()" />
    </div>

    <h6>Color secundario</h6>
    <q-color v-model="hex" no-header-tabs class="my-picker" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import SingleBtnColor from "./singleBtnColor.vue";

const hex = ref("#FF00FF");

const colors: Array<any> = ["#FF00FF", "#FF006F", "#FEE0FF"];
const styleColor = (index: number) => {
  return `background-color: v-bind(${colors[index]})`;
};
</script>

<style scoped>
.cardContainer {
  display: block !important;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  max-width: 70vw;
  margin: 10px auto;
}

.color-btn {
  background-color: ;
}
</style>
