<template>
  <div class="column" style="height: 85vh">
    <div class="col-4 first-container">
      <div class="text-h4" style="margin-left: 10px; margin-top: 10px">
        Ajustes de la cuenta
      </div>
    </div>
    <div class="col-8 second-container">
      <SettingCard @tenancy-selected="tenancyWasSelected" />
      <q-btn label="Edit" color="green" @click="editUser" />
    </div>
  </div>
  <q-dialog v-model="alert">
    <TenanciesDialog
      :tenancy-selected="tenancySelected"
      @close-dialog="alert = false"
    />
  </q-dialog>

  <q-dialog v-model="modelForEditUser">
    <EditUserDialog :user="editedUser" @user-saved="saveUser" />
  </q-dialog>
</template>

<script setup lang="ts">
import SettingCard from "@/views/settings/components/SettingCard.vue";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import { reactive, ref } from "vue";
import type {
  IProfile,
  IProfileForEditing,
  ITenancies,
} from "@/models/user/IUser";
import type User from "@/models/user/User";
import EditUserDialog from "@/views/settings/components/EditUserDialog.vue";
import TenanciesDialog from "@/views/settings/components/TenanciesDialog.vue";
import settingsController from "@/views/settings/Settings";
const app: Controller = injectStrict("appController");
const alert = ref(false);
const modelForEditUser = ref(false);

let tenancySelected: ITenancies = reactive(app.user.m_profile?.tenancies[0]!);
const tenancyWasSelected = (tenancyName: string, tenancy: ITenancies) => {
  tenancySelected = Object.assign({}, tenancy);
  alert.value = true;
};

const editedUser: IProfileForEditing = reactive({
  language: "",
  lastName: "",
  firstName: "",
  country: "",
  userName: "",
  rol: "",
  password: "",
});
function editUser() {
  //TODO: i this this should not work like this
  //TODO do i really need to pass the password???
  editedUser.language = app.user.m_profile?.language ?? "";
  editedUser.lastName = app.user.m_profile?.lastName ?? "";
  editedUser.userName = app.user.m_profile?.userName ?? "";
  editedUser.country = app.user.m_profile?.country ?? "";
  editedUser.firstName = app.user.m_profile?.firstName ?? "";
  editedUser.rol = "";
  editedUser.password = app.user.m_profile?.password ?? "";
  modelForEditUser.value = true;
}

const saveUser = async (user: IProfileForEditing) => {
  await settingsController.saveEditedUser(user, app.user.m_profile?.email!);
};
</script>

<style scoped>
.first-container {
  background-color: #23c6ff;
  color: #f0f7fb;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.second-container {
  background-color: #fff;
}
</style>
