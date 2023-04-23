import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastService,
    private userService: UserService
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
    this.http.post('http://localhost:8000/users/login/', creds).subscribe({
      next: (res: any) => {
        this.setToken(res); 
        this.userService.getUser();  
        this.router.navigate(['/tabs/workouts']);
        this.toast.render('Success! Welcome!', 'success', 'person-outline')
      },
      error: (err) => {
        this.toast.render(err.message, 'danger', 'person-outline');
      },
      complete: () => {

      }
    })
  }

  logout() {
    this.clearToken(); 
    this.toast.render('Success! Logged out!', 'success', 'person-outline');
    this.router.navigate(['/login']);
  }
}
