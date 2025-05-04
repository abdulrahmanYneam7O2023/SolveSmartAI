import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  canActivate(): Observable<boolean> {
    return this.authService.isAdmin.pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/auth/signin']);
        }
      })
    );
  }
}