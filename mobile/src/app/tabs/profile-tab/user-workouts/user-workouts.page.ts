import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-workouts',
  templateUrl: './user-workouts.page.html',
  styleUrls: ['./user-workouts.page.scss'],
})
export class UserWorkoutsPage implements OnInit {

  loading: boolean = false;
  workouts = [];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private toast: ToastService,
    public userService: UserService,
    public dateTimeService: DateTimeService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      const id = res.get('id');
      this.api.get('workouts/for_user/' + `${id}`).subscribe({
        next: (res) => {
          this.workouts = res;
        },
        error: (err) => {
          this.toast.render(err.statusText, 'danger', 'alert');
        },
        complete: () => {
          this.loading = false;
        },
      });
    })
  }

}
