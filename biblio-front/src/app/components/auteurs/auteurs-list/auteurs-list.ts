
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { Auteur } from '../../../models/auteur.model';
import { AuteurService } from '../../../services/auteur';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auteurs-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './auteurs-list.html',
  styleUrl: './auteurs-list.css'
})
export class AuteursListComponent implements OnInit {

  auteurs: Auteur[] = [];
  chargement = true;
  erreur = '';
  succes = '';
  auteurBloque?: Auteur;

  constructor(
    private auteurService: AuteurService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.succes = history.state?.['succes'] ?? '';
    this.chargerAuteurs();
  }

  chargerAuteurs(): void {
    this.chargement = true;
    this.erreur = '';

    this.auteurService.getAll().subscribe({
      next: (data: Auteur[]) => {
        this.auteurs = data;
        this.chargement = false;

        this.cdr.detectChanges();
      },

      error: (err) => {
        console.error('Erreur de chargement des auteurs :', err);

        this.erreur = 'Impossible de charger les auteurs.';
        this.chargement = false;

        this.cdr.detectChanges();
      }
    });
  }

  supprimerAuteur(auteur: Auteur): void {
    if (auteur.id === undefined || !confirm(`Supprimer ${auteur.prenom} ${auteur.nom} ?`)) {
      return;
    }

    this.erreur = '';
    this.succes = '';
    this.auteurBloque = undefined;
    this.auteurService.delete(auteur.id).subscribe({
      next: () => {
        this.succes = `L’auteur ${auteur.prenom} ${auteur.nom} a été supprimé avec succès.`;
        this.chargerAuteurs();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.erreur = `Impossible de supprimer cet auteur. Il faut d’abord supprimer ses livres.`;
          this.auteurBloque = auteur;
        } else {
          this.erreur = 'La suppression de l’auteur a échoué.';
        }
        this.cdr.detectChanges();
      }
    });
  }
}
