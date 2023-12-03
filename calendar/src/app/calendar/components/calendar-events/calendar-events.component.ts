import { Component } from '@angular/core';
import { CalendarDay } from '../../interfaces/calendar.interface';
import { CalendarService, CalendarView } from '../../services/calendar.service';

@Component({
  selector: 'calendar-events',
  templateUrl: './calendar-events.component.html',
  styleUrls: ['./calendar-events.component.scss'],
})
export class CalendarEventsComponent {

  constructor(
    public calendarService: CalendarService
  ) { }

  ngOnInit() {
  }

}
