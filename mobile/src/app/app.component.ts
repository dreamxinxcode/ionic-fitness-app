import { Component } from '@angular/core';
import { SettingsService } from './services/settings/settings.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private settingsService: SettingsService,
    private platform: Platform,
  ) {
    this.initializeApp();
    this.settingsService.setTheme();
  }

  initializeApp() {
  }
}
