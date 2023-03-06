import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  constructor(private http: HttpClient) { }

  syncMeals() {
    return this.http.get('http://localhost:8000/api/meals/');
  }
}
