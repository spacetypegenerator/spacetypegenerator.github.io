var pg = [];
var pgPlus = [];

var bkgdColor;

var x = [];
var xTarget = [];
var xHold = [];
var y = [];
var yTarget = [];
var yHold = [];
var z = [];
var zTarget = [];
var zHold = [];
var label = []

var a = [];
var aTarget = [];
var aHold = [];

var xNudge = [];
var yNudge = [];
var label = []

var animOn = false;

var animLength = 30;
var animStart = 0;
var animStop = 0;

var currentState = 6;

var font1;

var cullSpace = 0.1;

function preload(){
  pg[0] = loadImage("resources/base.png");
  pg[1] = loadImage("resources/frontal2.png");
  pg[2] = loadImage("resources/parietal2.png");
  pg[3] = loadImage("resources/occipital2.png");
  pg[4] = loadImage("resources/temporal2.png");

  pgPlus[1] = loadImage("resources/frontal2 plus.png");
  pgPlus[2] = loadImage("resources/parietal2 plus.png");
  pgPlus[3] = loadImage("resources/occipital2 plus.png");
  pgPlus[4] = loadImage("resources/temporal2 plus.png");

  font1 = loadFont("resources/SpaceMono-Bold.ttf");
}

function setup(){
  let renderer = createCanvas(1000,800,WEBGL);
  renderer.drawingContext.disable(renderer.drawingContext.DEPTH_TEST);

  bkgdColor = color("#ffffff");
  foreColor = color("#000000");

  frameRate(30);

  for(var k = 0; k<5; k++){
    x[k] = 0;
    xTarget[k] = 0;
    xHold[k] = 0;
    y[k] = 0;
    yTarget[k] = 0;
    yHold[k] = 0;
    z[k] = 0;
    zTarget[k] = 0;
    zHold[k] = 0;
    a[k] = 0;
    aTarget[k] = 0;
    aHold[k] = 0;

    animOn[k] = false;
  }

  xNudge[1] = -220;  yNudge[1] = -100;
  xNudge[2] = 115;  yNudge[2] = -175;
  xNudge[3] = 310;  yNudge[3] = 0;
  xNudge[4] = 20;  yNudge[4] = 60;

  label[1] = "Frontal";
  label[2] = "Parietal";
  label[3] = "Occipital";
  label[4] = "Temporal";
}

function draw(){
  background(bkgdColor);
  // orbitControl();

  if(animOn){
    animater();
  }

  textFont(font1);
  textSize(20);

  push();
    translate(x[0], y[0], z[0]);
    image(pg[0],-width/2,-height/2);

    translate(0,0,1);

    for(var k = 1; k<5; k++){
      push();
        translate(x[k], y[k], z[k] + k*cullSpace);

        tint(255, a[k]);
        image(pgPlus[k],-width/2,-height/2);

        translate(0,0,1);
        tint(255,255)
        image(pg[k],-width/2,-height/2);

        translate(xNudge[k], yNudge[k] + 62 - a[k]/4, 1);
        noStroke(); fill(84,165,236,a[k]);
        rect(0,0,120,30);
        fill(255,a[k]);
        text(label[k],5,25);
      pop();
    }
  pop();
}
