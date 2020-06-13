import Vue from 'vue';
import Router from 'vue-router';
import Home from "./views/Home";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Fournisseurs from "./views/Fournisseurs";
import Commandes from "./views/Commandes";

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
    {
      path: '/commandes',
      name: 'commandes',
      component: Commandes,
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  // redirection vers la page de login si user non connecté et essaie d'accéder à une page protégée
  const pagesPubliques = ['/login'];
  const authRequise = !pagesPubliques.includes(to.path);
  const estConnecte = localStorage.getItem('user');

  if (authRequise && !estConnecte) {
    return next({
      path: '/login',
      query: { returnUrl: to.path }
    });
  }

  next();
});
