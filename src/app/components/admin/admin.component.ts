import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  private authService = inject(AuthService);
  private router = inject (Router);

  public logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
