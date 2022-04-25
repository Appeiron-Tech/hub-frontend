<template>
  <q-toolbar class="text-primary my-toolbar">
    <q-btn flat round dense icon="menu" />
    <q-toolbar-title>
      Nombre de la empresa
    </q-toolbar-title>

    <q-menu persistent>
    <sidebar-menu class="my-sidebar" :menu="menu" :collapsed="isMobile" />
    </q-menu>
  </q-toolbar>
</template>

<script setup lang="ts">
//LINK: https://github.com/yaminncco/vue-sidebar-menu/tree/next
//link: https://yaminncco.github.io/vue-sidebar-menu/#/basic-usage
const menu = [
  {
    header: true,
    title: 'AppName',
    hiddenOnCollapse: true
  },
  {
    href: '/stats',
    title: 'Estadistica',
    icon: 'fa fa-chart-line'
  },
  {
    href: '/mypage',
    title: 'Mi Pagina',
    icon: 'fa fa-star',
    child: [
      {
        href: '/productsconfig',
        title: 'Productos',
        icon: 'fa fa-briefcase'
      }
    ]
  },
  {
    href: '/clients',
    title: 'Mis clientes',
    icon: 'fa fa-handshake',
  },
  {
    header: 'Div'
  },
  {
    href: '/orders',
    title: 'Pedidos',
    icon: 'fa fa-arrow-down',
    child: [
      {
        href: '/stats',
        title: 'Historico',
        icon: 'fa fa-certificate',
      }
    ]
  },
  {
    href: '/inventoryprd',
    title: 'Inventario',
    icon: 'fa fa-barcode',
  }
]

const isMobile: boolean = window.innerWidth < 700;

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
.my-sidebar{
  margin-top: 50px;
  border-top-right-radius: 1%;
}
.my-toolbar{
  background-color: #2a2a2e;
}
</style>