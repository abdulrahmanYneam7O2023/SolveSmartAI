import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signInForm!: FormGroup;
  isCalingApi: boolean = false;
  loginIsSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _router: Router
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.isCalingApi = true;
    this._AuthService.signIn(this.signInForm.value).subscribe({
      next: (res) => {
        this.isCalingApi = false;
        this.loginIsSuccess = true;
        console.log(res);
        setTimeout(() => {
          this._router.navigate(['/home']);
        }, 500);
      },
      error: (error) => {
        this.isCalingApi = false;
        console.log(error);
      }
    });
  }
}
