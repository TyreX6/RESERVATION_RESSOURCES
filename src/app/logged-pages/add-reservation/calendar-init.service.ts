import {Injectable} from '@angular/core';
import {ReservationsService} from "../services/reservations.service";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Ng4LoadingSpinnerService} from "../../ng4-loading-spinner";
import * as jquery from 'jquery';
import 'jqueryui';
import * as moment from 'moment';
import 'moment-duration-format';
import {CalendarComponent} from "ng-fullcalendar";
import {ToastrService} from 'ngx-toastr';


@Injectable()
export class CalendarInitService {
  public reservations: any[] = [];

  constructor(private toastr: ToastrService,
              private _reservationService: ReservationsService,
              private spinnerService: Ng4LoadingSpinnerService) {
    // this.fetchReservations();
  }

  public cal_init(events: any[]) {
  }

  public calendar_options(events: any) {
    return {
      editable: true,
      eventLimit: false,
      slotDuration: moment.duration(15, 'minutes'),
      minTime: moment.duration(9, 'hours'),
      maxTime: moment.duration(18, 'hours'),
      slotEventOverlap: false,
      eventOverlap: false,
      selectOverlap: false,
      weekends: false,
      allDaySlot: true,
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
      defaultView: 'agendaWeek',
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
      alert("Vous ne pouvez pas réserver dans le passé !");
      ucCalendar.fullCalendar('unselect');
      return false;
    }


    let model = {
      event: {
        id: events.length,
        id_res: null,
        title: deviceSelected.data[0].text + " pour " + currentUser.username,
        start: moment(detail.start),
        end: moment(detail.end),
        className: "bg-orange",
        user: currentUser.id,
        resource: deviceSelected.data[0].id
      }
    };

    ucCalendar.fullCalendar('renderEvent', model.event);
    ucCalendar.fullCalendar('unselect');
    this.allo();

    this._reservationService.AddReservation(model.event).subscribe((result) => {
      if (result.success == 1) {

        model.event.className = "";
        model.event.id_res = result.reservation_id;
        ucCalendar.fullCalendar('removeEvents', [model.event.id]);
        ucCalendar.fullCalendar('renderEvent', model.event);
        // this.ucCalendar.fullCalendar('updateEvent',item);
        clearInterval(this.allo());
        events.push(model.event);
        this.toastr.success(result.message, "Succée");
      }

      else {
        this.toastr.error(result.message, "Erreur");
        ucCalendar.fullCalendar('removeEvents', [model.event.id]);
      }

    });
  }

  //----------------------- End Method -----------------------------//


  //--------------------- Service for the reservation update -----------------//
  public updateEvent(model: any, ucCalendar: CalendarComponent, events: any) {

    model = {
      event: {
        id: model.event.id,
        id_res: model.event.id_res,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        className: model.event.className,
        editable: model.event.editable,
        // other params
      },
      duration: model.duration
    };

    // _model.duration = {};

    if (new Date(model.event.start.format()) < new Date()) {
      alert("Vous ne pouvez délpacer cette réservation");
      this.revertFunc(model, ucCalendar, events);
      return false;
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

      alert('Vous ne pouvez pas modifier cette réservation');
      this.revertFunc(model, ucCalendar, events);
      this.toastr.error("Cette réservation est déja démarré. Vous pouvez seulement faire une prolongation", "Erreur");
      return false;

    }
    else {

      //ucCalendar.fullCalendar('removeEvents', [model.event.id]);
      events[model.event.id].className = "bg-orange";
      this.allo();

      this._reservationService.ModifyReservation(model.event).subscribe((result) => {
        if (result.success == 1) {
          this.toastr.success(result.message, "Succée");
          events[model.event.id].className = "bg-success";
          model.event.className = "bg-success";
          ucCalendar.fullCalendar('removeEvents', [model.event.id]);
          ucCalendar.fullCalendar('renderEvent', model.event);
        }
        else {
          this.toastr.error(result.message, "Erreur");

          events[model.event.id].className = "bg-danger";
          model.event.className = "bg-danger";

          this.revertFunc(model, ucCalendar, events);
          // ucCalendar.fullCalendar('removeEvents', [model.event.id]);
          // ucCalendar.fullCalendar('renderEvent', model.event);
        }

        clearInterval(this.allo());
      });

    }

    //
    //
    // return model;

    return model;

  }

  resizeEvent(model: any, ucCalendar: CalendarComponent, events: any[]) {
    model = {
      event: {
        id: model.event.id,
        id_res: model.event.id_res,
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
    this.allo();

    this._reservationService.ModifyReservation(model.event).subscribe((result) => {
      if (result.success == 1) {
        this.toastr.success(result.message, "Succée");
        events[model.event.id].className = "bg-success";
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

      clearInterval(this.allo());
    });

    return model;

  }

  allo() {
    return setInterval(function () {
      $(".bg-orange").fadeIn(300).delay(400).fadeOut(300);
    }, 1000);
  }


  revertFunc(model: any, ucCalendar: CalendarComponent, events: any[]) {

    ucCalendar.fullCalendar("removeEvents", [model.event.id]);
    events[model.event.id].start = moment(model.event.start).subtract(model.duration, 'seconds');
    events[model.event.id].end = moment(model.event.end).subtract(model.duration, 'seconds');
    ucCalendar.fullCalendar("renderEvent", events[model.event.id]);

  }


}
