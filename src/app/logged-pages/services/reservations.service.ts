import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {GlobalService} from '../../global.service';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';

@Injectable()
export class ReservationsService {
  public serverAddress: any;
  public token: string;

  constructor(
    public http: HttpClient,
    private globalServ: GlobalService,
  ) {
    this.serverAddress = this.globalServ.serverAddress;
    this.token = localStorage.getItem("access_token");
  }

  GetReservationsList(id:any): Observable<any[]> {
    return this.http.get<any[]>(this.serverAddress + 'api/reservations/liste/'+id, {
      headers: new HttpHeaders().set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

}
