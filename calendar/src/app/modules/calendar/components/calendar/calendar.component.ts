import { ChangeDetectorRef, Component } from '@angular/core';
import { CalendarDay } from '../../interfaces/calendar.interface';
import { CalendarService, CalendarView } from '../../services/calendar.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  CalendarView = CalendarView;
  view: CalendarView = CalendarView.NORMAL;
  wordSize: "long" | "short" | "narrow" | undefined = "short";
  isCalendarCollapsed = false;

  constructor(
    public calendarService: CalendarService,
    private deviceService: DeviceService,
  ) { }

  ngOnInit() {
    this.calendarService.populateCalendar(this.calendarService.selectedDate);

    if (this.deviceService.screenWidth < 750) {
      this.wordSize = "short";
    } else {
      this.wordSize = "long";
    }

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
    this.openCalendar();
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

  public openCalendar() {
    this.isCalendarCollapsed = false;
  }

  public selectDate(day: CalendarDay) {
    this.calendarService.selectDate(day.date);
    if (day.matches.length) {
      this.isCalendarCollapsed = true;
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
    this.openCalendar();
  }
}
