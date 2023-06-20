import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any){
        this.snackBar.open('An error occurred.'+error.message, 'Close', {
       duration: 5000,
        });
  }
}
