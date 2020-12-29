import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (localStorage.getItem('token')) {
            let token = localStorage.getItem('token');
            let user = JSON.parse(localStorage.getItem('user'));
            const authReq = req.clone({
                setHeaders: {
                    auth: token,
                    'Content-Type': 'application/json',
                    userId: user._id
                }
            });
            return next.handle(authReq).pipe(
                map((event: HttpEvent<any>) => {

                    return event;
                })
            )
        }
        const json = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',

            }
        });
        return next.handle(json).pipe(
            map((event: HttpEvent<any>) => {

                return event;
            })
        );
    }
}