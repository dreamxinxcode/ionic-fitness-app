import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/services/location/location.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {

  accountForm = new FormGroup({
    firstName: new FormControl(this.userService.user.profile.first_name),
    lastName: new FormControl(this.userService.user.profile.last_name),
    username: new FormControl(this.userService.user.username),
    country: new FormControl(this.userService.user.profile.country),
    city: new FormControl(this.userService.user.profile.city),
  });

  constructor(
    public userService: UserService,
    public locationService: LocationService,
  ) { }

  ngOnInit() {
  }

  save() {

  }
}
