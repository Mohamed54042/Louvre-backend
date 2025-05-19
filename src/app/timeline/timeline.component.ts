// src/app/timeline/timeline.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-timeline',
  standalone: true,
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]  // ✅ Importe les modules nécessaires
})
export class TimelineComponent {
  constructor(private router: Router) {}

  // ✅ Méthode pour naviguer vers la page de recherche
  goToSearch() {
    this.router.navigate(['/search']);
  }

  events = [
    {
      id: 1,
      title: 'Révolution Française',
      description: 'Un événement marquant.',
      date: '1789-07-14',
      location: 'France',
      image: 'assets/images/timeline/revolution-francaise.jpg'
    },
    {
      id: 2,
      title: 'Seconde Guerre Mondiale',
      description: 'Un conflit mondial.',
      date: '1939-09-01',
      location: 'Monde',
      image: 'assets/images/timeline/seconde-guerre-mondiale.jpg'
    },
    {
      id: 3,
      title: 'Chute de l\'Empire Romain',
      description: 'Un événement marquant de l\'histoire de l\'Europe.',
      date: '476-09-04',
      location: 'Europe',
      image: 'assets/images/timeline/chute-empire-romain.jpg'
    }
  ];
}
