import { Route } from "@angular/router";
import { CalendarComponent } from "./components/calendar/calendar.component";

export const calendarRoutes: Route[] = [
    {
        path: '',
        component: CalendarComponent,
    },
]