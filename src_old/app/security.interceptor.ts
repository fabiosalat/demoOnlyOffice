import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { SecurityService } from "./security.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
	constructor(private injector: Injector, private router: Router) {

	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		const auth = this.injector.get(SecurityService);
		const TOKEN = 'id_token';


    if (request.url.indexOf(environment.baseUrl) == 0) {
      if (localStorage.getItem(TOKEN) != null) {
        request = request.clone({
          setHeaders: {
            'x-auth-token': `${localStorage.getItem(TOKEN)}`
          }
        });
      }
    }

		return next.handle(request).pipe(catchError((response: any) => {
			console.log('response.status:' + response.status);

			if (response.status === 401) {
				const redirectUrl = this.router.url;
				debugger;
				this.router.navigate(['home'], { queryParams: { redirectUrl } }).then();
				response.error = { error: { message: 'Session expired.' } };
			}
			return throwError(response);
		}));
	}
}
