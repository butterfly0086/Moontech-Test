import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

interface User {
  _id?: string,
  username: string,
  email: string,
  password?: string,
  active?: boolean,
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:8080/api/users/';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  createUser(user: User): Observable<any> {
    return this.http.post<User>('/api/users', user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.API_URL}${userId}`);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}${userId}`, user);
  }
}
