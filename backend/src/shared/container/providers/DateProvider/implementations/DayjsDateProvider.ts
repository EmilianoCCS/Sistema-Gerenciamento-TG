import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { isAfter, addHours } from "date-fns";

import { IDateProvider } from "@shared/container/providers/DateProvider/models/IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  compareInHours(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate);
    const startDateUtc = this.convertToUTC(startDate);

    return dayjs(endDateUtc).diff(startDateUtc, "hours");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  dateNow(): Date {
    return dayjs().toDate();
  }

  compareInDays(startDate: Date, endDate: Date): number {
    const endDateUtc = this.convertToUTC(endDate);
    const startDateUtc = this.convertToUTC(startDate);

    return dayjs(endDateUtc).diff(startDateUtc, "days");
  }

  addDays(days: number): Date {
    return dayjs().add(days, "days").toDate();
  }

  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }

  addMinutes(minutes: number): Date {
    return dayjs().add(minutes, "minute").toDate();
  }

  compareIfBefore(startDate: Date, endDate: Date): boolean {
    return dayjs(startDate).isBefore(endDate);
  }

  isAfter(timestamp: number, dateToCompare: Date): boolean {
    return isAfter(timestamp, dateToCompare);
  }

  compareData(date: Date, hours: number): Date {
    return addHours(date, hours);
  }
}
