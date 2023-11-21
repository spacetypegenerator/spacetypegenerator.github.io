const {
    Engine,
    World,
    Bodies,
    Composite,
    Constraint,
    Mouse,
    MouseConstraint
} = Matter;

let engine;
let world;
let testPart;
let boundaries = [];
let mConstraint;

var bkgdColor = '#ffffff';
var strokeColor = '#0000ff';
var fillColor = '#000000';

var pg = [];
var pgTextSize = 200;

var tFont = [];
var pgTextFactor = [];
var leading = 0;
var textScaler = 0.75;

// var starterText = "YOU\nCANNOT\nCARVE\nROTTEN\nWOOD";
// var starterText = "ALL GOOD\nTHINGS\nCOME\nTO AN\nEND";
// var starterText = "MOST\nTHINGS\nNEVER\nHAPPEN\nTHIS ONE\nWILL";
var starterText = "EVERY\nMORNING\nI START\nA FIRE\nAND BEGIN\nAGAIN";

var constrainMode = 1;
var fontSelect = 2;

var typeCoreW, typeCoreH;
var borderWeight = 1;

var inputText;
var widgetOn = true;

var padFactor = 0.5;
var padAnim = 30;

var gravityAng = 1.5708;
var gravityStrength = 0.0001; // 0.0001

var unitCore = [];
var lineWidths = [];

var dropGroup;
var debrisGroup = [];
var debrisData = [];

var pgImage = [];
var holdImage;

var refreshNewText = 5;
var debrisCap = 7;

const frate = 30;
var numFrames = 300;
let recording = false;
let recordedFrames = 0;

let thisDensity = 2;
let recMessageOn = false;

function preload(){
  tFont[0] = loadFont("crash_resources/Extenda-30-Deca.otf");
  pgTextFactor[0] = 0.69;

  tFont[1] = loadFont("crash_resources/Inter-Medium.ttf");
  pgTextFactor[1] = 0.735;

  tFont[2] = loadFont("crash_resources/Gilway-Bold.otf");
  pgTextFactor[2] = 0.825;

  tFont[3] = loadFont("crash_resources/EditorialNew-Thin.otf");
  pgTextFactor[3] = 0.835;

  tFont[4] = loadFont("crash_resources/Evans-Narrow-Heavy.otf");
  pgTextFactor[4] = 0.82;

  holdImage = loadImage("crash_resources/images/3.gif");
  pgImage[0] = loadImage("crash_resources/images/0.gif");
  pgImage[1] = loadImage("crash_resources/images/1.gif");
  pgImage[2] = loadImage("crash_resources/images/2.gif");
  pgImage[3] = loadImage("crash_resources/images/3.gif");
  pgImage[4] = loadImage("crash_resources/images/4.gif");
  pgImage[5] = loadImage("crash_resources/images/5.gif");
  pgImage[6] = loadImage("crash_resources/images/6.gif");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);

  thisDensity = pixelDensity();

  // create an engine
  var engineOptions = {
    // positionIterations: 8,
    // velocityIterations:6,
    // constraintIterations: 4
  }
  engine = Engine.create(engineOptions);
  world = engine.world;
  
  // testPart = new Particle(width/2, 100, 10, false);

  textFont(tFont[fontSelect]);
  textSize(pgTextSize);
  strokeJoin(ROUND);

  document.getElementById("text0").value = starterText;
  setText();
  findMaxSize();

  fillColor = document.getElementById("fillColor").value;
  bkgdColor = document.getElementById("bkgdColor").value;

  $("#handle2").roundSlider({
    animation:false,
    min:0,
    max:TWO_PI,
    sliderType: "default",
    radius: 50,
    showTooltip: false,
    width: 50,
    value: 3/2 * PI,
    step: 0.001,
    handleSize: 0,
    handleShape: "square",
    tooltipFormat: "adjustGravity"
  });

  // TYPE PIECES
  dropGroup = new DropAll();

  // BOUNDARY

  for(var m = 0; m < 4; m++){
    boundaries.push(new Boundary(0, 0, height + width, 400, 0));
  }
  positionBoundaries();
  
  // MOUSE THINGS
  let canvasMouse = Mouse.create(canvas.elt);
  let options = { mouse: canvasMouse, }
  canvasMouse.pixelRatio = pixelDensity();
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function draw() {
  world.gravity.x = cos(gravityAng);
  world.gravity.y = sin(gravityAng);
  world.gravity.scale = gravityStrength;

  background(bkgdColor);
  Engine.update(engine);

  dropGroup.run();

  if(borderWeight > 0){
    borderWeight -= 0.05;
    stroke('#5080bf');
    strokeWeight(borderWeight);
    noFill();
    rectMode(CENTER);
    rect(width/2, height/2, width - (width - typeCoreW) * padFactor, height - (height - typeCoreH) * padFactor); 
  }
  if(borderWeight < 0.1){
    borderWeight = 0;
  }

  if(refreshNewText < 4){
    newText();
    refreshNewText ++;
  }

  runRecording();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);

  newText();
}

function positionBoundaries(){
  var vertPad = (height - typeCoreH)/2 * padFactor;
  var horzPad = (width - typeCoreW)/2 * padFactor;

  // VERTICAL PADS
  Matter.Body.setPosition(boundaries[0].body, {x: width/2, y: height + 200 - vertPad});
  Matter.Body.setAngle(boundaries[0].body, 0);

  Matter.Body.setPosition(boundaries[1].body, {x: width/2, y: - 200 + vertPad});
  Matter.Body.setAngle(boundaries[1].body, PI);

  Matter.Body.setPosition(boundaries[2].body, {x: - 200 + horzPad, y: height/2});
  Matter.Body.setAngle(boundaries[2].body, PI/2);

  Matter.Body.setPosition(boundaries[3].body, {x: width + 200 - horzPad, y: height/2});
  Matter.Body.setAngle(boundaries[3].body, PI * 3/2);

  borderWeight = 2;
}
