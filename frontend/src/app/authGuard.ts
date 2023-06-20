import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false;
  setAuthenticated(value: boolean) {
    this.isAuthenticated = value;
  }

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (this.isAuthenticated) {
      return true; // Allow access to the route
    } else {
      this.router.navigate(['/login']); // Redirect to the login page
      return false; // Prevent access to the route
    }
  }
}
