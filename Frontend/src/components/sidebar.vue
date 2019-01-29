<template lang="html">
  <div class="parentx-static">

    <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer v-model="active">

      <div class="header-sidebar" slot="header">
      <h1><i class="fa fa-user fa-lg"></i></h1>

      </div>

      <vs-sidebar-item index="1">
        <i class="fa fa-home"></i>
        <router-link to="/inicio">Inicio</router-link>
      </vs-sidebar-item>

      <vs-sidebar-item index="2">
        <i class="fa fa-list-ul"></i>  Ementa
        <!--<router-link to="/ementa">Ementa</router-link>-->
      </vs-sidebar-item>

      <vs-sidebar-item index="3">
        <i class="fas fa-utensils"></i> Prato
      </vs-sidebar-item>

      <vs-sidebar-item index="4">
        <i class="fas fa-apple-alt"></i>
        <router-link to="/Ingredientes">Ingredientes</router-link>
      </vs-sidebar-item>
       <div class="footer-sidebar" slot="footer">
        <vs-button color="danger" type="flat">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div>

    </vs-sidebar>
  </div>

</template>
<script>
  export default {
    data: () => ({
      active: false
    })
  }
</script>

<style lang="css">
  .parentx-static {
    height: 100vh;
    position: fixed;
    display: flex;
    width: 100%;
    align-items: stretch;
  }

  .header-sidebar {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  .header-sidebar h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .header-sidebar h4>button {
    margin-left: 10px;
  }

  .footer-sidebar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .footer-sidebar>button {
    border: 0px solid rgba(0, 0, 0, 0) !important;
    border-left: 1px solid rgba(0, 0, 0, 0.07) !important;
    border-radius: 0px !important;
  }
</style>
