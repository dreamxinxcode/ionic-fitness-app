import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-moments-feed',
  templateUrl: './moments-feed.component.html',
  styleUrls: ['./moments-feed.component.scss'],
})
export class MomentsFeedComponent implements OnInit {

  @Input() moments = [];

  constructor(
    private api: ApiService,
    public config: ConfigService,
    private toast: ToastService,
    public userService: UserService,
    public dateTimeService: DateTimeService,
  ) { }

  ngOnInit() { }

  deleteMoment(index: number, id: number) {
    this.api.delete(`moments/${id}`).subscribe({
      next: (res) => {
        this.moments.splice(index, 1);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      }
    });
  }
}
