import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/config/config.service';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { MomentsService } from 'src/app/services/moments/moments.service';

@Component({
  selector: 'app-moments',
  templateUrl: './moments.page.html',
  styleUrls: ['./moments.page.scss'],
})
export class MomentsPage implements OnInit {

  moments;
  results;

  constructor(
    private momentsService: MomentsService,
    public dateTimeService: DateTimeService,
    public config: ConfigService,
  ) { }

  ngOnInit() {
    this.momentsService.syncMoments().subscribe((res: any) => {
      this.moments = res;
    });
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.moments.filter(d => d.text.toLowerCase().indexOf(query) > -1);
  }
}
