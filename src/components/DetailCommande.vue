<template>
  <div>
    <h2>Détail Commande</h2>

    <form @submit.prevent="validerForm">
      <div class="form-group row">
        <label for="numero" class="col-2">Numéro</label>
        <div class="col-10">
          <input v-model="commande.numero" id="numero" name="numero" type="text" class="form-control">
        </div>
      </div>

      <div class="form-group row">
        <label for="fournisseur" class="col-2">Fournisseur</label>
        <div class="col-10">
          <select v-model="commande.fournisseur" id="fournisseur" name="fournisseur" type="text" class="form-control">
            <option v-for="fournisseur in fournisseurs" :key="fournisseur.id" :value="fournisseur">
              {{fournisseur.nom}}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label class="col-form-label">Lignes Commande</label>

        <table class="table">
          <tr>
            <th class="col-4">Référence</th>
            <th class="col-2">Prix</th>
            <th class="col-1">Quantité</th>
            <th class="col-2">TVA</th>
            <th class="col-1">Total HT</th>
            <th class="col-1">Total TTC</th>
            <th class="col-1"></th>
          </tr>

          <tr v-for="(ligne, i) in commande.lignesCommandes" :key="ligne.id">
            <td>
              <input type="text" :id="'reference'+i" :name="'reference'+i" v-model="ligne.reference">
            </td>
            <td>
              <input type="number" :id="'prix'+i" :name="'prix'+i" v-model="ligne.prix" min="0">
            </td>
            <td>
              <input type="number" :id="'quantite'+i" :name="'quantite'+i" v-model="ligne.quantite" min="0">
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>

      <button type="submit" class="btn btn-success">Enregistrer</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: "DetailCommande",
    props: ['commande', 'creer'],
    data() {
      return {
        fournisseurs: [],
        articles: []
      }
    },
    async mounted() {
      try {
        const reponse = await this.$http.get('fournisseurs');
        this.fournisseurs = reponse.data;
      } catch (e) {
        console.error(e);
      }
    },
    methods: {
      validerForm() {
        this.enregistrer();
      },
      async enregistrer() {
        try {
          const httpMethod = this.creer ? 'post' : 'put';
          const url = this.creer ? 'commandes' : `commandes/${this.commande.id}`;
          console.log('commande', this.commande);
          const reponse = await this.$http[httpMethod](url, this.commande);

          if (reponse.status === 200) {
            // la fonction emit, permet d'utiliser une fonction du composant parent (ici Commande.vue)
            this.$emit('rechargerCommandes');
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>

<style scoped>
</style>
