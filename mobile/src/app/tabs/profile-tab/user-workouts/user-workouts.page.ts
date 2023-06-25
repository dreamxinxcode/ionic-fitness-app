import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { UserService } from 'src/app/services/user/user.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { WorkoutsService } from 'src/app/services/workouts/workouts.service';

@Component({
  selector: 'app-user-workouts',
  templateUrl: './user-workouts.page.html',
  styleUrls: ['./user-workouts.page.scss'],
})
export class UserWorkoutsPage implements OnInit {

  private loading: boolean = false;
  private workouts = [];
  private user;

  constructor(
    private route: ActivatedRoute,
    private toast: ToastService,
    private userService: UserService,
    private workoutService: WorkoutsService,
    private dateTimeService: DateTimeService, // Used in template
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((res) => {
      const id = Number(res.get('id'));

      this.userService.getUserByID(id).subscribe({
        next: (res) => {
          this.user = res;
        },
        error: (err) => {
          this.toast.render(err.statusText, 'danger', 'alert');
        }
      });

      this.workoutService.workoutsForUser(id).subscribe({
        next: (res) => {
          this.workouts = [...this.workouts, ...res.results];
        },
        error: (err) => {
          this.toast.render(err.statusText, 'danger', 'alert');
        }
      });
    });
  }

}
