import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobTitle: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    this.authService.register(this.signupData)
    .subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
        alert('Registration successful! Please sign in.');
        this.router.navigate(['/auth/signin']);
      },
      error: (err) => {
        console.error('Register Error:', err);
        if (err.status === 400) {
          alert(`Registration failed: ${err.error}`);
        } else {
          alert('An unknown error occurred.');
        }
      }
    });
  }
  
}

