import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moderator',
  standalone: true,
  templateUrl: './moderator.component.html',
  imports: [CommonModule]
})
export class ModeratorComponent {
  comments = [
    { text: 'Super projet !', status: 'pending' },
    { text: 'Jadore cette fonctionnalite!', status: 'pending' }
  ];

  approveComment(index: number) {
    this.comments[index].status = 'approved';
  }

  rejectComment(index: number) {
    this.comments[index].status = 'rejected';
  }
}