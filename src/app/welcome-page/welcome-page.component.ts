import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common'; // Import NgIf and CommonModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-welcome-view',
  standalone: true,
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, NgIf], // Include CommonModule, MatDialogModule, MatButtonModule, and NgIf
})
export class WelcomeViewComponent {
  isLoggedIn = false;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn = true;
    }
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, { width: '280px' }).afterClosed().subscribe(() => {
      const user = localStorage.getItem('user');
      if (user) {
        this.isLoggedIn = true;
      }
    });
  }

  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  redirectToMovies(): void {
    this.router.navigate(['movies']);
  }

  redirectToProfile(): void {
    this.router.navigate(['profile']);
  }
}
