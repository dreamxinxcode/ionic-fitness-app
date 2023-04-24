import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  syncExercises(): Observable<any> {
    return this.http.get(this.config.API_URL + '/exercises/');
  }
}
