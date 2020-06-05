import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import http from 'vue-resource';
import Paginate from 'vuejs-paginate';

import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.config.productionTip = false;
Vue.use(http);
Vue.component('paginate', Paginate);

Vue.http.options.root = 'http://localhost:8080';
Vue.http.interceptors.push(request => {
  request.credentials = 'include';

  return function (response) {
    if (response.status === 401) {
      router.push({path: "/login"});
    }
  };
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
