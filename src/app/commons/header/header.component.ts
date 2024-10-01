import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public isHidden() {
    if (this.authService.isLoggedIn() === true) 
    {
      return true;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public doLogout() {
    if (this.authService.isLoggedIn() === true) {
      return true;
    } else {
      return false;
    }
  }
}
