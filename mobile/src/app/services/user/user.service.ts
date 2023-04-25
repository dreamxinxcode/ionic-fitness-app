import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;

  constructor(private http: HttpClient, private config: ConfigService) { }

  isLoggedIn(): boolean {
    return false;
  }

  getUser() {
    this.http.get(this.config.BASE_URL + '/users/me/').subscribe((res: any) => {
      this.user = res;
    });
  }

  getWeightUnits(): string {
    return this.user.profile.units_weight === 'imperial' ? 'lbs' : 'kg';
  }

  getHeightUnits(): string {
    return this.user.profile.units_weight === 'imperial' ? 'ft' : 'cm';
  }


  /**
   * Saves the privacy settings for a user.
   *
   * @param settings The privacy settings to save.
   * @returns An Observable that emits the result of the HTTP request.
   */
  savePrivacySettings(settings): Observable<any> {
    return this.http.post(this.config.BASE_URL + '/users/privacy/', settings);
  }
}
