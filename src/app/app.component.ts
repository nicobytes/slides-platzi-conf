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
      console.log(WebMidi.inputs[0].id);
      myInput.addListener("noteon", e => {
        console.log(e.note.identifier);
      });

      const myOutput = WebMidi.getOutputById(WebMidi.outputs[1].id);
      console.log(myOutput);
      myOutput?.channels[1].sendPitchBend(-0.25).playNote('C3');
    })
    .catch((err: any) => alert(err));
  }
}
