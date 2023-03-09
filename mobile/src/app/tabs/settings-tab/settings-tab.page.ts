import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';
import { SettingsService } from '../../services/settings/settings.service';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  constructor(
    private settingsService: SettingsService,
    public authService: AuthService,
    private toast: ToastService,
    private pickerCtrl: PickerController,
    private actionSheetCtrl: ActionSheetController,
  ) {}

  ngOnInit() {
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

  async openAccentPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'accents',
          options: [
            {
              text: 'Red',
              value: 'red',
            },
            {
              text: 'Green',
              value: 'green',
            },
            {
              text: 'Blue',
              value: 'blue',
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
          text: 'Confirm',
          handler: (value) => {
            this.settingsService.setAccent(value.accents.value);
          },
        },
      ],
    });
    await picker.present();
  }

  saveSettings() {
    this.toast.render('Your settings have been saved.', 'success', 'settings-outline');
  }
}
