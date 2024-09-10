/**
 * @fileoverview This file defines the UserProfileComponent, which allows users to view and update 
 * their profile details, view their favorite movies, and delete their account.
 * @module UserProfileComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';  // For [(ngModel)]
import { Router } from '@angular/router';  // Import Angular Router

/**
 * @component
 * @description UserProfileComponent allows users to view and update their profile, view favorite movies, 
 * delete their account, and navigate through the application.
 */
@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    CommonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ]
})
export class UserProfileComponent implements OnInit {
  /**
   * Stores the user's profile data including username, password, email, and birthday.
   * @type {{ username: string, password: string, email: string, birthday: string }}
   */
  userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * Stores the user's favorite movies.
   * @type {Array<any>}
   */
  favoriteMovies: any[] = [];

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API requests.
   * @param {MatSnackBar} snackBar - Angular Material Snackbar for displaying notifications.
   * @param {Router} router - Angular Router for navigation between views.
   */
  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router  // Inject Angular Router
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized.
   * It fetches the user's data and favorite movies.
   * @function ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.getUserData();
  }

  /**
   * Fetches the user's data (username, email, birthday) and favorite movies from the API.
   * Updates the component state with the retrieved data.
   * @function getUserData
   * @returns {void}
   */
  getUserData(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe((res: any) => {
        console.log(res);  // Check if the correct data is returned

        this.userData.username = res.username;
        this.userData.email = res.email;
        this.userData.birthday = res.birthday; // Ensure it's formatted as needed
        this.favoriteMovies = res.favoriteMovies;
      });
    }
  }

  /**
   * Updates the user's profile data by calling the API service.
   * @function updateProfile
   * @returns {void}
   */
  updateProfile(): void {
    this.fetchApiData.editUser(this.userData.username, this.userData).subscribe(() => {
      this.snackBar.open('Profile updated successfully!', 'OK', { duration: 2000 });
    });
  }

  /**
   * Deletes the user's account by calling the API service. 
   * Clears local storage and redirects the user to the welcome page.
   * @function deleteProfile
   * @returns {void}
   */
  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.userData.username).subscribe(() => {
      this.snackBar.open('Account deleted successfully!', 'OK', { duration: 2000 });
      localStorage.clear(); // Clear user data from local storage
      this.router.navigate(['/welcome']);  // Navigate back to welcome/login page
    });
  }

  /**
   * Navigates the user back to the welcome page.
   * @function goBack
   * @returns {void}
   */
  goBack(): void {
    this.router.navigate(['/welcome']);
  }
}
