import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatButtonModule } from '@angular/material/button'; // Import button module
import { MatDialogModule } from '@angular/material/dialog'; // Import dialog module
import { CommonModule } from '@angular/common'; // Needed for *ngIf

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [
    CommonModule, // For *ngIf and other Angular directives
    MatButtonModule, // Ensure button module is imported
    MatDialogModule, // Import dialog module
  ],
})
export class WelcomePageComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    // Check if the 'window' object is available, which ensures we're on the client-side
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;  // Return false if not on the client-side
  }

  // Logout method
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      this.router.navigate(['/']);
    }
  }
  

  // Open User Registration dialog
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px',
    });
  }

  // Open Login dialog
  openLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '400px',
    });
  }
}
