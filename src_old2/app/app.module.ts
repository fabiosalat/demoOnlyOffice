import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DocumentEditorModule } from '@onlyoffice/document-editor-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SecurityService } from './security.service';
import { SecurityInterceptor } from './security.interceptor';
import { SessionExpiredComponent } from './session-expired/session-expired.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AppRoutes } from './app.routes';
import { MainOnlyofficeComponent } from './main-onlyoffice/main-onlyoffice.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionExpiredComponent,
    UnauthorizedComponent,
    MainOnlyofficeComponent
  ],
  imports: [
    BrowserModule,
    DocumentEditorModule,
    HttpClientModule,
    RouterModule,
    AppRoutes
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SecurityInterceptor,
    multi: true
  },
  SecurityService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
