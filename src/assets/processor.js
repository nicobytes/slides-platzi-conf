// processor.js
// This file is evaluated in the audio rendering thread
// upon context.audioWorklet.addModule() call.

class Processor extends AudioWorkletProcessor {
  process([input], [output]) {
    console.log(input, output);
    output[0].set(input[0]);
    return true;
  }
}

registerProcessor("processor", Processor);
