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
    // Check if tag is already in filter
    if(this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t === tag);
    } else {
      this.selectedTags.push(tag);
    }
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
    this.loading = true;
    const query = event.target.value.toLowerCase();
    this.mealService.query(query).subscribe({
      next: (res) => {
        console.log(res)
        this.meals = res;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {},
    });
    this.loading = false;
  }

  handleRefresh(event) {
    this.loading = true;
    setTimeout(() => {
      this.mealService.syncMeals().subscribe((res) => {
        this.meals = res;
        this.loading = false;
      });
      event.target.complete();
    }, 2000);
  }
}
