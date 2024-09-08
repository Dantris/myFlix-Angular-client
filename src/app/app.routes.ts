import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { UserProfileComponent } from './user-profile/user-profile.component'; 


import { AppComponent } from './app.component';  // Assuming this is the main page with buttons

export const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'register', component: UserRegistrationFormComponent },
  { path: 'movies', component: MovieCardComponent }, // Ensure this path is correct
  { path: 'login', component: LoginFormComponent },
  { path: 'profile', component: UserProfileComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}