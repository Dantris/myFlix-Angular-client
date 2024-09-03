import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  // Inject HttpClient module to be used for API calls
  constructor(private http: HttpClient) { }

  // Define your API base URL (replace with your actual backend URL)
  private apiUrl = 'https://your-api-url.com/';

  // Example for User Registration:
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}users`, userDetails);
  }

  // Implement the rest of the API calls
  // User Login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}login`, userDetails);
  }

  // Get all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}movies`);
  }

  // Get one movie by title
  public getMovie(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}movies/${title}`);
  }

  // Get director details by name
  public getDirector(directorName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}directors/${directorName}`);
  }

  // Get genre details by name
  public getGenre(genreName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}genres/${genreName}`);
  }

  // Get user details
  public getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}users/${username}`);
  }

  // Get favorite movies for a user
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}users/${username}/movies`);
  }

  // Add a movie to favorite movies
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}users/${username}/movies/${movieId}`, {});
  }

  // Edit user details
  public editUser(username: string, userDetails: any): Observable<any> {
    return this.http.put(`${this.apiUrl}users/${username}`, userDetails);
  }

  // Delete user
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}users/${username}`);
  }

  // Delete a movie from favorite movies
  public removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}users/${username}/movies/${movieId}`);
  }
}
