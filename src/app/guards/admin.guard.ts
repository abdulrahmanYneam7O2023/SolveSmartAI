import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    // منطق التحقق مما إذا كان المستخدم مسؤولًا
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // مثال: تحقق من حالة المسؤول
    if (isAdmin) {
      return true;
    } else {
      this.router.navigate(['/home']); // إعادة التوجيه إذا لم يكن مسؤولًا
      return false;
    }
  }
}