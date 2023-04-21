import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IConfig } from '@onlyoffice/document-editor-angular';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-onlyoffice',
  templateUrl: './main-onlyoffice.component.html',
  styleUrls: ['./main-onlyoffice.component.css']
})
export class MainOnlyofficeComponent {
  id: string =  "838ff914-cec2-46e5-8138-747c75f66418";
  config$: Observable<any> = new Observable<any>;
  config!: IConfig;
  docEditor: any;
  TOKEN: string = 'id_token';

  constructor(private http: HttpClient,
              private authService: AuthService,
              private route: ActivatedRoute){
    
    this.route.params.subscribe(params => {
      if(params['id']){
        this.id = params['id'];
      }
    });

    let headers = new HttpHeaders();

      headers = headers.set('Accept', 'application/json');
      headers = headers.set('x-auth-token', localStorage.getItem(this.TOKEN) || "");

      const options: {} = {
        observe: 'body',
        headers: headers,
        responseType: 'json' as 'json'
      };

      const url = Location.joinWithSlash(`${environment.baseUrl}`, `/api/prepare/${this.id}`);

      this.config$ = this.http.get<any>(url, options).pipe(map(res => { 
        res.editorConfig.document.permissions.review = true;
        res.editorConfig.document.permissions.reviewGroups = (res.editorConfig.editorConfig.user.lastname == "Nevadini") ? [""] : [];
        return res;
      }));

  }

  onDocumentReady = () => {
    this.docEditor = window.DocEditor.instances["document"];

  }

  onRequestHistory = () => {
    let url = Location.joinWithSlash(`${environment.baseUrl}`, `/api/history/${this.id}`);

    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');
    headers = headers.set('x-auth-token', localStorage.getItem(this.TOKEN) || "");

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
    headers = headers.set('x-auth-token', localStorage.getItem(this.TOKEN) || "");

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

    this.docEditor.destroyEditor();

    let url = Location.joinWithSlash(`${environment.baseUrl}`, `/api/restore/${this.id}/${version}`);

    let headers = new HttpHeaders();

    headers = headers.set('Accept', 'application/json');
    headers = headers.set('x-auth-token', localStorage.getItem(this.TOKEN) || "");

    const options: {} = {
      observe: 'body',
      headers: headers,
      responseType: 'json' as 'json'
    };

    this.http.post(url, null, options).subscribe(response => {
      console.log("FATTO!");
      console.log(response);

      window.setTimeout(() => {
        window.location.reload();
      }, 3000);

    }, (error) => {
      alert("IL DOCUMENTO E' APERTO DA ALTRI UTENTI, RIPROVA");
      console.log(error);
    });

  }

  onRequestHistoryClose = () => {
    document.location.reload();
  }

}
