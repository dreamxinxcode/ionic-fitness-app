import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {

  constructor() { }

  public formatDate(date):string {
    return new Date(date).toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
  }
}
