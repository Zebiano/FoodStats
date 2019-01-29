<template>
      <div>
          <h1 class="title">Procurar Ingredientes</h1>
          <div class="boxBorder">
              <div style="padding:40px">
                  <procurarIngrediente></procurarIngrediente>  
                  <tabela style="margin-top: 30px"></tabela>
              </div>
                  
          </div>
      </div>
</template>

<script>
import procurarIngrediente from './procuraIngrediente.vue'
import tabela from './tabelaIngredientes.vue'

  export default {
    name: 'ingredientes',
    components: {
      procurarIngrediente:procurarIngrediente,
      tabela: tabela
    }
  }
</script>

<style lang="css">
  .boxBorder {
    margin-right: 15px;
    margin-left: 15px;
    border: solid 0.05px;
    border-color: #e5e5e5;
    box-shadow: 3px 3px 5px #d1d1d1;
    border-radius: 5px;
    background-color: #fff;
  }
  
   .title {
    font-size: 28px;
    font-weight: bold;
  }
  
  </style>