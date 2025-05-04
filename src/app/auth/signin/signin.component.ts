import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule,ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  signInForm!:FormGroup
  isCalingApi:boolean = false
  loginIsSuccess:boolean = false

  constructor( private _formBuilder : FormBuilder , private _AuthService : AuthService  , private _router : Router) {
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]] ,
    })
  }


  onSubmit() {
    this.isCalingApi = true;

    if (this.signInForm.valid) {
      this._AuthService.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          this.isCalingApi = false;
          this.loginIsSuccess = true;
          setTimeout(() => {
            this._router.navigate(['/home']);
          },500);
          console.log(res);
        },
        error: (error) => {
          this.isCalingApi = false;
          console.log(error);
        }
      });
    }else{
      this.isCalingApi = false;
      this.signInForm.markAllAsTouched();
    }



  }


}
