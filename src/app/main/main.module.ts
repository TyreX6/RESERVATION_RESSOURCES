import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {HomeComponent} from './Components/home/home.component';
import {AuthGuard} from "./_guard";
import {MainRoutingModule} from "./main-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MainComponent} from './main.component';
import {AddReservationComponent} from "./Components/add-reservation/add-reservation.component";
import {ProfileComponent} from './Components/profile/profile.component';
import {SearchComponent} from './Components/search/search.component';
import {ListResourcesComponent} from './Components/list-resources/list-resources.component';
import {ModalContentComponent} from "./Components/add-reservation/add-reservation.component";
import {CategoriesService} from "./services/categories.service";
import {ResourcesService} from "./services/resources.service";
import {CalendarInitService} from "./Components/add-reservation/calendar-init.service";
import {ReservationsService} from "./services/reservations.service";
import {VerificationService} from "./services/verification.service";

import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FullCalendarModule} from 'ng-fullcalendar';
import {KeysPipePipe} from './Components/list-resources/keys-pipe.pipe';

import {OwlDateTimeModule, OWL_DATE_TIME_LOCALE} from 'ng-pick-datetime';
import {OwlMomentDateTimeModule} from 'ng-pick-datetime-moment';

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AddResModalContent} from "./Components/add-reservation/AddResModalContent";

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import {LayoutModule} from "./layout/layout.module";
import { RangeSliderModule  } from 'ngx-rangeslider-component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 10000,
      closeButton: true,
      progressBar: true,
      preventDuplicates: false,
    }), // ToastrModule added
    // SharedModule,
    LayoutModule,
    FormsModule,
    MainRoutingModule,
    HttpClientModule,
    NgSelectModule,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlMomentDateTimeModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    NgxDatatableModule,
    RangeSliderModule
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  declarations: [
    HomeComponent,
    AddReservationComponent,
    MainComponent,
    ProfileComponent,
    SearchComponent,
    ListResourcesComponent,
    ModalContentComponent,
    AddResModalContent,
    KeysPipePipe,
  ],
  entryComponents: [ModalContentComponent,AddResModalContent],
  providers: [
    AuthGuard,
    CategoriesService,
    ReservationsService,
    ResourcesService,
    CalendarInitService,
    VerificationService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'fr'}
  ],
})
export class MainModule {
}
