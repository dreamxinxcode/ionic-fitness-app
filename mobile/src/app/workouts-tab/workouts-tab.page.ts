import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateTimeService } from '../services/date-time/date-time.service';
import { WorkoutsService } from '../services/workouts/workouts.service';

@Component({
  selector: 'app-workouts-tab',
  templateUrl: './workouts-tab.page.html',
  styleUrls: ['./workouts-tab.page.scss'],
})
export class WorkoutsTabPage implements OnInit {
  public date:any = this.dateTimeService.formatDate(new Date());
  public workouts:any;

  constructor(
    private http: HttpClient,
    private dateTimeService: DateTimeService,
    private workoutsService: WorkoutsService,
  ) { }

  ngOnInit() {
    this.workoutsService.syncWorkouts().subscribe((res) => {
      this.workouts = res;
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.workoutsService.syncWorkouts().subscribe((res) => {
        this.workouts = res;
      });
      event.target.complete();
    }, 2000);
  };

  public onDelete(index: number, id):void {
    this.http.delete(`http://localhost:8000/api/workouts/${id}/`).subscribe((res) => {
      this.workouts.splice(index, 1);
    });
  }
}
