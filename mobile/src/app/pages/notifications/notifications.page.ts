import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  loading: boolean = true;
  notifications = [];
  page: number = 1;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    public dateTimeService: DateTimeService,
  ) { }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.api.get('notifications', { params: { page: this.page.toString() } }).subscribe({
      next: (res) => {
        this.notifications = [...this.notifications, ...res.results];
        this.page++;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onIonInfinite(ev) {
    this.loadNotifications();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
