import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  currentUser;
  users;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.currentUser = {
      first_name: 'Brandon',
      last_name: 'Lecky',
      username: 'dreamxinxcode',
      age: 27,
      city: 'Victoria',
      country: 'Canada',
      avatar: '../../assets/avatar.png',
      workouts_count: 263,
    };
    this.http.get('http://localhost:8000/users/').subscribe((res) => {
      this.users = res;
    });
  }

}
