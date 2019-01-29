<template>
    <div class="container" is-fluid>
      <h1 class="title">Ementa do dia</h1><br>
      
      <div class="columns">
        <div class="column columnDish boxBorderXS boxSizeXS">
          <img src="../assets/carne.jpg" class="moveSmallImage"></img><br>
          <p class="dishName">{{meat}}</p>
        </div>
        
        <div class="column columnDish boxBorderXS boxSizeXS">
          <img src="../assets/peixe.jpg" class="moveSmallImage"></img><br>
          <p class="dishName">{{fish}}</p>
        </div>
        
        <div class="column columnDish boxBorderXS boxSizeXS">
          <img src="../assets/veget.jpg" class="moveSmallImage"></img><br>
          <p class="dishName">{{veg}}</p>
        </div>
        
        <div class="column columnDish boxBorderXS boxSizeXS">
          <img src="../assets/dieta.jpg" class="moveSmallImage"></img><br>
          <p class="dishName">{{diet}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        menuToday: null,
        meat: "",
        fish: "",
        veg: "",
        diet: "",
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
          var today = new Date();
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
          //console.log(today)

          for (var i = 0; i < menuList.length; i++) {

            var dateToday = menuList[i].date.split("T");

            if (today == dateToday[0]) {

              menuToday = menuList[i];
              //console.log(menuToday)
              for (var j = 0; j < menuToday.dishes.length; j++) {

                if (menuToday.dishes[j].dishType == "Carne") {
                  this.meat = menuToday.dishes[j].name
                }
                if (menuToday.dishes[j].dishType == "Peixe") {
                  this.fish = menuToday.dishes[j].name
                }
                if (menuToday.dishes[j].dishType == "Vegetariano") {
                  this.veg = menuToday.dishes[j].name
                }
                if (menuToday.dishes[j].dishType == "Dieta") {
                  this.diet = menuToday.dishes[j].name
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

    .boxBorderXS {
      border: solid 0.05px;
      border-color: #e5e5e5;
      box-shadow: 3px 3px 5px #d1d1d1;
      border-radius: 5px;
      background-color: #fff;
    }
    
    .columnDish {
      margin-top: 10px;
      text-align: center;
      width: 100%;
      height: auto;
    }

    .title {
      font-size: 28px;
      font-weight: bold;
    }

    .moveSmallImage {
      width: 20%;
      height: auto;
    }

    .dishName {
      font-size: 22px;
      font-weight: 550;
    }

  }

  @media only screen and (min-width: 961px) {

    .boxBorderXS {
      margin-right: 15px;
      margin-left: 15px;
      border: solid 0.05px;
      border-color: #e5e5e5;
      box-shadow: 3px 3px 5px #d1d1d1;
      border-radius: 5px;
      background-color: #fff;
    }

    .boxSizeXS {
      max-width: 10vw;
    }

    .columnDish {
      padding-top: 30px;
      text-align: center;
      min-height: 25vh;
      max-height: 25vh;
    }

    .title {
      font-size: 28px;
      font-weight: bold;
    }

    .moveSmallImage {
      height: 45%;
    }

    .dishName {
      font-size: 22px;
      font-weight: 550;
    }
  }
</style>
