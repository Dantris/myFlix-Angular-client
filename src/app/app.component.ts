import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<router-outlet></router-outlet>`,  // This allows the MovieCardComponent to be rendered
  imports: [RouterOutlet]
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}

