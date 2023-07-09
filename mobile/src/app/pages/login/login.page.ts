import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { UserService } from 'src/app/services/user/user.service';
import { VersionService } from 'src/app/services/version/version.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  private banData; 

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private versionService: VersionService,
    private router: Router,
    private toast: ToastService,

  ) { }

  ngOnInit() {
  }

  loginSubmit() {
    this.authService.login({
      email: this.loginForm.value.email.toLowerCase(),
      password: this.loginForm.value.password
    }).subscribe({
      next: (res: any) => {
        this.authService.setToken(res);
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
}
