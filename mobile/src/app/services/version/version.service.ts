import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastService } from '../toast/toast.service';
import * as semver from 'semver';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  os: string;
  currentVersion: string = '1.0.0';

  constructor(
    private api: ApiService,
    private platform: Platform,
    private toast: ToastService
  ) { }

  determinePlatform(): string {
    let os = '';
    if (this.platform.is('android')) {
      os = 'android';
    }
    if (this.platform.is('ios')) {
      os = 'ios';
    }
    return 'android';
  }

  checkForUpdates() {
    this.api.get(`version/${this.os}`).subscribe({
      next: (res: any) => {
        if (semver.lt(this.currentVersion, res.version)) {
          this.toast.render('There is a new update available!', 'primary');
        }
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'alert-circle-outline');
      },
      complete: () => {
        
      },
    });
  }
}
