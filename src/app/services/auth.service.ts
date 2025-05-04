import { Injectable, PLATFORM_ID, Inject, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7212/api/Auth';


  constructor(private http: HttpClient, private router: Router,) {}
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  signIn(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, userData);
  }

  logout(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/signin']);
    }

  }











}
