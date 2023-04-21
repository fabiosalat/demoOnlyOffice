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
  private TOKEN: string = "TOKEN";
  private useSAML: boolean = false;
  private apiToken: string = "";
	private objApiToken!: ApiToken;
  private logoutSuccess: boolean = false;

  constructor(private loginSaml: AuthService,
    private router: Router,
		private http: HttpClient) {
      this.useSAML = environment.useSAML;
    }

  canActivate(roles: string[], state: RouterStateSnapshot): Promise<boolean> {
		return new Promise( resolve => {
			if (this.isAuthenticated()) {

				this.loginSaml.verificaAutenticazione()
					.subscribe(
						response => {
							this.objApiToken = JSON.parse(JSON.stringify(response));
							this.apiToken = this.objApiToken.token;

							localStorage.setItem(this.TOKEN, this.apiToken);

              resolve(true);
						},
						error => {

							if (error !== undefined && error != null) {
								console.error(error);

								if (error.message !== undefined && error.message != null) {
									console.error(error.message);
								}
							}

							this.logout();
							this.router.navigateByUrl('/session-expired');
							resolve(false);
						}
					);
			} else {
				this.loginSaml.eseguiAutenticazioneSAML()
					.subscribe(
						response => {
							this.objApiToken = JSON.parse(JSON.stringify(response));
							this.apiToken = this.objApiToken.token;

							localStorage.setItem(this.TOKEN, this.apiToken);

							resolve(true);
						},
						error => {
							if (error.status === 401) {
								this.router.routerState.snapshot.root.queryParams['redirectUrl'];
								this.loginSaml.redirectSAMLService(error, location.pathname);
							} else {


								console.error(error.message);
								this.router.navigateByUrl('/custom-500');
							}
							resolve(false);
						}
					);
			}
		});
	}

	logout() {
		if (!this.useSAML) {
			this.logoutSuccess = true;
			this.logoutFull();

			window.location.href = 'logout-grd';
			//window.close();
		} else {
			let logoutUrl = environment.baseUrl + '/saml/logout?local=true';
			this.http.get(logoutUrl)
				.subscribe(
					response => {
						this.logoutFull();
						window.location.href = 'logout-grd';
						//window.close();
						//this.router.navigateByUrl('/logout-crd');
					},
					error => {

						this.logoutFull();
						window.location.href = 'logout-grd';
						//window.close();
						//this.router.navigateByUrl('/logout-crd');
					}
				);
		}
	}

	isAuthenticated() {
		let notExpired = true;

		if (localStorage.getItem(this.TOKEN) != null && !notExpired) {
			this.logout();
		} else if (!localStorage.getItem(this.TOKEN)) {
			notExpired = false;
		}
		return notExpired;
	}

  logoutFull() {
		localStorage.removeItem(this.TOKEN);
	}

}
