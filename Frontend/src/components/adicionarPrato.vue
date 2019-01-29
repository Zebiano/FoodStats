<template>
      <div>
          <h1 class="title">Adicionar Prato</h1>
          <div class="boxBorder" style="padding: 15px">
    </b-field>
      <b-field label="Nome do Prato">
            <b-input placeholder="Exemplo: Tosta Mista" v-model="nomePrato"></b-input>
        </b-field>
        <b-field label="Tipo de Prato">
             </b-field>
        <section>
            <b-tabs @change="onChange" position="is-centered" class="block">
                <b-tab-item label="Carne">
                </b-tab-item>
                <b-tab-item label="Peixe">
                </b-tab-item>
                <b-tab-item label="Vegetariano">
                </b-tab-item>
                <b-tab-item label="Dieta">
                </b-tab-item>
            </b-tabs>
        </section>
        <b-field label="Fazer Receita:" custom-class="is-medium"></b-field>
        <b-field label="Nome"></b-field>
            <b-autocomplete
                v-model="name"
                :data="data"
                placeholder="Exemplo: Arroz"
                field="name"
                :loading="isFetching"
                @keyup.native="getAsyncData"
                @select="option => selected = option.name">
                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                        </div>
                    </div>
                </template>
</b-autocomplete>
<b-field label="Quantidade" v-model="quantidade">
    <b-input v-model="quantidade" placeholder="Exemplo: 2"></b-input>
</b-field>
<a class="button is-info" @click="adicionarIngrediente" id ="adicionar">Adicionar Ingrediente</a>
<a class="button is-info" @click="removerIngrediente" id ="remover">Remover Ingrediente</a>
<b-table :data="lista" :columns="columns">
</b-table>

<br><br>
<section>
    <a class="button is-link" @click="confirmarPrato">Confirmar</a>
</section>
</div>
</div>
</template>

<script>
    //https://jsfiddle.net/u6j1uc3u/32/"
    import axios from 'axios'
    import debounce from 'debounce'
    import { Toast } from 'buefy/dist/components/toast'

    export default {
        data() {
            return {
                data: [],
                nomePrato: "",
                lista: [],
                quantidade: "",
                tipoPrato: 0,
                listaIngredientes: [],
                listaQuantidades: [],
                columns: [{
                        field: 'name',
                        label: 'Ingrediente',
                    },
                    {
                        field: 'quantidade',
                        label: 'Quantidade',
                    }
                ],
                todos: [],
                name: "",
                selected: null,
                isFetching: false
            }
        },

        methods: {
            adicionarIngrediente: function(event) {
                for (var i = 0; i < this.lista.length; i++) {
                    if (this.lista[i].name == this.name) {
                        Toast.open({
                            duration: 3000,
                            message: `Ingrediente Repetido!`,
                            type: 'is-danger',
                        });
                        return;
                    }
                }
                if (this.quantidade != "" && this.name != "" && this.quantidade == parseInt(this.quantidade)) {
                    let newObjectArray = {
                        "name": this.name,
                        "quantidade": parseInt(this.quantidade)
                    }
                    // Push Lista
                    this.lista.push(newObjectArray);
                }
                else if (this.name == "") {
                    Toast.open({
                        duration: 3000,
                        message: `Insira o nome do ingrediente!`,
                        type: 'is-danger',
                    });
                }
                else if (this.quantidade == "") {
                    Toast.open({
                        duration: 3000,
                        message: `Insira a quantidade do ingrediente!`,
                        type: 'is-danger',
                    });
                }
                else if (this.quantidade !== parseInt(this.quantidade)) {
                    Toast.open({
                        duration: 3000,
                        message: `Insira uma quantidade válida!`,
                        type: 'is-danger',
                    });
                }


                // Atualizar a tabela com os novos dados
            },
            removerIngrediente: function(event) {

                if (!this.name.length) {
                    Toast.open({
                        duration: 3000,
                        message: `Insira o nome do ingrediente que quer remover!`,
                        type: 'is-danger',
                    });
                    return;
                }
                else {
                    for (var i = 0; i < this.lista.length; i++) {
                        if (this.lista[i].name == this.name) {
                            this.lista.splice(i, 1);
                            Toast.open({
                                duration: 3000,
                                message: `Ingrediente Removido da receita.`,
                                type: 'is-success',
                            });
                            return;
                        }
                    }
                }
                console.log(this.lista);
            },
            onChange(value) {
                if (value === 0) {
                    this.tipoPrato = 0;
                }
                else if (value === 1) {
                    this.tipoPrato = 1
                }
                else if (value === 2) {
                    this.tipoPrato = 2
                }
                else if (value === 3) {
                    this.tipoPrato = 3
                }

            },
            confirmarPrato: function(event) {
                console.log(this.nomePrato.length);
                console.log(this.lista.length);
                console.log(this.tipoPrato);

                let arrayNomes = [];
                let arrayQuantidades = [];

                if (this.lista.length != 0 && this.nomePrato.length != 0) {

                    for (var i = 0; i < this.lista.length; i++) {
                        arrayNomes.push(this.lista[i].name);
                        arrayQuantidades.push(this.lista[i].quantidade);
                    }
                    let nomeTipoPrato = "";
                    if (this.tipoPrato == 0) {
                        nomeTipoPrato = "Carne"
                    }
                    else if (this.tipoPrato == 1) {
                        nomeTipoPrato = "Peixe"
                    }
                    else if (this.tipoPrato == 2) {
                        nomeTipoPrato = "Vegetariano"
                    }
                    else if (this.tipoPrato == 3) {
                        nomeTipoPrato = "Dieta"
                    }
                    console.log("Pode adicionar")
                    console.log(this.nomePrato)
                    console.log(nomeTipoPrato)
                    console.log(arrayNomes);
                    console.log(arrayQuantidades);
                    axios({
                            method: 'post',
                            url: 'http://projeto-sd-zebiano.c9users.io/dishes',
                            data: {
                                name: this.nomePrato,
                                type: nomeTipoPrato,
                                ingName: arrayNomes,
                                ingQuantity: arrayQuantidades
                            },
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }

                        })
                        .then(function(response) {
                            Toast.open({
                                duration: 3000,
                                message: `O Prato foi adicionado com sucesso!`,
                                type: 'is-success',
                            });

                            // Waits 3100 miliseconds and then refreshes the page
                            setTimeout(function() {
                                location.reload();
                            }, 3100);
                            //console.log(response);
                        })
                        .catch(function(error) {
                            console.log(error)
                            Toast.open({
                                duration: 3000,
                                message: error.response.data,
                                type: 'is-danger',
                            })
                        });
                }
                else {
                    Toast.open({
                        duration: 3000,
                        message: `Por favor insira todos os campos antes de adicionar um prato.`,
                        type: 'is-danger',
                    });
                }
            },
            getAsyncData: debounce(function() {
                if (!this.name.length) {
                    this.data = []
                    return
                }
                this.isFetching = true
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/ingredients/name/${this.name}`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        this.data = [];
                        data.ingredients.forEach((item) => this.data.push(item))
                        //console.log(this.data);
                    })
                    .catch((error) => {
                        this.data = [];
                        throw error
                    })
                    .finally(() => {
                        this.isFetching = false
                    })
            }, 500)
        },
        created() {
            axios({
                    url: 'https://projeto-sd-zebiano.c9users.io/ingredients',
                    method: 'get',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                .then(({ data }) => {
                    //console.log(data)
                    this.todos = [];
                    data.ingredients.forEach((item) => this.todos.push(item))
                    //console.log(this.todos);
                })
                .catch((error) => {
                    this.todos = [];
                    throw error
                })

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
    @media screen and (max-width: 480px) {


    #adicionar {
      margin-bottom: 20px;
    }
    #remover {
      margin-bottom: 20px;
    }

  }
</style>
