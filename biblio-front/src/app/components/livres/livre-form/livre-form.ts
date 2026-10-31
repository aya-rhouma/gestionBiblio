
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { LivreService } from '../../../services/livre';
import { AuteurService } from '../../../services/auteur';
import { Auteur } from '../../../models/auteur.model';
import { Livre } from '../../../models/livre.model';

@Component({
  selector: 'app-livre-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './livre-form.html',
  styleUrl: './livre-form.css'
})
export class LivreFormComponent implements OnInit {

  idLivre?: number;

  titre = '';
  isbn = '';
  auteurId = '';

  auteurs: Auteur[] = [];

  chargementAuteurs = true;
  chargementLivre = false;
  erreur = '';
  message = '';
  enregistrement = false;

  constructor(
    private livreService: LivreService,
    private auteurService: AuteurService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  get modeModification(): boolean {
    return this.idLivre !== undefined;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.idLivre = Number(id);
      this.chargementLivre = true;
    }

    this.chargerAuteurs();
  }

  chargerAuteurs(): void {
    this.chargementAuteurs = true;
    this.erreur = '';

    this.auteurService.getAll().subscribe({
      next: (data: Auteur[]) => {
        this.auteurs = data;
        this.chargementAuteurs = false;

        if (this.modeModification) {
          this.chargerLivre();
        }

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Erreur de chargement des auteurs :', err);

        this.erreur =
          'Impossible de charger les auteurs. Vérifiez le backend.';

        this.chargementAuteurs = false;
        this.chargementLivre = false;

        this.cdr.detectChanges();
      }
    });
  }

  chargerLivre(): void {
    if (this.idLivre === undefined) {
      return;
    }

    this.livreService.getById(this.idLivre).subscribe({
      next: (livre: Livre) => {
        this.titre = livre.titre;
        this.isbn = livre.isbn;
        this.auteurId = livre.auteur?.id?.toString() ?? '';

        this.chargementLivre = false;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Erreur de chargement du livre :', err);

        this.erreur = 'Impossible de charger les informations du livre.';
        this.chargementLivre = false;
        this.cdr.detectChanges();
      }
    });
  }

  enregistrerLivre(): void {
    this.erreur = '';
    this.message = '';

    if (
      !this.titre.trim() ||
      !this.isbn.trim() ||
      !this.auteurId
    ) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    const auteurSelectionne = this.auteurs.find(
      auteur => auteur.id === Number(this.auteurId)
    );

    if (!auteurSelectionne) {
      this.erreur = 'Veuillez sélectionner un auteur valide.';
      return;
    }

    const livre: Livre = {
      titre: this.titre.trim(),
      isbn: this.isbn.trim(),
      auteur: auteurSelectionne
    };

    this.enregistrement = true;

    const requete = this.modeModification
      ? this.livreService.update(this.idLivre!, livre)
      : this.livreService.add(livre);

    requete.subscribe({
      next: () => {
        this.message = this.modeModification
          ? 'Livre modifié avec succès.'
          : 'Livre ajouté avec succès.';

        this.enregistrement = false;
        this.cdr.detectChanges();

        this.router.navigate(['/livres']);
      },

      error: (err) => {
        console.error('Erreur lors de l’enregistrement :', err);

        this.erreur = this.modeModification
          ? 'Impossible de modifier le livre.'
          : 'Impossible d’ajouter le livre.';

        this.enregistrement = false;
        this.cdr.detectChanges();
      }
    });
  }
}
