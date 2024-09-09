import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule]  // Import RouterModule here for routing
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}
