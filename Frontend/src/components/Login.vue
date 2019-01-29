<template>
    <section style="height:100vh">
        <div class="columns">
            <div class="column"></div>
             <div class="column">
                 <div class="boxBorders" style="padding:40px; margin-top:15vh">
                     <center><img src="../assets/logoNovo.png" style="width:60%"></img></center>
                    <b-field label="Nome">
                    <b-input v-model="username">
                    </b-input>
        </b-field>
        <b-field label="Palavra-Passe">
            <b-input v-model="password" value="" type="password" maxlength="30"></b-input>
        </b-field>
        <button class="button is-primary" @click="checkUser">Entrar</button></div></div>
              <div class="column"></div>
        </div>
        
       
    </section>
</template>

<script>
    import axios from 'axios';
    import { Toast } from 'buefy/dist/components/toast'

    export default {
        name: 'login',
        data() {
            return {
                username: "",
                password: "",
            }
        },
        created() {
            if (window.localStorage.token != undefined) {
                //console.log("we have a token!");
                location.reload();
                window.location = 'http://sd-frontend-zebiano.c9users.io/#/';
            }
        },
        methods: {
            // Check Users credentials
            checkUser: function() {
                if (this.username.length != 0 && this.password.length != 0) {
                    axios.post('http://projeto-sd-zebiano.c9users.io/login', {
                            username: this.username,
                            password: this.password
                        }).then(response => {
                            const token = response.data.token;
                            window.localStorage.setItem('token', token);
                            console.log("Added token to localstorage.");

                            Toast.open({
                                duration: 3000,
                                message: `Login com sucesso! A redirecionar...`,
                                type: 'is-success',
                            });

                            // Waits 1000 miliseconds and then refreshes the page
                            setTimeout(function() {
                                location.reload();
                                window.location = 'http://sd-frontend-zebiano.c9users.io/#/';
                            }, 1000);

                        })
                        .catch(err => {
                            Toast.open({
                                duration: 3000,
                                message: err.response.data,
                                type: 'is-danger',
                            })
                        })
                }
                else {
                    Toast.open({
                        duration: 3000,
                        message: "Insira todas as suas credenciais",
                        type: 'is-danger',
                    })
                }
            }
        }
    }
</script>

<style>
    .boxBorders {
        margin-right: 0px;
        margin-left: 0px;
        margin-top: 10px;
        border-color: #e5e5e5;
        box-shadow: 3px 3px 5px #d1d1d1;
        background-color: #fff;
    }

    .navbar {
        display: none;
    }
</style>
