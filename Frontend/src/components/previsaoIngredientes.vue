<template>
      <div>
          <h1 class="titlePrev" style ="margin-bottom:5vh">Lista de Ingredientes Necessários</h1>
          <div  class="boxBorderIng">
          <b-table :paginated="isPaginated" :per-page="perPage" :data="listIngredients" :columns="columns"></b-table>
          </div>
          <br>
      </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                meatPrediction: "",
                fishPrediction: "",
                vegPrediction: "",
                dietPrediction: "",
                isPaginated: true,
                perPage: 8,
                listIngredients: [],
                columns: [{
                        field: 'name',
                        label: 'Nome',
                    },
                    /*{
                        field: 'quant',
                        label: 'Quantidade',
                    }*/
                ]
            }
        },
        created() {
            axios({
                    url: 'http://projeto-sd-zebiano.c9users.io/arduinos',
                    method: 'get',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    //console.log(response.data)
                    var menuList = response.data

                    var todayDate = new Date();

                    this.meatPrediction = this.getAverage(menuList, todayDate, "Carne")
                    this.fishPrediction = this.getAverage(menuList, todayDate, "Peixe")
                    this.vegPrediction = this.getAverage(menuList, todayDate, "Vegetariano")
                    this.dietPrediction = this.getAverage(menuList, todayDate, "Dieta")

                    console.log(this.dietPrediction)
                })
                .catch(function(error) {
                    console.log(error)
                });

            axios({
                url: 'http://projeto-sd-zebiano.c9users.io/menus',
                method: 'get',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((response) => {
                var menuList = response.data.menus
                console.log(menuList)
                var todayDate = new Date();
                todayDate = this.dateFormat(todayDate)
                for (var i = 0; i < menuList.length; i++) {

                    var dateAlt = new Date(menuList[i].date)
                    dateAlt = this.dateFormat(dateAlt)
                    if (dateAlt == todayDate) {
                        for (var j = 0; j < menuList[i].dishes.length; j++) {
                            for (var k = 0; k < menuList[i].dishes[j].recipe.length; k++) {
                                if (this.listIngredients.length == 0) {
                                    console.log(menuList[i].dishes[j].dishType)
                                    console.log("predi" + this.vegPrediction)
                                    if (menuList[i].dishes[j].dishType == "Carne") {
                                        var valor = menuList[i].dishes[j].recipe[k].quantity * this.meatPrediction
                                        this.listIngredients.push({ "name": menuList[i].dishes[j].recipe[k].name, "quant": valor })
                                        // this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.meatPrediction)
                                    }
                                    if (menuList[i].dishes[j].dishType == "Peixe") {
                                        var valor = menuList[i].dishes[j].recipe[k].quantity * this.fishPrediction
                                        this.listIngredients.push({ "name": menuList[i].dishes[j].recipe[k].name, "quant": valor })
                                        // this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.meatPrediction)
                                    }
                                    if (menuList[i].dishes[j].dishType == "Vegetariano") {
                                        var valor = menuList[i].dishes[j].recipe[k].quantity * this.vegPrediction
                                        console.log(valor)
                                        this.listIngredients.push({ "name": menuList[i].dishes[j].recipe[k].name, "quant": valor })
                                        // this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.meatPrediction)
                                    }
                                    if (menuList[i].dishes[j].dishType == "Dieta") {
                                        var valor = menuList[i].dishes[j].recipe[k].quantity * this.dietPrediction
                                        this.listIngredients.push({ "name": menuList[i].dishes[j].recipe[k].name, "quant": valor })
                                        // this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.meatPrediction)
                                    }

                                }
                                else {
                                    var exists = false

                                    for (var z = 0; z < this.listIngredients.length; z++) {

                                        if (menuList[i].dishes[j].recipe[k].name != this.listIngredients[z].name) {
                                            exists = false
                                        }
                                        else if (menuList[i].dishes[j].recipe[k].name == this.listIngredients[z].name) {
                                            exists = true
                                            console.log(menuList[i].dishes[j].dishType)
                                            if (menuList[i].dishes[j].dishType == "Carne") {
                                                this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.meatPrediction)
                                            }
                                            else if (menuList[i].dishes[j].dishType == "Peixe") {
                                                this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.fishPrediction)
                                            }
                                            else if (menuList[i].dishes[j].dishType == "Vegetariano") {
                                                this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.vegPrediction)
                                            }
                                            else if (menuList[i].dishes[j].dishType == "Dieta") {
                                                this.listIngredients[z].quant = this.listIngredients[z].quant + (menuList[i].dishes[j].recipe[k].quantity * this.dietPrediction)
                                            }
                                            break;
                                        }
                                    }

                                    if (exists == false) {
                                        this.listIngredients.push({ "name": menuList[i].dishes[j].recipe[k].name, "quant": menuList[i].dishes[j].recipe[k].quantity })
                                    }
                                }
                            }
                        }
                    }
                }
            }).catch(function(error) {
                console.log(error)
            });
        },
        methods: {
            dateFormat: function(date) {
                var today = new Date(date);
                var dd = today.getDate();
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                today = yyyy + '-' + mm + '-' + dd;
                return today
            },
            getDish: function() {
                axios({
                        url: 'http://projeto-sd-zebiano.c9users.io/arduinos',
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then((response) => {
                        //console.log(response.data)
                        var menuList = response.data

                        var todayDate = new Date();

                        this.meatPrediction = this.getAverage(menuList, todayDate, "Carne")
                        this.fishPrediction = this.getAverage(menuList, todayDate, "Peixe")
                        this.vegPrediction = this.getAverage(menuList, todayDate, "Vegetariano")
                        this.dietPrediction = this.getAverage(menuList, todayDate, "Dieta")

                        console.log(this.dietPrediction)
                    })
                    .catch(function(error) {
                        console.log(error)
                    });
            },
            getAverage: function(array, todayDate, dishType) {
                var count = 0;
                var average = 0;

                for (var i = 0; i < array.length; i++) {
                    var dateAlt = new Date(array[i].date)

                    if (dateAlt < todayDate && array[i].type == dishType) {
                        count = count + array[i].dishCount
                        average++
                    }
                }

                return Math.ceil(count / average)
            },
        }
    }
</script>
<style type="text/css">
    @media screen and (max-width: 480px) {
        .boxBorderIng {
            margin-right: 15px;
            margin-left: 15px;
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
        }
        .titlePrev {
            font-size: 28px;
            font-weight: bold;
        }
    }

    @media only screen and (min-width: 961px) {

        .boxBorderIng {
            margin-right: 15px;
            margin-left: 15px;
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
            padding: 20px;
        }
        .titlePrev {
            font-size: 28px;
            font-weight: bold;
        }
    }
</style>
