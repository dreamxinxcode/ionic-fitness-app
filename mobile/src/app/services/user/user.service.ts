import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, 
    private config: ConfigService,
    private toast: ToastService,
  ) { }

  get user() {
    return JSON.parse(localStorage.getItem('user'));
  }

  set user(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  syncUser(): Observable<any> {
    return this.http.get(this.config.BASE_URL + '/users/me/');
  }

  getUser() {
    return localStorage.getItem('user');
  }

  clearUser(): void {
    localStorage.removeItem('user');
    this.user = null;
  }

  getUserByID(id: number): Observable<any> {
    return this.http.get(`${this.config.BASE_URL}/users/${id}/`);
  }
  
  getWeightUnits(): string {
    return this.user?.profile.units_weight === 'imperial' ? 'lbs' : 'kg';
  }

  getHeightUnits(): string {
    return this.user?.profile.units_weight === 'imperial' ? 'ft' : 'cm';
  }

  savePrivacySettings(settings): Observable<any> {
    return this.http.post(this.config.BASE_URL + '/users/save_privacy_settings/', settings);
  }

  incrementWorkoutCount() {
    const user = this.user;
    user.profile.workout_count++;
    this.user = user;
  }

  decrementWorkoutCount() {
    const user = this.user;
    user.profile.workout_count--;
    this.user = user;
  }
}
