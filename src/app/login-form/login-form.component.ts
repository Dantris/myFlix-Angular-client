/**
 * @fileoverview This file contains the logic for the Login Form component.
 * It allows users to log in to the myFlix app by entering their username and password.
 * @module LoginFormComponent
 */

import { Component, Input, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

/**
 * @component
 * @description This component represents the login form for users to authenticate.
 * It communicates with the backend API to log in users and stores the token and user details in localStorage.
 * It also provides user feedback through a snackbar notification.
 */
@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
  ]
})
export class LoginFormComponent {
  /**
   * Contains the user input data for login, including the username and password.
   * @type {{ username: string, password: string }}
   */
  @Input() loginData = { username: '', password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for making API requests.
   * @param {MatDialogRef<LoginFormComponent>} dialogRef - Reference to the opened dialog, allowing for the dialog to be closed programmatically.
   * @param {MatSnackBar} snackBar - Provides feedback to the user with notifications (snackbars).
   * @param {Object} platformId - Platform ID used to detect if the app is running in a browser or server environment.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  /**
   * Logs in the user by making an API call and storing the returned token and user details in localStorage.
   * If login is successful, it closes the login dialog and shows a success message.
   * If login fails, it displays an error message.
   * 
   * @function loginUser
   * @returns {void}
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        if (isPlatformBrowser(this.platformId)) {
          // Safely access localStorage only if in browser environment
          localStorage.setItem('token', result.token);  
          localStorage.setItem('user', JSON.stringify(result.user));  
        }
        this.dialogRef.close();
        this.snackBar.open('User logged in successfully!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('Login failed. Please check your credentials.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
