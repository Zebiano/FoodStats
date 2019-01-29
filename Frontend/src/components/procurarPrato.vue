<template>
    <section>
        <b-field label="Procurar Prato:">
            <b-autocomplete
                v-model="name"
                :data="data"
                placeholder="Exemplo Arroz de Pato"
                field="name"
                :loading="isFetching"
                @keyup.native="getAsyncData"
                @select="assignTag">
                
                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                            <small>
                                Tipo: <b>{{ props.option.dishType }}</b>
                            </small>
                        </div>
                    </div>
                </template>
</b-autocomplete>
</b-field>
<p class="content">Nome: <b>{{ selecionado.name }}</b></p>
<p class="content">Tipo de Prato: <b>{{ selecionado.dishType }}</b></p>
<p class="content">Ingredientes: </p>
<p v-for="receita in receita" class="rows">
    <b>{{receita.name}}</b>, quantidade: <b>{{receita.quantity}}</b>;
</p>
<a class="button is-primary" @click="remover()">Remover</a>
</section>
</template>


<script>
    import axios from 'axios'
    import debounce from 'debounce'
    import { Toast } from 'buefy/dist/components/toast'
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
                selected: null,
                selecionado: [],
                isFetching: false
            }
        },

        methods: {
            assignTag: function(selected) {
                this.receita = selected.recipe;
                this.selecionado = selected;

            },
            getAsyncData: debounce(function() {
                if (!this.name.length) {
                    this.data = [];
                    return
                }
                this.isFetching = true
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/dishes/name/${this.name}`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        this.data = [];
                        console.log(this.receita)
                        data.dishes.forEach((item) => this.data.push(item))
                    })
                    .catch((error) => {
                        this.data = [];
                        throw error
                    })
                    .finally(() => {
                        this.isFetching = false
                    })
            }, 500),
            remover: function() {
                var name = this.name;
                if (name.length != 0) {
                    axios({
                            method: 'get',
                            url: `http://projeto-sd-zebiano.c9users.io/dishes`,
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                        .then(function(response) {
                            console.log(name);
                            let idPrato;
                            for (var i = 0; i < response.data.dishes.length; i++) {
                                if (response.data.dishes[i].name == name) {

                                    idPrato = response.data.dishes[i]._id;

                                }
                            }

                            console.log(idPrato);

                            axios({
                                    method: 'delete',
                                    url: `http://projeto-sd-zebiano.c9users.io/dishes/` + idPrato,
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }

                                })
                                .then(function(response) {
                                    console.log(response);
                                    Toast.open({
                                        duration: 3000,
                                        message: "Prato removido com sucesso!",
                                        type: 'is-success',
                                    })
                                    // Waits 3100 miliseconds and then refreshes the page
                                    setTimeout(function() {
                                        location.reload();
                                    }, 3100);
                                })
                                .catch(function(error) {
                                    Toast.open({
                                        duration: 3000,
                                        message: "Esse prato não existe!",
                                        type: 'is-danger',
                                    })
                                });

                        })
                        .catch(function(error) {
                            throw error
                        });
                }
                else {
                    Toast.open({
                        duration: 3000,
                        message: "Insira um prato para remover.",
                        type: 'is-danger',
                    })
                }
            },



        }
    }
</script>
