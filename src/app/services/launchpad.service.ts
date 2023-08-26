import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WebMidi } from "webmidi";

@Injectable({
  providedIn: 'root'
})
export class LaunchpadService {

  connected = signal(false);
  noteOn = new BehaviorSubject('');
  noteOff = new BehaviorSubject('');
  notes: any[] = [];
  audios: Record<string, string> = {
    'E4': './assets/song1/part1.mp3',
    'F4': './assets/song1/part2.mp3',
    'F#4': './assets/song1/part3.mp3',
    'G4': './assets/song1/part4.mp3',
    'C7': './assets/song1/part5.mp3',
    'C#7': './assets/song1/part6.mp3',
  };
  song1 = {
    currentStep: 0,
    files: [
      './assets/song1/p1.mp3',
      './assets/song1/p2.mp3',
      './assets/song1/p3.mp3',
      './assets/song1/p4.mp3',
      './assets/song1/p5.mp3',
      './assets/song1/p6.mp3',
      './assets/song1/p7.mp3',
      './assets/song1/p8.mp3',
      './assets/song1/p9.mp3',
      './assets/song1/p10.mp3',
      './assets/song1/p11.mp3',
      './assets/song1/p12.mp3',
      './assets/song1/p13.mp3',
      './assets/song1/p14.mp3',
      './assets/song1/p15.mp3',
    ]
  }

  constructor() { }

  connect() {
    WebMidi
    .enable()
    .then(() => {
      this.connected.set(true);
      const myInput = WebMidi.getInputById(WebMidi.inputs[1].id);
      const myOutput = WebMidi.getOutputById(WebMidi.outputs[1].id);
      const myChannel = myOutput?.channels[1];
      let audio!: HTMLAudioElement;
      const song = new Audio('./assets/song.wav');

      myInput.addListener("noteon", e => {
        //const file = this.audios[e.note.identifier];
        const file = this.song1.files[this.song1.currentStep];
        console.log(this.song1.currentStep);
        if (file) {
          audio = new Audio(file);
          audio.play();
          if ((this.song1.files.length - 1) === this.song1.currentStep) {
            this.song1.currentStep = 0;
          } else {
            this.song1.currentStep += 1;
          }

        }

        this.noteOn.next(e.note.identifier);
        myChannel?.playNote(e.note.identifier, {
          attack: Math.random()
        });
      });

      myInput.addListener("noteoff", e => {
        this.noteOff.next(e.note.identifier);
        if (audio && audio.played) {
          audio.pause();
        }
        myChannel?.playNote(e.note.identifier, {
          attack: Math.random(),
          duration: 2000,
        });
      });

    })
    .catch(err => {
      console.error(err);
      this.connected.set(false);
    });
  }

  getPads() {
    return [
      'E4', 'F4', 'F#4', 'G4', 'C7', 'C#7', 'D7', 'D#7',
      'C4', 'C#4', 'D4', 'D#4', 'G#6', 'A6', 'A#6', 'B6',
      'G#3', 'A3', 'A#3', 'B3', 'E6', 'F6', 'F#6', 'G6',
      'E3', 'F3', 'F#3', 'G3', 'C6', 'C#6', 'D6', 'D#6',
      'C3', 'C#3', 'D3', 'D#3', 'G#5', 'A5', 'A#5', 'B5',
      'G#2', 'A2', 'A#2', 'B2', 'E5', 'F5', 'F#5', 'G5',
      'E2', 'F2', 'F#2', 'G2', 'C5', 'C#5', 'D5', 'D#5',
      'C2', 'C#2', 'D2', 'D#2', 'G#4', 'A4', 'A#4', 'B4'
    ];
  }

  /*getPads() {
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
  }*/
}
