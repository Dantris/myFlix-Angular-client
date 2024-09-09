import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

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
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    const formattedUserData = {
      username: this.userData.username,
      password: this.userData.password,
      email: this.userData.email,
      birthday: new Date(this.userData.birthday).toISOString(),
    };

    this.fetchApiData.userRegistration(formattedUserData).subscribe(
      (result) => {
        console.log(result);
        this.snackBar.open('User registered successfully!', 'OK', { duration: 2000 });
        this.dialogRef.close();
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
