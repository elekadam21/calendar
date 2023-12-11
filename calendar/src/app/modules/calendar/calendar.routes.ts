import { Route } from "@angular/router";
import { MatchDetailComponent } from "./components/match-detail/match-detail.component";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { NewMatchComponent } from "./components/new-match/new-match.component";

export const calendarRoutes: Route[] = [
  { path: '', component: CalendarComponent },
  { path: 'match-detail/:id', component: MatchDetailComponent },
  { path: 'new-match', component: NewMatchComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
]