import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "./shared/shared.module";
import { HomeComponent } from './home/home.component';
import { MyNewComponentComponent } from './my-new-component/my-new-component.component';
import {AuthGuard} from "./_guard/auth.guard";
import {LoggedPagesRoutingModule} from "./logged-pages-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { LoggedPagesComponent } from './logged-pages.component';
import {AddReservationComponent} from "./add-reservation/add-reservation.component";
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ListResourcesComponent } from './list-resources/list-resources.component';
import {CategoriesService} from "./services/categories.service";
import {ResourcesService} from "./services/resources.service";
import {CalendarInitService} from "./add-reservation/calendar-init.service";
import {ReservationsService} from "./services/reservations.service";

import { Select2Module } from 'ng2-select2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from 'ng-fullcalendar';
import { EventSesrvice } from './add-reservation/event.service';
import { KeysPipePipe } from './list-resources/keys-pipe.pipe';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    LoggedPagesRoutingModule,
    HttpClientModule,
    Select2Module,
    FullCalendarModule
  ],
  declarations: [
    HomeComponent,
    AddReservationComponent,
    MyNewComponentComponent,
    LoggedPagesComponent,
    ProfileComponent,
    SearchComponent,
    ListResourcesComponent,
    KeysPipePipe,
  ],
  providers: [AuthGuard,CategoriesService,ReservationsService,ResourcesService,CalendarInitService,EventSesrvice],
})
export class LoggedPagesModule { }