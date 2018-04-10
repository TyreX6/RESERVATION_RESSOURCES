import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarComponent} from 'ng-fullcalendar';
import {Options} from 'fullcalendar';
import {EventSesrvice} from './event.service';
// import * as jquery from 'jquery';
// import 'jquery-ui.custom.min';
import {CalendarInitService} from "./calendar-init.service";
import {Ng4LoadingSpinnerService} from "../../ng4-loading-spinner";
import {ActivatedRoute} from '@angular/router';
import {Select2OptionData} from 'ng2-select2';
import {ResourcesService} from "../services/resources.service";
import {ReservationsService} from "../services/reservations.service";
import * as moment from 'moment';
import {GlobalService} from "../../global.service";
import {elementClass} from "@angular/core/src/render3/instructions";
import {ClassField} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {
  private deviceID: any;
  private userID: any;
  private categories: any[];
  displayEvent: any;
  events = [];
  tempEvents = [];
  public exampleData: Array<Select2OptionData>;
  public startValue: string;
  public selected: string;
  calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(protected eventService: EventSesrvice,
              private _globalService: GlobalService,
              private route: ActivatedRoute,
              private _calendarService: CalendarInitService,
              private spinnerService: Ng4LoadingSpinnerService,
              private _resourcesService: ResourcesService,
              private _reservationService: ReservationsService) {

    this.userID = this._globalService.currentUser.id;
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.deviceID = params.get('id');

    });

    // if (this.id) {
    //   this.changed({value:this.id});
    // }
    // else {
    this._resourcesService.GetCategorizedResourcesList().subscribe((result) => {
      this.categories = result;
      this.exampleData = this.getChangeList(result);


    }, (err) => {
      console.log(err);
    });
    // }

  }

  ngOnInit() {
    this.calendarOptions = this._calendarService.calendar_options(this.events);
  }


  public changed(e: any): void {
    this.selected = e;
    this._reservationService.GetReservationsList(parseInt(e.value)).subscribe((result) => {
      this.events = [{}];
      for (let i = 0; i < result.length; i++) {
        this.events.push(
          {
            id: result[i].id,
            userID: result[i].user.id,
            title: result[i].dispositif.modele + " pour " + result[i].user.username,
            start: new Date(result[i].date_debut),
            end: new Date(result[i].date_fin),
            editable: result[i].user.id === this.userID //Date.parse(result[i].date_fin) > Date.now()
          });
      }

    });
  }


  getChangeList(categories: any[]): Select2OptionData[] {
    let resourcesList: any[] = [];
    categories.forEach(function (element) {
      resourcesList.push({
        id: "cat" + element.id,
        text: element.name,
      });

    });
    resourcesList.forEach((element, index, array) => {
      element.children = [];
      categories[index].ressource.forEach((subElement) => {
        element.children.push({
          id: "" + subElement.id,
          text: subElement.modele,
          disabled: this.deviceID && subElement.id != this.deviceID
        });
      }, this)
    }, this);
    console.log(resourcesList);
    return resourcesList;
  }


  loadevents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }

  clickButton(model: any) {
    this.displayEvent = model;
  }

  dayClick(model: any) {
    console.log(model);
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        userID: model.event.userID,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    };
    this.displayEvent = model;
  }

  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }


  clearEvents() {
    this.events = [{}];
  }


}
