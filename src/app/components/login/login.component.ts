import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router= inject(Router);

  protected loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  public onSubmit(){
    if(this.loginForm.value){
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((data: any) => {
        if(this.authService.isLoggedIn()) {
          this.router.navigate(['/home']);
        }
        console.log(data);
      })
    } 
  }
}