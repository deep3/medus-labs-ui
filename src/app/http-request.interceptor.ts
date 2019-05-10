import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private toastr: ToastrService) {
        this.setToastConfig();
    }

    /**
     * Method to intercept a HTTP Request
     * @param request The HTTP Request
     * @param next The HTTPHandler
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with jwt token if available
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${currentUser.token}`
                }
            });
        }

        return next.handle(request).catch((res) => {
            switch (res.status) {
                case 400: {
                    setTimeout(() => this.toastr.warning('Bad Request: ' + res.error.message));
                    break;
                }
                case 401: {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } , skipLocationChange: true });
                    setTimeout(() => this.toastr.warning('Session Expired. Please login again'));
                    break;
                }
                case 404: {
                    setTimeout(() => this.toastr.warning('Not found: ' + res.error.message));
                    break;
                }
                case 406: {
                    setTimeout(() => this.toastr.warning('Not Acceptable: ' + res.error.message));
                    break;
                }
                case 500: {
                    setTimeout(() => this.toastr.warning('Server Error: ' + res.error.message));
                    break;
                }
                case 0: {
                    setTimeout(() => this.toastr.warning('Could not connect to server.'));
                    break;
                }
                default: {
                    setTimeout(() => this.toastr.error('An unknown error has occurred with error code: ' + res.status));
                    break;
                }
            }
            return throwError(res);
        });
    }

    /**
     * Configures the local Toast Object/Service with various configurations
     */
    setToastConfig() {
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.toastrConfig.disableTimeOut = true;
        this.toastr.toastrConfig.closeButton = true;
    }
}
