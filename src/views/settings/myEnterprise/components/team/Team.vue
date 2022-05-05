<template>
  <div class="whole-container">
  <TeamTable/>

  <div id="app" class="modal-vue">
    <q-btn label="Nuevo Integrante" color="primary" @click="openModal"/>
    <!-- overlay -->
    <div class="overlay" v-if="opened" @click="opened = false"></div>

    <!-- modal -->
    <div class="modal" v-if="opened">
      <button class="close" @click="opened = false">x</button>
      <h3>Informacion del nuevo integrante</h3>
      <q-input filled v-model="newMember.name" label="Name" />
      <br>
      <q-input filled v-model="newMember.email" label="Email" />
      <br>
      <q-input filled v-model="newMember.rol" label="Rol" />
      <br>
      <button :disabled="newMember.name.length <=3 && newMember.rol.length <=3 && newMember.email.length <= 3"  @click="saveNewMember">Guardar</button>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import TeamTable from "@/views/settings/myEnterprise/components/team/teamTable/TeamTable.vue";
import teamController from "@/views/settings/myEnterprise/components/team/teamTable/models/Team";
import {onMounted, reactive, ref} from "vue";
const opened = ref(false);

const openModal = () => {
  newMember.rol = '';
  newMember.name = '';
  newMember.email = '';
  opened.value = true;
}
let newMember = reactive({
  name: '',
  email: '',
  rol: ''
})
const saveNewMember = () => {
  console.log(newMember);
  opened.value = false;
}

onMounted(() => {
  teamController.loadInfo();
})
</script>
<style scoped>

.modal-vue .overlay {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);

}


.modal-vue .close {
  position: absolute;
  top: 10px;
  right: 10px;
}

@media (min-width: 1001px) {
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -20% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}

@media (max-width: 530px) {
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -80% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}
@media (min-width: 531px) and (max-width: 1000px){
  .modal-vue .modal {
    position: relative;
    width: 60vw;
    z-index: 9999;
    padding: 20px 30px;
    color: black;
    margin-top: -40% !important;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    backdrop-filter: blur(15px);
  }
}
.whole-container{
  margin-top: 5vh
}
</style>
