<template>
  <div class="pratos">
      <div class="columns">
        <div class="column is-half">
          <listaPratos class ="mobile"></listaPratos>
        </div>
        <div class="column is-two-fifths" >
          <adicionarPrato class ="mobile"></adicionarPrato>
        </div>
      </div>
      <!--<div class="columns">-->
      <!--  <tabela style ="margin-left: 270px; padding-top:10px"></tabela>-->
      <!--</div>-->
  </div>
</template>

<script>
  import listaPratos from './listaPratos.vue'
  import adicionarPrato from './adicionarPrato.vue'

  export default {
    name: 'pratos',
    components: {
      listaPratos,
      adicionarPrato,
    }
  }
</script>
<style type="text/css">
  @media screen and (max-width: 480px) {
    
    .pratos {
      padding: 20px;
    }

    .mobile {
      margin-left: 10px;
      margin-top: 10px;
    }

  }

  @media only screen and (min-width: 961px) {
    
    .mobile {
      margin-left: 270px;
      padding-top: 10px;
    }
  }
</style>
