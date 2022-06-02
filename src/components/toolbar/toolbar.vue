<template>
  <h2>tooolbar</h2>
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
    icon: "inbox",
    label: "Inbox",
    separator: true,
  },
  {
    icon: "send",
    label: "Outbox",
    separator: false,
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false,
  },
  {
    icon: "error",
    label: "Spam",
    separator: true,
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false,
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false,
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false,
  },
];

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
  //await app.user.logout();
  //router.push("/login");
};
const drawer = ref(false);

const onItemClick = (event: any, item: any) => {};

const onMenuShowen = () => {
  sharedAttributes.isSideBarExpanded = true;
};

const onMenuHidden = () => {
  sharedAttributes.isSideBarExpanded = false;
};

watch(
  () => sharedAttributes.isSideBarExpanded,
  () => {},
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
