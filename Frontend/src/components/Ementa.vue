<template>
 <div class="ementa">
     <div class="columns">
         <div class="column">
             <listaEmenta class= "ementaSemana"></listaEmenta>
         </div>
         <div class="column">
              <todayMenu class= "todayMenu"></todayMenu>
            <div class="columns" style="margin-top: 40px">
                <div class="column">
             <editMenu class= "editMenu"></editMenu>
                </div>
                <div class="column">
             <newMenu class= "newMenu"></newMenu>
                </div>
                <div class="column">
                </div>
        </div>
     </div>
      </div>
      
      
  </div>
</template>



<script>
    import axios from 'axios'
    import listaEmenta from './listaEmenta.vue'
    import todayMenu from './ementaDoDiaXS.vue'
    import newMenu from './adicionarEmenta.vue'
    import editMenu from './editarEmenta.vue'

    export default {
        components: {
            listaEmenta,
            todayMenu,
            newMenu,
            editMenu
        },
        data() {
            return {
                ementa: {},
            }
        },
        /*
        created() {
            axios.get('https://cors.io/?https://projeto-sd-zebiano.c9users.io/token')
                .then(response => {
                    this.token = response.data
                    const token = response.data.token;
                    // console.log("Token: " + token)
                    localStorage.setItem('token', token);
                })
                .catch(err => {
                    console.log(err)
                })
            axios({
                    url: 'https://projeto-sd-zebiano.c9users.io/menus',
                    method: 'get',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })
                .then((response) => {
                    console.log(response.data.menus)

                    this.ementa = response.data;
                })
                .catch(function(error) {
                    console.log(error)
                });

        }*/

    }
</script>
<style type="text/css">
    @media screen and (max-width: 480px) {
        .ementa{
           padding: 20px;
       }
      .todayMenu {
          padding: 10px;
      }
      .ementaSemana {
          padding: 10px;
      }
      .editMenu{
          padding: 10px;
      }
      .newMenu{
          padding: 10px;
      }
  }
   @media only screen and (min-width: 961px) {
       
       .todayMenu{
           margin-right:10px;
       }
       .ementa{
           padding: 20px;
       }
      /*.ementaSemana {
          padding: 40px;
      }*/
  }
</style>
