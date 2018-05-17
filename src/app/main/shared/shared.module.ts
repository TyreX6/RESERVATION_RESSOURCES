import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {ModalComponent} from "./modal/modal.component";
import {MainRoutingModule} from '../main-routing.module';

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [NavbarComponent, SidebarComponent, FooterComponent, ModalComponent]
})
export class SharedModule {
}
