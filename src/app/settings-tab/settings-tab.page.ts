import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.page.html',
  styleUrls: ['./settings-tab.page.scss'],
})
export class SettingsTabPage implements OnInit {

  settingsForm: FormGroup

  constructor(private renderer: Renderer2) {
    this.settingsForm = new FormGroup({
      themeToggle: new FormControl(localStorage.getItem('dark_theme')),
    });
  }

  ngOnInit() {
  }

  saveSettings() {
    localStorage.setItem('dark_theme', this.settingsForm.value.themeToggle);
    // TODO: move this logic to run when app loads
    if (JSON.parse(localStorage.getItem('dark_theme'))) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }
}
