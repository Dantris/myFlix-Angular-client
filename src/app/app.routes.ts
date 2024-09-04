import { Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { AppComponent } from './app.component';  // Assuming this is the main page with buttons

export const routes: Routes = [
  { path: '', component: AppComponent },  // The main page with Sign Up/Login buttons
  { path: 'register', component: UserRegistrationFormComponent },  // Registration form page
];
