import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api/users/';

  constructor(private http: HttpClient, private router: Router) {}

  signIn(signInData: any) {
    const endPoint = `${this.apiUrl}/login`;
    return this.http.post(endPoint, signInData).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  signUp(signupData: any) {
    const endPoint = `${this.apiUrl}/register`;
    return this.http.post(endPoint, signupData).pipe(
      tap((response: any) => {
        console.log('response --->', response);

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.newUser));
      })
    );
  }

  isLoggedInUser() {
    if (this.getToken()) {
      return true;
    } else {
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserDetails(): any | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['signin']);
  }
}
