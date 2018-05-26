import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Observable as RxObservable} from "rxjs/Observable";
import {GlobalService} from '../../services/global.service';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Injectable()
export class ResourcesService {
  public serverAddress: any;
  public token: string;

  constructor(public http: HttpClient,
              private globalServ: GlobalService,) {
    this.serverAddress = this.globalServ.serverAddress;
    this.token = localStorage.getItem("access_token");
  }

  GetDevicesList(): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/dispositifs/list', {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

  GetOsList(): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/dispositifs/os/list', {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

  GetResolutionsList(): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/dispositifs/resolution/list', {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

  GetResourcesList(): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/resources/list', {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

  GetCategorizedResourcesList(): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/categories/list/resources', {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

}
