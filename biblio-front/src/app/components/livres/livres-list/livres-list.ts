
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Livre } from '../../../models/livre.model';
import { LivreService } from '../../../services/livre';
import { AuteurService } from '../../../services/auteur';
import { Auteur } from '../../../models/auteur.model';

@Component({
  selector: 'app-livres-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './livres-list.html',
  styleUrl: './livres-list.css'
})
export class LivresListComponent implements OnInit {

  livres: Livre[] = [];
  chargement = true;
  erreur = '';
  succes = '';
  auteurs: Auteur[] = [];
  auteurId = '';
  suppressionAuteurDemandee = false;

  constructor(
    private livreService: LivreService,
    private cdr: ChangeDetectorRef,
    private auteurService: AuteurService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auteurService.getAll().subscribe({
      next: auteurs => {
        this.auteurs = auteurs;
        this.route.queryParamMap.subscribe(params => {
          this.auteurId = params.get('auteurId') ?? '';
          this.suppressionAuteurDemandee = params.get('supprimerAuteur') === 'true';
          this.chargerLivres();
        });
      },
      error: () => this.chargerLivres()
    });
  }

  chargerLivres(): void {
    this.chargement = true;
    this.erreur = '';

    const requete = this.auteurId
      ? this.livreService.getByAuteur(Number(this.auteurId))
      : this.livreService.getAll();

    requete.subscribe({
      next: (data: Livre[]) => {
        console.log('Livres reçus :', data);

        this.livres = data;
        this.chargement = false;

        this.cdr.detectChanges();

        console.log('État après chargement :', {
          chargement: this.chargement,
          nombre: this.livres.length
        });
      },

      error: (err) => {
        console.error('Erreur lors du chargement :', err);

        this.erreur =
          'Impossible de charger les livres. Vérifiez le backend.';

        this.chargement = false;
        this.cdr.detectChanges();
      }
    });
  }

  filtrerParAuteur(): void {
    this.suppressionAuteurDemandee = false;
    this.chargerLivres();
  }

  supprimerAuteurSansLivres(): void {
    const auteur = this.auteurs.find(item => item.id === Number(this.auteurId));
    if (!auteur?.id || this.livres.length > 0) {
      return;
    }

    this.auteurService.delete(auteur.id).subscribe({
      next: () => this.router.navigate(['/auteurs'], {
        state: { succes: `L’auteur ${auteur.prenom} ${auteur.nom} a été supprimé avec succès.` }
      }),
      error: (err) => {
        this.erreur = err.status === 409
          ? 'Cet auteur possède encore des livres. Actualisez la liste avant de réessayer.'
          : 'La suppression de l’auteur a échoué.';
        this.cdr.detectChanges();
      }
    });
  }

  supprimerLivre(id?: number): void {
    if (id === undefined) {
      return;
    }

    if (!confirm('Voulez-vous vraiment supprimer ce livre ?')) {
      return;
    }

    this.erreur = '';
    this.succes = '';
    const livreSupprime = this.livres.find(livre => livre.id === id);
    this.livreService.delete(id).subscribe({
      next: () => {
        this.succes = `Le livre « ${livreSupprime?.titre ?? ''} » a été supprimé avec succès.`;
        this.chargerLivres();
      },

      error: (err) => {
        console.error('Erreur de suppression :', err);
        this.erreur = 'La suppression du livre a échoué.';
        this.cdr.detectChanges();
      }
    });
  }
}
