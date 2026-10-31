import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { timeout } from 'rxjs';
import { AuteurService } from '../../services/auteur';
import { LivreService } from '../../services/livre';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class AccueilComponent implements OnInit {
  nombreLivres = 0;
  nombreAuteurs = 0;
  chargementLivres = true;
  chargementAuteurs = true;
  erreurLivres = '';
  erreurAuteurs = '';

  constructor(
    private livreService: LivreService,
    private auteurService: AuteurService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerCompteurs();
  }

  get erreur(): string {
    return this.erreurLivres || this.erreurAuteurs;
  }

  chargerCompteurs(): void {
    this.chargementLivres = true;
    this.chargementAuteurs = true;
    this.erreurLivres = '';
    this.erreurAuteurs = '';

    this.livreService.getAll().pipe(timeout({ first: 8000 })).subscribe({
      next: livres => {
        this.nombreLivres = livres.length;
        this.chargementLivres = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Chargement du nombre de livres impossible :', err);
        this.erreurLivres = 'Nombre de livres indisponible. Vérifiez que le backend répond sur le port 8081.';
        this.chargementLivres = false;
        this.cdr.detectChanges();
      }
    });

    this.auteurService.getAll().pipe(timeout({ first: 8000 })).subscribe({
      next: auteurs => {
        this.nombreAuteurs = auteurs.length;
        this.chargementAuteurs = false;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Chargement du nombre d’auteurs impossible :', err);
        this.erreurAuteurs = 'Nombre d’auteurs indisponible. Vérifiez que le backend répond sur le port 8081.';
        this.chargementAuteurs = false;
        this.cdr.detectChanges();
      }
    });
  }
}
