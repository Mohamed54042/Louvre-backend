import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class SearchComponent {
  searchTerm: string = '';
  filterCategory: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;

  events = [
    { title: 'Révolution Française', description: 'Un événement marquant.', date: '1789-07-14', location: 'France' },
    { title: 'Seconde Guerre Mondiale', description: 'Un conflit mondial.', date: '1939-09-01', location: 'Monde' },
    { title: 'Chute de l\'Empire Romain', description: 'Un événement marquant de l\'histoire de l\'Europe.', date: '476-09-04', location: 'Europe' },
    { title: 'Découverte de l\'Amérique', description: 'Une nouvelle ère pour l\'humanité.', date: '1492-10-12', location: 'Amérique' },
    { title: 'Première Guerre Mondiale', description: 'Un conflit dévastateur.', date: '1914-07-28', location: 'Monde' }
  ];

  get filteredEvents() {
    return this.events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            event.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.filterCategory || event[this.filterCategory as keyof typeof event];
      return matchesSearch && matchesCategory;
    });
  }

  get paginatedEvents() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredEvents.slice(start, start + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredEvents.length / this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  previousPage() {
    if (this.currentPage > 1) this.currentPage--;
  }
}
