import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { IConfig } from '@onlyoffice/document-editor-angular';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-OnlyOffice';
  // id: string = "3b0db2cc-a8a9-4342-ac58-1911f8229d64";

  constructor() {}

}
