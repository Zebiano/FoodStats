<template>
    <div>
      <h1 class="title">Ementa da Semana</h1><br>
      
      <div class="columns">
        <div class="column boxBorders">
          <b-table :data="estados" :columns="columns"></b-table>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        menu: null,
        estados: [],
        columns: [{
            field: 'dia',
            label: 'Dia',
          },
          {
            field: 'estado',
            label: 'Estado',
          }
        ]
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
          //console.log(response.data)
          var menuList = response.data.menus;
          var today = new Date();
          var todayDay = today.getDay();
          var arrayEstado = []
          var dataArray = []

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

          //console.log("isto e todayday " + todayDay)


          for (var i = 0; i < menuList.length; i++) {

            var dateToday = menuList[i].date.split("T");

            if (today == dateToday[0] && todayDay == 1) {
              //console.log("Today is Monday!")

              for (var j = i; j < i + 5; j++) {

                if (menuList[j].dishes.length < 4) {
                  arrayEstado.push("Incompleta")
                }
                else if (menuList[j].dishes.length == 4) {
                  arrayEstado.push("Pronta")
                }
                else {
                  arrayEstado.push("Erro")
                }
              }

            }
            else if (today == dateToday[0] && todayDay == 2) {
              //console.log("Today is Thursday")

              for (var j = i - 1; j < i + 4; j++) {

                if (menuList[j].dishes.length < 4) {
                  arrayEstado.push("Incompleta")
                }
                else if (menuList[j].dishes.length == 4) {
                  arrayEstado.push("Pronta")
                }
                else {
                  arrayEstado.push("Erro")
                }
              }
            }
            else if (today == dateToday[0] && todayDay == 3) {
              //console.log("Hoje é Wednesday!")

              for (var j = i - 2; j < i + 3; j++) {

                if (menuList[j].dishes.length < 4) {
                  arrayEstado.push("Incompleta")
                }
                else if (menuList[j].dishes.length == 4) {
                  arrayEstado.push("Pronta")
                }
                else {
                  arrayEstado.push("Erro")
                }
              }
            }
            else if (today == dateToday[0] && todayDay == 4) {
              //console.log("Hoje é Thursday!")

              for (var j = i - 3; j < i + 2; j++) {

                if (menuList[j].dishes.length < 4) {
                  arrayEstado.push("Incompleta")
                }
                else if (menuList[j].dishes.length == 4) {
                  arrayEstado.push("Pronta")
                }
                else {
                  arrayEstado.push("Erro")
                }
              }
            }
            else if (today == dateToday[0] && todayDay == 5) {
              //console.log("Hoje é Friday!")

              for (var j = i - 4; j < i + 1; j++) {

                if (menuList[j].dishes.length < 4) {
                  arrayEstado.push("Incompleta")
                }
                else if (menuList[j].dishes.length == 4) {
                  arrayEstado.push("Pronta")
                }
                else {
                  arrayEstado.push("Erro")
                }
              }
            }


          }

          //console.log(arrayEstado)
          dataArray.push({ 'dia': 'Segunda-Feira', 'estado': arrayEstado[0] })
          dataArray.push({ 'dia': 'Terça-Feira', 'estado': arrayEstado[1] })
          dataArray.push({ 'dia': 'Quarta-Feira', 'estado': arrayEstado[2] })
          dataArray.push({ 'dia': 'Quinta-Feira', 'estado': arrayEstado[3] })
          dataArray.push({ 'dia': 'Sexta-Feira', 'estado': arrayEstado[4] })


          this.estados = dataArray
        })
        .catch(function(error) {
          //console.log(error)
        });
    }
  }
</script>

<style lang="css">
  @media screen and (max-width: 480px) {

    .boxBorders {
      margin-right: 0px;
      margin-left: 0px;
      margin-top:10px;
      border-color: #e5e5e5;
      box-shadow: 3px 3px 5px #d1d1d1;
      background-color: #fff;
    }

    .title {
      font-size: 28px;
      font-weight: bold;
      margin-left: 0px;
    }

    .rows {
      margin-bottom: 20px;
    }

  }

  @media only screen and (min-width: 961px) {

    .boxBorders {
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

    .rows {
      margin-bottom: 20px;
    }
  }
</style>
