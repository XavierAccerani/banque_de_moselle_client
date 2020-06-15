export class Commande {
  numero;
  agence;
  fournisseur;
  lignesCommandes;

  constructor() {
    this.numero = null;
    this.agence = null;
    this.fournisseur = null;
    this.lignesCommandes = []
  }
}
