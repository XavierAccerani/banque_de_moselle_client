<template>
  <div id="app" class="container">
    <nav id="menu">
      <ul class="navbar-collapse justify-content-center" v-if="userActuel">
        <li class="nav-item" >
          <router-link to="/" >Accueil</router-link>
        </li>
        <li class="nav-item">
          <a  href class="nav-fill">Faire une commande</a>
        </li>
        <li class="nav-item">
          <router-link to="commandes" >Commandes</router-link>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <a  href>Utilisateurs</a>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <router-link to="/articles/importer" >Importer articles</router-link>
        </li>
        <li class="nav-item" v-if="isAdmin">
          <router-link to="/fournisseurs" >Fournisseurs</router-link>
        </li>
        <li class="nav-item">
          <a  href @click="logout" >Déconnection</a>
        </li>
        <li class="nav-item navbar-text">
          {{userActuel.username}}
        </li>
      </ul>

      <ul class="nav justify-content-center">
        <li class="nav-item" v-if="!userActuel">
          <router-link class="nav-link" to="login">Login</router-link>
        </li>
      </ul>
    </nav>

    <router-view/>
  </div>
</template>

<script>
  /* eslint-disable no-console */
  import {router} from './router';
  import {userService} from "./services/user.service";

  export default {
    name: 'App',
    data() {
      return {
        userActuel: ''
      }
    },
    created() {
      this.userActuel = userService.userActuel();
    },
    computed: {
      isAdmin: function () {
        return this.userActuel && this.possedeLeRoleAdmin(this.userActuel);
      }
    },
    methods: {
      logout() {
        userService.logout();
        router.navigate(['/login']);
      },
      possedeLeRoleAdmin(user) {
        for (const element of user.authorities) {
          if (element['authority'] === 'ROLE_ADMINS') {
            return true;
          }
        }
        return false;
      }
    }
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  #menu{
    margin: 5px;
  }
 #menu ul{
   background: #0090ff;
   border-radius: 50px;
 }
  #menu li {
    margin-left: 2%;
    margin-right: 1%;
    display: inline-block;
    text-decoration: none;
    color: black;
  }
  #menu router-lin, #menu a{
    color: white;
    text-shadow: 2px 1px 1px rgba(0, 0, 0, 0.85);
  }
</style>
