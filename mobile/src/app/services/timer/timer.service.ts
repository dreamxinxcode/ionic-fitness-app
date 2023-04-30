import { Injectable } from '@angular/core';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  counting = false;
  elapsedTimeMS = 0;
  formatString = 'HH:mm:ss.SS';
  elapsedTime = '00:00:00.00';
  startTimestamp;

  constructor() { }

  start() {
    this.counting = true;
    this.startTimestamp = this.elapsedTimeMS || Date.now();
    const interval = setInterval(() => {
      this.elapsedTimeMS = Date.now() - this.startTimestamp;
      this.elapsedTime = format(this.elapsedTimeMS, this.formatString);
      if (!this.counting) {
        clearInterval(interval);
      }
    }, 100);
  }

  pause() {
    this.counting = false;
  }

  reset() {
    this.counting = false;
    this.elapsedTimeMS = 0;
    this.elapsedTime = format(this.elapsedTimeMS, this.formatString);
  }
}
