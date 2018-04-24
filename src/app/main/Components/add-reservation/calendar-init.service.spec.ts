import { TestBed, inject } from '@angular/core/testing';

import { CalendarInitService } from './calendar-init.service';

describe('CalendarInitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarInitService]
    });
  });

  it('should be created', inject([CalendarInitService], (service: CalendarInitService) => {
    expect(service).toBeTruthy();
  }));
});
