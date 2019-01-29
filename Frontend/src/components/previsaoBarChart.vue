<template>
<div>
    <h1 class="titlePrev">Previsão vs Realidade</h1><br>
    <div class="boxBorderBarChart boxChart" style="margin: auto; padding: 20px;">
        <canvas id="myChart2"></canvas>
    </div>

</div>
</div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'donutChart',
        data() {
            return {
                menuToday: null,
                meat: "",
                fish: "",
                veg: "",
                diet: "",
                liveMeat: "",
                liveFish: "",
                liveVeg: "",
                liveDiet: "",
                ctx: "",
                count: 1
            }
        },
        components: {

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
                    var menuList = response.data

                    var todayDate = new Date();

                    var meatCount = this.getAverage(menuList, todayDate, "Carne")
                    var fishCount = this.getAverage(menuList, todayDate, "Peixe")
                    var vegCount = this.getAverage(menuList, todayDate, "Vegetariano")
                    var dietCount = this.getAverage(menuList, todayDate, "Dieta")

                    var total = meatCount + fishCount + vegCount + dietCount
                    this.meat = Math.round(meatCount / total * 100 * 10) / 10
                    this.fish = Math.round(fishCount / total * 100 * 10) / 10
                    this.veg = Math.round(vegCount / total * 100 * 10) / 10
                    this.diet = Math.round(dietCount / total * 100 * 10) / 10

                    var ctx = document.getElementById("myChart2").getContext('2d');

                    var redGrandient = ctx.createLinearGradient(300, 400, 300, 100);
                    redGrandient.addColorStop(0, '#D31027');
                    redGrandient.addColorStop(1, '#EA384D');

                    var blueGradient = ctx.createLinearGradient(300, 400, 300, 100);
                    blueGradient.addColorStop(0, '#00B4DB');
                    blueGradient.addColorStop(1, '#0083B0');

                    var greenGrandient = ctx.createLinearGradient(200, 0, 300, 300);
                    greenGrandient.addColorStop(0, '#DCE35B');
                    greenGrandient.addColorStop(1, '#45B649');

                    var orangeGrandient = ctx.createLinearGradient(0, 200, 400, 300);
                    orangeGrandient.addColorStop(0, '#FDC830');
                    orangeGrandient.addColorStop(1, '#F37335');
                    this.ctx = document.getElementById("myChart2").getContext('2d');

                    this.ctx = new Chart(ctx, {
                        type: 'horizontalBar',
                        data: {
                            labels: ["Carne", "Peixe", "Vegetariano", "Dieta"],
                            datasets: [{
                                label: ["Previsão"],
                                backgroundColor: "#7957d5",
                                data: [this.meat, this.fish, this.veg, this.diet]
                            }, {
                                label: "Live",
                                backgroundColor: "#410cd1",
                                data: [this.liveMeat, this.liveFish, this.liveVeg, this.liveDiet]
                            }]
                        },
                        options: {
                            title: {
                                display: false,
                            }
                        }
                    });
                })
                .catch(function(error) {
                    console.log(error)
                });
        },
        mounted: function() {
            this.$nextTick(function() {
                window.setInterval(() => {
                    this.getLiveRes()
                    this.ctx.data.datasets[1].data = [this.liveMeat, this.liveFish, this.liveVeg, this.liveDiet];
                    this.ctx.update();

                }, 1000);
            })
        },
        methods: {
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
            getLiveRes: function() {
                axios({
                        url: 'http://projeto-sd-zebiano.c9users.io/arduinos',
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then((response) => {

                        var menuList = response.data
                        var todayDate = new Date();
                        todayDate = this.dateFormat(todayDate)
                        for (var i = 0; i < menuList.length; i++) {

                            var dateAlt = new Date(menuList[i].date)
                            dateAlt = this.dateFormat(dateAlt)
                            if (dateAlt == todayDate) {

                                if (menuList[i].type == "Carne") {
                                    this.liveMeat = menuList[i].dishCount
                                }
                                if (menuList[i].type == "Peixe") {
                                    this.liveFish = menuList[i].dishCount
                                }
                                if (menuList[i].type == "Vegetariano") {
                                    this.liveVeg = menuList[i].dishCount
                                }
                                if (menuList[i].type == "Dieta") {
                                    this.liveDiet = menuList[i].dishCount
                                }
                            }
                        }

                        return [this.liveMeat, this.liveFish, this.liveVeg, this.liveDiet]
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
            }
        },
    }
</script>

<style>
    .boxBorderBarChart {
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
</style>
