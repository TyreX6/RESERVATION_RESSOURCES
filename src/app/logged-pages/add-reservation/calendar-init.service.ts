import {Inject, Injectable} from '@angular/core';
import {ReservationsService} from "../services/reservations.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Ng4LoadingSpinnerService} from "../../ng4-loading-spinner";
import Duration = JQuery.Duration;
import * as moment from 'moment';
import 'moment-duration-format';

@Injectable()
export class CalendarInitService {
  public reservations: any[] = [];

  constructor(private _reservationService: ReservationsService,
              private spinnerService: Ng4LoadingSpinnerService) {
    // this.fetchReservations();
  }

  public cal_init(events: any[]) {
  }

  public calendar_options(events: any) {
    return {
      editable: true,
      eventLimit: false,
      slotDuration: moment.duration(30, 'minutes'),
      minTime: moment.duration(9, 'hours'),
      maxTime: moment.duration(18, 'hours'),
      slotEventOverlap: false,
      eventOverlap: false,
      selectOverlap: false,
      weekends: false,
      droppable: true, // this allows things to be dropped onto the calendar !!!
      selectable: true,
      buttonText: {
        today: 'Aujourdui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: events
    };
  }


  public fetchReservations(id: number): Observable<any> {
    let newEvents = [{}];
    this._reservationService.GetReservationsList(id).subscribe((result) => {
      for (let i = 0; i < result.length; i++) {
        newEvents.push(
          {
            id: result[i].id,
            title: result[i].dispositif.modele + " pour " + result[i].user.username,
            backTitle: result[i].dispositif.modele + " pour " + result[i].user.username,
            start: new Date(result[i].date_debut),
            end: new Date(result[i].date_fin),
            className: "bg-warning",
            dispId: result[i].dispositif.id,
            editable: false
          });
      }

      // this.cal_init(this.reservations);
    }, (err) => {
      console.log(err);
    });
    return Observable.of(newEvents);
  }

}
