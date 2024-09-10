/**
 * @fileoverview This file defines the UserRegistrationFormComponent, which handles user registration by
 * capturing the user's information and sending it to the API.
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { isPlatformBrowser } from '@angular/common';

/**
 * @component
 * @description This component is responsible for registering new users by capturing user input 
 * (username, password, email, and birthday) and sending it to the API.
 */
@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
  imports: [
    MatDialogModule, 
    MatSnackBarModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule, 
    FormsModule,
  ],
})
export class UserRegistrationFormComponent implements OnInit {
  
  /**
   * Stores the user's registration data, including username, password, email, and birthday.
   * @type {{ username: string, password: string, email: string, birthday: string }}
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service to make API requests.
   * @param {MatDialogRef<UserRegistrationFormComponent>} dialogRef - Reference to the opened dialog, allowing it to be closed programmatically.
   * @param {MatSnackBar} snackBar - Angular Material Snackbar for showing feedback messages to the user.
   * @param {Object} platformId - Injected platform ID used to determine if the app is running in a browser or server environment.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Currently empty, but can be used for initialization tasks.
   * @function ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {}

  /**
   * Registers a new user by sending the user data to the API.
   * On success, the user data is stored in localStorage, and the dialog is closed.
   * If there is an error, error messages are displayed using the snackbar.
   * @function registerUser
   * @returns {void}
   */
  registerUser(): void {
    // Format user data, particularly the birthday, as ISO string
    const formattedUserData = {
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email,
      birthday: new Date(this.userData.birthday).toISOString(),
    };

    // Call the API to register the user
    this.fetchApiData.userRegistration(formattedUserData).subscribe(
      (result) => {
        console.log(result);
        
        if (isPlatformBrowser(this.platformId)) {
          // Safely access localStorage only in browser environment
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
        }

        // Show success message and close dialog
        this.snackBar.open('User registered successfully!', 'OK', { duration: 2000 });
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error during registration:', error);
        
        // Show error messages if validation errors exist
        if (error.error.errors) {
          error.error.errors.forEach((err: any) => {
            this.snackBar.open(err.msg, 'OK', { duration: 3000 });
          });
        } else {
          this.snackBar.open('An error occurred. Please try again.', 'OK', { duration: 3000 });
        }
      }
    );
  }
}
