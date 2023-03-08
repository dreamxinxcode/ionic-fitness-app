import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MomentsService {

  constructor(private http: HttpClient) { }

  syncMoments() {
    return this.http.get('http://localhost:8000/api/moments/');
  }
}
