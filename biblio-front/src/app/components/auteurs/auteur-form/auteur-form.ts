import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auteur } from '../../../models/auteur.model';

import { AuteurService } from '../../../services/auteur';

@Component({
  selector: 'app-auteur-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './auteur-form.html',
  styleUrl: './auteur-form.css'
})
export class AuteurFormComponent {

  idAuteur?: number;
  chargementAuteur = false;

  nom = '';
  prenom = '';

  erreur = '';
  message = '';
  enregistrement = false;

  constructor(
    private auteurService: AuteurService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.idAuteur = Number(id);
      this.chargementAuteur = true;
      this.auteurService.getById(this.idAuteur).subscribe({
        next: (auteur: Auteur) => {
          this.nom = auteur.nom;
          this.prenom = auteur.prenom;
          this.chargementAuteur = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.erreur = 'Impossible de charger cet auteur.';
          this.chargementAuteur = false;
          this.cdr.detectChanges();
        }
      });
    }
  }

  get modeModification(): boolean {
    return this.idAuteur !== undefined;
  }

  ajouterAuteur(): void {
    this.erreur = '';
    this.message = '';

    if (!this.nom.trim() || !this.prenom.trim()) {
      this.erreur = 'Veuillez remplir tous les champs.';
      return;
    }

    const nouvelAuteur = {
      nom: this.nom.trim(),
      prenom: this.prenom.trim()
    };

    this.enregistrement = true;

    const requete = this.modeModification
      ? this.auteurService.update(this.idAuteur!, nouvelAuteur)
      : this.auteurService.add(nouvelAuteur);

    requete.subscribe({
      next: () => {
        this.message = this.modeModification
          ? 'L’auteur a été modifié avec succès.'
          : 'L’auteur a été ajouté avec succès.';
        this.enregistrement = false;

        setTimeout(() => {
          this.router.navigate(['/auteurs']);
        }, 700);
      },

      error: (err) => {
        console.error('Erreur lors de l’ajout de l’auteur :', err);
        this.erreur = this.modeModification
          ? 'Impossible de modifier l’auteur.'
          : 'Impossible d’ajouter l’auteur.';
        this.enregistrement = false;
      }
    });
  }
}
