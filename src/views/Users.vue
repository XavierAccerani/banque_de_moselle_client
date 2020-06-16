<template>
  <div class="row">
    <h1 class="col-12">Liste des utilisateurs</h1>
  <div class="col-12">
    <br>
    <input id="user-search" class="col-xs-12" list="liste-users"
           autocomplete="off" value="" placeholder="Rechercher un utilisateur">
    <datalist id="liste-users">
      <option v-for="user in users" :key="user.id" :value="user.nomComplet"></option>
    </datalist>
    <br>
    <br>
    <ul class="liste">
      <li v-for="user in users" :key="user.id"
          class="item">
        {{user.nomComplet|capitalize}}
      </li>
    </ul>
  </div>
  </div>
</template>

<script>

  export default {
    name: "Users",
    data() {
      return {
        users: [],
        nbPages: 0
      }
    },
    async mounted() {
      await this.getUsers();
    },
    methods: {
      async getUsers() {
        try {
          const reponse = await this.$http.get('users');
          this.users = reponse.data;
        } catch (e) {
          console.error(e);
        }
      },
    }
  }
</script>

<style scoped>
  .liste {
    list-style: none;
    padding-left: 0;
    width: 100%;
    position: relative;
  }

  .item {
    margin: 5px auto;
    border-radius: 4px;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    background-color: aliceblue;
  }
</style>
