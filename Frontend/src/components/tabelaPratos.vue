<!--<template>
    
    <section>
        <div>
          <h4 class="title" style ="margin-top:10%" >Lista de Pratos</h4>
          <div class="columns">
        <div class="column">
          <tbody>
            <tr v-for="data in data" class="rows">
              <th><span style="font-size: 15px; margin-bottom: 50px">{{data.name}}</span></th>
              <th><span style="font-size: 14px; margin-bottom: 50px">{{data.dishType}}</span></th>
              <th v-for="receita in receita" class="rows">
                  {{receita.name}} quantidade: {{receita.quantity}}
            </th>
            </tr>
          </tbody>
        </div>
      </div>

</div>
</div>

</section>
</template>

<script>
    import axios from 'axios'
    import debounce from 'debounce'
    export default {
        data() {
            return {
                data: [],
                receita: [],
                columns: [{
                    Nome: "Nome do Prato",
                    Tipo: "Tipo de Prato"
                }],
                name: '',
                selected: "",
                isFetching: false
            }
        },

        created() {
            axios({
                    url: 'http://projeto-sd-zebiano.c9users.io/dishes',
                    method: 'get',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                }).then((response) => {
                    //console.log(response.data.dishes)
                    this.data = response.data.dishes;
                    var pratos = response.data.dishes;
                    //console.log(pratos.length);
                    for (var i =0; i< pratos.length; i++)
                    {
                        pratos.forEach((item) => this.receita.push(item))
                    }
                    //console.log(this.receita);

                })
                .catch(function(error) {
                    console.log(error)
                });

        },
    }
</script>-->
<template>
      <div>
          <h4 class="title" style ="margin-top:10%">Lista de Pratos</h4>
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
                        label: 'Prato',
                    },
                    {
                        field: 'tipo',
                        label: 'Tipo de Prato',
                    }
                    
                ]
            }
        },
        created() {
            axios({
                url: 'http://projeto-sd-zebiano.c9users.io/dishes',
                method: 'get',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                //console.log("Pedido get!");
                
                // Arrays
                let arrayPratos = [];
                let arrayTabela = [];

                // Guardar resopsta do servidor no array
                arrayPratos = response.data.dishes;

                // Percorrer array e gravar num novo array num formato que a table to Buefy consegue ler
                for (let i = 0; i < arrayPratos.length; i++) {
                    // Create a new object to add to the arrayTabela
                    let newObjectData = {
                        "tipo": arrayPratos[i].dishType,
                        "name": arrayPratos[i].name
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
