import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: [
    './user.page.scss',
    '../profile-tab.page.scss',
  ],
})
export class UserPage implements OnInit {

  user;
  loading: boolean = true;
  loadingMoments: boolean = true;
  moments = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private api: ApiService,
    private config: ConfigService,
    private toast: ToastService,
    public dateTimeService: DateTimeService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get(this.config.BASE_URL + `/users/users/${params['id']}/`).subscribe({
        next: (res) => {
          this.user = res;
          this.api.get('moments/by_user/' + this.user?.id).subscribe({
            next: (res) => {
              this.moments = res;
            },
            error: (err) => {
              this.toast.render(err.statusText, 'danger', 'alert');
            },
            complete: () => {
              this.loadingMoments = false;
            },
          });
        },
        error: (err) => {
          this.toast.render(err.statusText, 'danger', 'alert');
        },
        complete: () => {
          this.loading = false;
        },
      });
    });
  }

}
