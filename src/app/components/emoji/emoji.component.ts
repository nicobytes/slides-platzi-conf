import { Component, Input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-emoji',
  standalone: true,
  imports: [NgStyle],
  template: ` <span class="text-3xl absolute" [ngStyle]="styles">{{ emoji }}</span> `,
})
export class EmojiComponent {
  @Input({ required: true }) emoji!: string;
  @Input({ required: true }) x!: number;
  @Input({ required: true }) y!: number;
  @Input({ required: true }) v!: { x: number; y: number };
  @Input({ required: true }) range!: [number, number];

  styles: Record<string, string> = {
    color: 'hsl(' + ((Math.random() * 360) | 0) + ',80%,50%)',
    opacity: '0',
  };

  update() {
    if (this.y > 800) {
      this.y = 80 + Math.random() * 4;
      this.x = this.range[0] + Math.random() * this.range[1];
    }
    this.y += this.v.y;
    this.x += this.v.x;
    this.styles['opacity'] = '1';
    this.styles['transform'] =
      'translate3d(' + this.x + 'px, ' + this.y + 'px, 0px)';
  }
}
