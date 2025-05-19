// src/app/event-detail/event-detail.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  imports: [CommonModule, RouterModule]  // ✅ RouterModule ajouté ici
})
export class EventDetailComponent {
  event: any;
  events = [
    { id: 1, title: 'Révolution Française', description: 'Un événement marquant.', date: '1789-07-14', location: 'France', civilization: 'Européenne', theme: 'Politique' },
    { id: 2, title: 'Seconde Guerre Mondiale', description: 'Un conflit mondial.', date: '1939-09-01', location: 'Monde', civilization: 'Internationale', theme: 'Guerre' }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      const eventId = Number(params.get('id'));
      this.event = this.events.find(e => e.id === eventId);
    });
  }

  goBack() {
    this.router.navigate(['/timeline']);
  }
}
