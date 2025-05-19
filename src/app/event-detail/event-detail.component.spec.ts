import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  templateUrl: './event-detail.html',
  styleUrls: ['./event-detail.scss']
})
export class EventDetailComponent {
  event: any;
  events = [
    { id: 1, title: 'Révolution Française', description: 'Un événement marquant.', date: '1789-07-14', location: 'France' },
    { id: 2, title: 'Seconde Guerre Mondiale', description: 'Un conflit mondial.', date: '1939-09-01', location: 'Monde' }
  ];

  constructor(private route: ActivatedRoute) {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.event = this.events.find(e => e.id === eventId);
  }
}
