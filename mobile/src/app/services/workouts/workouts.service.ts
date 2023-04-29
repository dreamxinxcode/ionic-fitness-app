import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  syncWorkouts(): Observable<any> {
    return this.http.get(this.config.API_URL + '/workouts/');
  }

  saveAsTempalte(schema): Observable<any> {
    console.log(schema)
    return this.http.post(this.config.API_URL + '', { schema });
  }
}
