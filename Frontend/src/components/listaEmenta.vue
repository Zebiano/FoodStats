<template>
    <div>
        <p class="title">Ementa da semana</p>
        <div class="boxBorderAlt">
            <div class ="tableAlt">
                <b-tabs position="is-centered" class="block">
                <b-tab-item label="Segunda-Feira">
                    <div class="column"><img src="../assets/carne.jpg" class="listaImage"></img><p>{{segundaCarne}}</p></div><hr>
                    <div class="column"><img src="../assets/peixe.jpg" class="listaImage"><p>{{segundaPeixe}}</p></div><hr>
                    <div class="column"><img src="../assets/veget.jpg" class="listaImage"><p>{{segundaVeg}}</p></div><hr>
                    <div class="column"><img src="../assets/dieta.jpg" class="listaImage"><p>{{segundaDieta}}</p></div>
                </b-tab-item>
                <b-tab-item label="Terça-Feira">
                    <div class="column"><img src="../assets/carne.jpg" class="listaImage"></img><p>{{tercaCarne}}</p></div><hr>
                    <div class="column"><img src="../assets/peixe.jpg" class="listaImage"><p>{{tercaPeixe}}</p></div><hr>
                    <div class="column"><img src="../assets/veget.jpg" class="listaImage"><p>{{tercaVeg}}</p></div><hr>
                    <div class="column"><img src="../assets/dieta.jpg" class="listaImage"><p>{{tercaDieta}}</p></div>
                </b-tab-item>
                <b-tab-item label="Quarta-Feira">
                    <div class="column"><img src="../assets/carne.jpg" class="listaImage"></img><p>{{quartaCarne}}</p></div><hr>
                    <div class="column"><img src="../assets/peixe.jpg" class="listaImage"><p>{{quartaPeixe}}</p></div><hr>
                    <div class="column"><img src="../assets/veget.jpg" class="listaImage"><p>{{quartaVeg}}</p></div><hr>
                    <div class="column"><img src="../assets/dieta.jpg" class="listaImage"><p>{{quartaDieta}}</p></div>
                </b-tab-item>
                <b-tab-item label="Quinta-Feira">
                    <div class="column"><img src="../assets/carne.jpg" class="listaImage"></img><p>{{quintaCarne}}</p></div><hr>
                    <div class="column"><img src="../assets/peixe.jpg" class="listaImage"><p>{{quintaPeixe}}</p></div><hr>
                    <div class="column"><img src="../assets/veget.jpg" class="listaImage"><p>{{quintaVeg}}</p></div><hr>
                    <div class="column"><img src="../assets/dieta.jpg" class="listaImage"><p>{{quintaDieta}}</p></div>
                </b-tab-item>
                <b-tab-item label="Sexta-Feira">
                    <div class="column"><img src="../assets/carne.jpg" class="listaImage"></img><p>{{sextaCarne}}</p></div><hr>
                    <div class="column"><img src="../assets/peixe.jpg" class="listaImage"><p>{{sextaPeixe}}</p></div><hr>
                    <div class="column"><img src="../assets/veget.jpg" class="listaImage"><p>{{sextaVeg}}</p></div><hr>
                    <div class="column"><img src="../assets/dieta.jpg" class="listaImage"><p>{{sextaDieta}}</p></div>
                </b-tab-item>
            </b-tabs>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                segundaCarne: "",
                segundaPeixe: "",
                segundaVeg: "",
                segundaDieta: "",
                tercaCarne: "",
                tercaPeixe: "",
                tercaVeg: "",
                tercaDieta: "",
                quartaCarne: "",
                quartaPeixe: "",
                quartaVeg: "",
                quartaDieta: "",
                quintaCarne: "",
                quintaPeixe: "",
                quintaVeg: "",
                quintaDieta: "",
                sextaCarne: "",
                sextaPeixe: "",
                sextaVeg: "",
                sextaDieta: "",
            }
        },
        methods: {
            onChange(value) {
                if (value === 1) {
                    this.myFunction('test')
                }
            },
            myFunction(message) {
                //console.log(message);
            }
        },
        created() {
            axios({
                    url: 'http://projeto-sd-zebiano.c9users.io/menus',
                    method: 'get',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    var menuToday

                    var menuList = response.data.menus
                    //console.log(menuList)
                    var today = new Date();

                    var todayDay = today.getDay()

                    var dd = today.getDate();
                    var mm = today.getMonth() + 1; //January is 0!
                    var yyyy = today.getFullYear();

                    if (mm < 10) {
                        mm = '0' + mm;
                    }
                    //console.log(dd)


                    if (todayDay == 1) {

                    }
                    else if (todayDay == 2) {
                        dd = dd - 1;
                    }
                    else if (todayDay == 3) {
                        dd = dd - 2;
                    }
                    else if (todayDay == 4) {
                        dd = dd - 3;
                    }
                    else if (todayDay == 5) {
                        dd = dd - 4;
                    }
                    else if (todayDay == 6) {
                        dd = dd - 5;
                    }
                    else if (todayDay == 0) {
                        dd = dd + 1;
                    }

                    if (dd < 10) {
                        dd = '0' + dd;
                    }

                    today = yyyy + '-' + mm + '-' + dd;

                    //console.log("today: " + today + "e todayDay: " + todayDay)

                    for (var i = 0; i < menuList.length; i++) {
                        var dateToday = menuList[i].date.split("T");
                        if (today == dateToday[0]) {

                            for (var j = 0; j < menuList[i].dishes.length; j++) {
                                if (menuList[i].dishes[j].dishType == "Carne") {
                                    this.segundaCarne = menuList[i].dishes[j].name
                                }
                                if (menuList[i].dishes[j].dishType == "Peixe") {
                                    this.segundaPeixe = menuList[i].dishes[j].name
                                }
                                if (menuList[i].dishes[j].dishType == "Vegetariano") {
                                    this.segundaVeg = menuList[i].dishes[j].name
                                }
                                if (menuList[i].dishes[j].dishType == "Dieta") {
                                    this.segundaDieta = menuList[i].dishes[j].name
                                }
                            }

                            for (var j = 0; j < menuList[i].dishes.length; j++) {
                                if (menuList[i + 1].dishes[j].dishType == "Carne") {
                                    this.tercaCarne = menuList[i + 1].dishes[j].name
                                }
                                if (menuList[i + 1].dishes[j].dishType == "Peixe") {
                                    this.tercaPeixe = menuList[i + 1].dishes[j].name
                                }
                                if (menuList[i + 1].dishes[j].dishType == "Vegetariano") {
                                    this.tercaVeg = menuList[i + 1].dishes[j].name
                                }
                                if (menuList[i + 1].dishes[j].dishType == "Dieta") {
                                    this.tercaDieta = menuList[i + 1].dishes[j].name
                                }
                            }

                            for (var j = 0; j < menuList[i].dishes.length; j++) {
                                if (menuList[i + 2].dishes[j].dishType == "Carne") {
                                    this.quartaCarne = menuList[i + 2].dishes[j].name
                                }
                                if (menuList[i + 2].dishes[j].dishType == "Peixe") {
                                    this.quartaPeixe = menuList[i + 2].dishes[j].name
                                }
                                if (menuList[i + 2].dishes[j].dishType == "Vegetariano") {
                                    this.quartaVeg = menuList[i + 2].dishes[j].name
                                }
                                if (menuList[i + 2].dishes[j].dishType == "Dieta") {
                                    this.quartaDieta = menuList[i + 2].dishes[j].name
                                }
                            }

                            for (var j = 0; j < menuList[i].dishes.length; j++) {
                                if (menuList[i + 3].dishes[j].dishType == "Carne") {
                                    this.quintaCarne = menuList[i + 3].dishes[j].name
                                }
                                if (menuList[i + 3].dishes[j].dishType == "Peixe") {
                                    this.quintaPeixe = menuList[i + 3].dishes[j].name
                                }
                                if (menuList[i + 3].dishes[j].dishType == "Vegetariano") {
                                    this.quintaVeg = menuList[i + 3].dishes[j].name
                                }
                                if (menuList[i + 3].dishes[j].dishType == "Dieta") {
                                    this.quintaDieta = menuList[i + 3].dishes[j].name
                                }
                            }

                            for (var j = 0; j < menuList[i].dishes.length; j++) {
                                if (menuList[i + 4].dishes[j].dishType == "Carne") {
                                    this.sextaCarne = menuList[i + 4].dishes[j].name
                                }
                                if (menuList[i + 4].dishes[j].dishType == "Peixe") {
                                    this.sextaPeixe = menuList[i + 4].dishes[j].name
                                }
                                if (menuList[i + 4].dishes[j].dishType == "Vegetariano") {
                                    this.sextaVeg = menuList[i + 4].dishes[j].name
                                }
                                if (menuList[i + 4].dishes[j].dishType == "Dieta") {
                                    this.sextaDieta = menuList[i + 4].dishes[j].name
                                }
                            }
                        }

                    }


                })
                .catch(function(error) {
                    console.log(error)
                });
        }
    }
</script>

<style lang="css">
    @media screen and (max-width: 480px) {
        
        .tableAlt{
            text-align:center
        }

        .boxBorderAlt {
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
            min-width: 40vw;
        }

        .title {
            font-size: 28px;
            font-weight: bold;
        }

        .listaImage {
            width: 20% ;
            height: auto;
            text-align: center;
            margin:auto;
        }

    }

    @media only screen and (min-width: 961px) {
        
        .tableAlt{
            padding: 35px;
            text-align:center
        }

        .boxBorderAlt {
            max-width: 15vw;
            margin-right: 15px;
            margin-left: 15px;
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
            min-width: 40vw;
        }

        .title {
            font-size: 28px;
            font-weight: bold;
        }

        .listaImage {
            max-height: 7vh;
            text-align: center;
        }
    }
</style>
