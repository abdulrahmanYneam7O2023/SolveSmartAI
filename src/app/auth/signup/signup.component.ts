import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signUpForm!:FormGroup
  isCalingApi:boolean = false
  loginIsSuccess:boolean = false

  constructor( private _formBuilder : FormBuilder , private _AuthService : AuthService  , private _router : Router) {
    this.signUpForm = this._formBuilder.group({
      userName: ['' , [Validators.required , Validators.minLength(3)]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]] ,
      phoneNumber   : ['', [Validators.required , Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)]]
    })
  }


  onSubmit() {
    this.isCalingApi = true;

    if (this.signUpForm.valid) {
      this._AuthService.register(this.signUpForm.value).subscribe({
        next: (res) => {
          this.isCalingApi = false;
          this.loginIsSuccess = true;
          setTimeout(() => {
            this._router.navigate(['/signin']);
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
      this.signUpForm.markAllAsTouched();
    }



  }



}

