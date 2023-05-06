import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-analytics-tab',
  templateUrl: './analytics-tab.page.html',
  styleUrls: ['./analytics-tab.page.scss'],
})
export class AnalyticsTabPage implements OnInit {
  public barChart: any;
  public pieChart: any;

  exercises = [];
  exerciseSelect = new FormControl('');

  constructor(
    private api: ApiService,
    private toast: ToastService,
    public userService: UserService,
  ) { }

  ngOnInit() {
    Chart.register(...registerables);
    this.loadExercises();
    this.createBarChart();
    this.createPieChart();
  }

  loadExercises() {
    this.api.get('exercises').subscribe({
      next: (res) => {
        this.exercises = res;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {},
    });
  }

  createBarChart(){
    this.barChart = new Chart("MyBarChart", {
      type: 'bar',

      data: {
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Weight",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: '#D4192C'
          },
          {
            label: "Reps",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: '#F2F3F4',
          }  
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
}
