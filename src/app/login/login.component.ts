import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {GlobalService} from "../services/global.service";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {ToastrService} from "ngx-toastr";

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
              private spinnerService: Ng4LoadingSpinnerService,
              private toaster:ToastrService) {

    if (_globalService.loggedIn()) {
      this.router.navigate(['/logged/reservation/add']);
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
      console.log(result);
      localStorage.setItem('access_token', result['token']);
      //localStorage.setItem('data', result['data']);
      this._globalService.currentUser = this.jwtHelper.decodeToken(result['token']);

      this.spinnerService.hide();
      this.router.navigate(['/logged/reservation/add']);
      //location.reload();

    }, (err) => {
      this.toaster.error("Vérifier votre login et mot de passe","Erreur");
      this.spinnerService.hide();
      console.log(err);
    });

  }

}
