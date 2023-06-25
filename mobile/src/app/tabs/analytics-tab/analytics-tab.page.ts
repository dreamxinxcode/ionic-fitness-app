import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-analytics-tab',
  templateUrl: './analytics-tab.page.html',
  styleUrls: ['./analytics-tab.page.scss'],
})
export class AnalyticsTabPage implements OnInit {
  private barChart: any;
  private pieChart: any;

  private exercisesDone = [];
  private exerciseSelect = new FormControl('');

  private prExercise: string;
  private prWeight: number;
  private prReps: number;

  private mostFrequent: any[] = [];

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private datetimeService: DateTimeService,
    private userService: UserService, // Used in template
  ) { }

  ngOnInit() {
    Chart.register(...registerables);
    this.getExercisesDone();
    this.getMostFrequentExercises();
  }

  getExercisesDone() {
    this.api.get('analytics/exercises_done').subscribe({
      next: (res) => {
        this.exercisesDone = res;
        this.exerciseSelect.setValue(this.exercisesDone[0]);
        this.prByExercise(this.exercisesDone[0].name);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }

  getMostFrequentExercises() {
    this.api.get('analytics/most_frequent').subscribe({
      next: (res) => {
        this.mostFrequent = res;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }

  handleExerciseChange(event) {
    const exercise = event.detail.value;
    this.prByExercise(exercise.name);
  }

  prByExercise(exercise: string) {
    this.api.get('analytics/get_prs', { params: { exercise: exercise } }).subscribe({
      next: (res) => {
        this.prExercise = exercise;
        this.prWeight = res.pr_weight;
        this.prReps = res.pr_reps;
        this.getSets(exercise);       
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }

  getSets(exercise: string) {
    this.api.get('analytics/sets', { params: { exercise: exercise } }).subscribe({
      next: (res) => {
        const timestamps = res.map((item) => this.datetimeService.timestampFormat(item.timestamp));
        const weights = res.map((item) => item.weight);
        const reps = res.map((item) => item.reps);
        this.barChart?.destroy(); // Destroy existing chart
        this.barChart = new Chart("MyBarChart", {
          type: 'bar',    
          data: {
            labels: timestamps, 
             datasets: [
              {
                label: "Weight",
                data: weights,
                backgroundColor: '#D4192C'
              },
              {
                label: "Repetitions",
                data: reps,
                backgroundColor: '#000000',
              }  
            ]
          },
          options: {
            aspectRatio:2.5
          }
          
        });
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }

  createPieChart(){
    this.pieChart = new Chart("MyPieChart", {
      type: 'pie',
      data: {
        labels: ['Chest', 'Back', 'Core', 'Arms', 'Legs'],
        datasets: [{
          data: [12, 19, 3, 5, 2],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
