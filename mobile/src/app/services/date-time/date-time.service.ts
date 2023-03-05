import { Injectable } from '@angular/core';
import { formatDistance, parse, differenceInYears } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  public formatDate(date):string {
    return new Date(date).toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric" });
  }

  public formatDistance(date): string {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  }

  public formatAge(date): number {
    const parcedDate = parse(date, "dd/MM/yyyy", new Date());
    const age = differenceInYears(new Date(), parcedDate);
    return age;
  }
}
