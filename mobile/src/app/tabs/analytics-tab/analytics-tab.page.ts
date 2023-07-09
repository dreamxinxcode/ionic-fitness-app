import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart, registerables, Filler, FillTarget } from 'chart.js';
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
  private lineChart: any;
  private showLineChart: boolean = true;

  private barChart: any;
  private showBarChart: boolean;

  private pieChart: any;

  private exercisesDone = [];
  private exerciseSelect = new FormControl('');

  private sets: any;

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
    // Return if user hasn't completed any workouts
    if (!this.userService.user?.profile.workouts_count) {
      return
    }
    
    Chart.register(...registerables);
    Chart.register(Filler);
    this.getExercisesDone();
    this.getMostFrequentExercises();
  }

  getExercisesDone() {
    this.api.get('analytics/exercises_done').subscribe({
      next: (res) => {
        this.exercisesDone = res;
        this.exerciseSelect.setValue(this.exercisesDone[0]);
        this.getSets(this.exercisesDone[0]);
        this.getPRByExercise(this.exercisesDone[0].name);
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
    this.getPRByExercise(exercise.name);
  }

  getPRByExercise(exercise: string) {
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
        this.sets = {
          timestamps: res.map((item) => new Date(item.timestamp).toISOString().slice(0, 10)),
          weights: res.map((item) => item.weight),
          reps: res.map((item) => item.reps),
        }
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }

  createLineChart(xAxis, yAxis) {
    // Destroy existing chart
    this.lineChart?.destroy();
    const canvas = <HTMLCanvasElement> document.getElementById('lineChart');
    const ctx = canvas?.getContext("2d");
    let gradient = ctx?.createLinearGradient(0, 230, 0, 50);

    gradient?.addColorStop(1, '#ec250d40');
    gradient?.addColorStop(1, '#ec251A');
    gradient?.addColorStop(0, '#ec250d00');

    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xAxis,
        datasets: [{
          label: `Weight (${this.userService.getWeightUnits()})`,
          fill: true,
          backgroundColor: gradient,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: yAxis,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
      }
    });
  }

  createBarChart(xAxis, yAxis) {
    // Destroy existing chart
    this.barChart?.destroy();
    const canvas = <HTMLCanvasElement> document.getElementById('barChart');
    const ctx = canvas?.getContext('2d');
    let gradient = ctx?.createLinearGradient(0, 230, 0, 50);

    gradient?.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradient?.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradient?.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

    this.barChart = new Chart("barChart", {
      type: 'bar',    
      data: {
        labels: xAxis, 
         datasets: [
          {
            label: `Weight (${this.userService.getWeightUnits()})`,
            data: yAxis,
            borderColor: '#1f8ef1',
            borderWidth: 2,
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
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

  toggleChartType(event) {
    this.showLineChart = event.detail.value === 'line';
    this.showBarChart = event.detail.value === 'bar';

    if (this.showBarChart) {
      this.lineChart?.destroy();
    }

    if (this.showLineChart) {
      this.barChart?.destroy();
    }

    if (this.showLineChart) {
      this.createLineChart(this.sets.timestamps, this.sets.weights);
    }
    if (this.showBarChart) {
      this.createBarChart(this.sets.timestamps, this.sets.weights);
    }
  }
}
