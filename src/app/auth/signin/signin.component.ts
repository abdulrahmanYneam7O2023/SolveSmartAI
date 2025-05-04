import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  
  signinData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.signinData)
      .subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login Error:', err);
          alert('Login failed. Please check your credentials and try again.');
        }
      });
  }
}
