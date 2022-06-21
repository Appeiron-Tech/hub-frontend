<template>
  <q-img
    class="logo-img"
    v-if="props.imageUrl && props.imageUrl.length > 0"
    fit="fill"
    clickable
    :src="props.imageUrl"
  >
    <q-icon
      class="absolute all-pointer-events logo-icon"
      size="32px"
      name="info"
      color="black"
    ></q-icon>
    <q-tooltip
      class="bg-indigo"
      transition-show="scale"
      transition-hide="scale"
      :offset="[10, 10]"
    >
      {{ tooltipMsg }}
    </q-tooltip>
  </q-img>
  <q-img
    class="logo-img"
    fit="fill"
    clickable
    v-else
    src="@/assets/no_image.jpg"
  >
    <q-icon
      class="absolute all-pointer-events"
      size="32px"
      name="info"
      color="black"
      style="top: 50%; left: 8px"
    ></q-icon>
    <q-tooltip
      class="bg-indigo"
      transition-show="scale"
      transition-hide="scale"
      :offset="[10, 10]"
    >
      {{ tooltipMsg }}
    </q-tooltip>
  </q-img>
</template>

<script lang="ts" setup>
const props = defineProps<{
  tooltipMsg: string;
  imageUrl: string | null;
}>();
</script>

<style scoped>
.logo-img {
  cursor: pointer;
}

.logo-icon:hover {
  top: 50%;
  left: 50%;
  bottom: 50%;
  right: 50%;
}

.logo-icon {
  display: none !important;
}
</style>
