//Imports

import Vue from 'vue' //Load Vue
import App from './App.vue' //Load App
import Buefy from 'buefy' //Buefy import
import 'buefy/dist/buefy.css' //Buefy styles
import Vuesax from 'vuesax' //Vuesax import
import 'vuesax/dist/vuesax.css' //Vuesax styles
import router from './router.js'
import './registerServiceWorker'


//import 'bulma/css/bulma.css'

//import Material from 'material-icons' //Material-Icons import
//import 'material-icons/iconfont/material-icons.css'; //marterial-icon styles

//Vue import Rotas

//Vue Uses

Vue.config.productionTip = false
Vue.config.performance = true
Vue.use(Vuesax);
Vue.use(Buefy, {
    defaultIconPack:'fa',
    defaultFirstDayOfWeek:1
});
Vue.use(router);




const vue1 = new Vue({
  router,
  el: '#app',
  components: { App },
  template: '<App/>',
  render: h => h(App),
}).$mount('#app')
