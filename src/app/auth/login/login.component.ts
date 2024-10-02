import { Component, OnInit, ViewChild } from '@angular/core';
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
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  title = 'Task Management Application';
  private deferredPrompt: any;
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private notify: NotificationService
  ) {}
  ngOnInit() {
    if (typeof window !== 'undefined') {
      // Safe to use window
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        this.deferredPrompt = event;
      });
    }
    
  }
  
  onLogin(form: NgForm) {
    if (this.authService.login(this.username, this.password)) {
      this.notify.openSnackBar('Login successful!', 'Close');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
  showInstallPrompt() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null;
      });
    }
  }
}
