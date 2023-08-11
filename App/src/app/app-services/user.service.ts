import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

import { User } from '../interfaces/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl: string = environment.firebase.databaseURL;

  constructor(private fireAuth: AngularFireAuth, private http: HttpClient) {}

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  addUser(userData: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users.json`, userData);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users.json`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}.json`);
  }
}
