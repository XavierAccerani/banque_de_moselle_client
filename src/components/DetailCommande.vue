<template>
  <div>
    <h2 id="nouvelle-commande">Nouvelle Commande / Détail Commande</h2>
    <div>
      <button class="btn btn-link" @click="effacerForm">Nouvelle commande</button>
    </div>
    <div class="container col-12">
      <br>
      <ul class="progressbar">
        <li id="creee" v-bind:class="isCreee(commande)? 'active' : ''">Créée</li>
        <li id="redigee" v-bind:class="isRedigee(commande)? 'active' : ''">Rédigée</li>
        <li id="visee" v-bind:class="isVisee(commande)? 'active' : ''">Visée</li>
        <li id="signee" v-bind:class="isSignee(commande)? 'active' : ''">Signée</li>
        <li id="envoyee" v-bind:class="isEnvoyee(commande)? 'active' : ''">Envoyée</li>
        <li id="receptionnee" v-bind:class="isReceptionnee(commande)? 'active' : ''">Réceptionnée</li>
        <li id="archivee" v-bind:class="isArchivee(commande)? 'active' : ''">Archivée</li>
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
      <div class="d-flex justify-content-between">
        <button id="btn-saved" type="submit" class="btn btn-success">Enregistrer</button>
        <button id="btn-etat" type="submit" class="btn btn-outline-success" @click="changementEtat(commande)">Rédigée</button>
      </div>
    </form>
  </div>
</template>

<script>
  import {LigneCommande} from "../modeles/LigneCommande";

  function getEtatCommande(commande) {
    document.getElementById('btn-saved').disabled = false;
    if (commande.etat === 10) {
      return "Créée";
    } else if (commande.etat === 20) {
      return "Rédigée"
    } else if (commande.etat === 30) {
      return "Visée"
    } else if (commande.etat === 40) {
      return "Signée"
    } else if (commande.etat === 50) {
      return "Envoyée"
    } else if (commande.etat === 60) {
      return "Réceptionnée"
    } else if (commande.etat === 70) {
      return "Archivée"
    }
  }

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
      await this.getFournisseurs();
      document.getElementById('btn-etat').innerHTML = getEtatCommande(this.commande);
    },
    methods: {
      async getFournisseurs() {
        try {
          const reponse = await this.$http.get('fournisseurs');
          this.fournisseurs = reponse.data;
        } catch (e) {
          console.error(e);
        }
      },
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
        console.log(this.commande.etat);
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
      },

      isCreee(commande) {
        if (commande.etat === 10) {
          return true;
        }
      },
      isRedigee(commande) {
        if (commande.etat === 20) {
          return true;
        }
      },
      isVisee(commande) {
        if (commande.etat === 30) {
          return true;
        }
      },
      isSignee(commande) {
        if (commande.etat === 40) {
          return true;
        }
      },
      isEnvoyee(commande) {
        if (commande.etat === 50) {
          return true;
        }
      },
      isReceptionnee(commande) {
        if (commande.etat === 60) {
          return true;
        }
      },
      isArchivee(commande) {
        if (commande.etat === 70) {
          return true;
        }
      },
      changementEtat(commande) {
        if (commande.etat === 10) {
          commande.etat = 20;
          document.getElementById('btn-etat').innerHTML = 'Rédigée';
          document.getElementById('btn-saved').disabled = false;
        }
        else if (commande.etat === 20) {
          commande.etat = 30;
          document.getElementById('btn-etat').innerHTML = 'Visée';
          document.getElementById('btn-saved').disabled = false;
        } else if (commande.etat === 30) {
          commande.etat = 40;
          document.getElementById('btn-etat').innerHTML = 'Signée';
          document.getElementById('btn-saved').disabled = false;
        } else if (commande.etat === 40) {
          commande.etat = 50;
          document.getElementById('btn-etat').innerHTML = 'Envoyée';
          document.getElementById('btn-saved').disabled = false;
        } else if (commande.etat === 50) {
          commande.etat = 60;
          document.getElementById('btn-etat').innerHTML = 'Réceptionnée';
          document.getElementById('btn-saved').disabled = true;
        }else if (commande.etat === 60) {
          commande.etat = 70;
          document.getElementById('btn-etat').innerHTML = 'Archivée';
          document.getElementById('btn-saved').disabled = true;
        }
      }
    }
  }
</script>

<style scoped>
  .btn-danger {
    border-radius: 5px;
  }

  h2 {
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
    color: #ffffff;
    z-index: -1;
    background-color: #47641f;
    clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
  }

  .progressbar li:before {
    width: 30px;
    height: 30px;
    content: counter(step);
    counter-increment: step;
    line-height: 30px;
    display: block;
    text-align: center;
    margin: 0 auto 5px auto;
    background-color: transparent;
  }

  .progressbar li.active:before {
    color: #ffffff;
    font-weight: bold;
  }

  .progressbar .active {
    background-color: #8EC63F;
    color: #ffffff;
    font-weight: bold;
  }


  .progressbar .active ~ li {
    background-color: #b0b0b0;
  }
</style>
