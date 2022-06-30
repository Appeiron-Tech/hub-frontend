<template>
  <Suspense>
    <template #default>
      <div class="row">
      <div class="cardContainer col-xl-10 col-md-10 col-sm-12">
        <UsersView  />
      </div>
      </div>
    </template>
    <template #fallback>
      <h5>cargando</h5>
    </template>
  </Suspense>

</template>

<script lang="ts" setup>


import UsersView from "@/views/charts/components/usersViews/usersView.vue";

</script>

<style scoped>
.cardContainer {
  display: flex !important;
  box-shadow: 0px 5px 10px 0px rgba(0, 255, 255, 0.7);
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  max-width: 70vw;
  margin: 10px auto;
  justify-content : center;
}
</style>