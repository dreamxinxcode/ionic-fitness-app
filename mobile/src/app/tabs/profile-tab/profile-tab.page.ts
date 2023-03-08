import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DateTimeService } from 'src/app/services/date-time/date-time.service';
import { MomentsService } from 'src/app/services/moments/moments.service';
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
  
  constructor(
    private http: HttpClient,
    public userService: UserService,
    private momentsService: MomentsService,
    public dateTimeService: DateTimeService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
    this.momentsService.syncMoments().subscribe((res) => {
      this.moments = res;  
    });
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.users.filter((meal) => {
      return meal.title.toLowerCase().indexOf(query) > -1
    });
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.currentUser = this.userService.getUser();
      this.momentsService.syncMoments().subscribe((res) => {
        this.moments = res;  
      });
      event.target.complete();
    }, 2000);
  }
}
