import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IConfig } from '@onlyoffice/document-editor-angular';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-OnlyOffice';
  id: string = "3b0db2cc-a8a9-4342-ac58-1911f8229d64";
  config$: Observable<any> = new Observable<any>;
  docEditor: any;

  constructor(private http: HttpClient,
              private authService: AuthService){

    this.authService.eseguiAutenticazioneSAML().subscribe(() =>
    {
      let headers = new HttpHeaders();

      headers = headers.set('Accept', 'application/json');
      headers = headers.set('x-auth-token', localStorage.getItem('TOKEN') || "");

      const options: {} = {
        observe: 'body',
        headers: headers,
        responseType: 'json' as 'json'
      };

      const url = Location.joinWithSlash(`${environment.baseUrl}`, `/api/prepare/${this.id}`);

      this.config$ = this.http.get<any>(url, options);
    });

  }

  onDocumentReady = () => {
    this.docEditor = window.DocEditor.instances["document"];

  }

  onRequestHistory = () => {
    let url = Location.joinWithSlash(`${environment.baseUrl}`, `/api/history/${this.id}`);

    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');
    headers = headers.set('x-auth-token', localStorage.getItem('TOKEN') || "");

    const options: {} = {
      observe: 'body',
      headers: headers,
      responseType: 'json' as 'json'
    };

    this.http.get<any>(url, options).subscribe(response => {
      this.docEditor.refreshHistory(response);
    });

  }

  onRequestHistoryData = (event: any) => {
    let version = event.data;

    let url = Location.joinWithSlash(`${environment.baseUrl}`, `/api/history/${this.id}/${version}`);

    let headers = new HttpHeaders();

      headers = headers.set('Accept', 'application/json');
      headers = headers.set('x-auth-token', localStorage.getItem('TOKEN') || "");

      const options: {} = {
        observe: 'body',
        headers: headers,
        responseType: 'json' as 'json'
      };

    this.http.get(url, options).subscribe(response => {
      this.docEditor.setHistoryData(response);
    });

  }

  onRequestRestore = (event: any) => {
    let version = event.data.version;

    // let url = Location.joinWithSlash(`${environment.baseUrl}`, `/api/history/${this.id}`);

    // let headers = new HttpHeaders();

    // headers = headers.set('Accept', 'application/json');
    // headers = headers.set('x-auth-token', localStorage.getItem('TOKEN') || "");

    // const options: {} = {
    //   observe: 'body',
    //   headers: headers,
    //   responseType: 'json' as 'json'
    // };

    // this.http.get<any>(url, options).subscribe(response => {
    // });

  }

  onRequestHistoryClose = () => {
    document.location.reload();
  }

}
