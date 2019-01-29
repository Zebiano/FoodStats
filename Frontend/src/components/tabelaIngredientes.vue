<template>
      <div>
          <h4 class="title" style ="margin-top:10%">Lista de Ingredientes</h4>
          <b-table :paginated="isPaginated" :per-page="perPage" :data="data" :columns="columns"></b-table>
          <br>
      </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                isPaginated: true,
                perPage:6,
                data: [],
                columns: [
                    {
                        field: 'name',
                        label: 'Ingredientes',
                    }
                ]
            }
        },
        created() {
            axios({
                url: 'http://projeto-sd-zebiano.c9users.io/ingredients',
                method: 'get',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                //console.log("Pedido get!");
                
                // Arrays
                let arrayIngredients = [];
                let arrayTabela = [];

                // Guardar resopsta do servidor no array
                arrayIngredients = response.data.ingredients;

                // Percorrer array e gravar num novo array num formato que a table to Buefy consegue ler
                for (let i = 0; i < arrayIngredients.length; i++) {
                    // Create a new object to add to the arrayTabela
                    let newObjectData = {
                        "id": arrayIngredients[i]._id,
                        "name": arrayIngredients[i].name
                    }

                    // Push that object
                    arrayTabela.push(newObjectData);
                }
                //console.log(arrayTabela);

                // Atualizar a tabela com os novos dados
                this.data = arrayTabela;
            }).catch(function(error) {
                console.log(error)
            });
        }
    }
</script>
<style type="text/css">
    
</style>