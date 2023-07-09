import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ConfigService } from 'src/app/services/config/config.service';
import { LocationService } from 'src/app/services/location/location.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(),
    avatar: new FormControl(),
    first_name: new FormControl(),
    last_name: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirm_password: new FormControl(),
  }); 
  s = '<span class="fi fi-ca"></span>'
  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private config: ConfigService,
    private router: Router,
    public locationService: LocationService,
  ) { }

  ngOnInit() {
  }

  registerSubmit() {
    const registerForm = this.registerForm.value;
    const data = {
      username: registerForm.username,
      email: registerForm.email.toLowerCase(),
      password: registerForm.password,
      profile: {
        first_name: registerForm.first_name,
        last_name: registerForm.last_name,
        country: registerForm.country.name,
        country_code: registerForm.country.code,
        city: registerForm.city,
      }
    }
    this.http.post(
      `${this.config.BASE_URL}/users/register/`,
      data,
    ).subscribe({
      next: (res) => {
        this.toast.render(`Welcome, ${this.registerForm.value.first_name || this.registerForm.value.username}!`, 'success');
        this.router.navigate(['/tabs/workouts/']);
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      }
    });
  }
}
