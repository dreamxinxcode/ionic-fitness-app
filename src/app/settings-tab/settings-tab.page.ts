import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingsService } from '../services/settings/settings.service';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  settingsForm: FormGroup

  constructor(private renderer: Renderer2, private settingsService: SettingsService) {
    this.settingsForm = new FormGroup({
      themeToggle: new FormControl(localStorage.getItem('dark_theme')),
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    this.settingsService.toggleTheme(this.settingsForm.value.themeToggle)
    this.settingsService.setTheme();
  }
}
