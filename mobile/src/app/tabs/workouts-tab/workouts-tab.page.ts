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
  private date:any = this.dateTimeService.formatDate(new Date());
  private workouts:any = [];
  private loading: boolean = true;
  private page: number = 1;
  private infiniteScroll: boolean = true;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private dateTimeService: DateTimeService,
    private workoutsService: WorkoutsService,
    private userService: UserService,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.loadWorkouts();
  }

  loadWorkouts() {
    this.api.get('workouts', { params: { page: this.page.toString() } }).subscribe({
      next: (res) => {
        this.workouts = [...this.workouts, ...res.results];
        this.page++;
        
        if (!res.next) {
          this.infiniteScroll = false;
        }
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  ionViewDidEnter() {
    this.page = 1;
    this.workouts = [];
    this.loadWorkouts();
  }

  onIonInfinite(event) {
    this.loadWorkouts();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  
  handleRefresh(event) {
    this.loading = true;
    setTimeout(() => {
      this.page = 1;
      this.workoutsService.syncWorkouts().subscribe((res) => {
        this.workouts = res;
        this.loading = false;
      });
      event.target.complete();
    }, 2000);
  }
}
