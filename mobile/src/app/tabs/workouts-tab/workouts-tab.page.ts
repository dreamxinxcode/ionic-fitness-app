import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { WorkoutsService } from '../../services/workouts/workouts.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-workouts-tab',
  templateUrl: './workouts-tab.page.html',
  styleUrls: ['./workouts-tab.page.scss'],
})
export class WorkoutsTabPage implements OnInit {
  date:any = this.dateTimeService.formatDate(new Date());
  workouts:any;
  loading: boolean = true;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dateTimeService: DateTimeService,
    private workoutsService: WorkoutsService
  ) { }

  ngOnInit() {
    this.api.get('workouts').subscribe({
      next: (res) => {
        this.workouts = res;
      },
      error: (err) => {
        this.toast.render(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.workoutsService.syncWorkouts().subscribe((res) => {
        this.workouts = res;
      });
      event.target.complete();
      this.loading = true;
    }, 2000);
  }

  public onDelete(index: number, id):void {
    this.api.delete(`workouts/${id}`).subscribe((res) => {
      this.workouts.splice(index, 1);
    });
  }
}
