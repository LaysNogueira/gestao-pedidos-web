import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('auth') && localStorage.getItem('auth')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
