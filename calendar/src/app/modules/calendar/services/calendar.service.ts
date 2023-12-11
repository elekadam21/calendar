import { Injectable } from "@angular/core";
import { CalendarDay } from "../interfaces/calendar.interface";
import { CalendarSourceService } from "./calendar-source.service";
import { Match } from "../interfaces/match.interface";
import { Observable, of, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  weekdaysStr: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  weekdays: Date[] = [];
  months: Date[] = [];
  years: Date[] = [];
  elementCount = 16; // the total number of cells in the calendar

  calendar: CalendarDay[] = [];
  allMatches: Match[] = [];

  today: Date = new Date();
  selectedDate: Date = new Date();
  selectedDay: CalendarDay;
  selectedYear: Date = this.today;
  displayedDate: Date = this.today;

  constructor(
    private calendarSourceService: CalendarSourceService
  ) {
    this.getWeekdays();
  }

  /** Pushes the days of the week to an array in Date format, so they can be converted to local formats. */
  private getWeekdays(): void {
    this.weekdays = this.weekdaysStr.map(day => {
      const date = new Date();
      date.setDate(date.getDate() + (this.weekdaysStr.indexOf(day) + 1 - date.getDay() + 7) % 7);
      return date;
    })
  }

  /** Pushes the months of the year to an array in Date format, so they can be converted to local formats.
   *  If the limit is bigger than the number of months in a year, it starts from January again. */
  private getMonths(date: Date, limit: number = this.elementCount): void {
    this.months = [];
    for (let i = 0; i < limit; i++) {
      const newDate = new Date(date.getFullYear(), i, 1);
      this.months.push(newDate);
    }
  }

  /** Pushes the years before and after the selected date to an array in Date format. 
   *  The conditions are necessary so it only runs if the user reaches one of the ends of the shown spectrum. */
  private getYears(date: Date, limit: number = this.elementCount): void {
    const year = date.getFullYear();

    if ((this.years.length === 0) || (this.years[0].getFullYear() === year) || (this.years[this.years.length - 1].getFullYear() === year)) {
      this.years = [];

      for (let i = 0; i < limit; i++) {
        const newYear = year - 4 + i;
        const newDate = new Date(newYear, 0, 1);
        this.years.push(newDate);
      }
    }
  }

  /** Populates the calendar around the selected date with 35 days and allocates the matches to the days. */
  public populateCalendar(date: Date): void {
    this.calendar = [];

    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month, daysInMonth).getDay();

    // Add days from the month previous to the selected of needed
    this.addDaysToCalendar(2 - firstDay, 0, false, year, month)

    // Add days from the selected month
    this.addDaysToCalendar(1, daysInMonth, true, year, month);

    // Add days from the month after if needed
    const daysToAdd = lastDay !== 0 ? 7 - lastDay : 0;
    this.addDaysToCalendar(1, daysToAdd, false, year, month + 1);

    // Handle the case when the calendar has 28 days
    if (this.calendar.length === 28) {
      this.addDaysToCalendar(1, 7, false, year, month + 1);
    }

    this.getMonths(date);
    this.getYears(date);
    this.allocateMatches();

    // Selects the current date on first load
    if (!this.selectedDay) {
      const today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())
      this.selectDay(today);
    }
  }

  /** Pushes days to the calendar. */
  private addDaysToCalendar(start: number, end: number, isCurrentMonth: boolean, year: number, month: number): void {
    for (let i = start; i <= end; i++) {
      const currentDate = new Date(year, month, i);
      this.calendar.push(this.createCalendarDay(currentDate, isCurrentMonth));
    }
  }

  /** Creates a calendar day for the calendar. */
  private createCalendarDay(date: Date, currentMonth: boolean): CalendarDay {
    return {
      date: date,
      dateStr: `${date.getFullYear()}-${(date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '')}${date.getDate()}`,
      dateShort: date.getDate(),
      day: date.getDay(),
      hasEvent: false,
      currentMonth,
      matches: [],
    };
  }

  /** Allocates matches to their days. Due to having no backend this function has a workaround for new matches. */
  private allocateMatches(): void {
    if (this.allMatches.length === 0) {
      this.calendarSourceService.getMatches().subscribe((res) => {
        res?.data.forEach(match => {
          this.allMatches.push(match);
          this.processMatch(match);
        });
      });
    } else {
      this.allMatches.forEach(match => {
        this.processMatch(match);
      });
    }
  }

  /** Processes a match to its day and changes the hasEvent property to true. */
  private processMatch(match: Match): void {
    const matchDay = this.calendar.find(day => day.dateStr === match.dateVenue);

    if (matchDay) {
      matchDay.matches.push(match);
      matchDay.hasEvent = true;
    }
  }

  /** Sets selectedDate and sets up the selected CalendarDay. */
  public selectDate(date: Date): void {
    this.selectedDate = date;
    this.selectDay(date);
  }

  /** Looks up and sets the selected CalendarDay. */
  private selectDay(date: Date): void {
    const day = this.calendar.find((day) => (
      (day.date.getFullYear() === date.getFullYear()) &&
      (day.date.getMonth() === date.getMonth()) &&
      (day.date.getDate() === date.getDate())))

    this.selectedDay = day!;
  }

  /** Loads the new dates to the calendar. If the change is to the current month, it selects the current day. */
  public changeDate(date: Date): void {
    if (this.isCurrentMonth(date)) {
      this.populateCalendar(this.today);
      this.selectDate(this.today);
      this.displayedDate = this.today;
    } else {
      this.populateCalendar(date);
      this.displayedDate = date;
    }
  }

  /** Sets the selected year and loads the new months. */
  public selectYear(date: Date): void {
    this.selectedYear = date;
    this.getMonths(date);
    this.displayedDate = new Date(date);
  }

  /** Returns true if the given month is the current month. */
  private isCurrentMonth(date: Date): boolean {
    return (date.getFullYear() === this.today.getFullYear()) && (date.getMonth() === this.today.getMonth())
  }

  /** Formats a Date type to 'YYYY-MM-DD' string format. */
  public formatDateToString(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '')}${date.getDate()}`;
  }

  /** Returns the right match with the given id. It is an Observable due to how I originally tried to replicate a backend. */
  public getMatchById(id: string): Observable<Match> {
    // How it should work with a backend
    // return this.calendarSourceService.getMatches().pipe(
    //   map((res) => {
    //     const match = res?.data.find((match) => match.matchId === id);
    //     return match!;
    //   })
    // );  
    const match = this.allMatches.find((match) => match.matchId === id)
    return of(match!);
  }

  /** Generates a new id that will not conflict with existing ids. It is an Observable due to how I originally tried to replicate a backend.*/
  private generateMatchId(): Observable<string> {
    // How it should work with a backend
    // return this.calendarSourceService.getMatches().pipe(
    //   map((res) => {
    //     const ids = res.data.map(match => parseInt(match.matchId));
    //     const newId = ids.length ? (Math.max(...ids) + 1).toString() : '1';
    //     return newId;
    //   })
    // );
    const ids = this.allMatches.map(match => parseInt(match.matchId));
    const newId = ids.length ? (Math.max(...ids) + 1).toString() : '1';
    return of(newId);
  }

  /** Adds new match to the calendar. */
  public addNewMatch(match: Match): Observable<boolean> {
    return this.generateMatchId().pipe(
      switchMap(id => {
        match.matchId = id;
        this.allMatches.push(match);

        this.selectedDay.matches.push(match);
        this.selectedDay.hasEvent = true;

        return of(true);
      })
    );
  }
}