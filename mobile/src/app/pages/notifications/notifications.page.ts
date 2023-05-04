import { Component, OnInit } from '@angular/core';
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

  constructor(
    private api: ApiService,
    private toast: ToastService,
    public dateTimeService: DateTimeService,
  ) { }

  ngOnInit() {
    this.api.get('notifications').subscribe({
      next: (res) => {
        this.notifications = res;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

}
