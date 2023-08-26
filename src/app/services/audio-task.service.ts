import { Injectable, signal } from '@angular/core';
import { FilesetResolver, AudioClassifier, Category } from '@mediapipe/tasks-audio';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AudioTaskService {

  audioClassifier!: AudioClassifier;
  audioCtx!: AudioContext;
  categories = signal<Category[]>([]);
  categories$ = new BehaviorSubject<Category[]>([]);

  constructor() {}

  async createAudioClassifier () {
    const audio = await FilesetResolver.forAudioTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-audio@0.10.0/wasm"
    );

    this.audioClassifier = await AudioClassifier.createFromOptions(audio, {
      displayNamesLocale: 'es',
      maxResults: 3,
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/audio_classifier/yamnet/float32/1/yamnet.tflite"
        }
    });
  };

  async runStreamingAudioClassification() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.audioCtx = new AudioContext({ sampleRate: 16000 });

    const source = this.audioCtx.createMediaStreamSource(stream);
    const scriptNode = this.audioCtx.createScriptProcessor(16384, 1, 1);

    scriptNode.onaudioprocess =  (audioProcessingEvent) => {
      const inputBuffer = audioProcessingEvent.inputBuffer;
      let inputData = inputBuffer.getChannelData(0);

      // Classify the audio
      const result = this.audioClassifier.classify(inputData);
      if (result.length > 0) {
        const categories = result[0].classifications[0].categories;
        this.categories$.next(categories);
      }

    };
    source.connect(scriptNode);
    scriptNode.connect(this.audioCtx.destination);
  }

}
