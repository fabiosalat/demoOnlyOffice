import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  eseguiAutenticazioneSAML(): Observable<any> {
		let headers = new HttpHeaders();

		headers = headers.set('Accept', 'application/json');
		headers = headers.set('Content-Type', 'application/json');

		let apiURL = Location.joinWithSlash(`${environment.baseUrl}`, 'login/token');

    return this.http.request('get', apiURL, { headers, withCredentials: true })
      .pipe(map((result: any) => {
        localStorage.setItem('TOKEN', result.token);
      }));
	}

}
