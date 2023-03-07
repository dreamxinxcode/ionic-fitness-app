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
  date:any = this.dateTimeService.formatDate(new Date());
  workouts:any;
  loaded = false;

  constructor(
    private http: HttpClient,
    private dateTimeService: DateTimeService,
    private workoutsService: WorkoutsService
  ) { }

  ngOnInit() {
    this.http.get('http://localhost:8000/api/workouts/').subscribe((res) => {
      this.workouts = res;
      this.loaded = true;
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.workoutsService.syncWorkouts().subscribe((res) => {
        this.workouts = res;
      });
      event.target.complete();
      this.loaded = true;
    }, 2000);
  }

  public onDelete(index: number, id):void {
    this.http.delete(`http://localhost:8000/api/workouts/${id}/`).subscribe((res) => {
      this.workouts.splice(index, 1);
    });
  }
}
