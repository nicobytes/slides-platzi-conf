import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Reveal from 'reveal.js';
// @ts-ignore
import Highlight from 'reveal.js/plugin/highlight/highlight.esm.js';
import { WaveAudioComponent } from '@app/components/wave-audio/wave-audio.component';
import { EmojiRainComponent } from '@app/components/emoji-rain/emoji-rain.component';
import { AudioTaskService } from '@app/services/audio-task.service';
import { WaveMicroComponent } from '@app/components/wave-micro/wave-micro.component';
import { ControlAudioComponent } from '@app/components/control-audio/control-audio.component';

@Component({
  selector: 'app-slides',
  standalone: true,
  imports: [CommonModule, WaveAudioComponent, EmojiRainComponent, WaveMicroComponent, ControlAudioComponent],
  templateUrl: './slides.component.html',
})
export class SlidesComponent {

  private audio = inject(AudioTaskService);

  async ngOnInit() {
    Reveal.initialize({
      progress: false,
      autoAnimate: false,
      transition: "none",
      controls: false,
      controlsBackArrows: "hidden",
      autoPlayMedia: false,
      backgroundTransition: 'none',
      disableLayout: false,
      width: window.innerWidth,
      height: window.innerHeight,
      margin: 0,
      plugins: [
        Highlight
      ],
      hash: true
    });
    this.audio.createAudioClassifier(3);
    await this.audio.runStreamingAudioClassification();
  }
}
