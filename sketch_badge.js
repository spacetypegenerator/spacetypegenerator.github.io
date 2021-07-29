var unitRes = 200;

var uRadius = 300;
var uStripH = 40;

var uRingAngle;
var uRingSec;

var stripToggle = true;     ///////// "0"
var stripLength = 1;
var stripHeight = 2;
var stripShear = 0;
var stripRotate = 0;
var stripPosition = 0;

var orbitToggle = true;     ///////// "1"
var orbitHeight = 1;
var orbitRadius = 1;
var orbitXrot, orbitZrot;
var orbitCirc;

var tunnelToggle = false;     ///////// "2"
var tunnelCount = 8;
var tunnelCirc;
var tunnelOffset;
var tunnelInner = 0.1;
var rSpeed = [];

var ringToggle = false;     ///////// "3"
var ringHeight = 1;
var ringRadius = 1;
var ringOffset;
var ringCirc;

var gateToggle = true;     ///////// "4"
var gatesOffset;
var stretchRes = 25;
var gateCount = 8;
var gateCirc;
var gateInner = 0.1;
var gateHalf = false;
var rSpeedGate = [];
var gateFlip = false;

var spreadToggle = true;
var spreadFontSize = 100;
var spreadRadius = 0.75;
var spreadTangent = false;
var spreadXPinch = 1;
var spreadYPinch = 1;

var trackToggle = false;
var trackStripHeight = 1.0;
var trackWidth, trackHeight;
var trackWidthPinch, trackHeightPinch;

var imageToggle = true;
var pgImage;
var imageShape = 0;
var imageHeight, imageWidth;
var imageRadius = 1.0;

var uZoomSpeed = 50;

var unitCount = 7;
var unitCycle = [];

var pgT = [];
var tFont = [];
var unitFont = [];
var tEntry = [];
var pgTextSize = 200;
var pgPadding = [];
var pgOutline = [];
var pgBackground = [];
var pgFlip = [];
var pgInvert = [];
var unitRepeat = [];

var pgGrid, pgStretch;

var bkgdColor, foreColor, stokeColor;

let isRecording = false;

function preload(){
  // tFont[0] = loadFont("resources/Linotype - NHaasGroteskDSPro-45Lt.otf");
  tFont[0] = loadFont("assets/ProximaNova-Thin.otf");
  tFont[1] = loadFont("assets/Vollkorn-BoldItalic.ttf");
  tFont[2] = loadFont("assets/KeplerStd-Medium.otf");
  tFont[3] = loadFont("assets/WorkSans-Regular.ttf");
  tFont[4] = loadFont("assets/NotoSansJP-Thin.otf");
  tFont[5] = loadFont("assets/Plaid-XL.otf");
  tFont[6] = loadFont("assets/Origin-Super-Condensed-Regular.otf");
  tFont[7] = loadFont("assets/IBMPlexMono-ExtraLightItalic.otf");
  tFont[8] = loadFont("assets/Roboto-BlackItalic.ttf");
  tFont[9] = loadFont("assets/Linotype - NHaasGroteskDSStd-95Blk.otf");
  tFont[10] = loadFont("assets/Cairo-Bold.ttf");

  pgImage = loadImage("images/0cosmic.gif");
}

function setup(){
  createCanvas(1080,1080,WEBGL);
  ortho(-width/2, width/2, -height/2, height/2,0,2000);

  bkgdColor = color('#ffffff');
  foreColor = color('#000000');
  strokeColor = color('#0000ff');

  gatesOffset = 0;
  gateCirc = 2*PI;

  uRingAngle = 2*PI/unitRes;
  uRingSec = 2*PI*uRadius/unitRes;

  frameRate(30);
  noSmooth();
  textureMode(NORMAL);

  setInitialValues();
//  drawTextures();

  for(var r= 0; r<tunnelCount; r++){
    var rs = random(5);
    rSpeed[r] = rs;
  }
  for(var r= 0; r<gateCount; r++){
    var rs = random(5);
    rSpeedGate[r] = rs;
  }
}

function draw(){
  background(bkgdColor);
  // orbitControl();

  push();
    // translate(70,0);
    if(imageToggle){ unitImage(); }
    if(tunnelToggle){ unitTunnel(); }
    if(gateToggle){ unitGate(); }
    if(ringToggle){ unitRing(); }
    if(spreadToggle){ unitSpread(); }
    if(trackToggle){ unitTrack(); }
    translate(0,0,1);
    if(stripToggle){ unitStrip(); }
    if(orbitToggle){ unitOrbit(); }
  pop();
}

function toggleRecording() {
  if (!isRecording) {
    startRecording({
      // we're passing in 'onProgress' as a parameter to get status feedback on-screen - this is completely optional and you'd also get this info on the console!
      onProgress: (progress) => document.querySelector('#status').textContent = `progress: ${(100 * progress).toFixed(1)}%`
    });

    isRecording = true;
    document.querySelector('#status').textContent = '...is recording 🔴';
    document.querySelector('#recordButton').style.background = "red";
    document.querySelector('#recordButton').style.color = "white";
    document.querySelector('#recordButton').textContent = 'STOP RECORDING';
  } else {
    // simply stop the recording - p5.rec will do the rest:
    stopRecording();

    document.querySelector('#recordButton').style.background = "white";
    document.querySelector('#recordButton').style.color = "red";
    document.querySelector('#recordButton').textContent = 'RECORD';
    document.querySelector('#status').textContent = 'starting up... 🎥';
    document.querySelector('#recordButton').disabled = true;
  }
}

// function windowResized(){
//   resizeCanvas(windowWidth, windowHeight, WEBGL);
// }

function sinEngine(aCount, aLength, bCount,bLength, Speed, slopeN) {
  var sinus = sin((frameCount*Speed + aCount*aLength + bCount*bLength));
  var sign = (sinus >= 0 ? 1: -1);
  var sinerSquare = sign * (1-pow(1-abs(sinus),slopeN));
  return sinerSquare;
}

function animSet(ticker, influ){          /// /// /// /// takes a 0 - 1 and returns an eased 0 - 1
  var targetPoint = pow(ticker,influ)/(pow(ticker,influ) + pow(1-ticker,influ));
  return targetPoint;
}
