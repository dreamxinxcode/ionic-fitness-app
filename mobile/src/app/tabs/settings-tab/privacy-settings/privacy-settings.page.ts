import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-privacy-settings',
  templateUrl: './privacy-settings.page.html',
  styleUrls: ['./privacy-settings.page.scss'],
})
export class PrivacySettingsPage implements OnInit {
  private privacyForm = new FormGroup({
    show_first_name: new FormControl(this.userService.user.show_first_name),
    show_last_name: new FormControl(this.userService.user.show_last_name),
    show_age: new FormControl(this.userService.user.show_age),
    show_weight: new FormControl(this.userService.user.show_weight),
    show_height: new FormControl(this.userService.user.show_height),
    show_workouts: new FormControl(this.userService.user.show_workouts),
  });

  constructor(
    private userService: UserService,
    private toast: ToastService,
    private platform: Platform,
    private alertController: AlertController,
  ) { }

  ngOnInit() {

  }

  async confirmExit() {
    const alert = await this.alertController.create({
      header: 'Confirm Exit',
      message: 'Are you sure you want to exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Exit',
          handler: () => {
            // Perform the exit action
            navigator['app'].exitApp(); // For Cordova/PhoneGap
            // Or window.close(); for browser
          }
        }
      ]
    });
  
    await alert.present();
  }

  save() {
    this.userService.savePrivacySettings(this.privacyForm.value).subscribe({
      next: (res) => {
        this.userService.syncUser().subscribe({
          next: (res) => {
            this.userService.user = res;
          },
          error: (err) => {
            this.toast.render(err.statusText, 'danger', 'alert');
          }
        });
        this.toast.render('Your settings have been saved');
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      },
    });
  }
}
