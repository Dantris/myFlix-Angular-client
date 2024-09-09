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
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  // Fetch all movies
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.checkFavoriteMovies();
    }, err => {
      console.error('Failed to fetch movies:', err);
    });
  }

  // Fetch favorite movies of the user
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

  // Check if the movies are in favorites and update the UI
  checkFavoriteMovies(): void {
    this.movies.forEach((movie) => {
      movie.isFavorite = this.favoriteMovies.some((favMovie: any) => favMovie._id === movie._id);
    });
  }

  // Toggle favorite movie status
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

  // Show movie details
  showDetail(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: { title: movie.title, content: movie.description },
      width: '400px'
    });
  }

  // Show genre details
  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: { title: movie.genre.name, content: movie.genre.description },
      width: '400px'
    });
  }

  // Show director details
  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: { title: movie.director.name, content: movie.director.bio },
      width: '400px'
    });
  }

  // Logout functionality
  logout(): void {
    this.router.navigate(['/welcome']);
    localStorage.clear();
  }

  // Redirect to user profile
  redirectProfile(): void {
    this.router.navigate(['/profile']);
  }
}
