/**
 * @fileoverview This file defines the WelcomePageComponent, which is the landing page of the application. 
 * It allows users to register, log in, and navigate to other sections of the application.
 * @module WelcomePageComponent
 */

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgIf, CommonModule } from '@angular/common'; // Import NgIf and CommonModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';

/**
 * @component
 * @description This component serves as the welcome page for users. 
 * Users can register, log in, or navigate to other parts of the application such as movies and profile.
 */
@Component({
  selector: 'app-welcome-view',
  standalone: true,
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  imports: [CommonModule, MatDialogModule, MatButtonModule, NgIf], // Include CommonModule, MatDialogModule, MatButtonModule, and NgIf
})
export class WelcomePageComponent {
  /**
   * Tracks if the user is currently logged in.
   * @type {boolean}
   */
  isLoggedIn = false;

  /**
   * @constructor
   * @param {MatDialog} dialog - Angular Material Dialog service for opening registration and login dialogs.
   * @param {Router} router - Angular Router for navigating between pages.
   */
  constructor(public dialog: MatDialog, private router: Router) {}

  /**
   * Lifecycle hook that runs when the component is initialized. 
   * It checks if the user is logged in by looking for the user in local storage.
   * @function ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.isLoggedIn = true;
    }
  }

  /**
   * Opens the user registration dialog where users can sign up for an account.
   * @function openUserRegistrationDialog
   * @returns {void}
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, { width: '280px' });
  }

  /**
   * Opens the user login dialog where users can log in to their account.
   * After the dialog is closed, it checks if the user is now logged in by looking for the user in local storage.
   * @function openUserLoginDialog
   * @returns {void}
   */
  openUserLoginDialog(): void {
    this.dialog.open(LoginFormComponent, { width: '280px' }).afterClosed().subscribe(() => {
      const user = localStorage.getItem('user');
      if (user) {
        this.isLoggedIn = true;
      }
    });
  }

  /**
   * Logs the user out by removing their information from local storage and setting the `isLoggedIn` flag to false.
   * @function logout
   * @returns {void}
   */
  logout(): void {
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  /**
   * Redirects the user to the movies page.
   * @function redirectToMovies
   * @returns {void}
   */
  redirectToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Redirects the user to the profile page.
   * @function redirectToProfile
   * @returns {void}
   */
  redirectToProfile(): void {
    this.router.navigate(['profile']);
  }
}
