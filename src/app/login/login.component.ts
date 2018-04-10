import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {GlobalService} from "../global.service";
import {Ng4LoadingSpinnerService} from '../ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';

  constructor(private authenticationService: AuthenticationService,
              public jwtHelper: JwtHelperService,
              private formBuilder: FormBuilder,
              private router: Router,
              private _globalService: GlobalService,
              private spinnerService: Ng4LoadingSpinnerService) {

    if (_globalService.loggedIn()) {
      this.router.navigate(['/logged/accueil']);
    }
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });

  }

  ngOnInit() {
  }

  onSubmit() {
    this.spinnerService.show();

    this.authenticationService.loginService(this.loginForm.value).then((result) => {

      localStorage.setItem('access_token', result['token']);
      this._globalService.currentUser = this.jwtHelper.decodeToken(result['token']);
      this._globalService.currentUser.id = result["data"].id;
      this.spinnerService.hide();
      this.router.navigate(['/logged/accueil']);
      location.reload();

    }, (err) => {
      this.spinnerService.hide();
      console.log(err);
    });

  }

}
