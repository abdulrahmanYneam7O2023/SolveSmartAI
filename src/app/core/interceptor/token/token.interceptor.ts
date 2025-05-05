import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

 const _PLATFORM_ID = inject(PLATFORM_ID)

 if(isPlatformBrowser(_PLATFORM_ID)){
  const token:string = localStorage.getItem('token') !;
  req  = req.clone({
    setHeaders:{
      
      Authorization :  token,

    }
  })
 }

 

  return next(req);
};
