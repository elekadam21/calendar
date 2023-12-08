import { Route } from "@angular/router";
import { MatchDetailComponent } from "./components/match-detail/match-detail.component";
import { CalendarComponent } from "./components/calendar/calendar.component";

export const calendarRoutes: Route[] = [
  { path: '', component: CalendarComponent },
  { path: 'match-detail/:id', component: MatchDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]