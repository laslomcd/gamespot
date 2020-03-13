import Vue from 'vue'
import App from './App.vue'
import router from './routes';
import VueResource from 'vue-resource';
import store from './store/store';
import vuelidate from 'vuelidate';

import { MdCard } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdCard)

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Button from './components/UI/Button';

Vue.component('app-header', Header);
Vue.component('app-footer', Footer);
Vue.component('app-button', Button);

Vue.use(VueResource);
Vue.http.options.route = '';

Vue.use(vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
