
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { TimelineComponent } from './app/timeline/timeline.component';
import { AuthGuard } from './app/auth/auth.guard';
import { AdminGuard } from './app/auth/admin.guard';
import { ModeratorGuard } from './app/auth/moderator.guard';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule, RouterModule),  // ✅ RouterModule est ici
    provideRouter([
      { path: '', redirectTo: 'timeline', pathMatch: 'full' },
      { path: 'timeline', component: TimelineComponent },
      { path: 'search', loadComponent: () => import('./app/search/search.component').then(m => m.SearchComponent) },
      { path: 'comments', loadComponent: () => import('./app/comment/comment.component').then(m => m.CommentComponent) },
      { path: 'auth', loadComponent: () => import('./app/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./app/auth/register/register.component').then(m => m.RegisterComponent) },
      {
        path: 'event-detail/:id',
        loadComponent: () => import('./app/event-detail/event-detail.component').then(m => m.EventDetailComponent)
      },
      { path: 'admin', loadComponent: () => import('./app/admin/admin.component').then(m => m.AdminComponent), canActivate: [AdminGuard] },
      { path: 'moderator', loadComponent: () => import('./app/moderator/moderator.component').then(m => m.ModeratorComponent), canActivate: [ModeratorGuard] },
      { path: '**', redirectTo: 'timeline' }
    ])
  ]
}).catch(err => console.error(err));
