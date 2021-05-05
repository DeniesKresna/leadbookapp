import Vue from 'vue'
import App from './App.vue'
import router from './Routes'
import store from './store'
import api from './plugins/api';
import vuetify from './plugins/vuetify'
import * as VueGoogleMaps from 'vue2-google-maps';

import VeeValidate from "vee-validate";
Vue.use(VeeValidate, { inject: false });

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast);

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  api,
  render: h => h(App)
}).$mount('#app')
