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

  getToken() {
    return localStorage.getItem('access_token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null ? true : false
  }

  setToken(creds) {

  }

  login(creds) {
    this.http.post('http://localhost:8000/login/', creds).subscribe({
      next: (res: any) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh', res.refresh);   
        this.userService.getUser();  
        this.router.navigate(['/tabs/workouts-tab']);
        this.toast.render('Success! Welcome!', 'success', 'person-outline')
      },
      error: (res) => {
        this.toast.render('Whoops! Looks like you mistyped', 'danger', 'person-outline');
      },
      complete: () => {

      }
    })
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh');    
    this.toast.render('Success! Logged out!', 'success', 'person-outline');
    this.router.navigate(['/login']);
  }
}
