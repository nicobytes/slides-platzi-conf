import { Component, QueryList, ViewChildren } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Emoji } from '@app/models/emoji.model';
import { EmojiComponent } from '@app/components/emoji/emoji.component';

@Component({
  selector: 'app-emoji-rain',
  standalone: true,
  imports: [NgFor, EmojiComponent],
  template: `
    <div class="h-screen w-screen bg-black relative overflow-hidden">
      <app-emoji
        *ngFor="let item of circles"
        [x]="item.x"
        [y]="item.x"
        [emoji]="item.emoji"
        [v]="item.v"
        [range]="item.range"
      ></app-emoji>
    </div>
  `,
})
export class EmojiRainComponent {
  emojis = [
    '🌽',
    '🍇',
    '🍌',
    '🍒',
    '🍕',
    '🍷',
    '🍭',
    '💖',
    '💩',
    '🐷',
    '🐸',
    '🐳',
    '🎃',
    '🎾',
    '🌈',
    '🍦',
    '💁',
    '🔥',
    '😁',
    '😱',
    '🌴',
    '👏',
    '💃',
  ];
  circles: Emoji[] = [];
  @ViewChildren(EmojiComponent) comps!: QueryList<EmojiComponent>;

  ngOnInit() {
    this.generateCircles();
  }

  ngAfterViewInit() {
    this.animate();
  }

  generateCircles() {
    for (let i = 0; i < 1000; i++) {
      this.addCircle(i * 150,[10, window.innerWidth-10],this.emojis[Math.floor(Math.random() * this.emojis.length)]);
    }
  }

  addCircle(delay: number, range: [number, number], emoji: string) {
    setTimeout(() => {
      this.circles.push({
        emoji: emoji,
        x: range[0] + Math.random() * range[1],
        y: 80 + Math.random() * 4,
        v: {
          x: -0.15 + Math.random() * 0.3,
          y: 1 + Math.random() * 1,
        },
        range,
      });
    }, delay);
  }

  animate() {
    this.comps.forEach((item) => {
      item.update();
    });
    requestAnimationFrame(() => this.animate());
  }
}
