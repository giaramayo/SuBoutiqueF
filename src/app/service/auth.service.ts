
  import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  
  import { Observable } from 'rxjs';
  
  import { LoginService } from './login.service';
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      req = req.clone({
        setHeaders: {
          'Authorization': `${this.loginService.getToken()}`,
        },
      });
  
      return next.handle(req);
    }
  }


