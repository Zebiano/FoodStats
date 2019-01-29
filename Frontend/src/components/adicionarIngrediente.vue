<template>
      <div>
          <h1 class="title">Adicionar Ingrediente</h1>
          <div class="boxBorder" style="padding: 15px">
    </b-field>
      <b-field label="Nome do Ingrediente">
            <b-input placeholder="Exemplo: Arroz" v-model ="ingrediente"></b-input>
        </b-field>
<section>
<a class="button is-link" @click="confirmar">Adicionar</a>
</section>
</div>
</div>
</template>

<script>
    import axios from 'axios'
    import { Toast } from 'buefy/dist/components/toast'

    export default {
        data() {
            return {
                ingrediente: ""
            }
        },

        methods: {
            confirmar: function(click) {
                console.log(this.ingrediente);
                axios({
                        method: 'post',
                        url: 'http://projeto-sd-zebiano.c9users.io/ingredients',
                        data: {
                            name: this.ingrediente
                        },
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                
                    })
                    .then(function(response) {
                        Toast.open({
                            duration: 3000,
                            message: `O ingrediente foi adicionado com sucesso!`,
                            type: 'is-success',
                        });
                
                        // Waits 3100 miliseconds and then refreshes the page
                        setTimeout(function() {
                            location.reload();
                        }, 3100);
                        //console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error)
                        Toast.open({
                            duration: 3000,
                            message: error.response.data,
                            type: 'is-danger',
                        })
                    });
            },
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

    .title {
        font-size: 28px;
        font-weight: bold;
    }
</style>
