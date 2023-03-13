import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user;

  constructor(private http: HttpClient, private config: ConfigService) { }

  isLoggedIn(): boolean {
    return false;
  }

  getUser() {
    this.http.get(`${this.config.BASE_URL}users/me/`).subscribe((res: any) => {
      this.user = res;
    });
  }
}
