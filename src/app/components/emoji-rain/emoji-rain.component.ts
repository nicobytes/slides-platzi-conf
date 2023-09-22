import { Component, QueryList, ViewChildren, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Emoji } from '@app/models/emoji.model';
import { EmojiComponent } from '@app/components/emoji/emoji.component';
import { EMOJIS } from '@app/utils/emojis';
import { AudioTaskService } from '@app/services/audio-task.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-emoji-rain',
  standalone: true,
  imports: [NgFor, EmojiComponent, NgIf],
  templateUrl: './emoji-rain.component.html'
})
export class EmojiRainComponent {
  private audio = inject(AudioTaskService);
  emojis: Emoji[] = [];
  @ViewChildren(EmojiComponent) emojisComps!: QueryList<EmojiComponent>;
  categories$ = this.audio.categories$.asObservable();
  isPlaying = signal(false);

  constructor() {
    this.categories$
      .pipe(
        debounceTime(200)
      )
      .subscribe((values) => {
        if (values.length > 0 && this.isPlaying()) {
          const category = values[0];
          console.log(`${category.categoryName} ${category.index} ${EMOJIS[category.index]}`);
          this.generateEmojis([category.index]);
        }
      });
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => this.animate());
  }

  generateEmojis(indexes: number[]) {
    indexes.forEach((index) => {
      this.addEmoji(EMOJIS[index]);
      // this.addEmoji(EMOJIS[index]);
    });
  }

  addEmoji(emoji: string) {
    const { x, y } = this.getRandomPosition(
      window.innerWidth,
      window.innerHeight
    );
    console.log(x,y);
    this.emojis.push({ emoji, x, y, });
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

  async play() {
    if (!this.isPlaying()) {
      this.isPlaying.set(true);
    } else {
      this.isPlaying.set(false);
    }
  }

  getRandomPosition(screenWidth: number, screenHeight: number) {
    return {
      x: Math.floor(Math.random() * screenWidth),
      y: Math.floor(Math.random() * screenHeight),
    };
  }
}
