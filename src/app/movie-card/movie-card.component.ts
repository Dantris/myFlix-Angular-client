import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';  
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';  
import { MatIconModule } from '@angular/material/icon'; 
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { CommonModule } from '@angular/common'; // Needed for *ngFor, *ngIf

@Component({
  selector: 'app-movie-card',
  
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: true, // Mark component as standalone
  imports: [
    MatCardModule,       // For material card layout
    MatButtonModule,     // For material buttons
    MatIconModule,       // For material icons
    // MatDialog,           // For dialogs
    // MatSnackBar,         // For snackbars
    CommonModule         // For common Angular directives like *ngFor and *ngIf
  ]
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];  // Store the list of movies

  constructor(
    private dialog: MatDialog, 
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar  
  ) {}

  ngOnInit(): void {
    console.log("MovieCardComponent initialized");
    this.getMovies();  // This should fetch the movies
  }
  

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;  // Store the movies
      console.log(this.movies);  // Check if the movies are logged in the console
    });
  }

  openGenreDialog(genre: string): void {
    this.dialog.open(GenreDialogComponent, { data: { genre } });
  }

  openDirectorDialog(director: string): void {
    this.dialog.open(DirectorDialogComponent, { data: { director } });
  }

  openMovieDetailsDialog(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, { data: { movie } });
  }

  addToFavorites(movieId: string): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.addFavoriteMovie(username, movieId).subscribe(() => {
        this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
      });
    }
  }
}
