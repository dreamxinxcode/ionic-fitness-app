import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConfigService } from 'src/app/services/config/config.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { MealsService } from '../../services/meals/meals.service';
import { MealComponent } from './meal/meal/meal.component';

@Component({
  selector: 'app-meals-tab',
  templateUrl: './meals-tab.page.html',
  styleUrls: ['./meals-tab.page.scss'],
})
export class MealsTabPage implements OnInit {

  page: number = 1;
  meals: any;
  tags = [];
  loading: boolean = true;
  results;
  selectedTags = [];

  constructor(
    private mealService: MealsService,
    private config: ConfigService,
    private toast: ToastService,
    private modalCtrl: ModalController,
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

  filterByTags(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  
    this.loading = true;
    this.mealService.filterByTags(this.selectedTags).subscribe({
      next: (res) => {
        this.results = res;
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  async openModal(meal) {
    const modal = await this.modalCtrl.create({
      component: MealComponent,
      componentProps: {
        meal
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  handleSearch(event) {
    this.loading = true;
    const query = event.target.value.toLowerCase();
    this.mealService.query(query).subscribe({
      next: (res) => {
        this.meals = res.results;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {},
    });
    this.loading = false;
  }

  handleRefresh(event) {
    this.page = 1;
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
