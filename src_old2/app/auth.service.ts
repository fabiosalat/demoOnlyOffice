import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private useSAML: boolean = false;

  baseGDFPath: string = "";

  constructor(private http: HttpClient) {
    this.baseGDFPath = environment.baseUrl;
    this.useSAML = environment.useSAML;
   }

  // eseguiAutenticazioneSAML(): Observable<any> {
	// 	let headers = new HttpHeaders();

	// 	headers = headers.set('Accept', 'application/json');
	// 	headers = headers.set('Content-Type', 'application/json');

	// 	let apiURL = Location.joinWithSlash(`${environment.baseUrl}`, 'login/token');

  //   return this.http.request('get', apiURL, { headers, withCredentials: true })
  //     .pipe(map((result: any) => {
  //       localStorage.setItem('TOKEN', result.token);
  //     }));
	// }


  eseguiAutenticazioneSAML(): Observable<any> {
		let headers = new HttpHeaders();

		headers = headers.set('Accept', 'application/json');
		headers = headers.set('Content-Type', 'application/json');

		if (this.useSAML) {
			let apiURL = Location.joinWithSlash(`${this.baseGDFPath}`, `/auth/token`);

			return this.http.request('get', apiURL, { headers, withCredentials: true })
				.pipe(map((result: any) => {
					return result;
				}));

		} else {
			let apiURL = Location.joinWithSlash(`${this.baseGDFPath}`, `/login/token`);

			return this.http.request('get', apiURL, { headers, withCredentials: true })
				.pipe(map((result: any) => {
					return result;
				}));
		}
	}

	verificaAutenticazione(): Observable<any> {
		let headers = new HttpHeaders();

		headers = headers.set('Accept', 'application/json');
		headers = headers.set('Content-Type', 'application/json');

		if (this.useSAML) {
			let apiURL = Location.joinWithSlash(`${this.baseGDFPath}`, `/auth/token`);

			return this.http.request('get', apiURL, { headers, withCredentials: true })
				.pipe(map((result: any) => {
					return result;
				}));
		} else {
			let apiURL = Location.joinWithSlash(`${this.baseGDFPath}`, `/login/token`);

			return this.http.request('get', apiURL, { headers, withCredentials: true })
				.pipe(map((result: any) => {
					return result;
				}));
		}

	}

	logoutApplicazione(): Observable<any> {
		let headers = new HttpHeaders();

		headers = headers.set('Accept', 'application/json');
		headers = headers.set('Content-Type', 'application/json');

		let apiURL = Location.joinWithSlash(`${this.baseGDFPath}`, `/saml/logout`);

		return this.http.request('get', apiURL, { headers, withCredentials: true })
			.pipe(map((result: any) => {
					return result;
				})
			);
	}

	redirectSAMLService(error: HttpErrorResponse, redirectUrl: String): Observable<never> | void {
		let milleseconds = 500;

		if (this.useSAML) {
			if (error.status === 401) {
				let loginSAML = Location.joinWithSlash(`${this.baseGDFPath}`, `/saml/login`);

				if (redirectUrl != null && redirectUrl != '') {
					loginSAML = Location.joinWithSlash(`${this.baseGDFPath}`, `/saml/login?redirectUrl=` + redirectUrl);
				}

				try {
					setTimeout(() => {
						window.location.replace(loginSAML);
					}, milleseconds);
				} catch (error) {
					console.error(error);
				}

			} else {
				console.error(error.message);

				return throwError(error);
			}
		} else {

			console.error(error.message);

			return throwError(error);
		}

	};
}
