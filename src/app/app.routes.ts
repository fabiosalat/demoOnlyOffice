import { RouterModule, Routes } from "@angular/router";
import { SessionExpiredComponent } from "./session-expired/session-expired.component";
import { UnauthorizedComponent } from "./unauthorized/unauthorized.component";
import { AuthGuard } from "./auth.guard";
import { AppComponent } from "./app.component";
import { ModuleWithProviders } from "@angular/core";
import { MainOnlyofficeComponent } from "./main-onlyoffice/main-onlyoffice.component";

export const routes: Routes = [
  { path: '', redirectTo: '/main-onlyoffice', pathMatch: 'full' },
  {
		path: '',
		component: AppComponent,
		canActivate: [AuthGuard],
    children: [
      {
        path: 'main-onlyoffice',
        component: MainOnlyofficeComponent
      }
    ]
  },
  {
		path: '',
		children: [
			{
				path: 'unauthorized',
				component: UnauthorizedComponent
			},
			{
				path: 'session-expired',
				component: SessionExpiredComponent
			}
		]
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

export const AppRoutes: ModuleWithProviders<RouterModule> = RouterModule.forRoot(routes);
