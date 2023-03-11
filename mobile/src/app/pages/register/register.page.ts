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
    first_name: new FormControl(),
    last_name: new FormControl(),
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
    this.http.post(
      'http://localhost:8000/users/register/',
      this.registerForm.value,
    ).subscribe({
      next: () => {
        this.router.navigate(['http://localhost:8000/workouts-tab/workouts/']);
      },
      error: (err) => {
        err.error.password.forEach((i) => {
          this.toast.render(i, 'danger', 'alert-circle-outline');
        });
      },
      complete: () => {

      }
    });
  }
}
