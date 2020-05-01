<template>
  <div>
    <h1>Liste des fournisseurs</h1>

    <table>
      <tr>
        <th>ID</th>
        <th>NOM</th>
        <th>SIRET</th>
      </tr>
      <tr v-for="fournisseur in fournisseurs" :key="fournisseur.id">
        <td>{{fournisseur.id}}</td>
        <td>{{fournisseur.nom}}</td>
        <td>{{fournisseur.siret}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "Fournisseurs",
    data() {
      return {
        fournisseurs: []
      }
    },
    async mounted() {
      try {
        const reponse = await this.$http.get('fournisseurs');
        this.fournisseurs = reponse.data;
      } catch (e) {
        console.error(e);
      }
    }
  }
</script>

<style scoped>
  table {
    width: 100%;
    border: 1px;
  }

  td {
    padding: 5px;
  }
</style>
