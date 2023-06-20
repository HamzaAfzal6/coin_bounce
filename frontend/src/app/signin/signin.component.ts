import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { api } from '../api';
import { Router } from '@angular/router';
import { ErrorHandler } from '@angular/core';
import { Observer, map } from 'rxjs';
import { AuthGuard } from '../authGuard';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userService } from 'src/userService';

const singin=api.singIn;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginform!: FormGroup;
  loading = false;
  
  constructor(   private formBuilder: FormBuilder,
    private errorHandler: ErrorHandler,
    private http: HttpClient,
    private router: Router,
    private authGuard:AuthGuard,
    private snackBar: MatSnackBar,
    private userService: userService) {
    
  }
  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.loading=true;
    console.log(this.loginform);
    this.http.post(singin, this.loginform.value).pipe(
      map((response: any) => response)
    ).subscribe(
      (response: any) => {
        console.log('Server response: ', response);
        const auth = response.auth;
        this.userService.setUserId(response._id);
        this.authGuard.setAuthenticated(auth);
        this.loginform.reset();
        
        this.router.navigate(['home']);
      },
      (error) => {
        this.loading=false;
        //this.errorHandler.handleError(error);
        console.error('Server error: ', error);
        this.snackBar.open(error.error.message, 'Close', {
          duration: 5000,
           });
      }
    );
  }
  
   


}


