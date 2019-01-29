<template>
  <section>
  <div id="app">
    <nav id ="navbar" class="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item">
      <router-link to="/">
          <img src="../src/assets/logo.png">
        </router-link>
    </a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isOpen = !isOpen" v-bind:class="{'is-active': isOpen}">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
    </div>

  <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
    <div class="navbar-start" style ="margin-left:20px">
      
      <a class="navbar-item bd-navbar-item-documentation  is-active" @click="isOpen = !isOpen">
        <router-link to="/">
          <span style ="color:black"><i style ="color:#7957D5" class="fa fa-home"></i> Inicio</span>
        </router-link>
      </a>
      <a class="navbar-item" @click="isOpen = !isOpen">
        <router-link to="/ementa">
          <span style ="color:black"><i style ="color:#7957D5" class="fa fa-bars"></i> Ementa</span>
        </router-link>
      </a>

      <a class="navbar-item" @click="isOpen = !isOpen">
        <router-link to="/pratos">
          <span style ="color:black"><i style ="color:#7957D5" class="fa fa-circle"></i> Pratos</span>
          </router-link>
      </a>
      <a class="navbar-item" @click="isOpen = !isOpen">
        <router-link to="/ingredientes">
          <span style ="color:black"><i style ="color:#7957D5" class="fa fa-apple"></i> Ingredientes</span>
          </router-link>
      </a>
      </div>
    </div>
    

    <div class="navbar-end">
      <div class="navbar-item" @click="isOpen = !isOpen">
        <div class="buttons">
          <a class="button is-primary" @click="logout">
            <strong>Sair</strong>
          </a>
      </div>
    </div>
  </div>
</nav>
</div>
    <!--<div class="parentx-static">

    <vs-sidebar static-position default-index="1" color="primary" class="sidebarx" spacer>

      <div class="header-sidebar" slot="header">
      <h1><i class="fa fa-user fa-lg"></i></h1>
        <h4>
          José Alfredo
        </h4>

      </div>

      <vs-sidebar-item index="1" router-link to="/"></router-link>
        <i class="fa fa-home" style = "padding-right: 5px;"></i> Inicio
      </vs-sidebar-item>

      <vs-sidebar-item index="2" router-link to="/ementa"></router-link>
        <i class="fa fa-list-ul"style = "padding-right: 5px;"></i> Ementa
      </vs-sidebar-item>

      <vs-sidebar-item index="3" router-link to="/pratos"></router-link>
        <i class="fa fa-home" style = "padding-right: 5px;"></i> Pratos
      </vs-sidebar-item>

      <vs-sidebar-item index="4" router-link to="/ingredientes"></router-link>
       <i class="fa fa-home" style = "padding-right: 5px;"></i> Ingredientes
      </vs-sidebar-item>
       <div class="footer-sidebar" slot="footer">
        <vs-button color="danger" type="flat">log out</vs-button>
        <vs-button icon="settings" color="primary" type="border"></vs-button>
      </div>
    </vs-sidebar>
  </div>-->
  <router-view/>
  </div>
  </section>
</template>

<script>
  import axios from 'axios'

  import App from './App.vue' //Load App
  const API_URL = process.env.API_URL || 'http://localhost:3000/api/v1'
  import { Toast } from 'buefy/dist/components/toast'

  export default {
    data: function() {
      return {
        isOpen: false
      }
    },
    watch: {
      $route(to, from) {
        if (window.localStorage.token == undefined) {
          console.log("We dont have a token!");
          this.$router.push('Login');
        }
        else if (window.localStorage.token != undefined) {
          // Check if token is still active
          axios({
              url: 'http://projeto-sd-zebiano.c9users.io/testezao',
              method: 'get',
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
              }
            })
            .catch(function(err) {
              window.localStorage.removeItem('token');

              Toast.open({
                duration: 3000,
                message: "A sua sessão expirou. Por favor, faça login novamente.",
                type: 'is-warning',
              })

              // Waits 3100 miliseconds and then refreshes the page
              setTimeout(function() {
                location.reload('http://sd-frontend-zebiano.c9users.io/#/login');
              }, 2000);
            });
        }
      }
    },
    created() {
      if (window.localStorage.token == undefined) {
        console.log("We dont have a token!");
        this.$router.push('Login');
      }
    },
    methods: {
      // logs the user out
      logout: function() {
        //console.log("Siga sair mens!");
        window.localStorage.removeItem('token');

        Toast.open({
          duration: 3000,
          message: `Logout com sucesso! A redirecionar...`,
          type: 'is-success',
        });

        // Waits 1000 miliseconds and then refreshes the page
        setTimeout(function() {
          location.reload('http://sd-frontend-zebiano.c9users.io/#/login');
        }, 2000);
      }
    }
  }

  axios.create({
    name: 'App',
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  })
</script>

<style lang="css">
</style>
