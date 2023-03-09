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
  loaded;
  loadingSearch = false;

  constructor(
    private http: HttpClient,
    public userService: UserService,
    private momentsService: MomentsService,
    private dateTimeService: DateTimeService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
    this.momentsService.syncMoments().subscribe((res) => {
      this.moments = res;
    });
  }

  handleSearch(event) {
    this.loadingSearch = true;
    const query = event.target.value.toLowerCase();
    this.http.get(`http://localhost:8000/users/query/?q=${query}`).subscribe({
      next: (res) => {
        this.results = res;console.log('next')
      },
      error: (err) => {
        
      },
      complete: () => {
        this.loadingSearch = false; 
        console.log('comp', this.results)
      },
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
