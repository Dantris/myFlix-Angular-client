/**
 * @fileoverview This file defines the MovieCardComponent, which displays a list of movies and 
 * allows users to interact with movie data, such as adding or removing favorite movies, 
 * viewing movie details, and managing user actions.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; 
import { MessageBoxComponent } from '../message-box/message-box.component';

/**
 * @component
 * @description Displays a list of movies and allows users to mark movies as favorites, view movie, genre, 
 * and director details, and manage user actions such as logout or profile navigation.
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    HttpClientModule
  ]
})
export class MovieCardComponent implements OnInit {
  /**
   * Array to store all movies fetched from the API.
   * @type {Array<any>}
   */
  movies: any[] = [];

  /**
   * Array to store the user's favorite movies fetched from the API.
   * @type {Array<any>}
   */
  favoriteMovies: any[] = [];

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service for API requests.
   * @param {Router} router - Router for navigating between views.
   * @param {MatDialog} dialog - Angular Material Dialog for displaying modals.
   * @param {MatSnackBar} snackBar - SnackBar for user notifications.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  /**
   * Lifecycle hook that runs when the component is initialized. Fetches movies and favorite movies.
   * @function ngOnInit
   * @returns {void}
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  /**
   * Fetches all movies from the API and updates the movies array.
   * @function getMovies
   * @returns {void}
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.checkFavoriteMovies();
    }, err => {
      console.error('Failed to fetch movies:', err);
    });
  }

  /**
   * Fetches the user's favorite movies from the API and updates the favoriteMovies array.
   * @function getFavoriteMovies
   * @returns {void}
   */
  getFavoriteMovies(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe((res: any) => {
        this.favoriteMovies = res;
        this.checkFavoriteMovies();
      }, err => {
        console.error('Failed to fetch favorite movies:', err);
      });
    }
  }

  /**
   * Checks if each movie is in the user's favorite movies and updates the isFavorite flag for each movie.
   * @function checkFavoriteMovies
   * @returns {void}
   */
  checkFavoriteMovies(): void {
    this.movies.forEach((movie) => {
      movie.isFavorite = this.favoriteMovies.some((favMovie: any) => favMovie._id === movie._id);
    });
  }

  /**
   * Adds or removes a movie from the user's favorite movies and updates the UI accordingly.
   * @function modifyFavoriteMovies
   * @param {any} movie - The movie object to be added or removed from favorites.
   * @returns {void}
   */
  modifyFavoriteMovies(movie: any): void {
    const username = localStorage.getItem('username');
    if (movie.isFavorite) {
      this.fetchApiData.deleteFavoriteMovie(username!, movie._id).subscribe((res) => {
        this.snackBar.open(`${movie.title} removed from favorites`, 'OK', { duration: 2000 });
        movie.isFavorite = false;
        this.getFavoriteMovies();
      }, err => {
        console.error(err);
      });
    } else {
      this.fetchApiData.addFavoriteMovie(username!, movie._id).subscribe((res) => {
        this.snackBar.open(`${movie.title} added to favorites`, 'OK', { duration: 2000 });
        movie.isFavorite = true;
        this.getFavoriteMovies();
      }, err => {
        console.error(err);
      });
    }
  }

  /**
   * Opens a dialog to show detailed information about a specific movie.
   * @function showDetail
   * @param {any} movie - The movie object to display in the dialog.
   * @returns {void}
   */
  showDetail(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: { title: movie.title, content: movie.description },
      width: '400px'
    });
  }

  /**
   * Opens a dialog to show detailed information about a movie's genre.
   * @function showGenre
   * @param {any} movie - The movie object whose genre details will be displayed.
   * @returns {void}
   */
  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: { title: movie.genre.name, content: movie.genre.description },
      width: '400px'
    });
  }

  /**
   * Opens a dialog to show detailed information about a movie's director.
   * @function showDirector
   * @param {any} movie - The movie object whose director details will be displayed.
   * @returns {void}
   */
  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: { title: movie.director.name, content: movie.director.bio },
      width: '400px'
    });
  }

  /**
   * Logs the user out by clearing local storage and navigating to the welcome page.
   * @function logout
   * @returns {void}
   */
  logout(): void {
    this.router.navigate(['/welcome']);
    localStorage.clear();
  }

  /**
   * Redirects the user to the profile page.
   * @function redirectProfile
   * @returns {void}
   */
  redirectProfile(): void {
    this.router.navigate(['/profile']);
  }
}
