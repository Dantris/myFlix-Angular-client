import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Input() loginData = { username: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        localStorage.setItem('token', result.token);  // Store the token
        localStorage.setItem('user', JSON.stringify(result.user));  // Optionally store user details
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
