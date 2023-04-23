import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from 'src/app/services/toast/toast.service';

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
  }); 

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService,
  ) { }

  ngOnInit() {
  }

  registerSubmit() {
    const registerForm = this.registerForm.value;
    const data = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      profile: {
        first_name: registerForm.first_name,
        last_name: registerForm.last_name,
        country: registerForm.country,
        city: registerForm.city,
        // avatar: registerForm.avatar,
      }
    }
    this.http.post(
      'http://localhost:8000/users/register/',
      data,
    ).subscribe({
      next: (res) => {
        this.toast.render('', 'success');
      },
      error: (err) => {
        this.toast.render(err.statusText, 'danger', 'alert');
      }
    });
  }
}
