import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ConnectionLog {
  _id?: string;
  date: Date;
  user: {
    username: string,
  };
  logIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private API_URL = 'http://localhost:8080/api/log/';

  constructor(private http: HttpClient) { }

  getConnectionLogs() {
    return this.http.get<ConnectionLog[]>(this.API_URL);
  }
}
