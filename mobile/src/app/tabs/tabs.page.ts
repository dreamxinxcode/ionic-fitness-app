import { Component } from '@angular/core';
import { NotificationService } from '../services/notifications/notification.service';
import { SettingsService } from '../services/settings/settings.service';
import { UserService } from '../services/user/user.service';
import { VersionService } from '../services/version/version.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public userService: UserService, private notificationService: NotificationService, private settingsService: SettingsService, private versionService: VersionService) {}
}
