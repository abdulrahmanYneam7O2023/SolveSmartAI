import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7212/api/auth';
  private isBrowser: boolean;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private isAdminSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Initialize auth state only if in browser
    if (this.isBrowser) {
      this.isLoggedInSubject.next(this.hasToken());
      this.isAdminSubject.next(this.checkIfAdmin());
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          if (this.isBrowser) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          this.isLoggedInSubject.next(true);
          this.isAdminSubject.next(this.checkIfAdmin());
        }
      })
    );
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
    this.router.navigate(['/home']);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  get isAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  private hasToken(): boolean {
    return this.isBrowser ? !!localStorage.getItem('token') : false;
  }

  private checkIfAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'Admin';
  }

  getUser(): any {
    if (!this.isBrowser) return null;
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return this.isBrowser ? localStorage.getItem('token') : null;
  }
}