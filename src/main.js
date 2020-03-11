import Vue from 'vue'
import App from './App.vue'
import router from './routes';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Button from './components/UI/Button';

Vue.component('app-header', Header);
Vue.component('app-footer', Footer);
Vue.component('app-button', Button);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
