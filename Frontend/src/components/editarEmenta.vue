<template>
      <div>
          <h1 class="title">Editar ementa</h1>
          <div class="boxBorderEdit" style="padding: 10px">
              <b-field label="Escolha a data">
        <b-datepicker
            @input="datepicker()"
            :selectable-dates="datasComEmenta"
            placeholder="Escolha a data"
            :unselectable-days-of-week="[0, 6]"
            v-model= "calendario"
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
<a class="button is-primary" @click="confirmar">Atualizar</a>
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
                datasComEmenta: null,
                dieta: [],
                _id: null,
                array_Ids: [],
                nomeCarne: '',
                nomePeixe: '',
                nomeVegetariano: '',
                nomeDieta: '',
                idCarne: '',
                idPeixe: '',
                idVegetariano: '',
                idDieta: '',
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
        mounted() {
            axios({
                    url: `http://projeto-sd-zebiano.c9users.io/menus`,
                    method: 'get',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                .then(({ data }) => {
                    let arrayDatas = []
                    for (var i = 0; i < data.menus.length; i++) {
                        let newDateArray = data.menus[i].date.toString().split("-");
                        let newDate = new Date(data.menus[i].date);
                        arrayDatas.push(newDate);
                    }
                    this.datasComEmenta = arrayDatas;
                })
                .catch((error) => {

                    throw error
                })
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
                        this.vegetariano = [];
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
            datepicker: function() {
                console.log("clicou");
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/menus`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        for (var i = 0; i < data.menus.length; i++) {
                            if (this.calendario.toString() == new Date(data.menus[i].date).toString()) {
                                this._id = data.menus[i]._id;
                                console.log(data.menus[i].dishes);
                                for (var j = 0; j < data.menus[i].dishes.length; j++) {
                                    if (data.menus[i].dishes[j].dishType == "Carne") {
                                        this.nomeCarne = data.menus[i].dishes[j].name.toString();
                                    }
                                    else if (data.menus[i].dishes[j].dishType == "Peixe") {
                                        this.nomePeixe = data.menus[i].dishes[j].name.toString();
                                    }
                                    else if (data.menus[i].dishes[j].dishType == "Vegetariano") {
                                        this.nomeVegetariano = data.menus[i].dishes[j].name.toString();
                                    }
                                    else if (data.menus[i].dishes[j].dishType == "Dieta") {
                                        this.nomeDieta = data.menus[i].dishes[j].name.toString();
                                    }
                                }
                            }
                        }

                    })
                    .catch((error) => {

                        throw error
                    })


            },
            confirmar: function(click) {

                const carne = formatString(this.nomeCarne);
                const peixe = formatString(this.nomePeixe);
                const vegetariano = formatString(this.nomeVegetariano);
                const dieta = formatString(this.nomeDieta);

                let self = this;

                // JA TA A FUNCIOANR SUPOSTAMENTE ARTEM

                console.log("Fds.");
                console.log(this._id);

                axios({
                        method: 'get',
                        url: 'http://projeto-sd-zebiano.c9users.io/dishes',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }

                    })
                    .then(function(response) {
                        let arrayIds = [];

                        //console.log(response.data.dishes);

                        for (var i = 0; i < response.data.dishes.length; i++) {

                            if (response.data.dishes[i].name == carne) {
                                arrayIds.push(response.data.dishes[i]._id);
                                console.log("Um belo push 1");
                            }
                            else if (response.data.dishes[i].name == peixe) {

                                arrayIds.push(response.data.dishes[i]._id);
                                console.log("Um belo push 2");

                            }
                            else if (response.data.dishes[i].name == vegetariano) {
                                arrayIds.push(response.data.dishes[i]._id);
                                console.log("Um belo push 3");

                            }
                            else if (response.data.dishes[i].name == dieta) {
                                arrayIds.push(response.data.dishes[i]._id);
                                console.log("Um belo push 4");
                            }
                        }
                        self.array_Ids = arrayIds;

                        //console.log("Toam la entao")
                        console.log(arrayIds);

                        callMePlz(arrayIds);

                    })
                    .catch(function(error) {

                        throw error
                    });

                function callMePlz(aPutaDoArray) {
                    console.log("fds2");
                    console.log(self._id);
                    console.log(aPutaDoArray);
                    console.log(aPutaDoArray.length);

                    if (aPutaDoArray.length == 4) {

                        axios({
                                method: 'put',
                                url: 'http://projeto-sd-zebiano.c9users.io/menus/' + self._id,
                                data: {
                                    date: self.calendario.toString(),
                                    dishes: aPutaDoArray,
                                },
                                headers: {
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }

                            })
                            .then(function(response) {
                                Toast.open({
                                    duration: 3000,
                                    message: `A ementa foi atualizada com sucesso!`,
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
                    else {
                        Toast.open({
                            duration: 3000,
                            message: "Verifique os pratos inseridos!",
                            type: 'is-danger',
                        })
                    }
                }
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
    .boxBorderEdit {
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
        margin-left:10px;
        font-weight: bold;
    }
</style>
