import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from '@app/components/canvas/canvas.component';
import { GridComponent } from '@app/components/grid/grid.component';
import { WaveMicroComponent } from '@app/components/wave-micro/wave-micro.component';
import { ControlAudioComponent } from '@app/components/control-audio/control-audio.component';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [CommonModule, CanvasComponent, GridComponent, WaveMicroComponent, ControlAudioComponent],
  templateUrl: './control.component.html'
})
export class ControlComponent {


}
