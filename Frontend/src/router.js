import Vue from 'vue'
import router from 'vue-router'
import Inicio from './components/Inicio.vue'
import Ementa from './components/Ementa.vue'
import Ingredientes from './components/Ingredientes.vue'
import Pratos from './components/Pratos.vue'
import Previsao from './components/Previsao.vue'
import Login from './components/Login.vue'

Vue.use(router)

export default new router({
  routes: [{
      path: '/',
      name: 'inicio',
      component: Inicio
    },
    {
      path: '/ementa',
      name: 'ementa',
      component: Ementa
    },
    {
      path: '/pratos',
      name: 'pratos',
      component: Pratos
    },
    {
      path: '/ingredientes',
      name: 'ingredientes',
      component: Ingredientes
    },
    {
      path: '/previsao',
      name: 'previsao',
      props: true,
      component: Previsao
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
