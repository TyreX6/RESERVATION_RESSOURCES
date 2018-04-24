import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {SharedModule} from "./shared/shared.module";
import {HomeComponent} from './home/home.component';
import {MyNewComponentComponent} from './my-new-component/my-new-component.component';
import {AuthGuard} from "./_guard";
import {LoggedPagesRoutingModule} from "./logged-pages-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {LoggedPagesComponent} from './logged-pages.component';
import {AddReservationComponent} from "./add-reservation/add-reservation.component";
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {ListResourcesComponent} from './list-resources/list-resources.component';
import {ModalContentComponent} from "./add-reservation/add-reservation.component";
import {CategoriesService} from "./services/categories.service";
import {ResourcesService} from "./services/resources.service";
import {CalendarInitService} from "./add-reservation/calendar-init.service";
import {ReservationsService} from "./services/reservations.service";
import {VerificationService} from "./services/verification.service";

import {Select2Module} from 'ng2-select2';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FullCalendarModule} from 'ng-fullcalendar';
import {EventSesrvice} from './add-reservation/event.service';
import {KeysPipePipe} from './list-resources/keys-pipe.pipe';

import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {DataService} from "./services/data.service";

import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AddResModalContent} from "./add-reservation/AddResModalContent";

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
    SharedModule,
    FormsModule,
    LoggedPagesRoutingModule,
    HttpClientModule,
    Select2Module,
    FullCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  declarations: [
    HomeComponent,
    AddReservationComponent,
    MyNewComponentComponent,
    LoggedPagesComponent,
    ProfileComponent,
    SearchComponent,
    ListResourcesComponent,
    ModalContentComponent,
    AddResModalContent,
    KeysPipePipe,
  ],
  entryComponents: [ModalContentComponent,AddResModalContent],
  providers: [AuthGuard, CategoriesService, ReservationsService, ResourcesService, CalendarInitService, EventSesrvice, DataService, VerificationService],
})
export class LoggedPagesModule {
}
