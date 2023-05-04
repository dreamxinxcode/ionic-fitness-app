import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.page.html',
  styleUrls: ['./privacy-settings.page.scss'],
})
export class PrivacySettingsPage implements OnInit {
  privacyForm = new FormGroup({
    show_first_name: new FormControl(this.userService.user.show_first_name),
    show_last_name: new FormControl(this.userService.user.show_last_name),
    show_age: new FormControl(this.userService.user.show_age),
    show_weight: new FormControl(this.userService.user.show_weight),
    show_height: new FormControl(this.userService.user.show_height),
  });

  constructor(
    public userService: UserService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
  }

  save() {
  this.userService.savePrivacySettings(this.privacyForm.value).subscribe({
      next: (res) => {
        this.toast.render('Your settings have been saved');
      },
      error: (err) => {
        // console.log(err)
        // this.toast.render(err.error.detail, 'danger', 'alert');
      },
    });
  }
}
