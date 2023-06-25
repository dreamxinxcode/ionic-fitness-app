import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { VersionService } from 'src/app/services/version/version.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  darkModeToggle = new FormControl(this.settingsService.isDark());

  constructor(
    public versionService: VersionService,
    public authService: AuthService,
    public settingsService: SettingsService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {}
}
