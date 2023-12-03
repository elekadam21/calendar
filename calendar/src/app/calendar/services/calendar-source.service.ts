import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../interfaces/match.interface';

@Injectable({
  providedIn: 'root',
})
export class CalendarSourceService {
  constructor(
    private http: HttpClient
  ) { }

  dataUrl = 'assets/sportData.json';

  getMatches() {
    return this.http.get<{ data: Match[] }>(this.dataUrl);
  }
}