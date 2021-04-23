import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "@services/user.service";
import { ToastrService } from "ngx-toastr";
import { catchError } from "rxjs/operators";
import { environment } from "@environments/environment";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private userService: UserService, private toastService: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (req.url !== `${environment.apiUrl}/me` && err.status === 401) {
          this.userService.removeUser();
          this.router.navigate(["/login"]);
        }

        if (err.status === 500) {
          this.toastService.error("Er ging iets mis. Probeer het later opnieuw");
        }

        if (err.status === 429) {
          this.toastService.error("Er ging iets mis. Probeer het later opnieuw");
        }

        return throwError(err);
      })
    );
  }
}
