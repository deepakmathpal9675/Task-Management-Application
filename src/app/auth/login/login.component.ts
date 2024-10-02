import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AppComponent } from '../../app.component';
import { CustomDirectivesModule } from '../../shared/custom-directives/custom-directive.module';
// import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomToastrModule } from '../../Modules/toastr/toastr.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CustomDirectivesModule,
    CustomToastrModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  title = 'Task Management Application';
  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService
  ) {}
  
  // onLogin(form: NgForm) {
  //   debugger;
  //   this.username = form.value.username.toUpperCase();
  //   this.password = form.value.password.toUpperCase();

  //   // if (this.username == 'ADMIN' &&this.password == 'PASSWORD' ) {
  //     if (this.authService.login(this.username, this.password)) {
  //       this.router.navigate(['/dashboard']);
  //     } else {
  //       alert('Invalid credentials');
  //     }
  //   }
  // //   else {
  // //     alert('Invalid credentials');
  // //   }
  // // }
  onLogin(form: NgForm) {
    // this.username = form.value.username;
    // this.password = form.value.password;
    if (this.authService.login(this.username, this.password)) {
      // this.router.navigate(['/dashboard']);
      // this.toastr.success('success','')
      this.notify.openSnackBar('Login successful!', 'Close');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}
