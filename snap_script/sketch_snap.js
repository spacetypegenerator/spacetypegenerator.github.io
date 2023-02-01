var tFont = [];
var pgTextSize = 90;
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
let widthHold, heightHold;
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

var thisDensity;

var widgetOn = true;

function preload(){
  tFont[0] = loadFont("snap_resources/Inter-Medium.ttf");
  tFont[1] = loadFont("snap_resources/Inter-Black.ttf");
  tFont[2] = loadFont("snap_resources/ApocLC-Regular-Desktop.otf");
  tFont[3] = loadFont("snap_resources/IBMPlexMono-BoldItalic.ttf");
  tFont[4] = loadFont("snap_resources/SpaceMono-Regular.ttf");
  tFont[5] = loadFont("snap_resources/SpaceGrotesk-Bold.ttf");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  cwidth = int(windowWidth);
  cheight = int(windowHeight);

  thisDensity = pixelDensity();

  widthHold = width;
  heightHold = height;

  pgTextSize = width/11;
  document.getElementById("fontSize").value = pgTextSize;
  lineHeight = pgTextSize * 0.8;

  if(width < 600){
    document.getElementById("textArea").value = "THIS\nAND\nTHEN\nTHAT\nAND\nNOW\nTHIS";
  } else if(width > 1300){
    document.getElementById("textArea").value = "CHANGES\nchanges";
  } else {
    document.getElementById("textArea").value = "ONE\nFINAL\nPERFECT\nFUTURE";
  }

  bkgdColor = color('#000000');
  foreColor = color('#FFFFFF');
  fadeColor = color('#FFFFFF');
  currentFont = tFont[0];
  newWidth = widthHold;
  newHeight = heightHold;
  horzSpacer = widthHold/2;
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
    translate(widthHold/2, heightHold/2);
    if(recording){
      translate(cXadjust, cYadjust);
    }
    
    if(!recording){
      stroke(foreColor);
      strokeWeight(frameFade);
      noFill();
      rectMode(CENTER);
      rect(0, 0, newWidth, newHeight);
    }
    
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
  
  widthHold = width;
  heightHold = height;

  sizeSaveChange(saveSizeState);
}

function setRecorder(){
  HME.createH264MP4Encoder().then(enc => {
    encoder = enc;
    encoder.outputFilename = 'STG_vSnap';
    encoder.pixelDensity = thisDensity;
    encoder.width = cwidth * thisDensity;
    encoder.height = cheight * thisDensity;
    encoder.frameRate = frate;
    encoder.kbps = 50000; // video quality
    encoder.groupOfPictures = 5; // lower if you have fast actions.
    encoder.initialize();
  })
}