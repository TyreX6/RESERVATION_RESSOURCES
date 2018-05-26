import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MainRoutingModule } from '../main-routing.module';

@NgModule({
  exports: [
    CommonModule,
    NavbarComponent,
    SidebarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [NavbarComponent, SidebarComponent, FooterComponent]
})
export class LayoutModule { }
