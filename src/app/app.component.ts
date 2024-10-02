import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AppModule } from './app.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,CommonModule,AppComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  //title = 'Task_Management_Application';
  title = 'Task Management Application';
  private deferredPrompt: any;

  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the mini info bar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = event;
      // Optionally, show your install button or prompt here
    });
    
  }

  // Method to show the install prompt
  showInstallPrompt() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        this.deferredPrompt = null; // Clear the stored prompt
      });
    }
  }

}
