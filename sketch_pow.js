var bkgdColor = '#049dd9';
var strokeColor = '#000000';
var fillColor = '#ffffff';

var pg = [];
var pgTextSize = 250;

var tFont = [];
var pgTextFactor = [];
var fontSelect = 0;

// var starterText = "SPACE\n& TIME";
var starterText = "NEVER\nPERFECT\nENOUGH";

var inputText;
var coreSplode;
var coreMousePop;

var orgX, orgY;
var coreScale = 1;
var coreSW = 2;
var widgetOn = true;

var blastFactor = 1;
var detailFactor = 1;
var ratioFactor = 1;

var mousePopOn = true;

const frate = 30;
var numFrames = 300;
let recording = false;
let recordedFrames = 0;

let thisDensity = 2;
let recMessageOn = false;

function preload(){
  tFont[0] = loadFont("resources/FormulaCondensed-Bold.otf");
  pgTextFactor[0] = 0.85;

  tFont[1] = loadFont("resources/EditorialNew-Thin.otf");
  pgTextFactor[1] = 0.85;

  tFont[2] = loadFont("resources/NeueWorld-CondensedRegular.otf");
  pgTextFactor[2] = 0.75;

  tFont[3] = loadFont("resources/TT Bluescreens Trial Medium.otf");
  pgTextFactor[3] = 0.75;

  tFont[4] = loadFont("resources/TT Travels Trial Black Italic.otf");
  pgTextFactor[4] = 0.75;

  tFont[5] = loadFont("resources/Oktah Neue SemiBold.otf");
  pgTextFactor[5] = 0.75;
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  thisDensity = pixelDensity();

  urlParams = new URLSearchParams(window.location.search);
  if(urlParams.has('starterText')){
    parseCustomUrl();
  } else {
    fillColor = document.getElementById("fillColor").value;
    strokeColor = document.getElementById("strokeColor").value;
    bkgdColor = document.getElementById("bkgdColor").value;
  }

  orgX = width/2;
  orgY = height/2;
  if(mousePopOn){
    coreMousePop = new MousePop(orgX, orgY);
  }

  frameRate(frate);

  textFont(tFont[fontSelect]);
  textSize(pgTextSize);
  strokeJoin(ROUND);

  document.getElementById("text0").value = starterText;
  setText();
}

function draw(){
  background(bkgdColor);

  if(mousePopOn){ coreMousePop.runBottom(); }
  coreSplode.run();
  if(mousePopOn){ coreMousePop.runTop();}

  runRecording();
}

function mousePressed(){
  if(mouseX > 200 || mouseY > 250){
    orgX = mouseX;
    orgY = mouseY;
  
    coreSplode.refresh();
    coreMousePop.refresh(orgX, orgY);
  }
}

function buildIt(){
  coreSplode = new SplodeAll();

  orgX = width/2;
  orgY = height/2;

  coreMousePop.refresh(orgX, orgY);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  coreSplode.refresh();
  coreMousePop.refresh(orgX, orgY);
}

function parseCustomUrl(){
  var convertText = urlParams.get('starterText');
  starterText = convertText.replaceAll("_*_", "\n");

  fontSelect = urlParams.get('fontSelect');
  document.getElementById("fontChange").value = fontSelect;

  pgTextSize = int(urlParams.get('pgTextSize'));
  document.getElementById("pgTextSize").value = map(pgTextSize, 10, 400, 0, 100);
  coreScale = pgTextSize/250;

  fillColor = color(urlParams.get('fillColor'));
  var returnFillColor = fillColor.toString('#rrggbb');
  document.getElementById("fillColor").value = returnFillColor;

  bkgdColor = color(urlParams.get('bkgdColor'));
  var returnBkgdColor = bkgdColor.toString('#rrggbb');
  document.getElementById("bkgdColor").value = returnBkgdColor;

  strokeColor = color(urlParams.get('strokeColor'));
  var returnstrokeColor = strokeColor.toString('#rrggbb');
  document.getElementById("strokeColor").value = returnstrokeColor;

  coreSW = urlParams.get('coreSW');
  document.getElementById("coreSW").value = map(coreSW, 0, 4, 1, 100);

  detailFactor = urlParams.get('detailFactor');
  document.getElementById("detailFactor").value = map(detailFactor, 1.5, 0.3, 1, 100);

  blastFactor = urlParams.get('blastFactor');
  document.getElementById("blastFactor").value = map(blastFactor, 0.5, 3, 1, 100);

  ratioFactor = urlParams.get('ratioFactor');
  document.getElementById("ratioFactor").value = map(ratioFactor, 0.1, 4, 1, 100);
}
