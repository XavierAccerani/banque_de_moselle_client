<template>
  <div class="detail-agence">
    <h2>Détail agence</h2>

    <form @submit.prevent="validerForm">
      <div class="form-elem" v-if="!creer">
        <label for="id">ID</label>
        <input id="id" name="id" type="text" class="form-control" v-model="agence.id" readonly>
      </div>
      <div class="form-group">
        <label for="codePostal">Code Postal</label>
        <input id="codePostal" name="codePostal" type="text" class="form-control" v-model="agence.codePostal">
      </div>
      <div class="form-group">
        <label for="ville">Ville</label>
        <input id="ville" name="ville" type="text" class="form-control" v-model="agence.ville">
      </div>
      <div class="form-group">
        <label for="adresse">Adresse</label>
        <input id="adresse" name="adresse" type="text" class="form-control" v-model="agence.adresse">
      </div>
      <div class="form-group" v-if="!creer">
        <label class="form-check-label">{{agence.actif ? 'Actif' : 'Inactif'}}</label>
      </div>

      <button type="submit" class="btn btn-success">Enregistrer</button>
    </form>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: "DetailAgence",
    props: ['agence', 'creer'],
    data() {
      return {
      }
    },
    watch: {
      $route: 'getAgence'
    },
    methods: {
      validerForm() {
        this.enregistrer();
      },
      async enregistrer() {
        try {
          const httpMethod = this.creer ? 'post' : 'put';
          const url = this.creer ? 'agences' : `agences/${this.agence.id}`;
          const reponse = await this.$http[httpMethod](url, this.agence);

          if (reponse.status === 200) {
            // la fonction emit, permet d'utiliser une fonction du composant parent (ici Fournisseurs.vue)
            this.$emit('rechargerAgences');
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>

<style scoped>
  .detail-agence {
    padding: 5px;
    border-radius: 3px;
    background-color: aliceblue;
  }
</style>
