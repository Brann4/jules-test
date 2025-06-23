import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth {
  username = '';
  password = '';
  authMessage = '';
  loginSuccess = false;

  login(): void {
    if (this.username === 'user' && this.password === 'password') {
      this.authMessage = 'Login successful!';
      this.loginSuccess = true;
      console.log('Login successful for user:', this.username);
    } else {
      this.authMessage = 'Invalid username or password.';
      this.loginSuccess = false;
      console.log('Login failed for user:', this.username);
    }
  }
}
