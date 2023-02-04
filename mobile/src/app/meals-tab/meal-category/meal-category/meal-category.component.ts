import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meal-category',
  templateUrl: './meal-category.component.html',
  styleUrls: ['./meal-category.component.scss'],
})
export class MealCategoryComponent implements OnInit {

  @Input() title: string;
  @Input() meals: any[];

  constructor() { }

  ngOnInit() {
  }

}
