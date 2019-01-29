<template>
<div>
<h1 class="titlePrev">Resultados (em tempo real)</h1><br>
<div class="boxBorderNotas">
        <div class="columns realTime">
            <div class="column realTimeMargin">
                <h1 class="liveCount">{{liveMeat}}</h1>
               <h2>Carne</h2>
            </div>
            <div class="column liveCountColumn">
                <h1 class="liveCount">{{liveFish}}</h1>
               <h2>Peixe</h2></div>
            <div class="column liveCountColumn"><h1 class="liveCount">{{liveVeg}}</h1>
               <h2>Vegetariano</h2></div>
            <div class="column liveCountColumn"><h1 class="liveCount">{{liveDiet}}</h1>
               <h2>Dieta</h2></div>
        </div>
</div>
</div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'previsaoIngredientes',
        data() {
            return {
                liveMeat: 0,
                liveFish: 0,
                liveVeg: 0,
                liveDiet: 0
            }
        },
        components: {

        },
        mounted: function() {
            this.$nextTick(function() {
                window.setInterval(() => {
                    axios({
                            url: 'http://projeto-sd-zebiano.c9users.io/arduinos',
                            method: 'get',
                            headers: {
                                "Authorization": "Bearer " + localStorage.getItem("token")
                            }
                        })
                        .then((response) => {
                            var menuList = response.data
                            //console.log(menuList)

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

                            //console.log(this.liveMeat)

                        })
                        .catch(function(error) {
                            console.log(error)
                        });

                }, 1000);
            })
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
            }
        }
    }
</script>

<style>
    @media screen and (max-width: 480px) {
        .boxBorderNotas {
            margin-right: 15px;
            padding:10px;
            margin-left: 15px;
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
        }

        .liveCount {
            font-size: 7vh;
            font-weight: bold;
        }
        .realTime {
            text-align: center;
        }
        .titlePrev {
            font-size: 28px;
            font-weight: bold;
        }
        /*.realTimeMargin{
            margin: auto;
            width: 50%;
        }
        .liveCountColumn{
         margin: auto;
         width: 50%;   
        }*/
    }

    @media only screen and (min-width: 961px) {

        .boxBorderNotas {
            margin-right: 15px;
            margin-left: 15px;
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
        }

        .liveCount {
            font-size: 7vh;
            font-weight: bold;
        }
        .realTime {
            text-align: center; 
            height: 22vh;
        }
        .realTimeMargin{
            margin: auto;
            width: 50%;
        }
        .liveCountColumn{
         margin: auto;
         width: 50%;   
        }
        .titlePrev {
            font-size: 28px;
            font-weight: bold;
        }
    }
</style>
