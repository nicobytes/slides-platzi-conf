import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LaunchpadService } from './services/launchpad.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {

  private lauchpad = inject(LaunchpadService);

  ngOnInit() {
    this.lauchpad.connect();
  }
}
