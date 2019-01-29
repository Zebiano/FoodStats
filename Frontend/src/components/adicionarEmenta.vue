<template>
      <div>
          <h1 class="title">Adicionar ementa</h1>
          <div class="boxBorderAdd" style="padding: 10px">
              <b-field label="Escolha a data">
        <b-datepicker
            placeholder="Escolha a data"
            v-model= "calendario"
            :unselectable-days-of-week="[0, 6]"
            icon="calendar">
        </b-datepicker>
    </b-field>
      <section>
        <b-field label="Prato de carne:">
            <b-autocomplete
                v-model="nomeCarne"
                :data="carne"
                placeholder="Exemplo Arroz de Pato"
                field="name"
                :loading="isFetchingCarne"
                @keyup.native="getAsyncDataCarne"
                @select="option => selectedCarne = option.name">
                
                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                        </div>
                    </div>
                </template>
</b-autocomplete>
</b-field>
</section>
<section>
    <b-field label="Prato de Peixe:">
        <b-autocomplete v-model="nomePeixe" :data="peixe" placeholder="Exemplo Bacalhau à Brás" field="name" :loading="isFetchingPeixe" @keyup.native="getAsyncDataPeixe" @select="option => selectedPeixe = option.name">

            <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                        </div>
                    </div>
                </template>
        </b-autocomplete>
    </b-field>
</section>
<section>
    <b-field label="Prato Vegetariano:">
        <b-autocomplete v-model="nomeVegetariano" :data="vegetariano" placeholder="Exemplo Moqueca de banana" field="name" :loading="isFetchingVegetariano" @keyup.native="getAsyncDataVegetariano" @select="option => selected = option.name">

            <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                        </div>
                    </div>
                </template>
        </b-autocomplete>
    </b-field>
</section>
<section>
    <b-field label="Prato de Dieta:">
        <b-autocomplete v-model="nomeDieta" :data="dieta" placeholder="Exemplo Arroz de Frango" field="name" :loading="isFetchingDieta" @keyup.native="getAsyncDataDieta" @select="option => selected = option.name">

            <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                        </div>
                    </div>
                </template>
        </b-autocomplete>
    </b-field>
</section>
<br>
<a class="button is-primary" @click="confirmar">Confirmar</a>
</div>
</div>
</template>

<script>
    import axios from 'axios'
    import debounce from 'debounce'
    import { Toast } from 'buefy/dist/components/toast'
    export default {
        data() {
            return {
                data: [],
                calendario: null,
                carne: [],
                peixe: [],
                vegetariano: [],
                dieta: [],
                arrayIds: [],
                nomeCarne: '',
                nomePeixe: '',
                nomeVegetariano: '',
                nomeDieta: '',
                selectedCarne: null,
                selectedPeixe: null,
                selectedVegetariano: null,
                selectedDieta: null,
                isFetchingCarne: false,
                isFetchingPeixe: false,
                isFetchingVegetariano: false,
                isFetchingDieta: false,

            }
        },
        methods: {
            getAsyncDataCarne: debounce(function() {
                if (!this.nomeCarne.length) {
                    this.carne = []
                    return
                }
                this.isFetchingCarne = true
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/dishes/name/${this.nomeCarne}`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        this.carne = [];
                        data.dishes.forEach((item) => this.data.push(item))
                        for (var i = 0; i < this.data.length; i++) {
                            if (data.dishes[i].dishType == "Carne") {
                                this.carne.push(data.dishes[i]);
                            }
                        }
                    })
                    .catch((error) => {
                        this.data = [];
                        throw error
                    })
                    .finally(() => {
                        this.isFetchingCarne = false
                    })
            }, 500),
            getAsyncDataPeixe: debounce(function() {
                if (!this.nomePeixe.length) {
                    this.peixe = []
                    return
                }
                this.isFetchingPeixe = true
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/dishes/name/${this.nomePeixe}`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        this.peixe = [];
                        data.dishes.forEach((item) => this.data.push(item))
                        for (var i = 0; i < this.data.length; i++) {
                            if (data.dishes[i].dishType == "Peixe") {
                                this.peixe.push(data.dishes[i]);
                            }
                        }
                    })
                    .catch((error) => {
                        this.data = [];
                        throw error
                    })
                    .finally(() => {
                        this.isFetchingPeixe = false
                    })
            }, 500),
            getAsyncDataVegetariano: debounce(function() {
                if (!this.nomeVegetariano.length) {
                    this.vegetariano = []
                    return
                }
                this.isFetchingVegetariano = true
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/dishes/name/${this.nomeVegetariano}`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        this.peixe = [];
                        data.dishes.forEach((item) => this.data.push(item))
                        for (var i = 0; i < this.data.length; i++) {
                            if (data.dishes[i].dishType == "Vegetariano") {
                                this.vegetariano.push(data.dishes[i]);
                            }
                        }
                    })
                    .catch((error) => {
                        this.data = [];
                        throw error
                    })
                    .finally(() => {
                        this.isFetchingVegetariano = false
                    })
            }, 500),
            getAsyncDataDieta: debounce(function() {
                if (!this.nomeDieta.length) {
                    this.dieta = []
                    return
                }
                this.isFetchingDieta = true
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/dishes/name/${this.nomeDieta}`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        this.dieta = [];
                        data.dishes.forEach((item) => this.data.push(item))
                        for (var i = 0; i < this.data.length; i++) {
                            if (data.dishes[i].dishType == "Dieta") {
                                this.dieta.push(data.dishes[i]);
                            }
                        }
                    })
                    .catch((error) => {
                        this.data = [];
                        throw error
                    })
                    .finally(() => {
                        this.isFetchingDieta = false
                    })
            }, 500),
            confirmar: function(click) {

                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/dishes`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {

                        this.nomeCarne = formatString(this.nomeCarne);
                        this.nomePeixe = formatString(this.nomePeixe);
                        this.nomeVegetariano = formatString(this.nomeVegetariano);
                        this.nomeDieta = formatString(this.nomeDieta);

                        this.arrayIds = [];

                        for (var i = 0; i < data.dishes.length; i++) {

                            if (data.dishes[i].name == this.nomeCarne) {

                                this.arrayIds.push(data.dishes[i]._id)
                            }
                            else if (data.dishes[i].name == this.nomePeixe) {

                                this.arrayIds.push(data.dishes[i]._id)
                            }
                            else if (data.dishes[i].name == this.nomeVegetariano) {

                                this.arrayIds.push(data.dishes[i]._id)

                            }
                            else if (data.dishes[i].name == this.nomeDieta) {

                                this.arrayIds.push(data.dishes[i]._id)
                            }
                        }

                        console.log(this.arrayIds);

                        if (this.nomeCarne.length == 0 || this.nomePeixe.length == 0 || this.nomeVegetariano.length == 0 || this.nomeDieta.length == 0 || this.calendario == null) {
                            Toast.open({
                                duration: 3000,
                                message: "Preencha todos os campos.",
                                type: 'is-danger',
                            })
                        }
                        else if (this.arrayIds.length != 4) {
                            Toast.open({
                                duration: 3000,
                                message: "Um dos pratos que pretende adicionar, não existe.",
                                type: 'is-danger',
                            })
                        }
                        else {
                            axios({
                                    method: 'post',
                                    url: 'http://projeto-sd-zebiano.c9users.io/menus',
                                    data: {
                                        dishes: this.arrayIds,
                                        date: this.calendario.toString()
                                    },
                                    headers: {
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }

                                })
                                .then(function(response) {
                                    Toast.open({
                                        duration: 3000,
                                        message: `O prato foi adicionado com sucesso!`,
                                        type: 'is-success',
                                    });

                                    // Waits 3100 miliseconds and then refreshes the page
                                    setTimeout(function() {
                                        location.reload();
                                    }, 3100);
                                    //console.log(response);
                                })
                                .catch(function(error) {
                                    Toast.open({
                                        duration: 3000,
                                        message: error.response.data,
                                        type: 'is-danger',
                                    })
                                });
                        }


                    })
                    .catch((error) => {
                        throw error
                    })
            },
        },


    }


    function formatString(nameIngredient) {
        let formatedName = "";
        let splitString = nameIngredient.split(" ");

        for (let i = 0; i < splitString.length; i++) {
            for (let j = 0; j < splitString[i].length; j++) {
                {
                    if (j == 0) {
                        formatedName += splitString[i][j].toUpperCase();
                    }
                    else {
                        formatedName += splitString[i][j].toLowerCase();
                    }
                }
            }
            if (i != splitString.length - 1) {
                {
                    formatedName += " ";
                }
            }
        }
        //console.log(formatedName);

        return formatedName;
    }
</script>


<style lang="css">
    .boxBorderAdd {
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
