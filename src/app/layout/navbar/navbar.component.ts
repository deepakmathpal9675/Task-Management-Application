import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    FlexLayoutModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isMenuActive: boolean = false;
  constructor(private router: Router, private authService: AuthService, private notify: NotificationService) {}

  ngOnInit() {
    
  }
  
  onToggleAndExecute(){
    this.isMenuActive = !this.isMenuActive;
    console.log(this.isMenuActive)
  }
  onCloseAndExecute(){
    this.isMenuActive = !this.isMenuActive;
    console.log(this.isMenuActive)
  }
  logout() {
    this.notify.openSnackBar('Logout successful!', 'Close')
    this.authService.logout()
    // Clear the user token from local storage
    localStorage.removeItem('userToken');

    // Optionally, clear any other user-related data
    //localStorage.removeItem('user'); // Adjust based on your implementation

    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
