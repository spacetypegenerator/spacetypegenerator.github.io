var pg = [];

var bkgdColor;

var x = [];
var xTarget = [];
var y = [];
var yTarget = [];
var z = [];
var zTarget = [];

var animOn = [];

var animLength = 45;
var animStart;
var animStop;
var returnLength = 20;
var returnStart;
var returnStop;

var runReturn = false;
var stateChanged = false;

var currentState = 0;

var font1;

function preload(){
  pg[0] = loadImage("resources/base.png");
  pg[1] = loadImage("resources/frontal2.png");
  pg[2] = loadImage("resources/parietal2.png");
  pg[3] = loadImage("resources/occipital2.png");
  pg[4] = loadImage("resources/temporal2.png");

  font1 = loadFont("resources/Linotype - Neue Haas Grotesk Text Std 55 Roman.ttf");
}

function setup(){
  createCanvas(1000,800,WEBGL);

  bkgdColor = color("#ffffff");
  foreColor = color("#000000");

  frameRate(30);

  for(var k = 0; k<5; k++){
    x[k] = 0;
    xTarget[k] = 0;
    y[k] = 0;
    yTarget[k] = 0;
    z[k] = 0;
    zTarget[k] = 0;

    animOn[k] = false;
  }
}

function draw(){
  background(bkgdColor);
  orbitControl();

  if(runReturn){
    returner();
  } else {
    animater();
  }

  push();
    push();
      translate(x[0], y[0], z[0] - 1);
      image(pg[0],-width/2,-height/2);

      for(var k = 1; k<5; k++){
        push();
          translate(x[k], y[k], z[k]);
          image(pg[k],-width/2,-height/2);
        pop();
      }
    pop();
  pop();

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight,WEBGL);
}
