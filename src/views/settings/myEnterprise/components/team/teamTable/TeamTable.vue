<template>
  <div class="q-pa-md">
    <q-table
      title="Team"
      :rows="rows"
      :columns="columns"
      row-key="name"
      v-model:pagination="pagination"
      hide-pagination
      separator="none"
      rows-per-page-label="Total team per page"
    />

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {ITeam} from "@/views/settings/myEnterprise/components/team/teamTable/models/Team";
import {computed, reactive, ref, watch} from "vue";
import teamController from "@/views/settings/myEnterprise/components/team/teamTable/models/Team";

const columns = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row: { name: any }) => row.name,
    format: (val: any) => `${val}`,
  },
  {name: 'email', align: 'center', label: 'E-mail', field: 'email', sortable: true},
  {name: 'rol', align: 'center', label: 'Rol', field: 'rol'},
];

let rows: Array<ITeam> =reactive([]);

const pagination = ref({
  sortBy: 'desc',
  descending: false,
  page: 1,
  rowsPerPage: 5
  // rowsNumber: xx if getting data from a server
})

const pagesNumber= computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))

watch(
  () => teamController.TeamList,
  () => {
    const newRow = teamController.TeamList
    rows.splice(0, rows.length, ...newRow)
  },
  {immediate: true, deep: true}
)
</script>
<style scoped></style>
