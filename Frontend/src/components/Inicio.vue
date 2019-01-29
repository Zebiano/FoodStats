<template>
  <div class="inicio"id="inicio">
    <div class="columns">
      <div class="column is-two-third">
        <todayMenu class="todaysmenu"></todayMenu>
      </div>
      <div class="column" id="divweek">
        <weekMenu class="weekmenu"></weekMenu>  
      </div>
    </div>
    <div class="columns">
      <div class="column" id="divgrafico">
        <grafico class="grafico"></grafico>
      </div>
    </div>
  </div>
</template>

<script>
  import grafico from './grafRefVendidas.vue'
  import todayMenu from './ementaDoDia.vue'
  import weekMenu from './ementaDaSemana.vue'

  export default {
    name: 'inicio',
    created() {
      //location.reload();
    },
    components: {
      todayMenu: todayMenu,
      grafico: grafico,
      weekMenu: weekMenu
    },
  }
</script>
<style type="text/css">
  @media screen and (max-width: 480px) {
    #inicio {
      padding: 20px;
    }
    .todaysmenu {
      margin-top: 10px;
      padding: 0px 10px;
    }
    #divweek {
      padding: 0px 10px;

    }
    .weekmenu {
      margin-top: 10px;
      padding: 0px 10px;
    }
    #divgrafico {
      padding: 0px 10px;
    }
    .grafico {
      margin-top: 10px;
      padding: 0px 10px;
    }
    .navbar {
    display: block;
  }
  }

  @media only screen and (min-width: 961px) {

    #inicio {
      padding: 20px;
    }
    .todaysmenu {
      padding-left: 30px;
      /*padding-top: 10px;*/
    }
    #divweek {
      padding-left: 0px;
      margin-right: 10px;

    }
    .weekmenu {
      /*padding-top:10px;*/
    }
    #divgrafico {
      margin-top: 10px
    }
    .grafico {
      padding: 0px 10px;
    }
    /*.navbar {
    display: block;
  }*/
  }
</style>
