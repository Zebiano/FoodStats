<template>
    <div class="container" is-fluid>
      <h1 class="title">Ementa da Semana</h1><br>
      
      <div class="columns">
        <div class="column boxBorder boxSizeXS">
          <b-table :data="data" :columns="columns"></b-table>
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
        estado: "sebas",
        data: [
          { 'dia': 'Segunda-Feira', 'estado': estado },
          { 'dia': 'Terça-Feira', 'estado': 'boss ' },
          { 'dia': 'Quarta-Feira', 'estado': 'fiuza ' },
          { 'dia': 'Quinta-Feira', 'estado': 'boss ' },
          { 'dia': 'Sexta-Feira', 'estado': 'dab ' },
        ],
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
          console.log(response.data)
          var menuList = response.data.menus;
          var today = new Date();
          var todayDay = today.getDay();
          var arrayEstado = []

          var dataArray;

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

          console.log("isto e todayday " + todayDay)

          if (todayDay == 1) {
            console.log(menuList)
          }

          for (var i = 0; i < menuList.length; i++) {

            var dateToday = menuList[i].date.split("T");

            if (today == dateToday[0] && todayDay == 1) {
              console.log("datinaha")

              for (var j = i; j < i + 5; j++) {

                if (menuList[j].dishes.length < 4) {
                  console.log("teamcoding")
                  arrayEstado.push("Incompleta")
                }
                else if (menuList[j].dishes.length === 4) {
                  arrayEstado.push("Pronta")
                }
                else {
                  arrayEstado.push("Erro")
                }
              }

            }
            else if (today == dateToday[0] && todayDay == 2) {
              console.log("datinha errado")
            }

          }

          console.log(arrayEstado)
          this.estado = "sebas"
        })
        .catch(function(error) {
          console.log(error)
        });
    }
  }
</script>

<style lang="css">
  .boxBorder {
    margin-right: 15px;
    margin-left: 15px;
    border: solid 0.05px;
    border-color: #e5e5e5;
    box-shadow: 3px 3px 5px #d1d1d1;
    border-radius: 5px;
    background-color: #fff;
  }

  .boxSizeXS {
    min-width: 12vw;
    max-width: 12vw;

  }

  .title {
    font-size: 28px;
    font-weight: bold;
  }
</style>
