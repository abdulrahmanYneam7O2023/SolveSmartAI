import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.signupData.password !== this.signupData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
  
    this.http.post('https://localhost:7212/api/auth/register', this.signupData)
    .subscribe({
      next: (response) => {
        console.log('User registered successfully', response);
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

