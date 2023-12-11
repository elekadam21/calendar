import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CalendarService } from "../../services/calendar.service";
import { Match } from "../../interfaces/match.interface";

@Component({
    selector: 'match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss'],
  })
  export class MatchDetailComponent {
    match: Match;

    constructor(
        private route: ActivatedRoute,
        private calendarService: CalendarService
        ) {}

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id')!;

        this.calendarService.getMatchById(id).subscribe((match)=> {
            this.match = match;
        });     
    }
  }