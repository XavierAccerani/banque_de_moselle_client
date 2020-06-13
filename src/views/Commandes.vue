<template>
  <div class="row">
    <h1 class="col-12">Liste des commandes</h1>

    <div class="col-12">
      <table class="table" v-if="commandes.length">
        <tr>
          <th>Numéro</th>
          <th>Date création</th>
          <th>Etat</th>
          <th>Fournisseur</th>
          <th>Montant TTC</th>
        </tr>

        <tr @click.prevent="chargerUneCommande(commande.id)" v-for="commande in commandes" :key="commande.id">
          <td><a href>{{commande.numero}}</a></td>
          <td></td>
          <td>{{getEtatCommande(commande)}}</td>
          <td>{{commande.fournisseur.nom}}</td>
          <td>{{getMontantTTC(commande)}}</td>
        </tr>
      </table>
    </div>

    <div class="col-12">
      <DetailCommande :creer="creer" :commande="commandeForm" @rechargerCommandes="rechargerCommandes"/>
      <br>
    </div>
  </div>
</template>

<script>
  import DetailCommande from "../components/DetailCommande";

  export default {
    name: "Commandes",
    components: {
      DetailCommande
    },
    data() {
      return {
        creer: true,
        commandes: [],
        commandeForm: {},
      }
    },
    async mounted() {
      await this.getCommandes();
    },
    methods: {
      async getCommandes() {
        try {
          const reponse = await this.$http.get('commandes');
          this.commandes = reponse.data;
        } catch (e) {
          console.error(e);
        }
      },
      getMontantTTC(commande) {
        let montant = 0;
        commande.lignesCommandes.forEach(ligne => {
          montant += ligne.prix * ligne.quantite * ligne.tva;
        });
        return montant;
      },
      async chargerUneCommande(id) {
        try {
          const reponse = await this.$http.get('commandes/' + id);
          this.commandeForm = reponse.data;
          this.creer = false;
        } catch (e) {
          console.error(e);
        }
      },
      async rechargerCommandes() {
        await this.getCommandes();
      },
      effacerFormulaire() {
        this.creer = true;
        this.commandeForm = {};
      },
      getEtatCommande(commande){
        if (commande.etat === 10) {return "Créée";}
        else if(commande.etat ===20){ return "Rédigée"}
      }
    }
  }
</script>

<style scoped>
</style>
