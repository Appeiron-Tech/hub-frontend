<template>
  <q-btn round class="color-btn" />
</template>

<script lang="ts" setup>
const props = defineProps<{
  color: string;
}>();
const color = props.color;

console.log("%c⧭", "color: #00a3cc", props);
</script>
<style scoped>
.color-btn {
  background-color: v-bind(color);
}
</style>
