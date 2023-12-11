import { ChangeDetectorRef, Component } from "@angular/core";
import { Router } from "@angular/router";
import { CalendarService } from "../../services/calendar.service";
import { Match, Result, Stage, Team } from "../../interfaces/match.interface";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'new-match',
  templateUrl: './new-match.component.html',
  styleUrls: ['./new-match.component.scss'],
})
export class NewMatchComponent {
  matchForm: FormGroup;
  isPlayed: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private calendarService: CalendarService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isPlayed = (this.calendarService.selectedDate < this.calendarService.today)

    this.matchForm = this.formBuilder.group({
      season: this.calendarService.selectedDate.getFullYear(),
      status: this.isPlayed ? 'played' : 'scheduled',
      timeVenueUTC: ['', Validators.required],
      dateVenue: this.calendarService.formatDateToString(this.calendarService.selectedDate),
      stadium: '',
      homeTeam: this.formBuilder.group({
        name: ['', Validators.required],
        officialName: '',
        slug: '',
        abbreviation: '',
        teamCountryCode: '',
        stagePosition: null,
      }),
      awayTeam: this.formBuilder.group({
        name: ['', Validators.required],
        officialName: '',
        slug: '',
        abbreviation: '',
        teamCountryCode: '',
        stagePosition: null,
      }),
      result: this.formBuilder.group({
        homeGoals: ['', [Validators.pattern("^[0-9]*$")]],
        awayGoals: ['', [Validators.pattern("^[0-9]*$")]],
        winner: '',
        message: '',
        goals: [],
        yellowCards: [],
        secondYellowCards: [],
        directRedCards: [],
        winnerId: null,
        scoreByPeriods: null,
      }),
      stage: this.formBuilder.group({
        id: '',
        name: '',
        ordering: 0,
      }),
      group: '',
      originCompetitionId: '',
      originCompetitionName: '',
      matchId: '',
    });
  }

  public save() {
    if (this.matchForm.valid) {
      this.calendarService.addNewMatch(this.matchForm.value).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          console.error('Error: ', error);
        },
      });
    }

  }
}