import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Observable as RxObservable} from "rxjs/Observable";
import {GlobalService} from '../../services/global.service';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Injectable()
export class CategoriesService {
  public serverAddress: any;
  public token: string;

  constructor(public http: HttpClient,
              private globalServ: GlobalService,) {
    this.serverAddress = this.globalServ.serverAddress;
    this.token = localStorage.getItem("access_token");
  }

  public getCategories() {

    return new Promise((resolve, reject) => {
      this.http.get(this.serverAddress + 'api/categories/list', {
        headers: new HttpHeaders().set("Content-Type", "application/json")
          .set("Authorization", "Bearer " + this.token)
      })
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  GetCategoryList(): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/categories/list/resources', {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

  GetCategory(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/categories/list/resources/'+id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

}
