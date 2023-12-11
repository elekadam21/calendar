import { Injectable } from "@angular/core";
import { CalendarDay } from "../interfaces/calendar.interface";
import { CalendarSourceService } from "./calendar-source.service";
import { Match } from "../interfaces/match.interface";
import { Observable, Observer, map, of } from "rxjs";

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
    this.allocateMatches();

    if (!this.selectedDay) {
      const today = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())
      this.selectDay(today);
    }
  }

  private allocateMatches() {
    if (this.allMatches.length === 0) {
      this.calendarSourceService.getMatches().subscribe((res) => {
        res?.data.forEach(match => {
          this.allMatches.push(match);
          const matchDay = this.calendar.find((day) => day.dateStr === match.dateVenue);
  
          if (matchDay) {
            matchDay.matches.push(match);
            matchDay.hasEvent = true;
          }
        });
      });
    } else {
      this.allMatches.forEach(match => {
        const matchDay = this.calendar.find((day) => day.dateStr === match.dateVenue);

        if (matchDay) {
          matchDay.matches.push(match);
          matchDay.hasEvent = true;
        }
      });
    }
  }

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

  public selectDate(date: Date) {
    this.selectedDate = date;
    this.selectDay(date);
  }

  private selectDay(date: Date) {
    const day = this.calendar.find((day) => (
      (day.date.getFullYear() === date.getFullYear()) &&
      (day.date.getMonth() === date.getMonth()) &&
      (day.date.getDate() === date.getDate())))

    if (day) {
      this.selectedDay = day;
          }
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

  getMatchById(id: string): Observable<Match> {
    // how it should work with a backend
    // return this.calendarSourceService.getMatches().pipe(
    //   map((res) => {
    //     const match = res?.data.find((match) => match.matchId === id);
    //     return match!;
    //   })
    // );  
    const match = this.allMatches.find((match)=> match.matchId === id)  
    return of(match!);
  }

  generateMatchId() {
    return this.calendarSourceService.getMatches().pipe(
      map((res) => {
        let newId: string;
        const ids: number[] = [];
        res.data.map((match) => ids.push(parseInt(match.matchId)))
        ids.sort().reverse();
        if (ids.length) {
          newId = (ids[0] + 1).toString();
        } else {
          newId = '1';
        }

        return newId;
      })
    );
  }

  addNewMatch(match: Match) {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.generateMatchId().subscribe((id) => {
        match.matchId = id;
        this.allMatches.push(match);
        this.calendar.forEach((day) => {
          if (day.dateStr === match.dateVenue) {
            day.matches.push(match);
            day.hasEvent = true;            
          }
        });
        observer.next(true);
      });
    });
  }
}