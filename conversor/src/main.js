import Vue from 'vue'
import App from './App.vue'
import VueMask from 'v-mask'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import vuetify from './plugins/vuetify';

Vue.use(Vuetify,VueMask)

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')




