<!--<template>
    <section>
        <b-field label="Procurar Ingrediente:">
            <b-autocomplete
                v-model="name"
                :data="data"
                placeholder="Exemplo Arroz"
                field="name"
                :loading="isFetching"
                @keyup.native="getAsyncData"
                @select="option => selected = option">
                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                            <small>
                                Id: <b>{{ props.option._id }}</b>,
                            </small>
                        </div>
                    </div>
                </template>
</b-autocomplete>
</b-field>
<p class="content"><b>Ingrediente:</b> {{ selected }}</p>
</section>
</template>


<script>
    import axios from 'axios'
    import debounce from 'debounce'
    export default {
        data() {
            return {
                data: [],
                name: '',
                selected: null,
                isFetching: false
            }
        },
        methods: {
            getAsyncData: debounce(function() {
                if (!this.name.length) {
                    this.data = []
                    return
                }
                axios.get('http://projeto-sd-zebiano.c9users.io/token')
                    .then(response => {
                        this.token = response.data
                        const token = response.data.token;
                        // console.log("Token: " + token)
                        localStorage.setItem('token', token);
                    })
                    .catch(err => {
                        console.log(err)
                    })
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
                        data.ingredient.forEach((item) => this.data.push(item))
                        console.log(this.data);
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
    }
</script>
-->
<template>
    <section>
        <b-field label="Procurar Ingrediente:">
            <b-autocomplete
                v-model="name"
                :data="data"
                placeholder="Exemplo Arroz"
                field="name"
                :loading="isFetching"
                @keyup.native="getAsyncData"
                @select="option => selected = option.name">
                
                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                            <small>
                                Id <b>{{ props.option._id }}</b>
                            </small>
                        </div>
                    </div>
                </template>
</b-autocomplete>

</b-field>
<p class="content">Ingrediente: <b>{{ selected }}</b></p>
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
                todos: [],
                name: '',
                selected: null,
                isFetching: false,
                _id: "",
            }
        },
        methods: {
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
                console.log(name)
                if (name.length != 0) {
                    axios({
                            method: 'get',
                            url: `http://projeto-sd-zebiano.c9users.io/ingredients`,
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                        .then(function(response) {
                            console.log(name);
                            let idIngrediente;
                            for (var i = 0; i < response.data.ingredients.length; i++) {
                                if (response.data.ingredients[i].name == name) {

                                    idIngrediente = response.data.ingredients[i]._id;

                                }
                            }

                            console.log(idIngrediente);

                            axios({
                                    method: 'delete',
                                    url: `http://projeto-sd-zebiano.c9users.io/ingredients/` + idIngrediente,
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }

                                })
                                .then(function(response) {
                                    console.log(response);
                                    Toast.open({
                                        duration: 3000,
                                        message: response.data,
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
                                        message: error.response.data,
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
                        message: "Insira um ingrediente para remover.",
                        type: 'is-danger',
                    })
                }
            },
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
