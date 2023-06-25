import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  loading: boolean = true;
  page: number = 1;
  infinateScroll: boolean = true;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private config: ConfigService,
    public dateTimeService: DateTimeService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.api.get('notifications', { params: { page: this.page.toString() } }).subscribe({
      next: (res) => {
        this.notificationService.notifications = [...this.notificationService.notifications, ...res.results];
        this.page++;

        if (!res.next) {
          this.infinateScroll = false;
        }
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onIonInfinite(event) {
    this.loadNotifications();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
