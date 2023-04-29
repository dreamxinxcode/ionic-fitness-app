import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;

  constructor(
    private http: HttpClient, 
    private config: ConfigService
  ) { 
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  setUser() {
    this.http.get(this.config.BASE_URL + '/users/me/').subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.user = res;
    });
  }

  getUser() {
    return localStorage.getItem('user');
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

  getWeightUnits(): string {
    return this.user.profile.units_weight === 'imperial' ? 'lbs' : 'kg';
  }

  getHeightUnits(): string {
    return this.user.profile.units_weight === 'imperial' ? 'ft' : 'cm';
  }

  savePrivacySettings(settings): Observable<any> {
    return this.http.post(this.config.BASE_URL + '/users/privacy/', settings);
  }
}
