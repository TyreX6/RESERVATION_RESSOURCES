import {Component, Input} from '@angular/core';

@Component({
  template: `
    <li *ngFor="let categ of categs" [routerLink]="['resources/list/',categ.id]" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
      <a>
        <span>{{categ.name}}</span>
      </a>
    </li>
  `
})
export class DynamicMenuComponent {
  @Input() categs: any[];

}
