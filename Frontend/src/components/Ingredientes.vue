<template>
  <div class="ingredientes">
      <div class="columns">
        <div class="column is-half">
          <listaIngredientes class ="mobile"></listaIngredientes>
        </div>
        <div class="column is-two-fifths" >
          <adicionarIngrediente class ="mobile"></adicionarIngrediente>
        </div>
      </div>
  </div>
</template>

<script>
  import listaIngredientes from './listaIngredientes.vue'
  import adicionarIngrediente from './adicionarIngrediente.vue'

  export default {
    name: 'ingredientes',
    components: {
      listaIngredientes: listaIngredientes,
      adicionarIngrediente: adicionarIngrediente
    }
  }
</script>
<style type="text/css">
  @media screen and (max-width: 480px) {
.ingredientes{
  padding: 20px;
}
    .mobile {
      margin-left: 10px;
      padding-top: 10px;
    }

  }

  @media only screen and (min-width: 961px) {

    .mobile {
      margin-left: 270px;
      padding-top: 10px;
    }
  }
</style>
