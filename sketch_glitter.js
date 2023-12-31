// var bkgdColor, foreColor;
var tFont = [];
var pg = [];
var pgTextSize = 250;
var pgTextFactor = [];
// var starterText = "SPACE";
var starterText = "HAPPY\nNEW\nYEARS";
// var starterText = "BYE\n2023";
var inputText;

var emitters = [];
var res = 10;

var textScaler = 0.9;
var fontSelect = 0;
var leading = 20;

var typeCoreH = 0;

const frate = 30;
var numFrames = 300;
let recording = false;
let recordedFrames = 0;

let thisDensity = 2;
let recMessageOn = false;
var widgetOn = true;

function preload(){
  // tFont[0] = loadFont("resources/TT Bluescreens Trial Black.otf");
  // tFont[0] = loadFont("resources/NeueMontreal-BoldItalic.ttf");
  // tFont[0] = loadFont("resources/FAIRE-Sprig-Trial-HairlineItalic.otf");
  tFont[0] = loadFont("resources/NeueMontreal-LightItalic.ttf");
  pgTextFactor[0] = 0.75;
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    starterText = "20\n23";
  }

  thisDensity = pixelDensity();

  bkgdColor = color('#000000');
  foreColor = color('#ffffff');
  // fadeColor = color('#FFD700');
  fadeColor = color(212, 175, 55, 0);

  // noSmooth();
  textureMode(NORMAL);

  strokeCap(ROUND);
  strokeJoin(ROUND);

  document.getElementById("text0").value = starterText;
  setText();
}

function draw(){
  background(bkgdColor);

  // push();
  //   for(var m = 0; m < inputText.length; m++){
  //     image(pg[m], -pg[m].width/2, -pg[m].height/2);
  //   }
  // pop();

  push();
    translate(width/2, height/2);
    // fill(255,0,0);
    // ellipse(0,0,5,5);

    for(var p = 0; p < emitters.length; p++){
      emitters[p].run();
    }
  pop();

  runRecording();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  setText();
}