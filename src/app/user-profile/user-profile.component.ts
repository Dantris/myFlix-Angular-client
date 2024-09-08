import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // For snack bar notifications
import { MatCardModule } from '@angular/material/card';    // For material card layout
import { MatFormFieldModule } from '@angular/material/form-field'; // For form fields
import { MatInputModule } from '@angular/material/input';   // For input fields
import { MatButtonModule } from '@angular/material/button'; // For buttons
import { FormsModule } from '@angular/forms';               // Needed for two-way binding
import { CommonModule } from '@angular/common';             // Needed for structural directives like *ngIf, *ngFor

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true, // Mark component as standalone
  imports: [
    MatCardModule,         // Material Card
    MatFormFieldModule,    // Material Form Fields
    MatInputModule,        // Material Inputs
    MatButtonModule,       // Material Buttons
    FormsModule,           // Angular FormsModule for two-way binding
    CommonModule           // CommonModule for *ngFor, *ngIf directives
  ]
})
export class UserProfileComponent implements OnInit {
  userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getUser(username).subscribe((res: any) => {
        this.userData = res;
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
    });
  }
}
