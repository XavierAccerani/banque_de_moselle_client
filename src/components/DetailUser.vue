<template>
  <div class="detail-user">
    <h2>Détail utilisateur</h2>

    <form @submit.prevent="validerForm">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input id="nom" type="text" class="form-control" v-model="user.nom" readonly>
      </div>
      <div class="form-group">
        <label for="prenom">Prénom</label>
        <input id="prenom" type="text" class="form-control" v-model="user.prenom" readonly>
      </div>
      <div class="form-group">
        <br>
        <strong>Rôles de l'utilisateur</strong>
        <br><br>
        <div class="form-check">
          <input class="form-check-input" type="checkbox"
                 id="redacteur" value="redacteurs" v-model="checkedRoles">
          <label class="form-check-label" for="redacteur"> Rédacteur</label>
          <br>
          <input class="form-check-input" type="checkbox"
                 id="viseur" value="viseurs" v-model="checkedRoles">
          <label class="form-check-label" for="viseur"> Viseur</label>
          <br>
          <input class="form-check-input" type="checkbox"
                 id="signataire" value="signataires" v-model="checkedRoles">
          <label class="form-check-label" for="signataire"> Signataire</label>
          <br>
          <input class="form-check-input" type="checkbox"
                 id="receptionneur" value="receptionneurs" v-model="checkedRoles">
          <label class="form-check-label" for="receptionneur"> Réceptionneur</label>
          <br>
          <input class="form-check-input" type="checkbox"
                 id="gestionnaire" value="gestionnaires" v-model="checkedRoles">
          <label class="form-check-label" for="gestionnaire"> Gestionnaire</label>
          <br>
          <input class="form-check-input" type="checkbox"
                 id="admin" value="admins" v-model="checkedRoles">
          <label class="form-check-label" for="admin"> Administrateur</label>
          <br>
          <!-- Pour vérif -->
          <span>{{checkedRoles}}</span>
        </div>
      </div>
      <button type="submit" class="btn btn-success">Enregistrer</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "DetailUser",
    props: ['user'],
    data() {
      return {
        checkedRoles: []
      }
    },
    watch: {
      $route: 'getUsers'
    },
    methods: {
      validerForm() {
      },
      async enregistrer() {
      }
    }
  }
</script>

<style scoped>
  .detail-user {
    padding: 5px;
    border-radius: 3px;
    background-color: aliceblue;
  }
</style>
