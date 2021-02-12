import Vue from 'vue';
import App from './App.vue';
import VueMask from 'v-mask';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';
import Conversor from './components/Conversor';
import Cookies from './components/Cookies';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

Vue.use(Vuetify)
Vue.use(VueMask)
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Conversor },
  { path: '/politica-de-cookies', component: Cookies }
]

const router = new VueRouter({
  routes: routes, // short for `routes: routes`
})

new Vue({
  vuetify,
  router: router,
  render: h => h(App)
}).$mount('#app')




