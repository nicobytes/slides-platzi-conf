import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { PadComponent } from '@app/components/pad/pad.component';
import { LaunchpadService } from '@app/services/launchpad.service';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [NgFor, PadComponent],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent {

  private lauchpad = inject(LaunchpadService);
  pads = this.lauchpad.getPads();
}
