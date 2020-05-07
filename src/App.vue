<template>
  <div id="app" class="container">
    <nav>
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Accueil</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/fournisseurs" class="nav-link">Fournisseurs</router-link>
        </li>
      </ul>
    </nav>

    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {}
  }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  li {
    margin: 3px;
    display: inline-block;
    text-decoration: none;
  }
</style>
