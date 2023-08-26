import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioTaskService } from '@app/services/audio-task.service';

@Component({
  selector: 'app-control-audio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-audio.component.html'
})
export class ControlAudioComponent {
  private audio = inject(AudioTaskService);
  private cd = inject(ChangeDetectorRef);
  categories$ = this.audio.categories$.asObservable();

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
