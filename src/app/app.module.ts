import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {LoggedPagesModule} from './logged-pages/logged-pages.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from "./login/login.component";

import {AuthenticationService} from './login/authentication.service';
import {GlobalService} from './global.service';
import {Ng4LoadingSpinnerModule} from './ng4-loading-spinner';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    LoggedPagesModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/login']
      }
    }),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [AuthenticationService, GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
