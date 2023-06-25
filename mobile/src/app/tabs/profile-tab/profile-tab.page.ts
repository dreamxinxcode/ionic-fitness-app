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

  private user = this.userService.user;
  private results;
  tab: string = 'moments';
  private moments = [];
  private momentsPage: number = 1;
  private infinateScroll: boolean = true;
  private loading: boolean = true;
  private loadingMoments: boolean = true;
  private loadingSearch = false;
  private momentForm = new FormGroup({
    moment: new FormControl()
  });

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private userService: UserService,
    private momentsService: MomentsService,
    private dateTimeService: DateTimeService, // Used in template
    private toast: ToastService,
    private config: ConfigService,
  ) { }

  ngOnInit() {
    this.loadMoments();
  }

  loadMoments() {
    this.api.get('moments/by_user/' + this.userService.user.id, { params: { page: this.momentsPage.toString() } }).subscribe({
      next: (res) => {
        this.moments = [...this.moments, ...res.results];
        this.momentsPage++;

        if (!res.next) {
          this.infinateScroll = false;
        }
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
          this.moments = res.results;
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

  tabView(type: string) {
    this.tab = type;
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
      this.momentsPage = 1;
      this.userService.syncUser().subscribe({
        next: (res) => {
          this.userService.user = res;
        },
        error: (err) => {
          this.toast.render(err.statusText, 'danger', 'alert');
        }
      })
      this.momentsService.syncMoments().subscribe((res) => {
        this.loadMoments();
      });
      event.target.complete();
    }, 2000);
  }

  onIonInfinite(event) {
    this.loadMoments();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
