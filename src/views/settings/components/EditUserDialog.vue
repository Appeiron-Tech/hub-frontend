<template>

    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Edit user
          <q-btn
            style="margin-left: 300px"
            icon="close"
            flat
            round
            dense
            v-close-popup
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input outlined v-model="props.user.firstName" label="First name" :rules="[val => !!val || 'Field is required']" />
        <br />
        <q-input outlined v-model="props.user.lastName" label="Last name" :rules="[val => !!val || 'Field is required']" />
        <br />
        <q-input outlined v-model="props.user.userName" label="Username" :rules="[val => !!val || 'Field is required']" />
        <br />
        <q-input outlined v-model="props.user.country" label="Country" :rules="[val => !!val || 'Field is required']"/>
        <br />
        <q-input outlined v-model="props.user.language" label="Language" :rules="[val => !!val || 'Field is required']" />
        <br />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          style="background-color: green; color: white"
          label="Guardar"
          v-close-popup
          @click="saveUser"
        />
      </q-card-actions>
    </q-card>

</template>

<script setup lang="ts">
import {defineProps, type Ref} from "vue";
import type {IProfileForEditing} from "@/models/user/IUser";

const props = defineProps<{
  user: IProfileForEditing
}>();

const emits = defineEmits<{
  (e: 'userSaved', user: IProfileForEditing): void;
}>();

const saveUser = () => {
  emits('userSaved', props.user);
}
</script>

<style scoped>

</style>