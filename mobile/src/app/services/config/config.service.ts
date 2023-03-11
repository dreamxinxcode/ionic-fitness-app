import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  PORT = 8000
  BASE_URL = `http://localhost:${this.PORT}`;
  API_URL = `http://localhost:${this.PORT}/api`;

  constructor() { }
}
