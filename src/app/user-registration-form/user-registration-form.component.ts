import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCardActions } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatCardHeader,
    MatCardFooter,
    MatFormField,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'], // corrected to 'styleUrls'
})

export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {}

  // This is the function responsible for sending the form inputs to the backend
  registerUser(): void {
    const formattedUserData = {
      username: this.userData.username, // Use lowercase for username field
      password: this.userData.password, // Use lowercase for password field
      email: this.userData.email,       // Use lowercase for email field
      birthday: new Date(this.userData.birthday).toISOString(), // Format birthday
    };
  
    this.fetchApiData.userRegistration(formattedUserData).subscribe(
      (result) => {
        console.log(result);
        this.snackBar.open('User registered successfully!', 'OK', { duration: 2000 });
        this.dialogRef.close(); // Close dialog on success
      },
      (error) => {
        console.error('Error during registration:', error);
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
