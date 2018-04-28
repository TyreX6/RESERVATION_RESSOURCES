import {Injectable} from '@angular/core';
import {ReservationsService} from "../../services/reservations.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Ng4LoadingSpinnerService} from "../../../services/ng4-loading-spinner";
import * as jquery from 'jquery';
import 'jqueryui';
import * as moment from 'moment';
import 'moment-duration-format';
import {CalendarComponent} from "ng-fullcalendar";
import {ToastrService} from 'ngx-toastr';
import {VerificationService} from "../../services/verification.service";
import {Subject} from "rxjs/Subject";
import {HttpErrorResponse} from "@angular/common/http";


@Injectable()
export class CalendarInitService {
  public reservations: any[] = [];

  constructor(private toastr: ToastrService,
              private _reservationService: ReservationsService,
              private spinnerService: Ng4LoadingSpinnerService,
              private _verificationService: VerificationService) {
    // this.fetchReservations();

  }


  public calendar_options(events: any) {
    return {
      editable: true,
      eventLimit: false,
      //height:'parent',
      slotDuration: moment.duration(15, 'minutes'),
      minTime: moment.duration(8.5, 'hours'),
      maxTime: moment.duration(18.5, 'hours'),
      slotEventOverlap: false,
      eventOverlap: false,
      selectOverlap: false,
      weekends: false,
      allDaySlot: false,
      droppable: true, // this allows things to be dropped onto the calendar !!!
      dropAccept: '.fc-event',
      selectable: true,
      buttonText: {
        today: 'Aujourdui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      slotLabelFormat: 'H(:mm)',
      defaultView: 'agendaWeek',
      locale: 'fr',
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      events: events
    };
  }


  //----------------- Service for adding reservation on Calendar Click -------------//
  public calendarClick(currentUser: any, detail: any, ucCalendar: CalendarComponent, deviceSelected: any, events: any[]) {

    if (new Date(detail.start.format()) < new Date()) {
      this.toastr.error("Vous ne pouvez pas réserver dans le passé", "Erreur");
      ucCalendar.fullCalendar('unselect');
      return false;
    }


    let model = {
      event: {
        id: events.length,
        id_res: null,
        user: currentUser.id,
        title: deviceSelected.data[0].text + " pour " + currentUser.username,
        start: moment(detail.start),
        end: moment(detail.end),
        className: ["bg-orange"],
        resource: deviceSelected.data[0].id,
        editable: true
      }
    };

    ucCalendar.fullCalendar('renderEvent', model.event);
    ucCalendar.fullCalendar('unselect');
    this.blink();


    this._reservationService.AddReservation(model.event).subscribe((result) => {
      if (result.success == 1) {

        model.event.className = ["bg-success"];
        model.event.id_res = result.reservation_id;
        ucCalendar.fullCalendar('removeEvents', [model.event.id]);
        ucCalendar.fullCalendar('renderEvent', model.event);
        clearInterval(this.blink());
        events.push(model.event);
        this.toastr.success(result.message, "Succée");
      }

      else {
        this.toastr.error(result.message, "Erreur");
        ucCalendar.fullCalendar('removeEvents', [model.event.id]);
        clearInterval(this.blink());
      }

    },
      (err: HttpErrorResponse) => {
        this.toastr.error("Erreur coté serveur","Erreur 500");
        clearInterval(this.blink());
      });
  }

  //----------------------- End Method -----------------------------//


  //--------------------- Service for the reservation update -----------------//
  public updateEvent(model: any, ucCalendar: CalendarComponent, events: any): Observable<any> {
    console.log("update event");
    let subject = new Subject<any>();
    model = {
      event: {
        id: model.event.id,
        id_res: model.event.id_res,
        start: model.event.start,
        end: model.event.end,
        user: model.event.user,
        title: model.event.title,
        className: model.event.className,
        resource: model.event.resource,
        editable: model.event.editable,
        // other params
      },
      duration: model.duration
    };
    console.log("model:", model.event);

    // _model.duration = {};

    if (new Date(model.event.start.format()) < new Date()) {
      this.toastr.error("Vous ne pouvez pas déplacer cette réservation.", "Erreur");

      this.revertFunc(model, ucCalendar, events);
      return Observable.of(false);
    }

    // // model.duration = {};
    // // model.event.start=new Date();
    // // model.event.end=null;
    // ucCalendar.fullCalendar('removeEvents', [model.event.id]);
    // //ucCalendar.fullCalendar('renderEvent', model.event);
    // return;
    //
    //

    //
    //
    let onlyExpandble = (new Date(moment(model.event.start).format()) > new Date()) && new Date(moment(model.event.start).subtract(model.duration, 'seconds').format()) < new Date();
    console.log(onlyExpandble);

    if (onlyExpandble) {
      this.revertFunc(model, ucCalendar, events);
      this.toastr.error("Cette réservation est déja démarré. Vous pouvez seulement faire une prolongation", "Erreur");
      return Observable.of(false);
    }

    else {
      events[model.event.id].className = ["bg-orange"];
      this.blink();

      this._reservationService.ModifyReservation(model.event).subscribe((result) => {
        if (result.success == 1) {
          this.toastr.success(result.message, "Succée");
          events[model.event.id].className = "bg-success";
          model.event.className = "bg-success";
          ucCalendar.fullCalendar('removeEvents', [model.event.id]);
          ucCalendar.fullCalendar('renderEvent', model.event);
          subject.next(true);
        }
        else {
          this.toastr.error(result.message, "Erreur");
          events[model.event.id].className = "bg-danger";
          model.event.className = "bg-danger";
          this.revertFunc(model, ucCalendar, events);
          subject.next(false);
        }

        clearInterval(this.blink());
      },
        (err: HttpErrorResponse) => {
          this.toastr.error("Erreur coté serveur","Erreur 500");
          subject.next(false);
          clearInterval(this.blink());
        });

    }

    //
    //
    // return model;

    return subject.asObservable();

  }

  resizeEvent(model: any, ucCalendar: CalendarComponent, events: any[]) {
    console.log("resize event");
    model = {
      event: {
        id: model.event.id,
        id_res: model.event.id_res,
        user: model.event.user,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        className: model.event.className,
        editable: model.event.editable,
        // other params
      },
      duration: model.duration
    };

    events[model.event.id].className = "bg-orange";
    this.blink();

    this._reservationService.ModifyReservation(model.event).subscribe((result) => {

      if (result.success == 1) {
        this.toastr.success(result.message, "Succée");
        events[model.event.id].className = "bg-dark-green";
        model.event.className = "bg-success";
        ucCalendar.fullCalendar('removeEvents', [model.event.id]);
        ucCalendar.fullCalendar('renderEvent', model.event);
      }
      else {
        this.toastr.error(result.message, "Erreur");
        events[model.event.id].className = "bg-danger";
        model.event.className = "bg-danger";
        ucCalendar.fullCalendar("removeEvents", [model.event.id]);
        events[model.event.id].end = moment(model.event.end).subtract(model.duration, 'seconds');
        ucCalendar.fullCalendar("renderEvent", events[model.event.id]);
      }

      clearInterval(this.blink());
    },
      (err: HttpErrorResponse) => {
        this.toastr.error("Erreur coté serveur","Erreur 500");
        clearInterval(this.blink());
      });

    return model;

  }

  blink() {
    return setInterval(function () {
      $(".bg-orange").fadeIn(150).delay(200).fadeOut(150);
    }, 500);
  }


  revertFunc(model: any, ucCalendar: CalendarComponent, events: any[]) {

    ucCalendar.fullCalendar("removeEvents", [model.event.id]);
    events[model.event.id].start = moment(model.event.start).subtract(model.duration, 'seconds');
    events[model.event.id].end = moment(model.event.end).subtract(model.duration, 'seconds');
    ucCalendar.fullCalendar("renderEvent", events[model.event.id]);

  }

  /**
   *
   * @param {any[]} events
   * @param start moment
   * @param end moment
   */
  public verifyCrossReservation(events: any[], start, end) {
    let count: number = 0;
    events.forEach(element => {
      if (element.start.isBetween(start, end) || element.end.isBetween(start, end)) {
        count++;
        return;
      }
    });
    console.log("count", count);
    return count > 0;
  }


}
