import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { SettingsService } from '../../services/settings/settings.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { PickerController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    private userService: UserService,
    private toast: ToastService,
    private pickerCtrl: PickerController,
    private actionSheetCtrl: ActionSheetController,
  ) {}

  ngOnInit() {
  }

  saveSettings() {
    this.toast.render('Your settings have been saved.', 'success', 'settings-outline');
  }

  async openHeightPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'units',
          options: [
            {
              text: 'Imperial (ft/in)',
              value: 'imperial',
            },
            {
              text: 'Metric (cm)',
              value: 'metric',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (value) => {
            this.settingsService.setUnits({ units_height: value.units.value }).subscribe({
              next: (res) => {
                this.toast.render('Settings saved', 'light', 'settings-outline');
                this.userService.user = res;
              },
              error: (err) => {
                this.toast.render(err, 'danger', 'alert');
              }
            });
          },
        },
      ],
    });
    await picker.present();
  }

  async openWeightPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'units',
          options: [
            {
              text: 'Imperial (lbs)',
              value: 'imperial',
            },
            {
              text: 'Metric (kg)',
              value: 'metric',
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (value) => {
            this.settingsService.setUnits({ units_weight: value.units.value }).subscribe({
              next: (res) => {
                this.toast.render('Settings saved', 'light', 'settings-outline');
                this.userService.user.profile = res;
              },
              error: (err) => {
                this.toast.render(err, 'danger', 'alert');
              }
            });
          },
        },
      ],
    });
    await picker.present();
  }

  async presentLogoutActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Logout?',
      buttons: [
        {
          text: 'Logout',
          role: 'destructive',
          data: {
            action: 'logout',
          },
        }, 
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();

    if (result.data.action === 'logout') {
      this.authService.logout();
    }
  }
}
