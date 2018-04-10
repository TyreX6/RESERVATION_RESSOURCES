import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddReservationComponent} from './add-reservation/add-reservation.component';
import {AuthGuard} from './_guard/index';
import {LoggedPagesComponent} from "./logged-pages.component";
import {ProfileComponent} from "./profile/profile.component";
import {SearchComponent} from "./search/search.component";
import {ListResourcesComponent} from "./list-resources/list-resources.component";

const routes: Routes = [
  {
    path: 'logged',
    component: LoggedPagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'logged',
        redirectTo: 'accueil',
        pathMatch: 'full'
      },
      {
        path: 'accueil',
        component: HomeComponent,
        // canActivate: [AuthGuard],
        data: {title: 'Accueil'}
      },
      {
        path: 'profile',
        component: ProfileComponent,
        // canActivate: [AuthGuard],
        data: {title: 'Profile'}
      },
      {
        path: 'search',
        component: SearchComponent,
        // canActivate: [AuthGuard],
        data: {title: 'Search'}
      },
      {
        path: 'resources/list',
        component: ListResourcesComponent,
        // canActivate: [AuthGuard],
        data: {title: 'List Resources'}
      },
      {
        path: 'resources/list/:category',
        component: ListResourcesComponent,
        // canActivate: [AuthGuard],
        data: {title: 'List Resources'}
      },
      {
        path: 'reservation/add',
        component: AddReservationComponent,
        // canActivate: [AuthGuard],
        data: {title: 'Ajouter réservation'}
      },
      {
        path: 'reservation/add/:id',
        component: AddReservationComponent,
        // canActivate: [AuthGuard],
        data: {title: 'Ajouter réservation'}
      },
      {
        path: '**',
        redirectTo: 'accueil'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LoggedPagesRoutingModule {
}
