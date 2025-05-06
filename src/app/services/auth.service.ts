import { Injectable, PLATFORM_ID, Inject, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserData } from '../shared/interfaces/user-data';

interface AuthResponse {
  token: string;
  userName: string;
  email: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/Auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userData !: UserData
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.checkAuthStatus();
  }

  private readonly _PLATFORM_ID = inject(PLATFORM_ID);

  register(userData: {
    userName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, userData).pipe(
      tap(response => {
        console.log('Registration successful:', response);
        if (response.token) {
          this.setAuthToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  signIn(userData: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, userData).pipe(
      tap(response => {
        if (response && response.token) {
          this.setAuthToken(response.token);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/signin']);
    }
  }

  private setAuthToken(token: string): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('token', token);
    }
  }

  getAuthToken(): string | null {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  private checkAuthStatus(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const token = localStorage.getItem('token');
      this.isAuthenticatedSubject.next(!!token);
    }
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('Auth error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
