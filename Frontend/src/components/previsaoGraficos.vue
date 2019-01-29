<template>
  <div>
  <div class="columns is-one-quarter">
    <div class="column">
    <div class="columns">
      <div class="column">
        <dChart></dChart>
      </div>
      <div class="column">
        <bChart></bChart>
      </div>
    </div>
    <notes></notes>
    </div>
    <div class="column is-half">
      <tabela></tabela>
    </div>
  </div>
  </div>
</template>

<script>
  import dChart from './previsaoDoughnutChart.vue'
  import bChart from './previsaoBarChart.vue'
  import tabela from './previsaoIngredientes.vue'
  import notes from './previsaoNotas.vue'

  export default {
    name: 'previsaoGraficos',
    components: {
      dChart,
      tabela,
      notes,
      bChart
    },

  }
</script>
