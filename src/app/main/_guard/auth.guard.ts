import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              public jwtHelper: JwtHelperService) {
  }

  canActivate() {
    if (!this.jwtHelper.isTokenExpired()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
