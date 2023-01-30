var tFont = [];
var pgTextSize = 75;
var lineHeight = pgTextSize * 0.8;
var bkgdColor, foreColor, fadeColor;

var keyText;
var keyArray = [];

var main = "DANGER";

var groupCount = 7;
var kineticGroups = [];

var budgeCenter = [];
var fullHeight = 0;

let cwidth, cheight;
let cXadjust, cYadjust;
let cScale = 1;

let encoder;

const frate = 30; // frame rate
var numFrames = 105; // num of frames to record
let recording = false;
let recordedFrames = 0;
let recMessageOn = false;

let currentFont;
let saveSizeState = 0;
let horzSpacer;
var newWidth;

var frameFade = 3;

function preload(){
  tFont[0] = loadFont("snap_resources/Inter-Medium.ttf");
  tFont[1] = loadFont("snap_resources/Inter-Black.ttf");
  tFont[2] = loadFont("snap_resources/ApocLC-Regular-Desktop.otf");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  cwidth = int(windowWidth);
  cheight = int(windowHeight);

  bkgdColor = color('#000000');
  foreColor = color('#FFFFFF');
  fadeColor = color('#FFFFFF');
  currentFont = tFont[0];
  newWidth = width;
  newHeight = height;
  horzSpacer = width/2;
  cXadjust = 0;
  cYadjust = 0;

  frameRate(frate);
  noSmooth();
  textureMode(NORMAL);

  setText();
}

function draw(){
  background(bkgdColor);
  if(recording){
    scale(cScale);
  }

  push();
    translate(width/2, height/2);
    if(recording){
      translate(cXadjust, cYadjust);
    }
    
    stroke(foreColor);
    strokeWeight(frameFade);
    noFill();
    rectMode(CENTER);
    rect(0, 0, newWidth + 2, newHeight + 2);
    
    translate(0, -fullHeight/2 + lineHeight);

    for(var p = 0; p < kineticGroups.length; p++){
      kineticGroups[p].update();
      kineticGroups[p].run();
    }
  pop();

  if (recording) {
    console.log('recording');
    encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
    recordedFrames++;
  }
  if (recordedFrames === numFrames) {
    recording = false;
    recordedFrames = 0;
    console.log('recording stopped');

    encoder.finalize();
    const uint8Array = encoder.FS.readFile(encoder.outputFilename);
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }));
    anchor.download = encoder.outputFilename;
    anchor.click();
    encoder.delete();

    setRecorder(); // reinitialize encoder

    toggleRecMessage();
  }

  if(frameFade > 0.2){
    frameFade -= 0.2;
  }
}

function resetAnim(){
  fullHeight = keyArray.length * lineHeight;

  for(var p = 0; p < groupCount; p++){
    // kineticGroups[p] = new KineticGroup(-horzSpacer * 2 + p * horzSpacer, 0, p);
    kineticGroups[p] = new KineticGroup(-horzSpacer * ((groupCount-1)/2) + p * horzSpacer, 0, p);

  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  sizeSaveChange(saveSizeState);
}

function setRecorder(){
  HME.createH264MP4Encoder().then(enc => {
    encoder = enc;
    encoder.outputFilename = 'test';
    encoder.pixelDensity = 2;
    encoder.width = cwidth * 2;
    encoder.height = cheight * 2;
    encoder.frameRate = frate;
    encoder.kbps = 50000; // video quality
    encoder.groupOfPictures = 10; // lower if you have fast actions.
    encoder.initialize();
  })
}