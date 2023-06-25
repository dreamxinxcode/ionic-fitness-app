import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { ApiService } from 'src/app/services/api/api.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { MomentsService } from 'src/app/services/moments/moments.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.page.html',
  styleUrls: ['./moments.page.scss'],
})
export class MomentsPage implements OnInit {

  moments = [];
  page: number = 1;
  infiniteScroll: boolean = true;
  loading: boolean = true;
  results;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private momentService: MomentsService,
    public dateTimeService: DateTimeService,
    public config: ConfigService,
  ) { }

  ngOnInit() {
    this.loadMoments();
  }

  loadMoments() {
    this.api.get('moments', { params: { page: this.page.toString() } }).subscribe({
      next: (res) => {
        this.moments = [...this.moments, ...res.results];
        this.page++;
        
        if (!res.next) {
          this.infiniteScroll = false;
        }
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  handleSearch(event) {
    this.loading = true;
    const query = event.target.value.toLowerCase();
    this.momentService.query(query).subscribe({
      next: (res) => {
        this.moments = res.results;
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
      complete: () => {},
    });
    this.loading = false;
  }

  onIonInfinite(event) {
    this.loadMoments();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
