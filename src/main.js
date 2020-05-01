import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import http from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(http);

Vue.http.options.root = 'http://localhost:8080';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
