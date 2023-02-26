import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SettingsService } from '../services/settings/settings.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  settingsForm: FormGroup

  constructor(
    private settingsService: SettingsService,
    private toastController: ToastController,
    public authService: AuthService,
  ) {
    this.settingsForm = new FormGroup({
      themeToggle: new FormControl(localStorage.getItem('dark_theme')),
    });
  }

  ngOnInit() {
  }

  async saveSettings() {
    this.settingsService.toggleTheme(this.settingsForm.value.themeToggle)
    this.settingsService.setTheme();
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 1000,
    });
    toast.present();
  }
}
