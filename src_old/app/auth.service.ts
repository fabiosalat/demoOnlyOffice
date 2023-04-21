import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private TOKEN: string = "id_token";

  constructor(private cookieService: CookieService) {
	if(this.cookieService.check(this.TOKEN)){
		let token: string = this.cookieService.get(this.TOKEN);
		localStorage.setItem(this.TOKEN, token);
		this.cookieService.delete(this.TOKEN);
	}
  }

  isAuthenticated() {
	let notExpired = true;

	if (localStorage.getItem(this.TOKEN) != null && !notExpired) {
		// this.logout();
		alert("Il token è scaduto, torna su FAA");
	} else if (!localStorage.getItem(this.TOKEN)) {
		notExpired = false;
		alert("Il token non è presente, torna su FAA");
	}
	return notExpired;
  }


  logout(){
	localStorage.removeItem(this.TOKEN);
  }

}
