import { Component, effect, inject, signal } from '@angular/core';
import { NgFor, NgOptimizedImage } from '@angular/common';
import { AudioTaskService } from '@app/services/audio-task.service-demo';
import { DalleService } from '@app/services/dalle.service';
import { concatMap, debounceTime, delay, of } from 'rxjs';
import { EMOJIS } from '@app/utils/emojis';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [NgFor, NgOptimizedImage],
  template: `
    <div class="h-screen w-screen">
      <div class="grid grid-cols-4 grid-rows-4 gap-4 h-screen w-screen">
        <div class="relative" *ngFor="let img of images()">
          <img [ngSrc]="img" alt="img" fill>
        </div>
      </div>
    </div>
  `
})
export class ImagesComponent {
  private audio = inject(AudioTaskService);
  private dalle = inject(DalleService);
  categories$ = this.audio.categories$.asObservable();
  images = signal<string[]>([]);
  emojis = signal<string[]>([]);

  constructor() {
    this.categories$
      .pipe(
        concatMap((categories) => of(categories).pipe(delay(3000))),
      )
      .subscribe((values) => {
        if (values.length > 0) {
          this.emojis.update(prev => [values[0].categoryName, ...prev]);
        }
      });
    effect(() => {
      if (this.emojis().length > 0) {
        this.generateImg(this.emojis().slice(0,3).join(' '));
      }
    });
  }

  ngOnInit() {
    this.start();
  }

  generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async start() {
    await this.audio.createAudioClassifier(1);
    await this.audio.runStreamingAudioClassification();
  }

  generateImg(emojis: string) {
    const prompt = `${emojis}, digital art`;
    console.log(prompt);
    this.dalle.generateImage(prompt)
      .subscribe((res) => {
        console.log(res);
        this.images.update(prev => [...prev, ...res.data.map(d => d.url)]);
      });
  }
}
