import { Component } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { NotificationService } from './services/notifications/notification.service';
import { SettingsService } from './services/settings/settings.service';
import { VersionService } from './services/version/version.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private settingsService: SettingsService,
    private versionService: VersionService,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {
    this.initializeApp();
    this.settingsService.setTheme();
    this.versionService.os = this.versionService.determinePlatform();
    this.versionService.checkForUpdates();
  }

  initializeApp() {
  }
}
