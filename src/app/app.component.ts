import {Component} from '@angular/core';
import {GlobalService} from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  template: string = `<div id="nb-global-spinner" class="spinner">
  <div class="blob blob-0"></div>
  <div class="blob blob-1"></div>
  <div class="blob blob-2"></div>
  <div class="blob blob-3"></div>
  <div class="blob blob-4"></div>
  <div class="blob blob-5"></div>
</div>`;

  constructor(private _globalService: GlobalService) {

  }

  public loggedIn() {
    return this._globalService.loggedIn()
  }

}
