import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const AUTH_KEY = 'auth.isLoggedIn';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router) { }

  private readonly mockUser = { username: 'admin', password: '12345678' };

  isLoggedIn(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  }

  login(username: string, password: string): boolean {
    const ok = username === this.mockUser.username && password === this.mockUser.password;
    if (ok) {
      localStorage.setItem(AUTH_KEY, 'true');
      this.router.navigate(['/']);
    } else {
      alert('Login failed');
    }
    return ok;
  }

  logout(): void {
    localStorage.removeItem(AUTH_KEY);
    this.router.navigate(['/login']);
  }
}
