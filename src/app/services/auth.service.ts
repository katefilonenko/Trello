import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private _loginUrl = 'http://localhost:7070/api/login';

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }
}
