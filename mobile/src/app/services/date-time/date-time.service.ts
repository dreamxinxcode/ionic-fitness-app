import { Injectable } from '@angular/core';
import { format, formatDistance, parse, differenceInYears } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  public formatDate(date):string {
    return new Date(date).toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric" });
  }

  public timestampFormat(date): string {
    return format(new Date(date), 'MMMM dd, yyyy hh:mm a');
  }

  public formatDistance(date): string {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  }

  public getAge(birthdate: string): number {
    const birthdateObj = new Date(birthdate);
    const today = new Date();
  
    // Calculate the difference in years
    let age = today.getFullYear() - birthdateObj.getFullYear();
  
    // Check if the birthday hasn't occurred yet this year
    const hasBirthdayPassed = today.getMonth() > birthdateObj.getMonth() ||
      (today.getMonth() === birthdateObj.getMonth() && today.getDate() >= birthdateObj.getDate());
  
    // Subtract 1 from the age if the birthday hasn't occurred yet
    if (!hasBirthdayPassed) {
      age--;
    }
  
    return age;
  }
}
