import { Component, Input } from "@angular/core";
import { Match } from "../../interfaces/match.interface";

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss'],
})
export class MatchCardComponent {
  @Input() match: Match;
}