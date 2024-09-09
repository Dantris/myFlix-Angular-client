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
  userData = { username: '', password: '', email: '', birthday: '' };
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router  // Inject Angular Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

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

  updateProfile(): void {
    this.fetchApiData.editUser(this.userData.username, this.userData).subscribe(() => {
      this.snackBar.open('Profile updated successfully!', 'OK', { duration: 2000 });
    });
  }

  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.userData.username).subscribe(() => {
      this.snackBar.open('Account deleted successfully!', 'OK', { duration: 2000 });
      localStorage.clear(); // Clear user data from local storage
      this.router.navigate(['/welcome']);  // Navigate back to welcome/login page
    });
  }

  goBack(): void {
    this.router.navigate(['/welcome']);
  }
}
