import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  syncExercises() {
    return this.http.get('http://localhost:8000/api/exercises/');
  }
}
