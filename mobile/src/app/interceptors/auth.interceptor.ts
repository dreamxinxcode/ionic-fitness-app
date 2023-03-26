import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    token = this.authService.getToken();

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
console.log('hellloooo')
        if (this.token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + this.token)
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }
}
    