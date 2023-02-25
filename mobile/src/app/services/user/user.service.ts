import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser = {
    first_name: 'Brandon',
    last_name: 'Lecky',
    username: 'dreamxinxcode',
    age: 27,
    city: 'Victoria',
    country: 'Canada',
    avatar: '../../assets/avatar.png',
    workouts_count: 263,
  };

  constructor() { }

  isLoggedIn(): boolean {
    return false;
  }
}
