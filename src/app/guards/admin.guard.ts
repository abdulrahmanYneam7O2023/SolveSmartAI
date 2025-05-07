import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';
import * as jwt_decode from 'jwt-decode'; // تعديل الـ import

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    const token = this.authService.getAuthToken();
    if (!token) {
      this.router.navigate(['/signin']);
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token); // استخدام jwtDecode
      const isAdmin  = decodedToken.identity === '9a5ce35a-634a-438f-aef9-9c905baf28cc' && decodedToken.email === 'Manager@gmai.com' && decodedToken.userName === 'Manager';
      // لو المستخدم أدمن أو مستخدم عادي، نسمح له يدخل
      // التحكم في العرض هيحصل في الـ component
      return true;
    } catch (error) {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
