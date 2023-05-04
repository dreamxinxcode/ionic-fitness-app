import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { WorkoutsService } from '../../services/workouts/workouts.service';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { TemplateFormComponent } from './template-form/template-form.component';

@Component({
  selector: 'app-workouts-tab',
  templateUrl: './workouts-tab.page.html',
  styleUrls: ['./workouts-tab.page.scss'],
})
export class WorkoutsTabPage implements OnInit {
  date:any = this.dateTimeService.formatDate(new Date());
  workouts:any = [];
  loading: boolean = true;
  page = 1;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dateTimeService: DateTimeService,
    private workoutsService: WorkoutsService,
    public userService: UserService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.api.get('workouts', { params: { page: this.page.toString() } }).subscribe({
      next: (res) => {
        this.workouts = [...this.workouts, ...res.results];
        this.page++;
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  onIonInfinite(ev) {
    this.loadWorkouts();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  
  handleRefresh(event) {
    this.loading = true;
    setTimeout(() => {
      this.workoutsService.syncWorkouts().subscribe((res) => {
        this.workouts = res;
        this.loading = false;
      });
      event.target.complete();
    }, 2000);
  }

  saveAsTemplate(name: string, schema) {
    this.workoutsService.saveAsTempalte(schema).subscribe({
      next: (res) => {},
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {},
    });
  }

  onDelete(index: number, id):void {
    this.api.delete(`workouts/${id}`).subscribe({
      next: (res) => {
        this.workouts.splice(index, 1);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {

      },
    });
  }

  async presentModal(workoutData) {
    const modal = await this.modalController.create({
      component: TemplateFormComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        workoutData,
        modalController: this.modalController
      }
    });
    return await modal.present();
  }
}
