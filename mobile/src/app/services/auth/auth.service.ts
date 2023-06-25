import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { ToastService } from '../toast/toast.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  banData: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private userService: UserService,
    private config: ConfigService,
  ) { }

  isAuthenticated(): boolean {
    return this.getToken() !== null ? true : false
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setToken(creds) {
    localStorage.setItem('access_token', creds.access);
    localStorage.setItem('refresh', creds.refresh);   
  }

  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh');
  }

  login(creds) {
    this.http.post(this.config.BASE_URL + '/users/login/', creds).subscribe({
      next: (res: any) => {
        this.setToken(res);
        this.userService.syncUser().subscribe({
          next: (res) => {
            this.userService.user = res;
            this.router.navigate(['/tabs/workouts']);
            this.toast.render(`Welcome, ${res.profile?.first_name || res?.username}!`, 'light', 'person-outline');
          },
          error: (err) => {
            this.toast.render(err.statusText, 'danger', 'alert');
          }
        });
      },
      error: (err) => {
        if (err.error.ban_data) {
          this.banData = err.error.ban_data;
        }
        this.toast.render(err.error.error || err.error.detail, 'danger', 'person-outline');
      }
    });
  }

  logout() {
    this.clearToken();
    this.userService.clearUser();
    this.toast.render('Success! Logged out!', 'light', 'person-outline');
    this.router.navigate(['/login']);
  }
}
