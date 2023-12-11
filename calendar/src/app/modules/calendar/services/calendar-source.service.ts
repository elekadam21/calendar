import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match } from '../interfaces/match.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarSourceService {
  constructor(
    private http: HttpClient
  ) { }

  dataUrl = 'assets/sportData.json';

  public getMatches(): Observable<{ data: Match[] }> {
    return this.http.get<{ data: Match[] }>(this.dataUrl);
  }
}