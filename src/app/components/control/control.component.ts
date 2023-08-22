import { Component, computed, inject, signal, ChangeDetectorRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioTaskService } from './../../services/audio-task.service';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent {

  private audio = inject(AudioTaskService);
  private cd = inject(ChangeDetectorRef);
  categories$ = this.audio.categories$.asObservable();

  constructor() {
  }

  ngOnInit() {
    this.categories$.subscribe((values) => {
      this.cd.detectChanges();
    });
  }

  async start() {
    await this.audio.createAudioClassifier();
    await this.audio.runStreamingAudioClassification();
  }

}
