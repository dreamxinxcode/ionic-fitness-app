import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  loginSubmit() {
    this.http.post(
      'http://localhost:8000/login',
      this.loginForm.value,
    ).subscribe((res) => {

    });
  }
}
