import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import {GlobalService} from '../../global.service';

import "rxjs/add/operator/map";
import 'rxjs/add/operator/catch';
import {IRegles} from "../models/regles";

@Injectable()
export class ReservationsService {
  public serverAddress: any;
  public token: string;

  constructor(
    public http: HttpClient,
    private globalServ: GlobalService) {

    this.serverAddress = this.globalServ.serverAddress;
    this.token = localStorage.getItem("access_token");

  }

  //------------ Retreive all reservations for specific resource -----------//
  GetReservationsList(id: any): Observable<any[]> {

    return this.http.get<any[]>(this.serverAddress + 'api/reservations/liste/' + id, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });

  }

  //------------ Add reservation to the database -----------//
  AddReservation(reservation: any): Observable<any> {
    reservation.start = reservation.start.format("YYYY-MM-DD HH:mm:ss");
    reservation.end = reservation.end.format("YYYY-MM-DD HH:mm:ss");

    return this.http.post<any[]>(this.serverAddress + 'api/reservations/add', JSON.stringify(reservation), {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });

  }

  //------------ Modify reservation with specific ID -----------//
  ModifyReservation(reservation: any): Observable<any> {
    reservation.start = reservation.start.format("YYYY-MM-DD HH:mm:ss");
    reservation.end = reservation.end.format("YYYY-MM-DD HH:mm:ss");

    return this.http.put<any[]>(this.serverAddress + 'api/reservations/modify/' + reservation.id_res, JSON.stringify(reservation), {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }


  //------------ Delete reservation with specific ID -----------//
  DeleteReservation(id: number): Observable<any> {

    return this.http.delete<any>(this.serverAddress + 'api/reservations/delete/' + id, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });
  }

  //------------ Retreive all rules -----------//
  GetRegles(): Observable<IRegles> {

    return this.http.get<IRegles>(this.serverAddress + 'api/regles/', {
      headers: new HttpHeaders()
        .set("Content-Type", "application/json")
        .set("Authorization", "Bearer " + this.token)
    });

  }


}
