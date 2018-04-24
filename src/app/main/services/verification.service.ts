import {Injectable} from '@angular/core';
import {ReservationsService} from "./reservations.service";
import * as moment from "moment";
import {forEach} from "@angular/router/src/utils/collection";

@Injectable()
export class VerificationService {


  constructor(private _reservationService: ReservationsService,) {



  }


  verifyDuration(event: any) {
    let duration = moment(event.end).unix() - moment(event.start).unix();
    return duration;
  }

  verifyDayMaxReservaitons(event: any, events: any[]) {
    let fromDayStart = moment(event.start).startOf('day');
    let toDayEnd = moment(event.start).endOf('day');
    let counter = 0;
    events.forEach((element) => {
      if (moment(element.start).isBetween(fromDayStart, toDayEnd)) {
        counter++;
      }
    });
    return counter;
  }

  verifyWeekMaxReservations(event: any, events: any[]) {
    let dateMoment = moment(event.start);
    let fromWeekStart = dateMoment.startOf('week');
    let toWeekEnd = dateMoment.endOf('week');
    let counter = 0;
    events.forEach((element) => {
      if (moment(element.start).isBetween(moment(dateMoment).subtract(1, 'week'),dateMoment)) {
        counter++;
      }
    });
    return counter;
  }

}
