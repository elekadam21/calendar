import { NgModule } from "@angular/core";
import { calendarRoutes } from "./calendar.routes";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FloatButtonComponent } from "./components/float-button/float-button.component";
import { MatchCardComponent } from "./components/match-card/match-card.component";
import { CalendarIconComponent } from "./components/calendar-icon/calendar-icon.component";
import { MatchDetailComponent } from "./components/match-detail/match-detail.component";
import { UtcToLocalPipe } from "../pipes/utc-to-local.pipe";
import { NavigationButtonComponent } from "./components/nav-button/nav-button.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NewMatchComponent } from "./components/new-match/new-match.component";
import { SaveButtonComponent } from "./components/save-button/save-button.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(calendarRoutes),
  ],
  declarations: [
    CalendarComponent,
    FloatButtonComponent,
    MatchCardComponent,
    CalendarIconComponent,
    MatchDetailComponent,
    UtcToLocalPipe,
    NavigationButtonComponent,
    NewMatchComponent,
    SaveButtonComponent,
  ],
})
export class CalendarModule { }