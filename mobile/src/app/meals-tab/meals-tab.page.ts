import { Component, OnInit } from '@angular/core';
import { MealsService } from '../services/meals/meals.service';

@Component({
  selector: 'app-meals-tab',
  templateUrl: './meals-tab.page.html',
  styleUrls: ['./meals-tab.page.scss'],
})
export class MealsTabPage implements OnInit {

  meals: any;
  loaded = false;
  results;

  constructor(private mealService: MealsService) { }

  ngOnInit() {
    this.mealService.syncMeals().subscribe((res) => {
      this.meals = res;
      this.loaded = true;
    });
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.meals.filter((meal) => {
      return meal.title.toLowerCase().indexOf(query) > -1
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.mealService.syncMeals().subscribe((res) => {
        this.meals = res;
        this.loaded = true;
      });
      event.target.complete();
    }, 2000);
  }
}
