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
  loading: boolean = true;
  results;

  constructor(
    private api: ApiService,
    private toast: ToastService,
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
    const query = event.target.value.toLowerCase();
    this.results = this.moments.filter(d => d.text.toLowerCase().indexOf(query) > -1);
  }

  onIonInfinite(ev) {
    this.loadMoments();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
