import { Match } from "./match.interface";

export interface CalendarDay {
  date: Date,
  dateStr: string,
  dateShort: number,
  day: number,
  hasEvent: boolean,
  currentMonth: boolean,
  matches: Match[],
}