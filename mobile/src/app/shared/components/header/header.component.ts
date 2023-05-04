import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  notifications = [];
  loading: boolean = true;

  constructor(
    public notificationService: NotificationService,
    public settings: SettingsService,
  ) { }

  ngOnInit() {}
}
