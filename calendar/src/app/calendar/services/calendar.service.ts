import { Injectable } from "@angular/core";
import { CalendarDay } from "../interfaces/calendar.interface";

export enum CalendarView {
  NORMAL,
  MONTH_SELECT,
  YEAR_SELECT
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  weekdaysStr: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  weekdays: Date[] = [];
  months: Date[] = [];
  years: Date[] = [];
  elementCount = 16;

  calendar: CalendarDay[] = [];
  today: Date = new Date();
  selectedDate: Date = new Date();
  selectedYear: Date = this.today;
  displayedDate: Date = this.today;

  constructor() {
    this.getWeekdays();
  }

  private getWeekdays() {
    this.weekdays = this.weekdaysStr.map(day => {
      const date = new Date();
      date.setDate(date.getDate() + (this.weekdaysStr.indexOf(day) + 1 - date.getDay() + 7) % 7);
      return date;
    })

  }

  public getMonths(date: Date, limit: number = this.elementCount) {
    this.months = [];
    for (let i = 0; i < limit; i++) {
      const newDate = new Date(date.getFullYear(), i, 1);
      this.months.push(newDate);
    }
    this.displayedDate = new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private getYears(date: Date, limit: number = this.elementCount) {
    const year = date.getFullYear();

    if ((this.years.length === 0) || (this.years[0].getFullYear() === year) || (this.years[this.years.length - 1].getFullYear() === year)) {
      this.years = [];

      for (let i = 4; i >= 0; i--) {
        const date = new Date(year - i, 0, 1);
        this.years.push(date);
      }

      for (let i = 1; i < (limit - 4); i++) {
        const date = new Date(year + i, 0, 1);
        this.years.push(date);
      }
    }
  }

  public populateCalendar(date: Date) {
    this.calendar = [];

    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month, daysInMonth).getDay();

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
    this.getMonths(date);
    this.getYears(date);
  }

  private createCalendarDay(date: Date, currentMonth: boolean): CalendarDay {
    return {
      date: date,
      dateStr: `${date.getFullYear()}-${(date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '')}${date.getDate()}`,
      dateShort: date.getDate(),
      day: date.getDay(),
      hasEvent: false,
      currentMonth,
    };
  }

  public selectDate(date: Date) {
    this.selectedDate = date;
  }

  public selectDateByString(date: string) {
    this.selectedDate = this.formatStringToDate(date);
  }

  public changeDate(date: Date) {
    if (this.isCurrentMonth(date)) {
      this.populateCalendar(this.today);
      this.selectDate(this.today);
      this.displayedDate = this.today;
    } else {
      this.populateCalendar(date);
      this.displayedDate = date;
    }
  }

  public selectYear(date: Date) {
    this.selectedYear = date;
    this.getMonths(date);
    this.displayedDate = new Date(date);
  }

  private isCurrentMonth(date: Date) {
    return (date.getFullYear() === this.today.getFullYear()) && (date.getMonth() === this.today.getMonth())
  }

  public formatDateToString(date: Date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '')}${date.getDate()}`;
  }

  public formatStringToDate(date: string) {
    return new Date(date);
  }
}