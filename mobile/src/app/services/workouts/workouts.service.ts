import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(private http: HttpClient) { }

  syncWorkouts() {
    //
    return this.http.get('http://localhost:8000/api/workouts/');
  }
}
