import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meals-tab',
  templateUrl: './meals-tab.page.html',
  styleUrls: ['./meals-tab.page.scss'],
})
export class MealsTabPage implements OnInit {

  meals: any;

  constructor() { }

  ngOnInit() {
    this.meals = {
      breakfast: [
        {
          title: 'Title',
          image: '',
          tags: ['Low Carb', 'Berries'],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },
      ],
      lunch: [
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },
      ],
      dinner: [
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },
      ],
      snacks: [
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },
      ],
      dessert: [
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },        
        {
          title: 'Title',
          image: '',
          tags: [],
          views: 0,
          timestamp: new Date(),
        },
      ],
    };
  }

}
