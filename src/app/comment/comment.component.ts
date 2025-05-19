import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-comment',
  standalone: true,
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class CommentComponent {
  comments = [
    { text: 'Super intéressant !', author: 'Utilisateur 1' }
  ];
  newComment = '';

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({ text: this.newComment, author: 'Utilisateur' });
      this.newComment = '';
    }
  }
}

