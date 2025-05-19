import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userRole: string | null = null;

  constructor(private router: Router) {}

  login(email: string, role: string) {
    this.isAuthenticated = true;
    this.userRole = role;
    console.log(`Utilisateur connecté : ${email} avec rôle ${role}`);
  }

  logout() {
    this.isAuthenticated = false;
    this.userRole = null;
    this.router.navigate(['/auth']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getRole(): string | null {
    return this.userRole;
  }

  isModerator(): boolean {
    return this.userRole === 'moderator';
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
