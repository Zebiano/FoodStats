<template>
    <section>
    <div class="columns">
        <div class="column" id="teste">
            <div class="columns">
                <div class="column">
                    <h1 class="title">Refeições Vendidas</h1>
                </div>
                <div class="column" style="text-align: right">
                 <b-field label="">
            <b-select placeholder="Ontem"  @input="createBarChart()" v-model="optionChange" >
                <option v-for="option in options" >{{ option }}</option>
            </b-select>
        </b-field>
                </div>
            </div>
            <div class="boxBorderGraph boxSizeM">
                <div><canvas id="myChart" style="height:20vh; width:30vw; padding:30px"></canvas></div>
            </div>
        </div>
        <div class="column">
            <h1 class="title" style ="margin-top:10px">Número de Refeições Vendidas por Prato</h1>
            <div class="boxBorderGraph boxSizeM">
                <div>
                    <canvas id="myChart2" style="height:20vh; width:30vw; padding:30px"></canvas>
                </div>
                <div style="align-items: center; text-align:center">
                    <button class=" btn-chart" @click="createLineChart(0)" ><img src="../assets/todos.jpg" style="width:50px"></button>
                    <button class=" btn-chart" @click="createLineChart(1)" ><img src="../assets/carne.jpg" style="width:50px"></button>
                    <button class=" btn-chart" @click="createLineChart(2)" ><img src="../assets/peixe.jpg" style="width:50px"></button>
                    <button class=" btn-chart" @click="createLineChart(3)" ><img src="../assets/veget.jpg" style="width:50px"></button>
                    <button class=" btn-chart" @click="createLineChart(4)" ><img src="../assets/dieta.jpg" style="width:50px"></button>
                </div>
        </div>
        </div>
    </div>
    </section>
</template>

<script>
    import axios from 'axios'
    import Chart from 'chart.js';

    export default {
        data() {
            return {
                options: ['Ontem', 'Há 2 dias', 'Há 3 dias', 'Há 4 dias', 'Há 5 dias'],
                optionChange: "Ontem"
            }
        },
        methods: {
            getDate: function(minus) {

                var today = new Date();
                var dd = today.getDate() - minus;
                var mm = today.getMonth() + 1; //January is 0!
                var yyyy = today.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd;
                }

                if (mm < 10) {
                    mm = '0' + mm;
                }

                today = yyyy + '-' + mm + '-' + dd;

                var newDay = new Date(today)
                var newDayWD = newDay.getDay()
                //console.log(newDayWD)
                var isWeekend = false
                if (newDayWD == 0 || newDayWD == 6) {
                    isWeekend = true
                }
                //console.log(isWeekend)
                //console.log(today)
                return [today, isWeekend];
            },
            getBarChart: function(meatCount, fishCount, vegCount, dietCount) {
                var ctx = document.getElementById("myChart").getContext('2d');

                //#region creatGradients
                var redGrandient = ctx.createLinearGradient(0, 20, 200, 100);
                redGrandient.addColorStop(0, '#D31027');
                redGrandient.addColorStop(1, '#EA384D');

                var blueGradient = ctx.createLinearGradient(300, 50, 400, 230);
                blueGradient.addColorStop(0, '#00B4DB');
                blueGradient.addColorStop(1, '#0083B0');

                var greenGrandient = ctx.createLinearGradient(550, 200, 560, 280);
                greenGrandient.addColorStop(0, '#DCE35B');
                greenGrandient.addColorStop(1, '#45B649');

                var orangeGrandient = ctx.createLinearGradient(650, 200, 750, 300);
                orangeGrandient.addColorStop(0, '#FDC830');
                orangeGrandient.addColorStop(1, '#F37335');
                //#endregion

                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ["Carne", "Peixe", "Vegetariano", "Dieta"],
                        datasets: [{
                            label: ' ',
                            data: [meatCount, fishCount, vegCount, dietCount],
                            backgroundColor: [
                                redGrandient,
                                blueGradient,
                                greenGrandient,
                                orangeGrandient,
                            ],
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMax: 50,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            },
            getCounts: function(dateToday, menuList) {
                //console.log("Getting dishes count")
                for (var i = 0; i < menuList.length; i++) {
                    var dateMenu = menuList[i].date.split("T");

                    if (dateToday == dateMenu[0]) {
                        if (menuList[i].type == "Carne") {
                            this.meatCount = menuList[i].dishCount
                        }
                        if (menuList[i].type == "Peixe") {
                            this.fishCount = menuList[i].dishCount
                        }
                        if (menuList[i].type == "Vegetariano") {
                            this.vegCount = menuList[i].dishCount
                        }
                        if (menuList[i].type == "Dieta") {
                            this.dietCount = menuList[i].dishCount
                        }
                    }
                }
                return this.meatCount, this.fishCount, this.vegCount, this.dietCount
            },
            createBarChart: function() {
                axios({
                        url: 'http://projeto-sd-zebiano.c9users.io/arduinos',
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).then((response) => {
                        var menuList = response.data;

                        if (this.optionChange == "Ontem") {
                            var dateToday = this.getDate(1)
                            if (dateToday[1] == true) {
                                this.getBarChart(0.5, 0.5, 0.5, 0.5);
                                //console.log("is true")
                            }
                            else {
                                this.getCounts(dateToday[0], menuList)

                                this.getBarChart(this.meatCount, this.fishCount, this.vegCount, this.dietCount);
                            }

                        }
                        if (this.optionChange == "Há 2 dias") {
                            var dateToday = this.getDate(2)
                            if (dateToday[1] == true) {
                                this.getBarChart(0.5, 0.5, 0.5, 0.5);
                                //console.log("is true")
                            }
                            else {
                                this.getCounts(dateToday[0], menuList)

                                this.getBarChart(this.meatCount, this.fishCount, this.vegCount, this.dietCount);
                            }
                        }
                        if (this.optionChange == "Há 3 dias") {
                            var dateToday = this.getDate(3)
                            if (dateToday[1] == true) {
                                this.getBarChart(0.5, 0.5, 0.5, 0.5);
                                //console.log("is true")
                            }
                            else {
                                this.getCounts(dateToday[0], menuList)

                                this.getBarChart(this.meatCount, this.fishCount, this.vegCount, this.dietCount);
                            }
                        }
                        if (this.optionChange == "Há 4 dias") {
                            var dateToday = this.getDate(4)
                            if (dateToday[1] == true) {
                                this.getBarChart(0.5, 0.5, 0.5, 0.5);
                                //console.log("is true")
                            }
                            else {
                                this.getCounts(dateToday[0], menuList)

                                this.getBarChart(this.meatCount, this.fishCount, this.vegCount, this.dietCount);
                            }
                        }
                        if (this.optionChange == "Há 5 dias") {
                            var dateToday = this.getDate(5)
                            if (dateToday[1] == true) {
                                this.getBarChart(0.5, 0.5, 0.5, 0.5);
                                //console.log("is true")
                            }
                            else {
                                this.getCounts(dateToday[0], menuList)

                                this.getBarChart(this.meatCount, this.fishCount, this.vegCount, this.dietCount);
                            }
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    });
            },
            createLineChart: function(type) {
                axios({
                        url: 'http://projeto-sd-zebiano.c9users.io/arduinos',
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).then((response) => {
                        var menuList = response.data;
                        var arrayDishCount = [];
                        var arrayDishDate = [];
                        var arrayMeatCount = []
                        var arrayFishCount = []
                        var arrayVegCount = []
                        var arrayDietCount = []

                        //console.log(menuList)
                        var todayDate = new Date();
                        todayDate = this.dateFormat(todayDate)
                        //console.log(todayDate)
                        if (type === 0) {

                            for (var i = 0; i < menuList.length; i++) {
                                var dateAlt = new Date(menuList[i].date)
                                dateAlt = this.dateFormat(dateAlt)
                                if (dateAlt < todayDate) {
                                    if (menuList[i].type == "Carne") {
                                        arrayMeatCount.push(menuList[i].dishCount)
                                        arrayDishDate.push(this.formatDate(menuList[i].date))
                                    }
                                    if (menuList[i].type == "Peixe") {
                                        arrayFishCount.push(menuList[i].dishCount)
                                    }
                                    if (menuList[i].type == "Vegetariano") {
                                        arrayVegCount.push(menuList[i].dishCount)
                                    }
                                    if (menuList[i].type == "Dieta") {
                                        arrayDietCount.push(menuList[i].dishCount)
                                    }
                                }
                            }
                            this.getLineChartAll(arrayDishDate, arrayMeatCount, arrayFishCount, arrayVegCount, arrayDietCount)
                        }
                        if (type === 1) {

                            for (var i = 0; i < menuList.length; i++) {
                                var dateAlt = new Date(menuList[i].date)
                                dateAlt = this.dateFormat(dateAlt)
                                if (dateAlt < todayDate) {
                                    if (menuList[i].type == "Carne") {
                                        arrayDishCount.push(menuList[i].dishCount)
                                        arrayDishDate.push(this.formatDate(menuList[i].date))
                                    }
                                }
                            }

                            this.getLineChart(arrayDishDate, arrayDishCount, '#EA384D')
                        }

                        if (type === 2) {

                            for (var i = 0; i < menuList.length; i++) {
                                var dateAlt = new Date(menuList[i].date)
                                dateAlt = this.dateFormat(dateAlt)
                                if (dateAlt < todayDate) {
                                    if (menuList[i].type == "Peixe") {
                                        arrayDishCount.push(menuList[i].dishCount)
                                        arrayDishDate.push(this.formatDate(menuList[i].date))
                                    }
                                }
                            }

                            this.getLineChart(arrayDishDate, arrayDishCount, '#00B4DB')
                        }

                        if (type === 3) {

                            for (var i = 0; i < menuList.length; i++) {
                                var dateAlt = new Date(menuList[i].date)
                                dateAlt = this.dateFormat(dateAlt)
                                if (dateAlt < todayDate) {
                                    if (menuList[i].type == "Vegetariano") {
                                        arrayDishCount.push(menuList[i].dishCount)
                                        arrayDishDate.push(this.formatDate(menuList[i].date))
                                    }
                                }
                            }
                            this.getLineChart(arrayDishDate, arrayDishCount, '#81cd51')
                        }

                        if (type === 4) {

                            for (var i = 0; i < menuList.length; i++) {
                                var dateAlt = new Date(menuList[i].date)
                                dateAlt = this.dateFormat(dateAlt)
                                if (dateAlt < todayDate) {
                                    if (menuList[i].type == "Dieta") {
                                        arrayDishCount.push(menuList[i].dishCount)
                                        arrayDishDate.push(this.formatDate(menuList[i].date))
                                    }
                                }
                            }

                            this.getLineChart(arrayDishDate, arrayDishCount, '#f37015')
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    });
            },
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
            formatDate: function(date) {
                var myDate = date.split("T")
                var finalDate = myDate[0].split("-")
                myDate = finalDate[2] + "-" + finalDate[1] + "-" + finalDate[0]

                return myDate
            },
            getLineChart: function(arrayLabels, arrayData, color) {
                var ctx = document.getElementById("myChart2").getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        yAxisID: 50,
                        labels: arrayLabels,
                        datasets: [{
                            label: ' ',
                            data: arrayData,
                            borderColor: color,
                            pointBackgroundColor: color,
                            pointRadius: 5,
                            fill: false
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMax: 50,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

                this.myChart.destroy();
            },
            getLineChartAll: function(arrayDishDate, arrayMeatCount, arrayFishCount, arrayVegCount, arrayDietCount) {
                var ctx = document.getElementById("myChart2").getContext('2d');

                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: arrayDishDate,
                        datasets: [{
                            data: arrayMeatCount,
                            label: "Carne",
                            borderColor: "#EA384D",
                            pointBackgroundColor: "#EA384D",
                            pointRadius: 5,
                            fill: false
                        }, {
                            data: arrayFishCount,
                            label: "Peixe",
                            borderColor: "#00B4DB",
                            pointBackgroundColor: "#00B4DB",
                            pointRadius: 5,
                            fill: false
                        }, {
                            data: arrayVegCount,
                            label: "Vegetariano",
                            borderColor: "#81cd51",
                            pointBackgroundColor: "#81cd51",
                            pointRadius: 5,
                            fill: false
                        }, {
                            data: arrayDietCount,
                            label: "Dieta",
                            borderColor: "#f37015",
                            pointBackgroundColor: "#f37015",
                            pointRadius: 5,
                            fill: false
                        }]
                    },
                    options: {
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: false
                        },
                        scales: {
                            yAxes: [{
                                ticks: {
                                    suggestedMax: 50,
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            }
        },
        created: function() {
            this.$nextTick(function() {
                axios({
                        url: 'http://projeto-sd-zebiano.c9users.io/arduinos',
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    }).then((response) => {

                        var menuList = response.data;

                        var dateToday = this.getDate(1)
                        if (dateToday[1] == true) {
                            this.getBarChart(0.5, 0.5, 0.5, 0.5);
                            //console.log("is true")
                        }
                        else {
                            this.getCounts(dateToday[0], menuList)

                            this.getBarChart(this.meatCount, this.fishCount, this.vegCount, this.dietCount);
                        }
                    })
                    .catch(function(error) {
                        console.log(error)
                    });
            })
            this.createLineChart(0)
        }
    }
</script>

<style lang="css">
    .boxBorderGraph {
        margin-right: 15px;
        margin-left: 15px;
        border: solid 0.05px;
        border-color: #e5e5e5;
        box-shadow: 3px 3px 5px #d1d1d1;
        border-radius: 5px;
        background-color: #fff;
    }

    .boxSizeM {
        min-height: 40vh;
    }

    .title {
        font-size: 25px;
        font-weight: bold;
    }

    .button:focus {
        outline: none;
    }

    .btn-chart {
        border: none;
        outline: none;
        margin: 0px 5px;
    }
</style>
