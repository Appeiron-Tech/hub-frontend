<template>
  <div class="cardContainer">
    <q-badge></q-badge>
    <div class="info-cnt">
      <div
        class="text-h6"
        style="color: #049dd9; text-align: start; margin-left: 10px"
      >
        {{ props.collaborator.name }}

        <br />
        <q-markup-table
          flat
          separator="none"
          style="max-width: 400px; margin-left: 25px"
        >
          <tbody>
            <tr>
              <td>{{ $t("team-card-state") }}</td>
              <td>{{ props.collaborator.isActive ? "Active" : "Inactive" }}</td>
            </tr>
            <tr>
              <td>{{ $t("team-card-email") }}</td>
              <td>{{ props.collaborator.email }}</td>
            </tr>
            <tr>
              <td>{{ $t("team-card-role") }}</td>
              <td>{{ props.collaborator.jobTitle }}</td>
            </tr>
            <tr>
              <td>{{ $t("team-phone-number") }}</td>
              <td>{{ props.collaborator.phone }}</td>
            </tr>
            <tr>
              <td>{{ $t("team-creation-time") }}</td>
              <td>
                {{
                  formatDateToDayMonthYear(
                    new Date(props.collaborator.createdAt)
                  )
                }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </div>
    </div>
    <div class="actio">
      <q-card-actions
        align="between"
        vertical
        class="actions-cnt"
        style="height: 200px"
      >
        <div>
          <q-btn flat round @click="removeCollaborator">
            <q-icon name="close" style="color: #605f5f; font-size: 1.4em"
          /></q-btn>
        </div>
        <div>
          <q-btn flat round @click="editCollaborator">
            <q-icon
              name="mdi-pencil-outline"
              style="color: #049dd9; font-size: 1.4em"
          /></q-btn>
        </div>
      </q-card-actions>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateToDayMonthYear } from "@/utils/dates";
import type { ITeam } from "./models/ITeam";
import teamController from "./models/Team";

const props = defineProps<{
  collaborator: ITeam;
}>();

//LINK: https://www.youtube.com/watch?v=9whgkjxoCME
const emit = defineEmits<{
  (e: "editCollaborator", collaborator: ITeam, payload?: object): void;
}>();

const editCollaborator = () => {
  emit("editCollaborator", props.collaborator);
};

function removeCollaborator() {
  teamController.removeCollaborator(props.collaborator.id);
}
</script>
<style scoped>
.cardContainer {
  display: flex !important;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  padding: 40px;
  background: #fff;
  border-radius: 20px;
  max-width: 70vw;
  margin: 10px auto;
}
.info-cnt {
  flex-grow: 10 !important;
}
.actions-cnt {
  flex-grow: 1;
  justify-content: space-between;
}
</style>
