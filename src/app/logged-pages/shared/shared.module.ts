import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { LoggedPagesRoutingModule } from '../logged-pages-routing.module';

@NgModule({
  exports: [
    CommonModule,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
],
  imports: [
    CommonModule,
    LoggedPagesRoutingModule
  ],
  declarations: [NavbarComponent, SidebarComponent, FooterComponent]
})
export class SharedModule { }
