import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workouts-tab',
  templateUrl: './workouts-tab.page.html',
  styleUrls: ['./workouts-tab.page.scss'],
})
export class WorkoutsTabPage implements OnInit {
  public date:any = this.formatDate(new Date());
  public workouts:any;

  constructor() { }

  ngOnInit() {
    // Fetch past workouts from API
    this.workouts = [
      {
        date: new Date(2022, 4, 3),
        exercises: [
          {
            name: 'Pushups',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Curls',
            sets: [
              {
                reps: 35,
                weight: 25,
              },
              {
                reps: 35,
                weight: 25,
              },
              {
                reps: 35,
                weight: 20,
              },            
            ]
          },
          {
            name: 'Squats',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Bench Press',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
        ]
      },
      {
        date: new Date(2022, 4, 2),
        exercises: [
          {
            name: 'Pushups',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Curls',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Squats',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Bench Press',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
        ]
      },
      {
        date: new Date(2022, 4, 1),
        exercises: [
          {
            name: 'Pushups',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Curls',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Squats',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
          {
            name: 'Bench Press',
            sets: [
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },
              {
                reps: 35,
                weight: null,
              },            
            ]
          },
        ]
      },
    ];
  }

  public formatDate(date):Date {
    return date.toLocaleDateString('en-us', { weekday:"long", month:"long", day:"numeric"});
  }
}
