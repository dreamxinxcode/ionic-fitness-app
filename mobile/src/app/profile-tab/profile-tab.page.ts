import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  users;
  currentUser;

  constructor(
    private http: HttpClient,
    public userService: UserService,
  ) { }

  ngOnInit() {
    this.currentUser = this.userService.user;
  }
}
