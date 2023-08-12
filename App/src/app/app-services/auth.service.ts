import { Injectable } from '@angular/core';

import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserData(): User | null {
    const token = localStorage.getItem('userData');
    if (!token) {
      return null;
    }

    return JSON.parse(token);
  }

  setUserData(data: User): void {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  clearUserData(): void {
    localStorage.removeItem('userData');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('userData') ? true : false;
  }
}
