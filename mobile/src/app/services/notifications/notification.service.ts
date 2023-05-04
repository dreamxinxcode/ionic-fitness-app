import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = [];

  constructor(
    private api: ApiService,
  ) { }

  

  get count(): string | number | null {
    if (!this.notifications.length) {
      return null;
    }
    if (this.notifications.length > 9) {
      return '9+';
    }
    return this.notifications.length;
  }
}
