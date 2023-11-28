import { Component } from '@angular/core';
import { CalendarDay } from '../../interfaces/calendar.interface';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {

  weekdays: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  calendar: CalendarDay[] = [];
  selectedDate: string = "";

  constructor(

  ) { }

  ngOnInit() {
    const date = new Date();
    const today = `${date.getFullYear()}-${(date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '')}${date.getDate()}`;
    this.selectDate(today);
    this.populateCalendar();
  }

  public selectDate(date: string) {
    console.log(date);
    this.selectedDate = date;
  }

  private populateCalendar() {
    this.calendar = [];

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month, daysInMonth).getDay();

    console.log(daysInMonth);

    // Add days from the month previous to the selected
    for (let i = firstDay - 1; i > 0; i--) {
      const prevMonthDate = new Date(year, month, 1 - i);
      this.calendar.push(this.createCalendarDay(prevMonthDate, false));
    }

    // Add days from the selected month
    for (let i = 1; i <= daysInMonth; i++) {
      const selectedDate = new Date(year, month, i);
      this.calendar.push(this.createCalendarDay(selectedDate, true));
    }

    // Add days from the month after if needed
    const daysToAdd = lastDay !== 0 ? 7 - lastDay : 0;

    for (let i = 1; i <= daysToAdd; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      this.calendar.push(this.createCalendarDay(nextMonthDate, false));
    }

    // Handle the case when the calendar has 28 days
    if (this.calendar.length === 28) {
      for (let i = 1; i <= 7; i++) {
        const prevMonthDate = new Date(year, month, 1 - i);
        console.log(prevMonthDate.toString());

        this.calendar.unshift(this.createCalendarDay(prevMonthDate, false));
      }
    }

    console.log(this.calendar);
  }

  private createCalendarDay(date: Date, currentMonth: boolean): CalendarDay {
    return {
      date: `${date.getFullYear()}-${(date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '')}${date.getDate()}`,
      dateShort: date.getDate(),
      day: date.getDay(),
      hasEvent: false,
      currentMonth,
    };
  }
}
