<template>
    <div>
      <h1 class="titlePrev">Previsao de Hoje</h1><br>
      <div class="columns">
        <div class="column boxBorderPrevDia boxCutePrev" style="background-image:linear-gradient(to right, #d31027, #ea384d);">
            <div class="columns">
                <div class="column">
                    <p class="dishCountPrev">{{meatPrediction}}</p>
                </div>
                <div class="column is-four-fifths">
                    <p class="textEffectPrev">Refeições de carne</p>
                </div>
            </div>
        </div>
        <div class="column boxBorderPrevDia boxCutePrev" style="background-image:linear-gradient(to right, #0083b0, #00b4db);">
          <div class="columns">
                <div class="column">
                    <p class="dishCountPrev">{{fishPrediction}}</p>
                </div>
                <div class="column is-four-fifths">
                    <p class="textEffectPrev">Refeições de peixe</p>
                </div>
            </div>
        </div>
        <div class="column boxBorderPrevDia boxCutePrev" style="background-image:linear-gradient(to right, #45b649, #dce35b);">
          <div class="columns">
                <div class="column">
                    <p class="dishCountPrev">{{vegPrediction}}</p>
                </div>
                <div class="column is-four-fifths">
                    <p class="textEffectPrev">Refeições de vegetariano</p>
                </div>
            </div>
        </div>
        <div class="column boxBorderPrevDia boxCutePrev" style="background-image:linear-gradient(to right, #f37335, #fdc830);">
          <div class="columns">
                <div class="column">
                    <p class="dishCountPrev">{{dietPrediction}}</p>
                </div>
                <div class="column is-four-fifths">
                    <p class="textEffectPrev">Refeições de dieta</p>
                </div>
            </div>
        </div>
        
      </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                meatPrediction: 0,
                fishPrediction: 0,
                vegPrediction: 0,
                dietPrediction: 0
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

<style lang="css">
    @media screen and (max-width: 480px) {
        .boxBorderPrevDia {
            margin-right: 15px;
            margin-left: 15px;
            margin-top: 15px;
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
        }

        /*.boxCute {
            min-height: 15vh;
            max-height: 15vh;
        }*/

        .columnDishPrev {
            padding-top: 30px;
            text-align: center;
            min-height: 25vh;
            max-height: 25vh;
        }

        .dishCountPrev {
            font-size: 6vh;
            font-weight: bold;
            color: white;
        }

        .textEffectPrev {
            color: white;
            font-size: 24px;
            margin: 3vh
        }

        .titlePrev {
            font-size: 28px;
            font-weight: bold;
        }
    }

    @media only screen and (min-width: 961px) {

        .boxBorderPrevDia {
            margin-right: 15px;
            margin-left: 15px;
            border: solid 0.05px;
            border-color: #e5e5e5;
            box-shadow: 3px 3px 5px #d1d1d1;
            border-radius: 5px;
            background-color: #fff;
        }

        .boxCutePrev {
            min-height: 12vh;
            max-height: 12vh;
        }

        .columnDishPrev {
            padding-top: 30px;
            text-align: center;
            min-height: 25vh;
            max-height: 25vh;
        }

        .dishCountPrev {
            font-size: 6vh;
            font-weight: bold;
            color: white;
        }

        .textEffectPrev {
            color: white;
            font-size: 23px;
            margin: 3vh
        }

        .titlePrev {
            font-size: 28px;
            font-weight: bold;
        }
    }
</style>
