<template>
  <div class="q-pa-md">
    <q-layout view="hHh Lpr lff" container style="height: 300px" class="shadow-2 rounded-borders">
      <q-header elevated class="bg-black">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>Header</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item clickable :active="menuItem.label === 'Outbox'" v-ripple>
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding>
          <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<script setup lang="ts">
//LINK: https://github.com/yaminncco/vue-sidebar-menu/tree/next
//link: https://yaminncco.github.io/vue-sidebar-menu/#/basic-usage
import { watch, type Ref } from "vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import router from "@/plugins/router";
import type { Controller } from "@/controller/Controller";
import { injectStrict } from "@/utils/injections";
import sharedAttributes from "./shared";

//const app: Controller = injectStrict("appController");
const { t } = useI18n();

const menuList = [
  {
    icon: 'inbox',
    label: 'Inbox',
    separator: true
  },
  {
    icon: 'send',
    label: 'Outbox',
    separator: false
  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false
  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true
  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false
  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false
  }
]

// TODO: Borrar esto
//menu = menu.filter((e) => e.title != t("toolbar-enterprise-my-page"));

const isMobile: boolean = window.innerWidth < 700;

const userProfileImage: Ref<string> = ref(
  "https://d2qp0siotla746.cloudfront.net/img/use-cases/profile-picture/template_3.jpg"
);
const userName: Ref<string> = ref("Lola Lola");
const userEmail: Ref<string> = ref("lolalola@gmail.com");
const persistanceMenu: Ref<boolean> = isMobile ? ref(false) : ref(true);

const goToSetting = () => {
  router.push("/settings");
};

const doLogout = async () => {
  console.log("Loging out");
  //await app.user.logout();
  //router.push("/login");
};
const drawer = ref(false);

const onItemClick = (event: any, item: any) => {
  console.log("%c⧭", "color: #ff0000", event);
  console.log("%c⧭", "color: #ff0000", item);
};

const onMenuShowen = () => {
  sharedAttributes.isSideBarExpanded = true;
};

const onMenuHidden = () => {
  sharedAttributes.isSideBarExpanded = false;
};

watch(
  () => sharedAttributes.isSideBarExpanded,
  () => {
    console.log(sharedAttributes.isSideBarExpanded);
  },
  { immediate: true, deep: true }
);

//window.innerWidth
</script>

<style lang="scss" scoped>
.menu-ctn {
  min-height: 1000px;
  min-width: 300px;
}

.informationContainer {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.informationItems {
  display: inline-block;
  text-align: center;
}

.my-sidebar {
  margin-top: 50px;
  border-top-right-radius: 1%;
}

.my-toolbar {
  background-color: #2a2a2e;
}

.informationItems {
  display: inline-block;
  text-align: center;
}
.email-chip {
  background-color: transparent;
  color: aliceblue;
}
</style>
