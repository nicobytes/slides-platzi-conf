import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wave-micro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wave-micro.component.html'
})
export class WaveMicroComponent {
  @ViewChild('wave', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private audioContext!: AudioContext;
  private analyser!: AnalyserNode;
  private dataArray!: Uint8Array;

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      this.audioContext = new AudioContext();
      const inputNode = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 2048;
      inputNode.connect(this.analyser);

      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.visualize();
    })
  }

  visualize() {
    const canvas = this.canvasRef.nativeElement;
    const canvasContext = canvas.getContext('2d');
    if (!canvasContext) return;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvasContext.lineWidth = 2;
    canvasContext.strokeStyle = 'rgb(0, 0, 0)';
    canvasContext.beginPath();

    const sliceWidth = canvas.width * 1.0 / this.dataArray.length;
    let x = 0;

    this.analyser.getByteTimeDomainData(this.dataArray);

    for (let i = 0; i < this.dataArray.length; i++) {
      const v = this.dataArray[i] / 128.0;
      const y = v * canvas.height / 2;

      if (i === 0) {
        canvasContext.moveTo(x, y);
      } else {
        canvasContext.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasContext.lineTo(canvas.width, canvas.height / 2);
    canvasContext.stroke();

    requestAnimationFrame(() => this.visualize());
  }

}
