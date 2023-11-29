import { Component } from '@angular/core';
import { CalendarDay } from '../../interfaces/calendar.interface';
import { CalendarService, CalendarView } from '../../services/calendar.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.NORMAL;

  constructor(
    public calendarService: CalendarService
  ) { }

  ngOnInit() {
    this.calendarService.selectDate(this.calendarService.selectedDate);
    this.calendarService.populateCalendar(this.calendarService.selectedDate);
  }

  public switchMonthYearSelector() {
    switch (this.view) {
      case CalendarView.NORMAL:
        this.view = CalendarView.MONTH_SELECT;
        break;
      case CalendarView.MONTH_SELECT:
        this.view = CalendarView.YEAR_SELECT;
        break;
      case CalendarView.YEAR_SELECT:
        this.view = CalendarView.NORMAL;
        break;
      default:
        console.log("error");
        break;
    }
  }

  public isSelected(item: Date, type: string) {
    const selectedDate = this.calendarService.selectedDate;

    switch (type) {
      case 'date':
        return this.calendarService.formatDateToString(item) === this.calendarService.formatDateToString(selectedDate);
      case 'month':
        return item.getFullYear() === selectedDate.getFullYear() && item.getMonth() === selectedDate.getMonth();
      case 'year':
        return item.getFullYear() === selectedDate.getFullYear();
      default:
        console.error("Invalid type");
        return false;
    }
  }

  public selectMonth(date: Date) {
    this.calendarService.selectMonth(date);
    this.switchMonthYearSelector();
  }

  public selectYear(date: Date) {
    this.calendarService.selectYear(date);
    this.switchMonthYearSelector();
  }
}
