import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../services/meals/meals.service';

@Component({
  selector: 'app-meals-tab',
  templateUrl: './meals-tab.page.html',
  styleUrls: ['./meals-tab.page.scss'],
})
export class MealsTabPage implements OnInit {

  meals: any;
  tags;
  loaded = false;
  results;
  selectedTags = [];

  constructor(private mealService: MealsService) { }

  ngOnInit() {
    this.mealService.syncMeals().subscribe((res) => {
      this.meals = res;
      this.loaded = true;
    });
    this.mealService.syncMealTags().subscribe((res) => {
      this.tags = res;
    });
  }

  filterByTags(tag: string) {
    this.selectedTags.push(tag);
    this.mealService.filterByTags(this.selectedTags).subscribe((res) => {
      this.results = res;
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
