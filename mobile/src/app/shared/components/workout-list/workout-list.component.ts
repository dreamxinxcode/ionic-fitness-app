import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorkoutsService } from 'src/app/services/workouts/workouts.service';
import { TemplateFormComponent } from 'src/app/tabs/workouts-tab/template-form/template-form.component';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss'],
})
export class WorkoutListComponent implements OnInit {

  @Input() workouts = []; 

  constructor(
    private workoutService: WorkoutsService,
    private api: ApiService,
    private toast: ToastService,
    private dateTimeService: DateTimeService, // Used in template
    private userService: UserService, // Used in template
    private modalController: ModalController,
  ) { }

  ngOnInit() {}

  saveAsTemplate(name: string, schema) {
    this.workoutService.saveAsTempalte(schema).subscribe({
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
        this.userService.decrementWorkoutCount();
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
