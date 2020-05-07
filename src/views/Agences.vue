<template>
  <div class="row">
    <h1 class="col-12">Liste des agences</h1>

    <div class="col-12">
      <button class="btn btn-link" @click="effacerFormulaire">Ajouter une agence</button>
    </div>

    <div class="col-6">
      <ul class="liste">
        <li v-for="agence in agences" :key="agence.id"
            class="item" @click.prevent="chargerUneAgence(agence.id)">
          {{agence.nom}}
        </li>
      </ul>
    </div>

    <div class="col-6">
      <DetailAgence :creer="creer" :agence="agenceForm" @rechargerAgences="rechargerAgences"/>
    </div>
  </div>
</template>

<script>
  import DetailAgence from "../components/DetailAgence";

  export default {
    name: "Agences",
    components: {DetailAgence},
    comments: {
      DetailAgence
    },
    data() {
      return {
        creer: true,
        agences: [],
        agenceForm: {}
      }
    },
    async mounted() {
      await this.getAgences();
    },
    methods: {
      async getAgences() {
        try {
          const reponse = await this.$http.get('agences');
          this.agences = reponse.data;
        } catch (e) {
          console.error(e);
        }
      },
      async rechargerAgences() {
        await this.getAgences();
      },
      async chargerUneAgence(id) {
        try {
          const reponse = await this.$http.get('agences/' + id);
          this.agenceForm = reponse.data;
          this.creer = false;
        } catch (e) {
          console.error(e);
        }
      },
      effacerFormulaire() {
        this.creer = true;
        this.agenceForm = {};
      }
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
