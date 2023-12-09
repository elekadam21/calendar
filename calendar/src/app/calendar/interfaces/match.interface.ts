export interface Team {
  name: string;
  officialName: string;
  slug: string;
  abbreviation: string;
  teamCountryCode: string;
  stagePosition: null | unknown;
}

export interface Result {
  homeGoals: number;
  awayGoals: number;
  winner: string;
  message: string;
  goals: unknown[];
  yellowCards: unknown[];
  secondYellowCards: unknown[];
  directRedCards: unknown[];
  winnerId?: null | unknown;
  scoreByPeriods: null | unknown;
}

export interface Stage {
  id: string;
  name: string;
  ordering: number;
}

export interface Match {
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: string;
  stadium: string;
  homeTeam: Team | null;
  awayTeam: Team | null;
  result: Result | null;
  stage: Stage;
  group: string;
  originCompetitionId: string;
  originCompetitionName: string;
  matchId: string;
}