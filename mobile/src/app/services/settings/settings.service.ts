import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  toggleTheme(isDark: string): void {
    localStorage.setItem('dark_theme', isDark);
  }

  setTheme(): void {
    if (JSON.parse(localStorage.getItem('dark_theme'))) {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }

  getTheme(): string {
    return localStorage.getItem('dark_theme');
  }

  setAccent(accent: string): void {
    localStorage.setItem('accent', accent);
  }

  getAccent(): string {
    return localStorage.getItem('accent');
  }
}
