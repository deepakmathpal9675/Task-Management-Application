import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  // success(message: string, title?: string) {
  //   this.toastr.success(message, title);
  // }

  // error(message: string, title?: string) {
  //   this.toastr.error(message, title);
  // }

  // info(message: string, title?: string) {
  //   this.toastr.info(message, title);
  // }

  // warning(message: string, title?: string) {
  //   this.toastr.warning(message, title);
  // }
}
