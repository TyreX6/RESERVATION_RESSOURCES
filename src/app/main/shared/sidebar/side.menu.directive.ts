import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ad-host]',
})
export class SideMenuDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

