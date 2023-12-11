import { NgModule } from "@angular/core";
import { calendarRoutes } from "./calendar.routes";
import { CalendarComponent } from "./components/calendar/calendar.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { MatchCardComponent } from "./components/match-card/match-card.component";
import { MatchDetailComponent } from "./components/match-detail/match-detail.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NewMatchComponent } from "./components/new-match/new-match.component";
import { UiKitModule } from "../uikit/uikit.module";

@NgModule({
  imports: [
    UiKitModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(calendarRoutes),
  ],
  declarations: [
    CalendarComponent,
    MatchCardComponent,
    MatchDetailComponent,
    NewMatchComponent,
  ],
})
export class CalendarModule { }