import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
  }); 

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  registerSubmit() {
    this.http.post(
      'http://localhost:8000/register',
      this.registerForm.value,
    ).subscribe((res) => {

    });
  }
}
