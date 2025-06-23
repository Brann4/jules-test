import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, ngClass

@Component({
  selector: 'app-auth',
  imports: [ FormsModule, CommonModule ], // Add FormsModule and CommonModule
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'] // Changed styleUrl to styleUrls
})
export class Auth {
  username = '';
  password = '';
  authMessage = '';
  loginSuccess = false;

  login() {
    // Simple hardcoded authentication for demonstration
    if (this.username === 'user' && this.password === 'password') {
      this.authMessage = 'Login successful!';
      this.loginSuccess = true;
      // Here you would typically navigate to another page or update application state
      console.log('Login successful for user:', this.username);
    } else {
      this.authMessage = 'Invalid username or password.';
      this.loginSuccess = false;
      console.log('Login failed for user:', this.username);
    }
  }
}
