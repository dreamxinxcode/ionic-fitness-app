import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ToastService } from '../toast/toast.service';
import * as semver from 'semver';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  os;
  currentVersion = '1.0.0';

  constructor(private http: HttpClient, private platform: Platform, private toastService: ToastService) { }

  determinePlatform() {
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
    this.http.post('http://localhost:8000/api/version/', { os: this.os }).subscribe((res: any) => {
    if (semver.lt(this.currentVersion, res.version)) {
        this.toastService.render('There is a new update available!', 'primary');
      }
    });
  }
}
