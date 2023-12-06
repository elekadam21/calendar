import { Route } from "@angular/router";
import { CalendarEventsComponent } from "./components/calendar-events/calendar-events.component";
import { MatchDetailComponent } from "./components/match-detail/match-detail.component";

export const calendarRoutes: Route[] = [
  { path: '', component: CalendarEventsComponent },
  { path: 'match-detail/:id', component: MatchDetailComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, 
]