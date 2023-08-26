import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgStyle } from '@angular/common';
import { PadComponent } from '@app/components/pad/pad.component';
import { LaunchpadService } from '@app/services/launchpad.service';
import { Pad } from '@app/models';
import { debounce, debounceTime, delay } from 'rxjs';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [NgFor, PadComponent, NgStyle],
  templateUrl: './grid.component.html'
})
export class GridComponent {

  private launchpad = inject(LaunchpadService);
  private cd = inject(ChangeDetectorRef);
  noteOn$ = this.launchpad.noteOn.asObservable();
  noteOff$ = this.launchpad.noteOff.asObservable();
  pads: Pad[] = this.launchpad.getPads().map((identifier) => ({
    identifier,
    color: 'black'
  }));

  constructor() {
    this.noteOn$.subscribe((identifier) => {
      console.log(identifier);
      const index = this.pads.findIndex((p) => p.identifier === identifier);
      if (index !== -1) {
        this.pads[index].color = this.getRandomColor();
        this.cd.detectChanges();
      }
    });
    this.noteOff$
      .pipe(
        delay(2000)
      )
      .subscribe((identifier) => {
        const index = this.pads.findIndex((p) => p.identifier === identifier);
        if (index !== -1) {
          this.pads[index].color = 'black';
          this.cd.detectChanges();
        }
      })
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const colorHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

    return colorHex;
  }


}
