import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../authGuard';
import { api } from '../api';
import { HttpClient } from '@angular/common/http';
import { GlobalErrorHandler } from '../global-error-handler';
import { map } from 'rxjs';

const logout=api.logOut;
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isActive = false;

  constructor(
    private route: ActivatedRoute, 
    private authGuard: AuthGuard,
    private http :HttpClient,
    private router :Router,
    private errorHandler:GlobalErrorHandler) {
    this.isActive = false;     
  }

  get isAuthenticated(): boolean {
    return this.authGuard.isAuthenticated;
  }

  logOut() {
    this.http.post(logout, null).pipe(
      map((response: any) => response)
    ).subscribe(
      (response: any) => {
        console.log('Server response: ', response);
    
        const auth = response.auth;
  
        // Set the authentication value in  AuthGuard 
        this.authGuard.setAuthenticated(auth);
    
        this.router.navigate(['home']);
      },
      (error) => {
        console.error('Server error: ', error);
        this.errorHandler.handleError(error);
      }
    );
  }
   
   

}
