import { Auteur } from './auteur.model';

export interface Livre {
  id?: number;
  titre: string;
  isbn: string;
  auteur: Auteur;
}
