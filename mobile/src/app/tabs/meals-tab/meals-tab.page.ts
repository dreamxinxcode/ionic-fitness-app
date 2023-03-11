import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MealsService } from '../../services/meals/meals.service';

@Component({
  selector: 'app-meals-tab',
  templateUrl: './meals-tab.page.html',
  styleUrls: ['./meals-tab.page.scss'],
})
export class MealsTabPage implements OnInit {

  meals: any;
  tags = [];
  loading: boolean = true;
  results;
  selectedTags = [];

  constructor(
    private mealService: MealsService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    this.mealService.syncMeals().subscribe((res) => {
      this.meals = res;
      this.loading = false;
    });
    this.mealService.syncMealTags().subscribe((res: any) => {
      this.tags = res;
    });
  }

  filterByTags(tag: string) {
    this.selectedTags.push(tag);
    this.loading = true;
    this.mealService.filterByTags(this.selectedTags).subscribe({
      next: (res) => {
        this.results = res;
      },
      error: (err) => {
        this,this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      }
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
        this.loading = false;
      });
      event.target.complete();
    }, 2000);
  }
}
