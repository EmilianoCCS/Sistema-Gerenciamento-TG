export interface IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  compareInDays(startDate: Date, endDate: Date): number;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  addMinutes(minutes: number): Date;
  compareIfBefore(startDate: Date, endDate: Date): boolean;
  isAfter(timestamp: number, dateToCompare: Date): boolean;
  compareData(date: Date, hours: number): Date;
}
