import { Component, QueryList, ViewChildren, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { Emoji } from '@app/models/emoji.model';
import { EmojiComponent } from '@app/components/emoji/emoji.component';
import { EMOJIS } from '@app/utils/emojis';
import { AudioTaskService } from '@app/services/audio-task.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-emoji-rain',
  standalone: true,
  imports: [NgFor, EmojiComponent],
  template: `
    <div class="h-screen w-screen bg-black relative overflow-hidden">
      <p
        class="text-white uppercase text-8xl absolute top-2/4 left-2/4 -translate-x-1/2 -translate-y-2/4"
      >
        Emoji Rain
      </p>
      <app-emoji
        *ngFor="let item of emojis"
        [x]="item.x"
        [y]="item.y"
        [emoji]="item.emoji"
      ></app-emoji>
    </div>
  `,
})
export class EmojiRainComponent {
  private audio = inject(AudioTaskService);
  emojis: Emoji[] = [];
  @ViewChildren(EmojiComponent) emojisComps!: QueryList<EmojiComponent>;
  categories$ = this.audio.categories$.asObservable();

  constructor() {
    this.categories$
    .pipe(
      debounceTime(200)
    )
    .subscribe((values) => {
      console.log(
        values.map(
          (item) => `${item.categoryName} ${item.index} ${EMOJIS[item.index]}`
        )
      );
      this.generateEmojis(values.map((item) => item.index));
    });
  }

  ngOnInit() {
    this.start();
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => this.animate());
  }

  generateEmojis(indexes: number[]) {
    indexes.forEach((index) => {
      this.addEmoji(EMOJIS[index]);
      this.addEmoji(EMOJIS[index]);
    });
  }

  addEmoji(emoji: string) {
    const { x, y } = this.getRandomPosition(
      window.innerWidth,
      window.innerHeight
    );
    this.emojis.push({emoji, x, y,});
  }

  animate() {
    this.emojisComps.forEach((item, index) => {
      item.update();
      if (item.y > window.innerHeight) {
        this.emojis.splice(index, 1);
      }
    });
    requestAnimationFrame(() => this.animate());
  }

  async start() {
    await this.audio.createAudioClassifier(1);
    await this.audio.runStreamingAudioClassification();
  }

  getRandomPosition(screenWidth: number, screenHeight: number) {
    return {
      x: Math.floor(Math.random() * screenWidth),
      y: Math.floor(Math.random() * screenHeight),
    };
  }
}
