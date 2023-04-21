import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface ApiToken {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
    
  constructor(private authService: AuthService) {}

  canActivate(roles: string[], state: RouterStateSnapshot): Promise<boolean> {
		return new Promise( resolve => {
			// if(this.authService.isAuthenticated()) {
			// 	resolve(true);
			// } else {
			// 	resolve(false);
			// }
			
			resolve(this.authService.isAuthenticated());

		});
	}



}
