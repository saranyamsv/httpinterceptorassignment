import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loadservice:LoadingService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsIm5hbWUiOiJKb2huIERvZSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3NTA4MDAwLCJleHAiOjE2OTc1MTE2MDB9.4-7ZkUOZ5FkkLR5Py3X7U2lU50Yjrx8PLzJtkwkYJ9s';

    // Clone the request and add the Authorization header
    
    const tokenReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${fakeToken}`
      }
    });
    this.loadservice.updateLoadingstatus(true);
    return next.handle(tokenReq).pipe(
      tap({
        next:()=>{this.loadservice.updateLoadingstatus(false);
        }
        }
      )

    );
  }
}
