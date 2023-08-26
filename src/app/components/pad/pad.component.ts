import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pad.component.html'
})
export class PadComponent {
  @Input({ required: true }) identifier: string = '';
  @Input({ required: true }) color: string = '';
}
