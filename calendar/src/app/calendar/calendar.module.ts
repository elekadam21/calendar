import { NgModule } from "@angular/core";
import { calendarRoutes } from "./calendar.routes";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { CalendarEventsComponent } from "./components/calendar-events/calendar-events.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(calendarRoutes),
  ],
  declarations: [
    CalendarComponent,
    CalendarEventsComponent
  ],
})
export class CalendarModule { }