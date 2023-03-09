import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private renderer: Renderer2;

  constructor(
    private toastService: ToastService,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleDarkMode(event): void {
    const value = event.detail.checked;
    localStorage.setItem('dark_theme', value.toString());
    this.setTheme();
    this.toastService.render(`${value ? 'Dark' : 'Light'} Mode Enabled`, 'primary', 'moon');
  }

  setTheme(): void {
    if (JSON.parse(localStorage.getItem('dark_theme'))) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  isDark(): boolean {
    return localStorage.getItem('dark_theme') === 'true';
  }

  setAccent(accent: string): void {
    localStorage.setItem('accent', accent);
  }

  getAccent(): string {
    return localStorage.getItem('accent');
  }
}
