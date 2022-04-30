import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleTheme($event) {
    localStorage.setItem('dark_theme', $event.detail.checked);
  }
}
