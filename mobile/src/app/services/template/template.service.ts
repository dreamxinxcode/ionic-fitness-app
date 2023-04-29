import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
  ) { }

  save(title: string, template): Observable<any> {
    return this.http.post(
      this.config.API_URL + '/templates/', 
      {
        title, 
        template,
        timestamp: Date.now(), 
      },    
    );
  }
}
