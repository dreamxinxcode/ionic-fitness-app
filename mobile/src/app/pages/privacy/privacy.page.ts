import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {

  privacyForm = new FormGroup({
    firstName: new FormControl(this.userService.user.show_first_name),
    lastName: new FormControl(this.userService.user.show_last_name),
    age: new FormControl(this.userService.user.show_age),
    weight: new FormControl(this.userService.user.show_weight),
    height: new FormControl(this.userService.user.show_height),
  });

  constructor(
    public userService: UserService,
  ) { }

  ngOnInit() {
  }

  save() {
    
  }
}
