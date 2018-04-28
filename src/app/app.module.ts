import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {MainModule} from './main/main.module';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {GlobalService} from './services/global.service';
import {Ng4LoadingSpinnerModule} from './services/ng4-loading-spinner';
import {LoginModule} from "./login/login.module";


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    LoginModule,
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
  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
