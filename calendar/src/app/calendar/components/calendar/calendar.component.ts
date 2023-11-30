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
        this.view = CalendarView.MONTH_SELECT;
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
        return item.getFullYear() === this.calendarService.displayedDate.getFullYear();
      default:
        console.error("Invalid type");
        return false;
    }
  }

  public selectMonth(date: Date) {
    const newDate = new Date(this.calendarService.selectedYear.getFullYear(), date.getMonth(), 1)
    this.calendarService.changeDate(newDate);
    this.view = CalendarView.NORMAL;
  }

  public selectYear(date: Date) {
    this.calendarService.selectYear(date);
    this.view = CalendarView.MONTH_SELECT;
  }

  public nextOrPrev(num: number) {
    switch (this.view) {
      case CalendarView.NORMAL:
        const normalDate = new Date(this.calendarService.displayedDate.getFullYear(), this.calendarService.displayedDate.getMonth() + num, 1);
        this.calendarService.changeDate(normalDate);
        break;
      case CalendarView.MONTH_SELECT:
        const monthDate = new Date(this.calendarService.displayedDate.getFullYear() + num, this.calendarService.displayedDate.getMonth(), 1);
        this.calendarService.getMonths(monthDate);
        break;
      case CalendarView.YEAR_SELECT:
        const yearDate = new Date(this.calendarService.displayedDate.getFullYear() + num, this.calendarService.displayedDate.getMonth(), 1);
        this.calendarService.changeDate(yearDate);
        break;
      default:
        console.log("error");
        break;
    }
  }
}
