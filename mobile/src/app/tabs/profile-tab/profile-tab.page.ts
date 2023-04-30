import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  moments;
  loading: boolean = true;
  loadingSearch = false;
  momentForm = new FormGroup({
    moment: new FormControl()
  });

  constructor(
    private http: HttpClient,
    private api: ApiService,
    public userService: UserService,
    private momentsService: MomentsService,
    private dateTimeService: DateTimeService,
    private toast: ToastService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
    this.momentsService.syncMoments().subscribe((res) => {
      this.moments = res;
    });
  }

  submitMoment() {
    const moment = this.momentForm.value.moment;
    this.api.post('moments', { text: moment }).subscribe({
      next: () => {
        this.momentForm.controls.moment.reset();
        this.momentsService.syncMoments().subscribe((res) => {
          this.moments = res;
        });
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {

      }
    });
  }

  handleSearch(event) {
    this.loadingSearch = true;
    const query = event.target.value.toLowerCase();
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
        this.moments = res;
      });
      event.target.complete();
    }, 2000);
  }
}
