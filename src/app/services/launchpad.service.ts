import { Injectable, signal } from '@angular/core';
import { WebMidi } from "webmidi";

@Injectable({
  providedIn: 'root'
})
export class LaunchpadService {

  connected = signal(false);
  pads = signal([]);
  notes: string[] = [];

  constructor() { }

  connect() {
    WebMidi
    .enable()
    .then(() => {
      this.connected.set(true);
      if (WebMidi.inputs.length > 0) {
        const myInput = WebMidi.getInputById(WebMidi.inputs[1].id);
        myInput.addListener("noteon", e => {
          console.log(e.note.identifier);
          this.notes.push(e.note.identifier);
          console.log(this.notes);
        });
      }


      // const myOutput = WebMidi.getOutputById(WebMidi.outputs[1].id);
      // console.log(myOutput);
      // myOutput?.channels[1].sendPitchBend(-0.25).playNote('C3');
    })
    .catch(err => {
      console.error(err);
      this.connected.set(false);
    });
  }

  getPads() {
    return [
      'B4', 'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5',
      'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5', 'C#5',
      'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4',
      'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4',
      'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3',
      'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3',
      'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3',
      'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3',
      'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2'
    ];
  }
}
