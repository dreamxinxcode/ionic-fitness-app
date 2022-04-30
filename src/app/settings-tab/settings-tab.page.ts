import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  settingsForm: FormGroup

  constructor() {
    this.settingsForm = new FormGroup({
      themeToggle: new FormControl(localStorage.getItem('dark_theme'))
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    localStorage.setItem('dark_theme', this.settingsForm.value.themeToggle);
  }
}
