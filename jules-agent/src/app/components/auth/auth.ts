import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf, ngClass

@Component({
  selector: 'app-auth',
  // For Standalone Components, imports are directly in the component decorator
  imports: [ FormsModule, CommonModule ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'] // Corrected to styleUrls and made it an array
})
export class Auth {
  username = '';
  password = '';
  authMessage = '';
  loginSuccess = false;

  login(): void {
    // Simple hardcoded authentication for demonstration
    if (this.username === 'user' && this.password === 'password') {
      this.authMessage = 'Login successful!';
      this.loginSuccess = true;
      // In a real app, you'd navigate or manage state
      console.log('Login successful for user:', this.username);
    } else {
      this.authMessage = 'Invalid username or password.';
      this.loginSuccess = false;
      console.log('Login failed for user:', this.username);
    }
  }
}
