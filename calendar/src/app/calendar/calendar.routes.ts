import { Route } from "@angular/router";
import { CalendarEventsComponent } from "./components/calendar-events/calendar-events.component";

export const calendarRoutes: Route[] = [
  {
    path: '',
    component: CalendarEventsComponent,
  },
]