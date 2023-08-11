import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WebMidi } from "webmidi";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-launchpad';

  ngOnInit() {
    WebMidi
    .enable()
    .then(() => {
      const myInput = WebMidi.getInputById(WebMidi.inputs[1].id);
      const myOutput = WebMidi.getOutputById(WebMidi.outputs[1].id);
      const myChannel = myOutput?.channels[1];
      myInput.addListener("noteon", e => {
        if (myChannel) {
          myChannel.playNote(e.note.identifier, {
            attack: Math.round(Math.random() * 10) / 10
          });
        }
      });

      myInput.addListener("noteoff", e => {
        if (myChannel) {
          myChannel.playNote(e.note.identifier, {
            attack: Math.round(Math.random() * 10) / 10,
            duration: 1000
          });
        }
      });

    })
    .catch((err: any) => alert(err));
  }
}
