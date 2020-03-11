import Vue from 'vue'
import App from './App.vue'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

Vue.component('app-header', Header);
Vue.component('app-footer', Footer);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
