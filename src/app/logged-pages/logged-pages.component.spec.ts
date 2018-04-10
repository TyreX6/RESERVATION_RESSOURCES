import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedPagesComponent } from './logged-pages.component';

describe('LoggedPagesComponent', () => {
  let component: LoggedPagesComponent;
  let fixture: ComponentFixture<LoggedPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggedPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
