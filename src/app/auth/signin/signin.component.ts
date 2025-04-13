import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signinData = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('تسجيل الدخول:', this.signinData);
    // Here you would add authentication logic
  }
}
