import { NgModule } from "@angular/core";
import { calendarRoutes } from "./calendar.routes";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
      RouterModule.forChild(calendarRoutes),
    ],
    declarations: [
      CalendarComponent,
    ],
  })
  export class CalendarModule { }