
import { Routes } from '@angular/router';

import { LivresListComponent } from './components/livres/livres-list/livres-list';
import { LivreFormComponent } from './components/livres/livre-form/livre-form';
import { AuteurFormComponent } from './components/auteurs/auteur-form/auteur-form';
import { AuteursListComponent } from './components/auteurs/auteurs-list/auteurs-list';
import { AccueilComponent } from './components/accueil/accueil';

export const routes: Routes = [
  {
    path: '',
    component: AccueilComponent,
    pathMatch: 'full'
  },
  {
    path: 'livres',
    component: LivresListComponent
  },
  {
    path: 'ajout-livre',
    component: LivreFormComponent
  },
  {
    path: 'modifier-livre/:id',
    component: LivreFormComponent
  },
  {
    path: 'auteurs',
    component: AuteursListComponent
  },
  {
    path: 'ajout-auteur',
    component: AuteurFormComponent
  },
  {
    path: 'modifier-auteur/:id',
    component: AuteurFormComponent
  },
  {
    path: '**',
    redirectTo: 'livres'
  }
];
