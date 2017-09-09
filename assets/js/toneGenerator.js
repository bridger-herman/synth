function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
}

function ToneGenerator(note, velocity, context) {
  this.audioContext = context
  this.note = note;
  this.currentOsc = null;

  this.masterGainNode = this.audioContext.createGain();
  this.masterGainNode.connect(this.audioContext.destination);
  this.masterGainNode.gain.value = velocity/128;

  // TODO add performance.now() to have higher precision timing
  this.playTone = function() {
    // console.log(self.toneIndex + " " + (Date.now()));
    this.currentOsc = this.audioContext.createOscillator();
    this.currentOsc.connect(this.masterGainNode);
    this.currentOsc.frequency.value = frequencyFromNoteNumber(this.note);
    this.currentOsc.type = "square";
    this.currentOsc.start();
  }

  this.stopTone = function() {
    this.currentOsc.stop();
    this.currentOsc = null;
  }
}
