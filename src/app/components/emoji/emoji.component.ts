import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-emoji',
  standalone: true,
  imports: [NgStyle],
  template: `
    <span class="text-3xl absolute" [ngStyle]="styles">{{ emoji }}</span>
  `,
})
export class EmojiComponent {
  private moveY: number = 1 + Math.random() * 1;
  private moveX: number = -0.15 + Math.random() * 0.3;

  @Input({ required: true }) emoji: string = '';
  @Input({ required: true }) x: number = 0;
  @Input({ required: true }) y: number = 0;

  styles = {
    color: 'hsl(' + ((Math.random() * 360) | 0) + ',80%,50%)',
    opacity: '0',
    transform: `translate3d(${this.x}px, ${this.y}px,  0px)`,
  };

  update() {
    this.y += this.moveY;
    this.x += this.moveX;
    this.styles.transform = `translate3d(${this.x}px, ${this.y}px,  0px)`;
    this.styles.opacity = `1`;
  }
}
