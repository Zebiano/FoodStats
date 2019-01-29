<template>
<div>
    <h1 class="titlePrev">Refeições para hoje (%)</h1><br>
    <div class="boxBorderDoughnut boxChart" style="margin: auto; padding: 20px;">
        <canvas id="myChart"></canvas>
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
                myId: "",
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
                    //console.log(meatCount)

                    var total = meatCount + fishCount + vegCount + dietCount
                    //console.log(total)
                    this.meat = Math.round(meatCount / total * 100 * 10) / 10
                    this.fish = Math.round(fishCount / total * 100 * 10) / 10
                    this.veg = Math.round(vegCount / total * 100 * 10) / 10
                    this.diet = Math.round(dietCount / total * 100 * 10) / 10
                    //console.log(meatCount)
                    var ctx = document.getElementById("myChart").getContext('2d');

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

                    var myChart = new Chart(ctx, {
                        type: 'doughnut',
                        options: { legend: { position: 'right' } },
                        data: {
                            labels: ["Carne", "Peixe", "Vegetariano", "Dieta"],
                            datasets: [{
                                label: ' ',
                                data: [this.meat, this.fish, this.veg, this.diet],
                                backgroundColor: [
                                    redGrandient,
                                    blueGradient,
                                    greenGrandient,
                                    orangeGrandient,
                                ],
                            }]
                        },
                    });
                })
                .catch(function(error) {
                    console.log(error)
                });
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
        }
    }
</script>

<style>
    .boxBorderDoughnut {
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
