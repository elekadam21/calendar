import { Component, Input } from "@angular/core";

@Component({
  selector: 'nav-button',
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.scss'],
})
export class NavigationButtonComponent {

  @Input() direction: string = 'left';
}