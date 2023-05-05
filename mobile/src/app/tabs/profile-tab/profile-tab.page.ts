import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { MomentsService } from 'src/app/services/moments/moments.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  users;
  results;
  currentUser;
  moments = [];
  momentsPage: number = 1;
  loading: boolean = true;
  loadingMoments: boolean = true;
  loadingSearch = false;
  momentForm = new FormGroup({
    moment: new FormControl()
  });

  constructor(
    private http: HttpClient,
    private api: ApiService,
    public userService: UserService,
    private momentsService: MomentsService,
    private dateTimeService: DateTimeService, // Used in template
    private toast: ToastService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
    this.loadMoments();
  }

  loadMoments() {
    this.api.get('moments/by_user/' + this.userService.user.id, { params: { page: this.momentsPage.toString() } }).subscribe({
      next: (res) => {
        this.moments = [...this.moments, ...res.results];
        this.momentsPage++;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {
        this.loadingMoments = false;
      },
    });
  }

  submitMoment() {
    const moment = this.momentForm.value.moment;
    this.loadingMoments = true;
    this.api.post('moments', { text: moment }).subscribe({
      next: () => {
        this.momentForm.controls.moment.reset();
        this.api.get('moments/by_user/' + this.userService.user.id).subscribe((res) => {
          this.moments = res;
        });
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loadingMoments = false;
      }
    });
  }

  deleteMoment(index: number, id: number) {
    this.api.delete(`moments/${id}`).subscribe({
      next: (res) => {
        this.moments.splice(index, 1);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {

      },
    });
  }

  handleSearch(event) {
    this.loadingSearch = true;
    const query = event.target.value.toLowerCase().trim();
    if (!query) {
      this.loadingSearch = false;
      return
    }
    this.http.get(this.config.BASE_URL + `/users/query/?q=${query}`).subscribe({
      next: (res) => {
        this.results = res;
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        this.loadingSearch = false; 
      },
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.currentUser = this.userService.setUser();
      this.momentsService.syncMoments().subscribe((res) => {
        this.loadMoments();
      });
      event.target.complete();
    }, 2000);
  }

  onIonInfinite(ev) {
    this.loadMoments();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
