import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  momentForm = new FormGroup({
    moment: new FormControl()
  });

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

  submitMoment() {
    const moment = this.momentForm.value.moment;
    this.http.post('http://localhost:8000/api/moments/', { text: moment }).subscribe({
      next: () => {
        this.momentForm.controls.moment.reset();
        this.momentsService.syncMoments().subscribe((res) => {
          this.moments = res;
        });
      },
      error: (err) => {

      },
      complete: () => {

      }
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
