import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {AddReservationComponent} from './Components/add-reservation/add-reservation.component';
import {AuthGuard} from './_guard/index';
import {MainComponent} from "./main.component";
import {ProfileComponent} from "./Components/profile/profile.component";
import {SearchComponent} from "./Components/search/search.component";
import {ListResourcesComponent} from "./Components/list-resources/list-resources.component";

const routes: Routes = [
  {
    path: 'logged',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'logged',
        redirectTo: 'reservation/add',
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
        path: 'resources/list/:category',
        component: ListResourcesComponent,
        // canActivate: [AuthGuard],
        data: {title: 'List Resources'}
      },
      {
        path: 'resources/list',
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
        redirectTo: 'reservation/add'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MainRoutingModule {
}
