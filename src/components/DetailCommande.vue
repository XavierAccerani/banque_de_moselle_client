<template>
  <div>
    <h2 id="nouvelle-commande">Nouvelle Commande / Détail Commande</h2>
    <div>
      <button class="btn btn-link" @click="effacerForm">Nouvelle commande</button>
    </div>
    <div class="container col-12">
      <br>
      <ul class="progressbar">
        <li class="active">Créée</li>
        <li>Rédigée</li>
        <li>Visée</li>
        <li>Signée</li>
        <li>Envoyée</li>
        <li>Réceptionnée</li>
        <li>Archivée</li>
      </ul>
      <br>
    </div>

    <form @submit.prevent="validerForm">
      <!-- On a un @NotEmpty sur "numero" dans le serveur : on aurait pu mettre "v-if="!creer" sinon -->
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
        <label class="col-form-label">Articles</label>

        <table class="table">
          <tr>
            <th class="col-1">Référence</th>
            <th class="col-1">Prix</th>
            <th class="col-1">Quantité</th>
            <th class="col-xs-1">TVA</th>
            <th class="col-1">Total HT</th>
            <th class="col-1">Total TTC</th>
            <th class="col-1"></th>
          </tr>

          <tr v-for="(ligne, i) in commande.lignesCommandes" :key="ligne.id">
            <td>
              <input type="text" :id="'reference'+i" :name="'reference'+i" v-model="ligne.reference">
            </td>
            <td>
              <input type="number" step="0.01" :id="'prix'+i" :name="'prix'+i" v-model="ligne.prix" min="0">
            </td>
            <td>
              <input type="number" step="0.01" :id="'quantite'+i" :name="'quantite'+i" v-model="ligne.quantite" min="0">
            </td>
            <td class="col-xs-1">
              <input type="number" step="0.01" :id="'tva'+i" :name="'tva'+i" v-model="ligne.tva" min="1">
            </td>
            <td>
              {{getMontantHT(ligne)}}€
            </td>
            <td>
              {{getMontantTTC(ligne)}}€
            </td>
            <td>
              <button type="button" class="btn btn-sm btn-danger" @click="supprimerLigne(i)">X</button>
            </td>
          </tr>

          <tr>
            <td colspan="7">
              <button type="button" class="btn btn-light col-12" @click="ajouterUneLigne"><b>+</b></button>
            </td>
          </tr>
          <tr>
            <td colspan="5"></td>
            <th>Total TTC</th>
            <th>{{getTotalTTC()}} €</th>
          </tr>
        </table>

      </div>

      <br>
      <button type="submit" class="btn btn-success">Enregistrer</button>
    </form>
  </div>
</template>

<script>
  import {LigneCommande} from "../modeles/LigneCommande";

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
      },
      getTVA(ligne) {
        let tva = 0;
        tva = Math.round((ligne.tva - 1) * 100);
        return tva;
      },
      getMontantHT(ligne) {
        let montant = 0;
        montant = ligne.prix * ligne.quantite;
        return montant.toFixed(2);
      },
      getMontantTTC(ligne) {
        let montant = 0;
        montant = this.calculerMontantLigneTTC(ligne);
        return montant.toFixed(2);
      },
      getTotalTTC() {
        let total = 0;
        this.commande.lignesCommandes.forEach(ligne => {
          total += this.calculerMontantLigneTTC(ligne);
        });
        return total.toFixed(2);
      },
      calculerMontantLigneTTC(ligne) {
        return ligne.prix * ligne.quantite * ligne.tva;
      },
      supprimerLigne(index) {
        this.commande.lignesCommandes.splice(index, 1);
      },
      ajouterUneLigne() {
        this.commande.lignesCommandes.push(new LigneCommande());
      },
      effacerForm() {
        this.$emit('effacerFormulaire');
      }
    }
  }
</script>

<style scoped>
  .btn-danger {
    border-radius: 5px;
  }

  h2{
    margin: 5px;
  }

  .container {
    width: 100%;
    margin-bottom: 100px;
    margin-top: 10px;
  }
  .progressbar {
    counter-reset: step;
  }
  .progressbar li {
    list-style-type: none;
    width: 14%;
    float: left;
    font-size: 12px;
    position: relative;
    text-align: center;
    text-transform: uppercase;
    color: #7d7d7d;
  }
  .progressbar li:before {
    width: 30px;
    height: 30px;
    content: counter(step);
    counter-increment: step;
    line-height: 30px;
    border: 2px solid #7d7d7d;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: white;
  }
  .progressbar li:after {
    width: 100%;
    height: 2px;
    content: '';
    position: absolute;
    background-color: #7d7d7d;
    top: 15px;
    left: -50%;
    z-index: -1;
  }
  .progressbar li:first-child:after {
    content: none;
  }
  .progressbar li.active {
    color: #1eff05;
  }
  .progressbar li.active:before {
    border-color: #23ff18;
  }
  .progressbar li.active + li:after {
    background-color: #16910a;
  }
</style>
