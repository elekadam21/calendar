import { FloatButtonComponent } from "./components/float-button/float-button.component";
import { CalendarIconComponent } from "./components/calendar-icon/calendar-icon.component";
import { UtcToLocalPipe } from "../../pipes/utc-to-local.pipe";
import { NavigationButtonComponent } from "./components/nav-button/nav-button.component";
import { SaveButtonComponent } from "./components/save-button/save-button.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

const components = [
  FloatButtonComponent,
  CalendarIconComponent,
  UtcToLocalPipe,
  NavigationButtonComponent,
  SaveButtonComponent,
]

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: components,
  exports: components,
})
export class UiKitModule { }