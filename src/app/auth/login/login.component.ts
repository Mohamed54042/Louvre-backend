// src/app/auth/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  email = '';
  role = 'user'; // Par défaut, utilisateur

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (this.email) {
      this.authService.login(this.email, this.role);
      if (this.authService.getRole() === 'admin') {
        this.router.navigate(['/admin']);
      } else if (this.authService.getRole() === 'moderator') {
        this.router.navigate(['/moderator']);
      } else {
        this.router.navigate(['/timeline']);
      }
    } else {
      alert('Veuillez saisir votre email');
    }
  }
}
