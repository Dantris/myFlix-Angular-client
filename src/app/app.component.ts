import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { CommonModule } from '@angular/common';  // For directives like ngIf, ngFor

@Component({
  selector: 'app-root',
  standalone: true,  // Mark as standalone
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,      // For ngIf, ngFor, etc.
    MatDialogModule,   // To open the dialog
    MatButtonModule,   // For Material buttons
    UserRegistrationFormComponent,  // Import the form as a standalone component
    LoginFormComponent  // Add LoginFormComponent here
  ]
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(public dialog: MatDialog) {}

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '400px',
    });
  }

  openLoginDialog(): void {
    this.dialog.open(LoginFormComponent, {
      width: '400px',
    });
  }
}
