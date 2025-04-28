import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  
  signinData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('https://localhost:7212/api/auth/login', this.signinData)
      .subscribe({
        next: (response) => {
          console.log('User logged in successfully', response);
        },
        error: (err) => {
          console.error('Login Error:', err);
        }
      });
    }
}
