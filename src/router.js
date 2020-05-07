import Vue from 'vue';
import Router from 'vue-router';
import Home from "./views/Home";
import Fournisseurs from "./views/Fournisseurs";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/fournisseurs',
      name: 'fournisseurs',
      component: Fournisseurs,
    },
  ]
});
