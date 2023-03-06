import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SettingsService } from '../services/settings/settings.service';
import { AuthService } from '../services/auth/auth.service';
import { ToastService } from '../services/toast/toast.service';
import { PickerController } from '@ionic/angular';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  settingsForm: FormGroup

  constructor(
    private settingsService: SettingsService,
    public authService: AuthService,
    private toast: ToastService,
    private pickerCtrl: PickerController,
  ) {
    this.settingsForm = new FormGroup({
      themeToggle: new FormControl(localStorage.getItem('dark_theme')),
    });
  }

  ngOnInit() {
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
    this.settingsService.toggleTheme(this.settingsForm.value.themeToggle)
    this.settingsService.setTheme();
    this.toast.render('Your settings have been saved.', 'success', 'settings-outline');
  }
}
