import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { api } from '../api';
import { ErrorHandler } from '@angular/core';
import { Observer } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

const addUser = api.singUp;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  loginform!: FormGroup;
  showForm = true;
  loading=false;

  constructor(private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private errorHandler: ErrorHandler,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading=true;
    console.log('Formdata', this.loginform.value);
    this.http.post(addUser, this.loginform.value).subscribe({
      next: (response) => {
        console.log('Server response: ', response);
        this.loginform.reset();
        this.showForm = false;
        this.router.navigate(['home']);
      },
      error: (error) => {
        this.loading=false;
        console.error('Server error: ', error);
        this.snackBar.open('error:'+error.error.message, 'Close', {
          duration: 5000,
           });
      }
    });
  }
}
