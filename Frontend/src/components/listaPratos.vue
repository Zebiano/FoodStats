<template>
      <div>
          <h1 class="title">Procurar Prato</h1>
          <div class="boxBorder">
              <div style="padding:30px 30px 15px 30px;">
                  <procurarPrato></procurarPrato>  
                  <tabela></tabela>
              </div>
                  
          </div>
      </div>
</template>

<script>
  import procurarPrato from './procurarPrato.vue'
  import tabela from './tabelaPratos.vue'


  export default {
    name: 'pratos',
    components: {
      procurarPrato: procurarPrato,
      tabela
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
